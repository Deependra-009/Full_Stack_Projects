import { useDispatch, useSelector } from "react-redux";
import {
  ContentType,
  ConversationResponse,
  FileData,
  MessageResponse,
} from "../../core/Models/chats.model";
import { getSelectedFriend, getUserID } from "../../core/store/app.selector";
import { useEffect, useRef, useState } from "react";
import { formatTime } from "../../core/services/common.service";
import { SvgIcon } from "../../core/reusuable/svg";
import WebSocketService from "../../core/web-socket/WebSocketService";
import * as fromAppStore from "./../../core/store/app.store.service";
import { UpdateMessageType } from "../../core/enum/update-message-type";
import constant from "@/app/core/constant/ConstantData";
import { FileModel } from "@/app/core/Models/file.model";
import { ConversationType } from "@/app/core/enum/conversation-type.enum";

export const ChatPage = () => {
  /* useState  */
  const [chatData, setChatData] = useState<ConversationResponse>(
    {} as ConversationResponse
  );
  const [allChats, setAllChats] = useState<MessageResponse[]>([]);
  const [message, setMessage] = useState("");
  const [attachOptions, setAttachOptions] = useState(false);
  const [file, setFile] = useState<FileModel>({
    label: "",
    data: null,
    type: "",
  });

  /* useSelector  */
  const selectedFriend = useSelector(getSelectedFriend);
  const userID = useSelector(getUserID);

  /* useRef  */
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /* useEffect  */
  useEffect(() => {
    setChatData(selectedFriend ?? ({} as ConversationResponse));
    setAllChats(
      selectedFriend?.messageResponseList ?? ([] as MessageResponse[])
    );
    setAttachOptions(false);
  }, [selectedFriend]);

  // useEffect(() => {
  //   console.log(file);
  //   scrollToBottom();
  // }, [file]);

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

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log("File selected:", selectedFile);
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
    if (userID && selectedFriend?.userProfile?.userID) {
      console.log("selectedFriend", selectedFriend);

      if (file.data == null) {
        WebSocketService.sendMessage({
          senderID: userID,
          receiverID: selectedFriend.userProfile.userID,
          chatID: selectedFriend.chatID,
          contentType: ContentType.TEXT,
          messageContent: message,
          userOnline: selectedFriend.userProfile.online,
          conversationType:ConversationType.ONE_TO_ONE_CONVERSATION
        });
        setMessage("");
      }
    }
  };
  return (
    <>
      <div className="w-[calc(100%-350px-5rem)] h-[100vh]   ">
        {/* navbar profile user section */}
        <div className="w-[100%] bg-white  flex h-[90px] border-b-[2px] border-b-teal-400">
          <div className="w-[90%] flex items-center ">
            <div className="w-[100%]  px-8 flex ">
              <div className="w-[50px] h-[50px] relative  flex justify-center">
                <img
                  alt="user-icon"
                  className="w-[100%]"
                  src="Images/user-icon.png"
                />
                {selectedFriend?.userProfile?.online && (
                  <SvgIcon iconKey="ONLINE_SVG" />
                )}
              </div>
              <div
                className={`min-h-[100%]  px-2 text-[18px] ${
                  selectedFriend?.userProfile?.online ? "" : "flex"
                } items-center`}
              >
                <div className="capitalize">
                  {(chatData?.userProfile?.userName)}
                </div>
                {selectedFriend?.userProfile?.online && (
                  <div className="text-green-600 text-[15px]">online</div>
                )}
              </div>
            </div>
          </div>
          <div className="w-[10%] flex justify-around items-center">
            {/* phone svg */}
            <div className="cursor-pointer">
              <SvgIcon iconKey="PHONE_SVG" />
            </div>
            {/* video svg */}
            <div className="cursor-pointer">
              <SvgIcon iconKey="VIDEO_SVG" />
            </div>
            {/* more options */}
            <div className="cursor-pointer">
              <SvgIcon iconKey="MORE_OPTIONS_SVG" />
            </div>
          </div>
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
                          <div className="relative break-words mt-2 bg-gray-200 p-4 rounded-l-[20px] rounded-tr-[20px] w-1/2">
                            <p className="mb-4">{item.messageContent}</p>
                            <div className="absolute flex bottom-2 right-2  text-black text-sm px-3 py-1 rounded">
                              <span>{formatTime(item.messageSentAt)}</span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {item.senderID === userID && (
                      <>
                        <div className="w-[100%]  flex justify-end">
                          <div className="relative break-words  mt-2 bg-green-200 p-4 rounded-r-[20px] rounded-tl-[20px] w-[50%]">
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
      ;
    </>
  );
};
