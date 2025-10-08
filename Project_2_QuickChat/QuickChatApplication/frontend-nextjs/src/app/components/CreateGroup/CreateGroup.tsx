import constant from "@/app/core/constant/ConstantData";
import { ConversationResponse } from "@/app/core/Models/chats.model";
import { CreateGroupRequest } from "@/app/core/Models/group.model";
import { UserProfile } from "@/app/core/Models/user-profile";
import { SvgIcon } from "@/app/core/reusuable/svg";
import { createGroupService } from "@/app/core/services/common.service";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as fromAppSelector from '@/app/core/store/app.selector';

export const CreateGroup = () => {
  const dispatch = useDispatch();

  const [friendList, setFriendList] = useState<ConversationResponse[]>([]);
  const [selectedContact, setSelectedContact] = useState<UserProfile[]>([]);
  const [groupData,setGroupData]=useState<CreateGroupRequest>({
    groupName:'',
    adminUserID:'',
    groupDescription:'',
    groupImage:'',
    groupMembersUserID:[]
  })


  const getFriendsList = useSelector(fromAppSelector.getUsersChatList);
  const userID = useSelector(fromAppSelector.getUserID);
  const createGroupStatus=useSelector(fromAppSelector.getCreateGroupStatus);

  const addContactIntoSelectContactList = (index: number) => {
    setSelectedContact([...selectedContact, friendList[index].userProfile]);
    setGroupData(
      {
        ...groupData,
        groupMembersUserID:[
          ...groupData.groupMembersUserID,
          friendList[index].userProfile.userID
        ]
      }
    )
  };

  const removeContactIntoSelectContactList = (selectedID: string) => {
    setSelectedContact(
      selectedContact.filter((item: UserProfile) => item.userID != selectedID)
    );

    setGroupData(
      {
        ...groupData,
        groupMembersUserID:groupData.groupMembersUserID.filter(item=>item!=selectedID)
      }
    )
  };

  const createGroupFunc=()=>{

    if(userID && userID.length!=0){
      createGroupService(dispatch,groupData,createGroupStatus??false);
    }
  }

  useEffect(()=>{
    if(userID && userID.length!=0){
      setGroupData({
        ...groupData,
        adminUserID:userID,
        groupMembersUserID:[
          ...groupData.groupMembersUserID,
          userID
        ]
      })
    }
  },[userID])

  useEffect(() => {
    if(getFriendsList){
      setFriendList(getFriendsList);
    }
  }, [getFriendsList]);

  return (
    <>
      <div className="w-[calc(100%-350px-5rem)]">
        <div className="w-[100%] h-[10vh] flex justify-center items-center border-b-[2px]  text-[25px] border-b-teal-400 text-teal-400 font-medium ">
          Create Group
        </div>
        <div className="w-[100%]">
          <div className="w-[100%]  h-[10vh]   flex p-[20px]">
            <input
              onChange={(e)=>{
                setGroupData(
                  {
                    ...groupData,
                    groupName:e.target.value
                  }
                )
              }}
              className="w-[100%] px-[10px] focus:border-teal-400  focus:outline-none rounded-[10px] border-[2px] border-teal-400"
              placeholder="Enter Group Name"
            />
          </div>
          <div className="w-[100%]  h-[10vh]  flex px-[20px]">
            <textarea
            onChange={(e)=>{
              setGroupData(
                {
                  ...groupData,
                  groupDescription:e.target.value
                }
              )
            }}
              className="w-[100%] h-[8vh] px-[10px] py-[5px] focus:border-teal-400  focus:outline-none rounded-[10px] border-[2px] border-teal-400"
              placeholder="Enter Group Description (optional)"
            />
          </div>

          <div className="w-[100%] flex justify-between p-[20px]">
            <div className="w-[49%] border-[2px] border-teal-400 rounded-[10px]">
              <div className="w-[100%] bg-teal-400 text-white text-[18px] font-medium flex justify-center py-[10px] border-b-[2px] border-b-teal-400">
                Selected Contacts
              </div>
              <div
                className={`w[100%] h-[50vh]  overflow-y-auto overflow-quick p-[20px] ${
                  selectedContact.length == 0
                    ? "flex justify-center items-center"
                    : ""
                } `}
              >
                {selectedContact &&
                  selectedContact.length > 0 &&
                  selectedContact.map((item, index) => (
                    <div
                      key={index}
                      className="w-[100%] my-[10px] py-[10px] flex justify-between items-center px-[20px] border-[2px]  border-teal-400"
                    >
                      <div className="flex justify-between items-center">
                        <SvgIcon iconKey="ADD_PHONE_MEMBER" /> &nbsp;&nbsp;{" "}
                        {item.userPhoneNumber} &nbsp; : &nbsp;&nbsp; &nbsp;{" "}
                        {item.userName}
                      </div>
                      <div>
                        <button
                          onClick={() =>
                            removeContactIntoSelectContactList(item.userID)
                          }
                          className="w-[100px] hover:bg-red-500 hover:text-white border-[2px] border-red-500 text-red-500 py-[5px] rounded-[5px] hover"
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>
                  ))}
                {selectedContact && selectedContact.length == 0 && (
                  <div className="text-[20px] text-red-500">No Contacts</div>
                )}
              </div>
            </div>
            <div className="w-[49%] border-[2px] border-teal-400 rounded-[10px]">
              <div className="w-[100%] bg-teal-400 text-white text-[18px] font-medium flex justify-center py-[10px] border-b-[2px] border-b-teal-400">
                Available Contacts
              </div>
              <div className="w[100%] h-[50vh] overflow-y-auto overflow-quick p-[20px] ">
                {friendList &&
                  friendList.map((item, index) => (
                    <div
                      key={index}
                      className="w-[100%] my-[10px] py-[10px] flex justify-between items-center px-[20px] border-[2px]  border-teal-400"
                    >
                      <div className="flex justify-between items-center">
                        <SvgIcon iconKey="ADD_PHONE_MEMBER" /> &nbsp;&nbsp;{" "}
                        {item.userProfile.userPhoneNumber} &nbsp; : &nbsp;&nbsp;{" "}
                        &nbsp; {item.userProfile.userName}
                      </div>
                      <div>
                        {selectedContact &&
                          selectedContact.find(
                            (i) => i.userID == item.userProfile.userID
                          ) == undefined && (
                            <button
                              onClick={() =>
                                addContactIntoSelectContactList(index)
                              }
                              className="w-[100px] hover:bg-red-500 hover:text-white border-[2px] border-red-500 text-red-500 py-[5px] rounded-[5px] hover"
                            >
                              ADD
                            </button>
                          )}
                        {selectedContact &&
                          selectedContact.find(
                            (i) => i.userID == item.userProfile.userID
                          ) != undefined && (
                            <button
                              disabled
                              className="w-[100px]   border-[2px] border-gray-500 text-gray-500 py-[5px] rounded-[5px] hover"
                            >
                              ADDED
                            </button>
                          )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="p-[20px] w-[100%] flex justify-center">
            <button onClick={createGroupFunc} className="w-[300px] py-[7px] bg-white text-teal-400 rounded-[50px] hover:text-white hover:bg-teal-400 text-[18px] font-medium flex justify-center border-teal-400 border-[2px]">
              CREATE
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
