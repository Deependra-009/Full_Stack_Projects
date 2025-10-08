import { GroupEntity } from "@/app/core/Models/group.model";
import { SvgIcon } from "@/app/core/reusuable/svg";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as fromAppSelector from "@/app/core/store/app.selector";

export const GroupInfoPage = ({ setInfoPage }:{setInfoPage:any}) => {
  const [isGroupEdit, setIsGroupEdit] = useState(false);
  const [groupData, setGroupData] = useState<GroupEntity>({} as GroupEntity);

  const selectedGroup = useSelector(fromAppSelector.getSelectedGroup);
  const userID = useSelector(fromAppSelector.getUserID);

  /* useEffect  */
  useEffect(() => {
    setGroupData(selectedGroup ?? ({} as GroupEntity));
  }, [selectedGroup]);

  const handleClick = () => {
    // Call the parent's callback function with data
    setInfoPage(false);
  };

  return (
    <>
      <div className="w-[100%] h-[100vh]   ">
        <div className="w-[100%] h-[80px] bg-teal-400 text-white flex border-b-[2px] border-teal-400">
          <div className="w-[100%] pl-[30px] h-[100%] flex  items-center ">
            <div className="cursor-pointer" onClick={handleClick}>
              <SvgIcon iconKey="CLOSE_SVG" iconSize="25" />
            </div>
            <div className="pl-[30px] text-[18px]">Group Info</div>
          </div>
        </div>

        <div className="w-[100%] mt-[3px] text-[20px] text-black  h-[80px] border-b-[2px]  flex border-teal-400">
          <div className="w-[100%] pl-[30px] h-[100%] flex justify-center items-center ">
            <div className=" text-[18px] ">{groupData.groupName}</div>
            <div className=" ">
              <SvgIcon iconKey="DOT_SVG" />
            </div>
            <div className="text-[18px] ">
              {groupData.membersList != undefined &&
                groupData.membersList.length != undefined &&
                groupData.membersList.length}{" "}
              Members
            </div>
          </div>
        </div>

        <div className="w-[100%] mt-[3px] text-[17px] text-black  border-b-[2px]  border-teal-400">
          <div className="w-[100%] px-[30px]  pt-[20px]  h-[100%]">
            <div className="text-[18px] text-teal-400">Group Description</div>
            <div className="mt-[10px] pb-[20px] flex justify-between items-center">
              <textarea
                value={groupData.groupDescription}
                onChange={(e) => {
                  setGroupData({
                    ...groupData,
                    groupDescription: e.target.value,
                  });
                }}
                className={`w-[85%] focus:outline-none resize-none py-[10px] rounded-[5px] ${
                  isGroupEdit ? "border-[2px] border-teal-400 px-[10px]" : ""
                }`}
              />
              {!isGroupEdit && (
                <div className="pl-[20px]" onClick={() => setIsGroupEdit(true)}>
                  <SvgIcon iconKey="EDIT_SVG" />
                </div>
              )}
              {isGroupEdit && (
                <button
                  className="w-[100px] border-[2px] border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-white h-[40px] rounded-[20px]"
                  onClick={() => setIsGroupEdit(false)}
                >
                  SAVE
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="w-[100%] mt-[3px] text-[17px] text-black  border-b-[2px]  border-teal-400">
          <div className="w-[100%] mt-[10px] px-[30px] py-[20px]">
            {groupData.membersList != undefined &&
              groupData.membersList.length != undefined &&
              groupData.membersList.length}{" "}
            Members
          </div>
        </div>
        <div className="w-[100%] p-[30px]">
          {groupData.membersList != undefined &&
            groupData.membersList.map((item, index) => (
              <div
                key={index}
                className="w-[350px]  rounded-[10px] h-[60px] flex justify-between items-center mb-[7px]"
              >
                <div className="flex items-center">
                  <div>
                    <img
                      className="w-[50px] h-[50px]"
                      src="Images/user-icon.png"
                    />
                  </div>
                  <div className="pl-[15px] capitalize">{item.userName}</div>
                </div>
                {groupData.adminUserID == item.userID && (
                  <div className="pl-[15px] flex items-center">
                    <label className="bg-teal-400 text-white px-[15px] py-[5px] text-[15px] rounded-[50px]">
                      Group admin
                    </label>
                  </div>
                )}
                <div className="pl-[10px] flex items-center">
                  <div className="cursor-pointer">
                    <SvgIcon iconKey="MORE_OPTION_DOWN"/>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
