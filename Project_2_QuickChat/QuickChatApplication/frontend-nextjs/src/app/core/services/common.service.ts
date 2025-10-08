import {
  UserLoginRequest,
  UserProfileRequest,
} from "../Models/user-login.model";
import {
  fetchUserProfileRepository,
  loginUserRepository,
  findUserByPhoneNumberOrUserNameRepository,
  fetchUserDataRepository,
  updateReadMessageStatusRepository,
  createGroupRepository,
} from "../repository/common.repository";
import * as fromAppStore from "./../../core/store/app.store.service";
import { MessageResponse } from "../Models/chats.model";
import { UpdateMessageType } from "../enum/update-message-type";
import { CreateGroupRequest, GroupEntity } from "../Models/group.model";
import WebSocketService from "../web-socket/WebSocketService";
import { UserProfile } from "../Models/user-profile";

export const loginUserService = async (payload: UserLoginRequest) => {
  return await loginUserRepository(payload);
};

export const fetchUserProfileService = async (dispatch: any, token: string) => {
  try {
    const payload = {
      jwtToken: token,
    };
    const response = await fetchUserProfileRepository(payload);
    setTimeout(() => {
      fromAppStore.fetchUserProfileSuccess(dispatch, response.data);
      console.log("user response", response.data);
    }, 2000);
  } catch (error) {
    fromAppStore.fetchUserProfileError(dispatch);
  }
};

export const fetchUserDataService = async (
  userID: string,
  searchingUserID: string,
  dispatch: any,
  messageResponse?: MessageResponse,
  isSender?: boolean
) => {
  const payload = {
    userID: userID,
    searchingUserID: searchingUserID,
  };
  try {
    const response = await fetchUserDataRepository(payload);
    console.log("resp", response);

    if (messageResponse == undefined) {
      fromAppStore.setSelectedFriend(dispatch, response.data);
    }
    if (messageResponse) {
      fromAppStore.updateChatsData(dispatch, response.data);
      if (isSender) {
        fromAppStore.setSelectedFriend(dispatch, response.data);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const findUserByPhoneNumberOrUserNameService = async (
  searchText: string,
  setSuggestionItems: any
) => {
  try {
    const response = await findUserByPhoneNumberOrUserNameRepository(
      searchText
    );
    setSuggestionItems(response.data);
  } catch (err) {
    console.log(err);
  }
};

export const updateReadMessageStatusService = async (
  dispatch: any,
  chatID: string,
  senderID: string,
  receiverID: string,
  updateMessageType: UpdateMessageType
) => {
  try {
    const payload = {
      chatID: chatID,
      senderID: senderID,
      receiverID: receiverID,
      updateMessageType: updateMessageType,
    };
    const response = await updateReadMessageStatusRepository(payload);
    fromAppStore.updateMessageData(dispatch, response.data);
  } catch (err) {
    console.log(err);
  }
};

export const createGroupService = async (
  dispatch: any,
  payload: CreateGroupRequest,
  createGroupStatus: boolean
) => {
  try {
    const response = await createGroupRepository(payload);
    // fromAppStore.createGroup(dispatch, response.data);
    WebSocketService.createGroup(response.data)

    fromAppStore.createGroupStatus(
      dispatch,
      createGroupStatus == undefined || createGroupStatus == false
        ? true
        : false
    );
  } catch (err) {
    console.log(err);
  }
};

export const sendGroupMessage=(payload:MessageResponse)=>{
  WebSocketService.sendGroupMessage(payload);
}

export const formatTime = (dateString: Date) => {
  const date = new Date(dateString);

  // Extract the hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine AM/PM period
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  // Pad minutes with leading zero if necessary
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;

  // Construct the formatted time string
  const formattedTime = `${hours}:${minutesStr} ${ampm}`;

  return formattedTime;
};
