import React, { useState, useEffect } from "react";

// 请求
import proxyFetch from "@/util/request";
import { GET_REVIEW_MANAGER_BASIC } from "@/constants/api-constants";

import moment from "moment";

// redux
import { useSelector } from "react-redux";

// 样式
import "@/style/home/review-manager/review-item-detail.styl";
import { Descriptions, Icon, Skeleton } from "antd";

export default (props) => {
  const { staffUuid } = useSelector((state) => state.userStore),
    [basicLoading, setBasicLoading] = useState(false),
    [staffBasic, setStaffBasic] = useState([]);

  // 将已有的数据回显
  useEffect(() => {
    (async () => {
      setBasicLoading(true);
      const staffBasic = await proxyFetch(
        GET_REVIEW_MANAGER_BASIC,
        { staffUuid },
        "GET"
      );

      if (staffBasic) {
        let nativePlaceStr = staffBasic.nativePlace;
        staffBasic.nativePlace = nativePlaceStr.replace(/;/g, "-");
        setStaffBasic(staffBasic);
      }

      setBasicLoading(false);
    })();
  }, [staffUuid]);

  const strToDescription = (str) => {
    let arr = str.split(";");
    console.log("arr=", arr);
    return (
      <div className="description-str-box">
        {arr.map((item) => (
          <div>{item.replace(/,/g, " ")}</div>
        ))}
      </div>
    );
    // for (let newStrItem in newStr) {
    //   let newStrList = newStr[newStrItem].split(',');
    //   for (let newStrItemItem in newStrList) {
    //     resStr += newStrList[newStrItemItem] + ' ';
    //   }
    //   resStr += '\t';
    // }
  };

  return (
    <div className="review-item-detail-box">
      <div className="detail-title-box">
        <Icon type="file-text" className="icon" />
        <span>基本信息</span>
      </div>
      <Skeleton loading={basicLoading}>
        <Descriptions className="description-box">
          <Descriptions.Item label="姓名">{staffBasic.name}</Descriptions.Item>
          <Descriptions.Item label="身份证号">
            {staffBasic.idNumber}
          </Descriptions.Item>
          <Descriptions.Item label="性别">{staffBasic.sex}</Descriptions.Item>
          <Descriptions.Item label="民族">
            {staffBasic.nation}
          </Descriptions.Item>
          <Descriptions.Item label="籍贯">
            {staffBasic.nativePlace}
          </Descriptions.Item>
          <Descriptions.Item label="政治面貌">
            {staffBasic.politicalAffiliation}
          </Descriptions.Item>
          <Descriptions.Item label="科室">
            {staffBasic.department}
          </Descriptions.Item>
          <Descriptions.Item label="办公电话">
            {staffBasic.officePhone}
          </Descriptions.Item>
          <Descriptions.Item label="手机">{staffBasic.phone}</Descriptions.Item>
          <Descriptions.Item label="学历">
            {staffBasic.education}
          </Descriptions.Item>
          <Descriptions.Item label="学位">
            {staffBasic.degree}
          </Descriptions.Item>
          <Descriptions.Item label="毕业学校">
            {staffBasic.graduateSchool}
          </Descriptions.Item>
          <Descriptions.Item label="所学专业">
            {staffBasic.major}
          </Descriptions.Item>
          <Descriptions.Item label="职务">{staffBasic.duty}</Descriptions.Item>
          <Descriptions.Item label="参加工作时间">
            {staffBasic.workTime
              ? moment(staffBasic.workTime).format("YYYY-MM-DD")
              : ""}
          </Descriptions.Item>
          <Descriptions.Item label="职称">
            {staffBasic.professionTitle}
          </Descriptions.Item>
          <Descriptions.Item label="获得时间">
            {staffBasic.getTime
              ? moment(staffBasic.getTime).format("YYYY-MM-DD")
              : ""}
          </Descriptions.Item>
          <Descriptions.Item label="研究方向">
            {staffBasic.researchDirection}
          </Descriptions.Item>
          <Descriptions.Item label="学习经历" span={3}>
            {staffBasic.studyExperience
              ? strToDescription(staffBasic.studyExperience)
              : null}
          </Descriptions.Item>
          <Descriptions.Item label="工作经历" span={3}>
            {staffBasic.workExperience
              ? strToDescription(staffBasic.workExperience)
              : null}
          </Descriptions.Item>
        </Descriptions>
      </Skeleton>
    </div>
  );
};
