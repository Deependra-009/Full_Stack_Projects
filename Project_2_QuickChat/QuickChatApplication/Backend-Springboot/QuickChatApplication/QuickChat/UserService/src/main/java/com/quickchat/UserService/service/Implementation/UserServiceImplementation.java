package com.quickchat.UserService.service.Implementation;


import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.quickchat.ChatService.repository.ConversationRepository;
import com.quickchat.ChatService.repository.GroupRepository;
import com.quickchat.ChatService.repository.GroupUserRepository;
import com.quickchat.ChatService.service.Interface.ChatService;
import com.quickchat.ChatService.websocket.service.OnlineStatusService;
import com.quickchat.CommonService.entity.group.GroupEntity;
import com.quickchat.CommonService.entity.group.GroupUserEntity;
import com.quickchat.CommonService.entity.single.ConversationEntity;
import com.quickchat.CommonService.entity.UserEntity;
import com.quickchat.CommonService.exception.CustomException;
import com.quickchat.CommonService.request.CreateGroupRequest;
import com.quickchat.CommonService.response.ConversationResponse;
import com.quickchat.CommonService.response.GroupResponse;
import com.quickchat.CommonService.response.MessageResponse;
import com.quickchat.CommonService.response.UserProfile;
import com.quickchat.UserService.models.Request.FetchParticularUserDataRequest;
import com.quickchat.UserService.models.Request.UserProfileRequest;
import com.quickchat.UserService.models.Response.UserLoginResponse;
import com.quickchat.UserService.models.Response.UserProfileResponse;
import com.quickchat.UserService.service.Interfaces.UserService;
import com.quickchat.UserService.auth.JwtHelper;
import com.quickchat.UserService.models.Request.UserLoginRequest;
import com.quickchat.UserService.models.Request.UserRegisterRequest;
import com.quickchat.UserService.models.Response.FindUserByPhoneNumberOrUserNameResponse;
import com.quickchat.UserService.models.Response.UserRegisterResponse;
import com.quickchat.UserService.repository.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class UserServiceImplementation implements UserService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private JwtHelper jwtHelper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private GroupUserRepository groupUserRepository;

    @Autowired
    private ChatService chatService;



    @Override
    public UserRegisterResponse addUserInDB(UserRegisterRequest userRegisterRequest) {

        UserEntity user=null;

        try{
            user=userRepository.getUserFromDatabaseByEmail(userRegisterRequest.getUserEmail());
            if(user==null){
                UserRecord.CreateRequest request = new UserRecord.CreateRequest()
                        .setEmail(userRegisterRequest.getUserEmail())
                        .setPassword(userRegisterRequest.getUserPassword())
                        .setDisplayName(userRegisterRequest.getUserName());

                UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);

                user=UserEntity.builder()
                        .userID(userRecord.getUid())
                        .userPhoneNumber(userRecord.getPhoneNumber())
                        .userProfilePhoto(userRecord.getPhotoUrl())
                        .userEmail(userRecord.getEmail())
                        .userName(userRecord.getDisplayName())
                        .build();
                this.userRepository.save(user);
            }

        }
        catch(Exception e){
            System.out.println(e);
        }

        return UserRegisterResponse.builder()
                .userID(user.getUserID())
                .userName(user.getUserName())
                .userEmail(user.getUserEmail())
                .userPhotoURL(user.getUserProfilePhoto())
                .isUserDisabled(user.isUserDisabled())
                .build();
    }

    @Override
    public UserLoginResponse getUserFromDB(UserLoginRequest userLoginRequest) throws FirebaseAuthException {



        UserEntity user=userRepository.getUserFromDatabaseByEmail(userLoginRequest.getUserEmail());
        if(user==null) throw new CustomException("Wrong Credentials","USER_NOT_FOUND");
        String token=this.jwtHelper.generateToken(user);
        UserProfile userProfile=getProfileData(user.getUserID());
        userProfile.setOnline(true);
//        return user;
        return UserLoginResponse.builder()
                .userProfile(userProfile)
                .jwtToken(token)
                .build();
    }

    public UserProfileResponse getUserData(UserProfileRequest userProfileRequest){


        String userEmail=this.jwtHelper.getUsernameFromToken((userProfileRequest.getJwtToken()));
        UserEntity user=userRepository.getUserFromDatabaseByEmail(userEmail);
        if(user==null) throw new CustomException("User Not Found","USER_NOT_FOUND");
        List<ConversationResponse> conversationResponses=new ArrayList<>();
        List<GroupResponse> groupResponses=new ArrayList<>();

        /* Conversation Entity */

        for(ConversationEntity conversationEntity:user.getConversationEntitySet()){
            List<MessageResponse> messageResponseList=this.chatService.getAllMessageParticularUser(conversationEntity.getChatID());

            ConversationResponse conversationResponse=ConversationResponse.builder()
                    .chatID(conversationEntity.getChatID())
                    .userProfile(getProfileData(conversationEntity.getUserReceiverID()))
                    .messageResponseList(messageResponseList)
                    .build();
            conversationResponses.add(conversationResponse);
        }
        conversationResponses.sort(Comparator.comparing(ConversationResponse::getRecentData).reversed());

        /* Group Entity */
        System.out.println("user "+user);
        for(GroupUserEntity groupUserEntity:user.getGroupUserEntitySet()){
            GroupEntity groupEntity=this.groupRepository.getGroupByGroupID(groupUserEntity.getGroupID());
            List<MessageResponse> messageResponseList=this.chatService.getAllMessageParticularUser(groupEntity.getChatID());
            List<String> groupMembersUserID=this.groupUserRepository.getUserIDOfParticularGroup(groupEntity.getGroupID());
            groupResponses.add(
                    GroupResponse.builder()
                            .groupID(groupEntity.getGroupID())
                            .groupDescription(groupEntity.getGroupDescription())
                            .adminUserID(groupEntity.getAdminUserID())
                            .chatID(groupEntity.getChatID())
                            .groupImage(groupEntity.getGroupImage())
                            .groupName(groupEntity.getGroupName())
                            .messageResponseList(messageResponseList)
                            .membersList(
                                    groupMembersUserID.stream()
                                            .map(this::getProfileData)
                                            .toList()

                            )
                            .build()
            );


            System.out.println("groupEntity "+groupEntity);
        }






        return UserProfileResponse.builder()
                .conversationEntitySet(conversationResponses)
                .groupResponseList(groupResponses)
                .build();
    }

    @Override
    public ConversationResponse findUserData(FetchParticularUserDataRequest userProfileRequest) {

        if(userProfileRequest.getUserID()==null || userProfileRequest.getSearchingUserID()==null){
            throw new CustomException("WRONG DATA","BAD_REQUEST");
        }


        String chatID=this.conversationRepository.getChatIDFromDB(
                entityManager.getReference(UserEntity.class,userProfileRequest.getUserID()),
                userProfileRequest.getSearchingUserID()
        );

        List<MessageResponse> messageResponseList=null;
        if(chatID!=null){
            messageResponseList=this.chatService.getAllMessageParticularUser(chatID);
        }

        return ConversationResponse
                .builder()
                .userProfile(getProfileData(userProfileRequest.getSearchingUserID()))
                .messageResponseList(messageResponseList)
                .chatID(chatID)
                .build();
    }


    @Override
    public List<FindUserByPhoneNumberOrUserNameResponse> findUserByPhoneNumberOrUserNameResponse(String searchText) {
        return this.userRepository.findUserByPhoneNumberOrUserNameResponse(searchText);
    }

    @Override
    public GroupResponse createGroup(CreateGroupRequest createGroupRequest) {

        GroupEntity group = this.groupRepository.save(GroupEntity.builder()
                .adminUserID(createGroupRequest.getAdminUserID())
                .groupName(createGroupRequest.getGroupName())
                .chatID(UUID.randomUUID().toString())
                .groupImage(createGroupRequest.getGroupImage())
                .groupDescription(createGroupRequest.getGroupDescription())
                .build());

        for(String userID:createGroupRequest.getGroupMembersUserID()){
            this.groupUserRepository.save(GroupUserEntity.builder()
                    .groupID(group.getGroupID())
                    .userID(userID)
                    .userEntity(entityManager.getReference(UserEntity.class, userID))
                    .build());
        }


        return setGroupResponseFromEntity(group,createGroupRequest);
    }

    private UserProfile getProfileData(String userID){
        UserEntity user=this.userRepository.getUserFromDatabaseByID(userID);
        if(user==null) return null;
        OnlineStatusService onlineStatusService=OnlineStatusService.getOnlineStatusServiceInstance();
        return UserProfile.builder()
                .isOnline(onlineStatusService.isUserOnline(userID))
                .userID(user.getUserID())
                .userPhotoURL(user.getUserProfilePhoto())
                .userName(user.getUserName())
                .userPhoneNumber(user.getUserPhoneNumber())
                .isUserDisabled(user.isUserDisabled())
                .lastSeen(user.getUserLastSeen())
                .build();
    }

    private GroupResponse setGroupResponseFromEntity(GroupEntity groupEntity,CreateGroupRequest createGroupRequest){
        return GroupResponse.builder()
                .groupID(groupEntity.getGroupID())
                .adminUserID(groupEntity.getAdminUserID())
                .groupName(groupEntity.getGroupName())
                .groupDescription(groupEntity.getGroupDescription())
                .messageResponseList(new ArrayList<>())
                .chatID(groupEntity.getChatID())
                .membersList(setUserProfile(createGroupRequest.getGroupMembersUserID()))
                .build();
    }

    private List<UserProfile> setUserProfile(List<String> membersList){
        return membersList.stream().map(this::getProfileData).toList();
    }
}

