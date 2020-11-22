import React, { useState, useEffect } from "react";

// 请求
import proxyFetch from "@/util/request";
import { GET_REVIEW_BOOK_LIST, GET_FILE_URL } from "@/constants/api-constants";

// redux
import { useSelector, useDispatch } from "react-redux";
import userAction from "@/redux/action/user";

// 工具
import scoreToColor from "@/components/home/review-manager/detail/util/score-to-color";
import moment from "moment";

import ReviewBookContent from "@/components/home/review-manager/book/Review-book-content-controller.jsx";

// 样式
import "@/style/home/review-manager/review-item-detail.styl";
import { Icon, Button, Modal, Descriptions, Skeleton, Tag } from "antd";
const { confirm } = Modal;

export default (props) => {
  const { staffUuid, reviewBook } = useSelector((state) => state.userStore),
    [reviewBookVisible, setReviewBookVisible] = useState(false),
    [uploadBookVisible, setUploadBookVisible] = useState(false),
    [reviewBookList, setReviewBookList] = useState([]),
    [firstFileName, setFirstFileName] = useState(""),
    [secondFileName, setSecondFileName] = useState(""),
    [thirdFileName, setThirdFileName] = useState(""),
    [firstReviewBookUrl, setFirstReviewBookUrl] = useState(""),
    [secondReviewBookUrl, setSecondReviewBookUrl] = useState(""),
    [thirdReviewBookUrl, setThirdReviewBookUrl] = useState(""),
    [firstPreviewUrl, setFirstPreviewUrl] = useState(""),
    [secondPreviewUrl, setSecondPreviewUrl] = useState(""),
    [thirdPreviewUrl, setThirdPreviewUrl] = useState(""),
    [getFileLoading, setGetFileLoading] = useState(true),
    [reviewBookLoading, setReviewBookLoading] = useState(false),
    [score, setScore] = useState(0),
    [isNeedRefresh, setIsNeedRefresh] = useState(true),
    dispatch = useDispatch();

  const showReviewBookModal = (uuid) => {
    dispatch(userAction.setStaffBookUuid(uuid));
    setReviewBookVisible(true);
  };

  const hideReviewBookModal = () => {
    dispatch(userAction.setStaffBookUuid(""));
    setReviewBookVisible(false);
  };

  const showUploadBookModal = (firstUrl, secondUrl, thirdUrl) => {
    setFirstReviewBookUrl(firstUrl);
    setSecondReviewBookUrl(secondUrl);
    setThirdReviewBookUrl(thirdUrl);
    setUploadBookVisible(true);
  };

  const hideUploadBookModal = () => {
    setUploadBookVisible(false);
  };

  useEffect(() => {
    (async () => {
      if (isNeedRefresh) {
        setReviewBookLoading(true);

        const reviewBookList = await proxyFetch(
          GET_REVIEW_BOOK_LIST,
          { staffUuid },
          "GET"
        );

        if (reviewBookList) {
          setReviewBookList(reviewBookList);
          setUploadBookVisible(false);
          setReviewBookVisible(false);
          dispatch(userAction.setReviewBook(false));
        }

        let tempScore = 0;
        const sum = reviewBookList.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.score;
        }, tempScore);
        setScore(sum.toFixed(2));

        setIsNeedRefresh(false);
        setReviewBookLoading(false);
      }
    })();
  }, [isNeedRefresh, staffUuid, dispatch]);

  useEffect(() => {
    if (reviewBook) {
      setIsNeedRefresh(true);
      dispatch(userAction.setReviewBook(false));
    }
  }, [reviewBook, dispatch]);

  useEffect(() => {
    if (firstReviewBookUrl) {
      (async () => {
        setGetFileLoading(true);

        // 附件1的url处理
        const firstPreviewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: firstReviewBookUrl },
          "GET"
        );

        setFirstPreviewUrl(firstPreviewUrl);
        const firstUrlArr = firstPreviewUrl.split("?");
        const firstUrlArrList = firstUrlArr[0],
          firstAppU = firstUrlArrList.split("/");
        const firstFileName = firstAppU[firstAppU.length - 1];
        setFirstFileName(firstFileName.split(".")[1].toLowerCase());

        // 附件2的url处理
        let secondPreviewUrl = "";
        if (secondReviewBookUrl) {
          secondPreviewUrl = await proxyFetch(
            GET_FILE_URL,
            { fileUrl: secondReviewBookUrl },
            "GET"
          );

          const secondUrlArr = secondPreviewUrl.split("?");
          const secondUrlArrList = secondUrlArr[0],
            secondAppU = secondUrlArrList.split("/");
          const secondFileName = secondAppU[secondAppU.length - 1];
          setSecondFileName(secondFileName.split(".")[1].toLowerCase());
        }
        setSecondPreviewUrl(secondPreviewUrl);

        // 附件3的url处理
        let thirdPreviewUrl = "";
        if (thirdReviewBookUrl) {
          thirdPreviewUrl = await proxyFetch(
            GET_FILE_URL,
            { fileUrl: thirdReviewBookUrl },
            "GET"
          );

          const thirdUrlArr = thirdPreviewUrl.split("?");
          const thirdUrlArrList = thirdUrlArr[0],
            thirdAppU = thirdUrlArrList.split("/");
          const thirdFileName = thirdAppU[thirdAppU.length - 1];
          setThirdFileName(thirdFileName.split(".")[1].toLowerCase());
        }
        setThirdPreviewUrl(thirdPreviewUrl);

        setGetFileLoading(false);
      })();
    }
  }, [firstReviewBookUrl, secondReviewBookUrl, thirdReviewBookUrl]);

  return (
    <div className="review-item-detail-box">
      <div className="detail-title-box">
        <Icon type="book" className="icon" />
        <span>专著</span>
        <Tag className="content-tag" color={scoreToColor(score)}>
          {score || score === 0 ? `总评分:${score}` : "未评分"}
        </Tag>
      </div>
      <Modal
        title="评分"
        visible={reviewBookVisible}
        onCancel={() => {
          confirm({
            title: "确认离开?",
            okType: "primary",
            content: "离开填写内容将不会保存!",
            okText: "确认",
            cancelText: "取消",
            onOk() {
              hideReviewBookModal();
            },
            onCancel() {},
          });
        }}
        footer={null}
      >
        <ReviewBookContent />
      </Modal>
      <Modal
        title="查看附件"
        visible={uploadBookVisible}
        onCancel={hideUploadBookModal}
        footer={null}
      >
        <div className="download-button-box">
          <div className="inner-button-box">
            {firstFileName === "jpg" ||
            firstFileName === "jpeg" ||
            firstFileName === "png" ? (
              <img
                src={firstPreviewUrl}
                alt="avatar"
                style={{ width: "100%" }}
                className="img"
              />
            ) : null}
            {firstReviewBookUrl ? (
              <Button
                type="primary"
                size="large"
                className="download-button"
                icon="download"
                loading={getFileLoading}
                onClick={(e) => {
                  e.stopPropagation();
                  if (
                    firstFileName === "doc" ||
                    firstFileName === "docx" ||
                    firstFileName === "xls" ||
                    firstFileName === "xlsx"
                  ) {
                    window.open(
                      `http://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
                        firstPreviewUrl
                      )}`
                    );
                  } else {
                    window.open(firstPreviewUrl, "_blank");
                  }
                }}
              >
                查看附件1
              </Button>
            ) : (
              <Button disabled>附件1未上传</Button>
            )}
          </div>
          <div className="inner-button-box">
            {secondFileName === "jpg" ||
            secondFileName === "jpeg" ||
            secondFileName === "png" ? (
              <img
                src={secondPreviewUrl}
                alt="avatar"
                style={{ width: "100%" }}
                className="img"
              />
            ) : null}
            {secondReviewBookUrl ? (
              <Button
                type="primary"
                size="large"
                className="download-button"
                icon="download"
                loading={getFileLoading}
                onClick={(e) => {
                  e.stopPropagation();
                  if (
                    secondFileName === "doc" ||
                    secondFileName === "docx" ||
                    secondFileName === "xls" ||
                    secondFileName === "xlsx"
                  ) {
                    window.open(
                      `http://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
                        secondPreviewUrl
                      )}`
                    );
                  } else {
                    window.open(secondPreviewUrl, "_blank");
                  }
                }}
              >
                查看附件2
              </Button>
            ) : (
              <Button disabled>附件2未上传</Button>
            )}
          </div>
          <div className="inner-button-box">
            {thirdFileName === "jpg" ||
            thirdFileName === "jpeg" ||
            thirdFileName === "png" ? (
              <img
                src={thirdPreviewUrl}
                alt="avatar"
                style={{ width: "100%" }}
                className="img"
              />
            ) : null}
            {thirdReviewBookUrl ? (
              <Button
                type="primary"
                size="large"
                className="download-button"
                icon="download"
                loading={getFileLoading}
                onClick={(e) => {
                  e.stopPropagation();
                  if (
                    thirdFileName === "doc" ||
                    thirdFileName === "docx" ||
                    thirdFileName === "xls" ||
                    thirdFileName === "xlsx"
                  ) {
                    window.open(
                      `http://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
                        thirdPreviewUrl
                      )}`
                    );
                  } else {
                    window.open(thirdPreviewUrl, "_blank");
                  }
                }}
              >
                查看附件3
              </Button>
            ) : (
              <Button disabled>附件3未上传</Button>
            )}
          </div>
        </div>
      </Modal>
      <div className="review-description-box">
        <Skeleton loading={reviewBookLoading}>
          {reviewBookList?.length ? (
            reviewBookList.map((item, index) => (
              <Descriptions
                key={item.uuid}
                title={
                  <div className="review-description-title">
                    <div className="description-title-text">
                      <span>{`专著${index + 1}:  ${item.name}`}</span>
                      <Tag
                        className="content-tag"
                        color={
                          item.isVerify !== "核实通过"
                            ? "purple"
                            : scoreToColor(item.score)
                        }
                      >
                        {item.score || item.score === 0
                          ? `评分:${item.score}`
                          : item.isVerify !== "核实通过"
                          ? "未核实"
                          : "未评分"}
                      </Tag>
                      {/* <span>
                        {item.reviewTime
                          ? moment(item.reviewTime).format(
                              'YYYY-MM-DD h:mm:ss a'
                            )
                          : ''}
                      </span> */}
                    </div>
                    <div className="description-title-button">
                      <Button
                        icon="radar-chart"
                        type="link"
                        disabled={item.isVerify !== "核实通过"}
                        onClick={() => {
                          showReviewBookModal(item.uuid);
                        }}
                      >
                        评分
                      </Button>
                    </div>
                  </div>
                }
              >
                <Descriptions.Item label="著作ISBN号">
                  {item.copyrightOwner}
                </Descriptions.Item>
                <Descriptions.Item label="著作发表时间">
                  {item.time ? moment(item.time).format("YYYY-MM-DD") : ""}
                </Descriptions.Item>
                <Descriptions.Item label="著作出版社">
                  {item.publisher}
                </Descriptions.Item>
                <Descriptions.Item label="编辑排名">
                  {item.rank}
                </Descriptions.Item>
                <Descriptions.Item label="著作主编">
                  {item.chiefEditor}
                </Descriptions.Item>
                <Descriptions.Item label="查看附件">
                  <Button
                    type="link"
                    onClick={() => {
                      showUploadBookModal(
                        item.firstUrl,
                        item.secondUrl,
                        item.thirdUrl
                      );
                    }}
                    className="link-button"
                  >
                    <Icon type="download" />
                    <span>查看</span>
                  </Button>
                </Descriptions.Item>
              </Descriptions>
            ))
          ) : (
            <span>未填写专著</span>
          )}
        </Skeleton>
      </div>
    </div>
  );
};
