import React, { useState, useEffect } from "react";

// 请求
import proxyFetch from "@/util/request";
import {
  GET_VERIFY_BOOK_LIST,
  GET_FILE_URL,
  SET_VERIFY_BOOK_FAIL_STATUS,
  SET_VERIFY_BOOK_SUCCESS_STATUS,
} from "@/constants/api-constants";

// redux
import { useSelector, useDispatch } from "react-redux";
import userAction from "@/redux/action/user";

// 工具
import verifyStatusToColor from "@/components/home/business-manager/detail/util/verify-status-to-color";
import moment from "moment";

// 样式
import "@/style/home/business-manager/verify-item-detail.styl";
import {
  Icon,
  Button,
  Modal,
  Input,
  Descriptions,
  Skeleton,
  Tag,
  message,
  Alert,
} from "antd";
const { TextArea } = Input,
  { confirm } = Modal;

export default (props) => {
  const { staffUuid, staffBookUuid, staffBookVerifyStatus } = useSelector(
      (state) => state.userStore
    ),
    [verifyVisible, setVerifyVisible] = useState(false),
    [uploadBookVisible, setUploadBookVisible] = useState(false),
    [verifyBookList, setVerifyBookList] = useState([]),
    [firstFileName, setFirstFileName] = useState(""),
    [secondFileName, setSecondFileName] = useState(""),
    [thirdFileName, setThirdFileName] = useState(""),
    [firstVerifyBookUrl, setFirstVerifyBookUrl] = useState(""),
    [secondVerifyBookUrl, setSecondVerifyBookUrl] = useState(""),
    [thirdVerifyBookUrl, setThirdVerifyBookUrl] = useState(""),
    [firstPreviewUrl, setFirstPreviewUrl] = useState(""),
    [secondPreviewUrl, setSecondPreviewUrl] = useState(""),
    [thirdPreviewUrl, setThirdPreviewUrl] = useState(""),
    [getFileLoading, setGetFileLoading] = useState(true),
    [verifyBookLoading, setVerifyBookLoading] = useState(false),
    dispatch = useDispatch(),
    [isNeedRefresh, setIsNeedRefresh] = useState(true),
    [statusLoading, setStatusLoading] = useState(false),
    [verifyRemarks, setVerifyRemarks] = useState("");

  const showVerifyModal = (uuid, isVerify, verifyRemarks) => {
    setVerifyRemarks(verifyRemarks);
    dispatch(userAction.setStaffBookUuid(uuid));
    dispatch(userAction.setStaffBookVerifyStatus(isVerify));
    setVerifyVisible(true);
  };

  const hideVerifyModal = () => {
    setVerifyVisible(false);
    setVerifyRemarks("");
  };

  const showUploadBookModal = (firstUrl, secondUrl, thirdUrl) => {
    setFirstVerifyBookUrl(firstUrl);
    setSecondVerifyBookUrl(secondUrl);
    setThirdVerifyBookUrl(thirdUrl);
    setUploadBookVisible(true);
  };

  const hideUploadBookModal = () => {
    setUploadBookVisible(false);
  };

  useEffect(() => {
    (async () => {
      if (isNeedRefresh) {
        setVerifyBookLoading(true);

        const verifyBookList = await proxyFetch(
          GET_VERIFY_BOOK_LIST,
          { staffUuid },
          "GET"
        );

        if (verifyBookList) {
          setVerifyBookList(verifyBookList);
          setUploadBookVisible(false);
          setVerifyVisible(false);
        }

        setIsNeedRefresh(false);
        setVerifyBookLoading(false);
      }
    })();
  }, [isNeedRefresh, staffUuid]);

  useEffect(() => {
    if (firstVerifyBookUrl) {
      (async () => {
        setGetFileLoading(true);
        // 附件1的url处理
        const firstPreviewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: firstVerifyBookUrl },
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
        if (secondVerifyBookUrl) {
          secondPreviewUrl = await proxyFetch(
            GET_FILE_URL,
            { fileUrl: secondVerifyBookUrl },
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
        if (thirdVerifyBookUrl) {
          thirdPreviewUrl = await proxyFetch(
            GET_FILE_URL,
            { fileUrl: thirdVerifyBookUrl },
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
  }, [firstVerifyBookUrl, secondVerifyBookUrl, thirdVerifyBookUrl]);

  const handleSetFailStatus = () => {
    if (verifyRemarks) {
      (async () => {
        setStatusLoading(true);

        const res = await proxyFetch(SET_VERIFY_BOOK_FAIL_STATUS, {
          uuid: staffBookUuid,
          verifyRemarks,
          staffUuid,
        });

        setStatusLoading(false);
        if (res) {
          setVerifyRemarks("");
          setIsNeedRefresh(true);
          setVerifyVisible(false);
        }
      })();
    } else {
      message.error("请输入未通过审核实理由!");
    }
  };

  const handleSetSuccessStatus = () => {
    (async () => {
      setStatusLoading(true);

      const res = await proxyFetch(SET_VERIFY_BOOK_SUCCESS_STATUS, {
        uuid: staffBookUuid,
        staffUuid,
      });

      setStatusLoading(false);
      if (res) {
        setVerifyRemarks("");
        setIsNeedRefresh(true);
        setVerifyVisible(false);
      }
    })();
  };

  return (
    <div className="verify-item-detail-box">
      <div className="detail-title-box">
        <div className="title-left-box">
          <Icon type="book" className="icon" />
          <span>专著</span>
        </div>
        <Modal
          title="请核实"
          visible={verifyVisible}
          onCancel={() => {
            hideVerifyModal();
            dispatch(userAction.setStaffBookVerifyStatus(""));
          }}
          footer={null}
        >
          <div className="button-box">
            <Button
              type="primary"
              disabled={staffBookVerifyStatus !== "未核实"}
              className={
                staffBookVerifyStatus !== "未核实" ? "" : "fail-button"
              }
              loading={statusLoading}
              onClick={handleSetFailStatus}
            >
              核实未通过
            </Button>
            <Button
              type="primary"
              loading={statusLoading}
              disabled={staffBookVerifyStatus !== "未核实"}
              className={
                staffBookVerifyStatus !== "未核实" ? "" : "success-button"
              }
              onClick={() => {
                confirm({
                  title: "确认核实通过?",
                  okType: "primary",
                  content: (
                    <div className="text-box">
                      <span>我已核实完该</span>
                      <span className="important-text">专著</span>
                      <span>的信息,确认通过?</span>
                    </div>
                  ),
                  okText: "确认",
                  cancelText: "取消",
                  onOk() {
                    handleSetSuccessStatus();
                  },
                  onCancel() {},
                });
              }}
            >
              核实通过
            </Button>
          </div>
          <TextArea
            rows={3}
            disabled={staffBookVerifyStatus !== "未核实"}
            onChange={(e) => {
              setVerifyRemarks(e.target.value);
            }}
            value={verifyRemarks}
            maxLength="100"
            placeholder="请输入核实意见及不通过理由"
            className="modal-textArea-box"
          />
        </Modal>
      </div>
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
            {firstVerifyBookUrl ? (
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
            {secondVerifyBookUrl ? (
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
            {thirdVerifyBookUrl ? (
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
      <div className="verify-description-box">
        <Skeleton loading={verifyBookLoading}>
          {verifyBookList?.length ? (
            verifyBookList.map((item, index) => (
              <Descriptions
                key={item.uuid}
                title={
                  <div>
                    <div className="verify-description-title">
                      <div className="description-title-text">
                        <span>{`专著${index + 1}:  ${item.name}`}</span>
                        <Tag
                          className="content-tag"
                          color={verifyStatusToColor(item.isVerify)}
                        >
                          {item.isVerify}
                        </Tag>
                        {/* <span>{`最近填写/修改于: ${
                        item.currentVerifyTime
                          ? moment(item.currentVerifyTime).format(
                              'YYYY-MM-DD h:mm:ss a'
                            )
                          : ''
                      }`}</span> */}
                      </div>
                      <div className="description-title-button">
                        <Button
                          type="link"
                          icon="edit"
                          className="opinion-button"
                          onClick={() =>
                            showVerifyModal(
                              item.uuid,
                              item.isVerify,
                              item.verifyRemarks
                            )
                          }
                        >
                          核实
                        </Button>
                      </div>
                    </div>
                    {item.reviewRemarks ? (
                      <Alert
                        type="warning"
                        description={`评审建议: ${item.reviewRemarks}`}
                      />
                    ) : null}
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
