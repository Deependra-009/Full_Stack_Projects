import { ContentType, MessageResponse } from "@/app/core/Models/chats.model";
import { FileModel } from "@/app/core/Models/file.model";
import { SvgIcon } from "@/app/core/reusuable/svg";
import { formatTime } from "@/app/core/services/common.service";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as fromAppSelector from "@/app/core/store/app.selector";
import WebSocketService from "@/app/core/web-socket/WebSocketService";
import constant from "@/app/core/constant/ConstantData";
import { GroupEntity } from "@/app/core/Models/group.model";
import { ConversationType } from "@/app/core/enum/conversation-type.enum";
import { GroupInfoPage } from "../GroupInfoPage/GroupInfoPage";
import { UserProfile } from "@/app/core/Models/user-profile";
import * as fromAppStore from "@/app/core/store/app.store.service";

export const GroupChatPage = () => {
  const dispatch = useDispatch();

  const [groupData, setGroupData] = useState<GroupEntity>({} as GroupEntity);
  const [allChats, setAllChats] = useState<MessageResponse[]>([]);
  const [message, setMessage] = useState("");
  const [attachOptions, setAttachOptions] = useState(false);
  const [file, setFile] = useState<FileModel>({
    label: "",
    data: null,
    type: "",
  });
  const [openInfoSideBar, setOpenInfoSideBar] = useState(true);
  const [isInfoPage, setInfoPage] = useState(false);

  /* useSelector  */
  const selectedGroup = useSelector(fromAppSelector.getSelectedGroup);
  const userID = useSelector(fromAppSelector.getUserID);

  /* useRef  */
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const infoSideBarRef = useRef<HTMLDivElement | null>(null);

  /* useEffect  */
  useEffect(() => {
    setGroupData(selectedGroup ?? ({} as GroupEntity));
    setAllChats(
      selectedGroup?.messageResponseList ?? ([] as MessageResponse[])
    );
    setAttachOptions(false);
  }, [selectedGroup]);

  useEffect(() => {
    scrollToBottom();
  }, [allChats, file]);

  /* Functions  */

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ block: "start" });
  };

  const handleButtonClick = () => {
    if (fileInputRef.current != null) {
      fileInputRef.current.click();
    }
  };

  const openInfoSideBarFunc = () => {
    setOpenInfoSideBar(!openInfoSideBar);
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile({
        label: selectedFile.name,
        data: selectedFile,
        type: "",
      });
      // Handle the file (e.g., upload it or preview it)
    }
  };

  const clearFileData = () => {
    setFile({
      label: "",
      data: null,
      type: "",
    });
    setAttachOptions(false);
  };

  /* Send Message Function  */
  const sendMessageFunc = () => {
    if (userID && selectedGroup?.groupID) {
      if (file.data == null) {
        WebSocketService.sendMessage({
          senderID: userID,
          receiverID: selectedGroup?.groupID,
          chatID: selectedGroup.chatID,
          contentType: ContentType.TEXT,
          messageContent: message,
          conversationType: ConversationType.GROUP_CONVERSATION,
        });
        setMessage("");
      }
    }
  };

  const selectInfoSideBar = (id: string) => {
    switch (id) {
      case "CLOSE_CHAT":
        fromAppStore.closeAllChats(dispatch);
        break;
      case "GROUP_INFO":
        setInfoPage(true);
        break;
    }
  };

  const getUserName = (id: string) => {
    return groupData.membersList.find((item: UserProfile) => item.userID == id)
      ?.userName;
  };

  useEffect(() => {
    setOpenInfoSideBar(false);
  }, [isInfoPage]);

  const handleClickOutside = (event: any) => {
    if (
      infoSideBarRef.current &&
      !infoSideBarRef.current.contains(event.target)
    ) {
      setOpenInfoSideBar(false);
    }
  };

  const InfoSideBar = () => {
    return (
      <>
        <div className="w-[250px] right-[10px]  mt-[90px] fixed  cursor-pointer ">
          {constant.GROUP_MORE_OPTIONS.map((item, index) => (
            <div
              key={index}
              onClick={() => selectInfoSideBar(item.id)}
              className="w-[100%] py-[15px] bg-gray-300 hover:bg-teal-300 pl-[20px] capitalize"
            >
              {item.name}
            </div>
          ))}
        </div>
      </>
    );
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="w-[calc(100%-350px-5rem)] h-[100vh]   ">
        {!isInfoPage && (
          <div className="w-[100%]">
            {/* navbar profile user section */}
            <div className="w-[100%] bg-white  flex h-[90px] border-b-[2px] border-b-teal-400">
              <div className="w-[80%] flex items-center ">
                <div className="w-[100%]  px-8 flex ">
                  <div className="w-[50px] h-[50px] relative  flex justify-center">
                    <img
                      alt="user-icon"
                      className="w-[100%]"
                      src="Images/user-icon.png"
                    />
                  </div>
                  <div
                    className={`min-h-[100%]  px-2 text-[18px] flex items-center`}
                  >
                    <div className="capitalize">{groupData.groupName}</div>
                    {/* {selectedFriend?.userProfile?.online && (
                  <div className="text-green-600 text-[15px]">online</div>
                )} */}
                  </div>
                </div>
              </div>
              <div className="w-[20%] flex justify-around items-center">
                {/* phone svg */}
                <div className="cursor-pointer">
                  <SvgIcon iconKey="PHONE_SVG" />
                </div>
                {/* video svg */}
                <div className="cursor-pointer">
                  <SvgIcon iconKey="VIDEO_SVG" />
                </div>
                {/* more options */}
                <div className="cursor-pointer" onClick={openInfoSideBarFunc}>
                  <SvgIcon
                    iconKey={
                      !openInfoSideBar ? "MORE_OPTIONS_SVG" : "CLOSE_SVG"
                    }
                  />
                </div>
              </div>
              {openInfoSideBar && (
                <div ref={infoSideBarRef} className="z-10">
                  <InfoSideBar />
                </div>
              )}
            </div>

            {file.data == null && (
              <div className="w-[100%]">
                {/* chat section  */}
                <div className="w-[100%]   p-3  overflow-quick overflow-y-scroll h-[80vh]">
                  {allChats !== undefined &&
                    allChats.map((item, index) => (
                      <div key={index}>
                        {item.senderID !== userID && (
                          <>
                            <div className="w-[100%] flex justify-start">
                              <div className="flex w-[100%] items-start ">
                                <div>
                                  <img
                                    alt="user-icon"
                                    className="w-[80%]"
                                    src="Images/user-icon.png"
                                  />
                                </div>
                                <div className="w-[100%]">
                                  <div className="w-1/2 bg-gray-300 px-4 text-red-500 py-[5px] capitalize rounded-tr-[20px]">
                                    {getUserName(item.senderID)}
                                  </div>
                                  <div className="relative break-words mb-2 pt-[5px] bg-gray-200 px-4 pb-4 rounded-br-[20px] rounded-bl-[20px] w-1/2">
                                    <p className="mb-4">
                                      {item.messageContent}
                                    </p>
                                    <div className="absolute flex bottom-2 right-2  text-black text-sm px-3 py-1 rounded">
                                      <span>
                                        {formatTime(item.messageSentAt)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                        {item.senderID === userID && (
                          <>
                            <div className="w-[100%]  flex justify-end">
                              <div className="relative break-words  mb-2 bg-green-200 p-4 rounded-br-[20px] rounded-l-[20px] w-[50%]">
                                <div>
                                  <p className="mb-4">{item.messageContent}</p>
                                </div>
                                <div className="absolute w-[100%]  justify-end flex bottom-1 items-center right-2  text-black text-sm px-3 py-1 rounded">
                                  <span>{formatTime(item.messageSentAt)}</span>
                                  {/* Single Tick */}
                                  {item.messageDeliverableAt == null &&
                                    item.messageSeenAt == null && (
                                      <span>
                                        <SvgIcon iconKey="SINGLE_TICK_SVG" />
                                      </span>
                                    )}
                                  {/* Double Tick Unread */}
                                  {item.messageDeliverableAt != null &&
                                    item.messageSeenAt == null && (
                                      <span className="pl-1">
                                        <SvgIcon iconKey="DOUBLE_TICK_SVG_UNREAD" />
                                      </span>
                                    )}
                                  {/* Double Tick */}
                                  {item.messageDeliverableAt != null &&
                                    item.messageSeenAt != null && (
                                      <span className="pl-1">
                                        <SvgIcon iconKey="DOUBLE_TICK_SVG_READ" />
                                      </span>
                                    )}
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* chat write section */}
                <div className="w-[100%] mt-2 flex justify-center">
                  <div className="w-[95%] bg-white flex rounded-[40px] border-2 border-teal-400 h-[60px]">
                    {/* svg icons */}
                    <div className="w-[100px] min-h-[100%] flex justify-center items-center ">
                      {/* emoji */}

                      <SvgIcon iconKey="EMOJI_SVG" />
                      {/* attachment */}

                      {!attachOptions && (
                        <div
                          className="hover:cursor-pointer"
                          onClick={() => {
                            setAttachOptions(true);
                          }}
                        >
                          <SvgIcon iconKey="ATTACHMENT_SVG" />
                        </div>
                      )}

                      {attachOptions && (
                        <div
                          className="hover:cursor-pointer"
                          onClick={() => {
                            setAttachOptions(false);
                          }}
                        >
                          <SvgIcon iconKey="CLOSE_SVG" />
                        </div>
                      )}
                    </div>

                    {/* text input */}
                    <div className="w-[85%]">
                      <input
                        type="text"
                        name="message"
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (e.key == "Enter") {
                            sendMessageFunc();
                          }
                        }}
                        className="w-[100%] min-h-[100%] resize-none outline-0 text-[19px]"
                        placeholder="Enter Your Message"
                      />
                    </div>

                    {/* send button */}
                    <div className="w-[6%] min-h-[100%] flex justify-center items-center">
                      <button onClick={sendMessageFunc}>
                        <SvgIcon iconKey="SEND_BUTTON_SVG" />
                      </button>
                    </div>
                  </div>
                </div>

                {attachOptions && (
                  <div className="w-[230px] rounded-[10px] bg-gray-200  h-[263px] fixed bottom-[87px] left-[530px]">
                    <div className="w-[100%]">
                      {constant.ATTACHMENT.map((item, index) => (
                        <button
                          key={index}
                          onClick={handleButtonClick}
                          className="text-[18px] text-v hover:cursor-pointer hover:bg-gray-300 text-black rounded-[10px] w-[100%] flex px-5 py-2"
                        >
                          <div className={`${item.color}  `}>
                            <SvgIcon iconKey={item.img} />
                          </div>
                          <span className="ml-2">{item.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {file.data != null && (
              <div className="w-[100%] h-[calc(100vh-90px)]">
                <div className="w-[100%] h-[80vh] ">
                  <div
                    onClick={clearFileData}
                    className="w-[100%] flex justify-end hover:cursor-pointer pr-5 pt-5 text-teal-400"
                  >
                    <SvgIcon iconSize="35" iconKey="CLOSE_SVG" />
                  </div>
                  <div className="w-[100%] min-h-[100%] flex justify-center items-center">
                    <div className="w-[200px] ">
                      <div className="w-[100%] flex justify-center text-[25px]">
                        <SvgIcon iconKey="FILES_SVG" />
                      </div>
                      <div className="w-[100%] mt-5 flex justify-center text-[20px]">
                        {file.label}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t-[2px] h-[10vh] border-teal-400 flex justify-center">
                  <div className="w-[30%] min-h-[100%] flex justify-center items-center">
                    <button
                      onClick={sendMessageFunc}
                      className="bg-teal-400 w-[250px] h-[50px] rounded-[50px]"
                    >
                      <span>Send</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            <input
              className="hidden"
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
            ></input>
          </div>
        )}
        {isInfoPage && <GroupInfoPage setInfoPage={setInfoPage} />}
      </div>
    </>
  );
};
