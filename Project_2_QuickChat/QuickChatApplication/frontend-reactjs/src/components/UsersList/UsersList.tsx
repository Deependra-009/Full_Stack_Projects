import { ReactSearchAutocomplete } from "react-search-autocomplete";
import {
  formatTime,
  findUserByPhoneNumberOrUserNameService,
  fetchUserDataService,
  updateReadMessageStatusService,
} from "../../core/services/common.service";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoadingData,
  getSelectedFriend,
  getUserID,
  getUsersChatList,
} from "../../core/store/app.selector";
import { ConversationResponse } from "../../core/Models/chats.model";
import * as fromAppStore from "./../../core/store/app.store.service";
import { SvgIcon } from "../../core/reusuable/svg";
import { FindUserByPhoneNumberOrUserNameResponse } from "../../core/Models/find-by-phone-number-or-username";
import WebSocketService from "../../core/web-socket/WebSocketService";
import { UpdateMessageType } from "../../core/enum/update-message-type";

export const UsersList = () => {
  const dispatch = useDispatch();
  const [friendList, setFriendList] = useState<ConversationResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestionItems, setSuggestionItems] = useState<
    FindUserByPhoneNumberOrUserNameResponse[]
  >([]);
  const getFriendsList = useSelector(getUsersChatList);
  const selectedFriend = useSelector(getSelectedFriend);
  const loadingData = useSelector(getLoadingData);
  const userID = useSelector(getUserID);

  useEffect(() => {
    setFriendList(getFriendsList ?? []);
  }, [getFriendsList]);

  const openSelectedFriendChats = (
    index: number,
    chatdata: ConversationResponse
  ) => {
    fromAppStore.setSelectedFriend(dispatch, chatdata);
    if (chatdata.unreadMessage != 0) {
      // updateReadMessageStatusService(dispatch, chatdata.chatID,userID??'',chatdata.userProfile.userID);
      WebSocketService.updateMessage({
        chatID: chatdata.chatID,
        senderID: userID ?? "",
        receiverID: chatdata.userProfile.userID,
        updateMessageType: UpdateMessageType.UPDATE_SEEN_DATE,
      });
    }
  };

  useEffect(() => {
    if (searchTerm?.length != 0) {
      findUserByPhoneNumberOrUserNameService(searchTerm, setSuggestionItems);
    }
  }, [searchTerm]);

  const handleOnSearch = (string: string) => {
    setSearchTerm(string);
  };

  const handleOnHover = (result: any) => {
    // the item hovered
    // console.log("hover", result);
  };

  const handleOnSelect = (item: any) => {
    // the item selected
    // console.log("select", item);
    fetchUserDataService(userID ?? "", item.id, dispatch);
  };

  const handleOnFocus = () => {
    // console.log("Focused");
  };

  const handleOnClear = () => {
    // console.log("The search input is cleared");
    setSuggestionItems([]);
    setSearchTerm("");
  };

  const formatResult = (item: any) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          {item?.userName}
          {/* hello */}
        </span>
      </>
    );
  };

  const getSVGIcon = (item: ConversationResponse) => {
    const lastMessage =item?.messageResponseList[item?.messageResponseList.length - 1];


    if (lastMessage.messageDeliverableAt==null && lastMessage.messageSeenAt==null) return "SINGLE_TICK_SVG";
    if (lastMessage.messageDeliverableAt!=null && lastMessage.messageSeenAt==null) return "DOUBLE_TICK_SVG_UNREAD";
    if (lastMessage.messageDeliverableAt!=null && lastMessage.messageSeenAt!=null) return "DOUBLE_TICK_SVG_READ";
    return "";
  };
  return (
    <>
      <div className="w-[350px] h-[100vh] border-r-[2px] border-r-teal-400">
        {/* <!-- search div --> */}
        <div className="w-[100%] h-[10vh] flex justify-center items-center">
          <form className="w-[100%]">
            <div className="px-2 w-[100%]">
              <ReactSearchAutocomplete
                styling={{
                  border: "2px solid rgb(1, 155, 155)",
                  placeholderColor: "gray",
                  boxShadow: "none",
                  backgroundColor: "white",
                  zIndex: loadingData.loading ? 0 : 5,
                  borderRadius: "10px",
                }}
                items={suggestionItems ?? []}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                fuseOptions={{ keys: ["userEmail", "userPhoneNumber"] }}
                onHover={handleOnHover}
                onFocus={handleOnFocus}
                onClear={handleOnClear}
                formatResult={formatResult}
                resultStringKeyName="userName"
                placeholder="Type to search"
              />
            </div>
          </form>
        </div>

        {/* <!-- user data --> */}

        <div className="w-[100%] px-2 py-1 h-[90vh]  overflow-quick overflow-y-scroll">
          {/* <!-- for loop for users chat --> */}

          {friendList &&
            friendList.map((item: ConversationResponse, index) => (
              <div
                key={index}
                onClick={openSelectedFriendChats.bind(null, index, item)}
                className={`${
                  selectedFriend?.chatID == item.chatID
                    ? "text-white bg-teal-500 rounded-[10px]"
                    : "text-black"
                }  py-2 cursor-pointer  my-1  px-1 w-[100%] h-[75px]  flex items-center`}
              >
                <div className="w-[20%] relative  flex justify-center">
                  <img
                    alt="user-icon"
                    className="w-[80%]"
                    src="Images/user-icon.png"
                  />
                  {item.userProfile.online && <SvgIcon iconKey="ONLINE_SVG" />}
                  {!item.userProfile.online && (
                    <SvgIcon iconKey="OFFLINE_SVG" />
                  )}
                </div>
                <div className="w-[50%] h-[55px] overflow-hidden flex flex-col justify-around px-1">
                  <h1 className="text-[17px] font-medium capitalize">
                    {item.userProfile.userName}
                  </h1>
                  {item?.messageResponseList?.length > 0 && (
                    <div className="w-[100%] flex items-center">
                      {item?.messageResponseList[
                          item?.messageResponseList?.length - 1
                        ]?.senderID == userID && (
                          <span className="pl-1 w-[28px]">
                            {/* {getSVGIcon(item)} */}
                            <SvgIcon iconKey={getSVGIcon(item)} />
                          </span>
                        )}
                      <div className=" text-gray-600">
                        {
                          item?.messageResponseList[
                            item?.messageResponseList?.length - 1
                          ]?.messageContent
                        }
                      </div>
                    </div>
                  )}
                  {
                    item?.messageResponseList?.length==0 &&
                    <div className="w-[100%] flex items-center">
                      <div className=" text-gray-600">No message</div>
                    </div>
                  }
                </div>
                <div className="w-[30%] min-h-[100%] px-1 py-1 flex flex-col  text-[15px]">
                  <div className="w-[100%] flex justify-center items-center">
                    {formatTime(item.userProfile.lastSeen)}
                  </div>
                  {selectedFriend?.chatID != item.chatID &&
                    item.unreadMessage != 0 && (
                      <div className="w-[100%] pt-1 flex justify-center items-center">
                        <span className="w-[25px] flex justify-center items-center h-[25px] text-[15px] bg-teal-500 text-white rounded-[50px]">
                          {item.unreadMessage}
                        </span>
                      </div>
                    )}
                </div>
              </div>
            ))}

          {/* {allUsersChatData &&
            allUsersChatData.map((item, index) => (
              <div
                key={index}
                onClick={openSelectedFriendChats.bind(null, index, item)}
                className={`${
                  SelectedChat === index
                    ? "text-white bg-teal-500 rounded-[10px]"
                    : "text-black"
                }  py-2 cursor-pointer  my-1  px-1 w-[100%] flex items-center`}
              >
                <div className="w-[20%] flex justify-center">
                  <img
                    alt="user-icon"
                    className="w-[80%]"
                    src="Images/user-icon.png"
                  />
                </div>
                <div className="w-[57%] px-1">
                  <h1 className="text-[17px]">{item.userProfile.userName}</h1>
                  <h1>new message</h1>
                </div>
                <div className="w-[20%] pb-5 text-[15px]">
                  {formatTime(item.userProfile.lastSeen)}
                </div>
              </div>
            ))} */}
        </div>
      </div>
    </>
  );
};
