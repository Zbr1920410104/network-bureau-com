import React, { useState, useEffect } from "react";

// 请求
import proxyFetch from "@/util/request";
import { GET_WRITE_BOOK_LIST, DELETE_BOOK } from "@/constants/api-constants";

// redux
import { useSelector, useDispatch } from "react-redux";
import userAction from "@/redux/action/user";

// 工具
import verifyStatusToColor from "@/components/home/staff/util/verify-status-to-color";
import scoreToColor from "@/components/home/staff/util/score-to-color";
import moment from "moment";

import ModifyBookContent from "@/components/home/staff/book/Modify-book-content-controller.jsx";
import CreateBookContent from "@/components/home/staff/book/Create-book-content-controller.jsx";
import UploadBookContent from "@/components/home/staff/book/Upload-book-content-controller.jsx";

// 样式
import "@/style/home/staff/write-detail.styl";
import { Button, Modal, Icon, Descriptions, Skeleton, Tag, Alert } from "antd";
const { confirm } = Modal;

export default (props) => {
  const { changeBook } = useSelector((state) => state.userStore),
    [writeBookList, setWriteBookList] = useState([]),
    [writeBookLoading, setWriteBookLoading] = useState(false),
    dispatch = useDispatch(),
    [score, setScore] = useState(0),
    [newBookVisible, setNewBookVisible] = useState(false),
    [modifyBookVisible, setModifyBookVisible] = useState(false),
    [isNeedRefresh, setIsNeedRefresh] = useState(true),
    [uploadBookVisible, setUploadBookVisible] = useState(false);

  const showNewBookModal = () => {
    setNewBookVisible(true);
  };

  const hideNewBookModal = () => {
    dispatch(userAction.setBookRefresh(true));
    setNewBookVisible(false);
  };

  const showModifyBookModal = (uuid) => {
    dispatch(userAction.setStaffBookUuid(uuid));
    setModifyBookVisible(true);
  };

  const hideModifyBookModal = () => {
    dispatch(userAction.setStaffBookUuid(""));
    setModifyBookVisible(false);
  };

  const showUploadBookModal = (uuid) => {
    dispatch(userAction.setStaffBookUuid(uuid));
    setUploadBookVisible(true);
  };

  const hideUploadBookModal = () => {
    dispatch(userAction.setStaffBookUuid(""));
    setUploadBookVisible(false);
  };

  const handleDelete = async (uuid) => {
    const res = await proxyFetch(DELETE_BOOK, { uuid }, "DELETE");
    if (res) {
      dispatch(userAction.setChangeBook(true));
    }
  };

  useEffect(() => {
    (async () => {
      if (isNeedRefresh) {
        setWriteBookLoading(true);

        const writeBookList = await proxyFetch(GET_WRITE_BOOK_LIST, {}, "GET");

        if (writeBookList) {
          setWriteBookList(writeBookList);
          setNewBookVisible(false);
          setModifyBookVisible(false);
          setUploadBookVisible(false);
          dispatch(userAction.setChangeBook(false));

          let tempScore = 0;
          const sum = writeBookList.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.score;
          }, tempScore);
          setScore(sum.toFixed(2));
        }

        setIsNeedRefresh(false);
        setWriteBookLoading(false);
      }
    })();
  }, [isNeedRefresh, dispatch]);

  useEffect(() => {
    if (changeBook) {
      setIsNeedRefresh(true);
      dispatch(userAction.setChangeBook(false));
    }
  }, [changeBook, dispatch]);

  return (
    <div className="write-item-box">
      <div className="item-title-box">
        <div className="title-left-box">
          <Icon type="book" className="icon" />
          <span>专著</span>
          <Tag className="content-tag" color={scoreToColor(score)}>
            {`总评分:${score}`}
          </Tag>
        </div>
        <Button
          type="link"
          icon="plus"
          style={{ marginBottom: 16 }}
          onClick={showNewBookModal}
        >
          新增专著
        </Button>
      </div>
      <Modal
        title="新增专著"
        visible={newBookVisible}
        onCancel={() => {
          confirm({
            title: "确认离开?",
            okType: "primary",
            content: "离开填写内容将不会保存!",
            okText: "确认",
            cancelText: "取消",
            onOk() {
              hideNewBookModal();
            },
            onCancel() {},
          });
        }}
        footer={null}
        okText="确定"
        cancelText="取消"
      >
        <CreateBookContent />
      </Modal>
      <Modal
        title="修改专著"
        visible={modifyBookVisible}
        footer={null}
        onCancel={() => {
          confirm({
            title: "确认离开?",
            okType: "primary",
            content: "离开修改内容将不会保存!",
            okText: "确认",
            cancelText: "取消",
            onOk() {
              hideModifyBookModal();
            },
            onCancel() {},
          });
        }}
        okText="确定"
        cancelText="取消"
      >
        <ModifyBookContent />
      </Modal>
      <Modal
        title="上传附件"
        visible={uploadBookVisible}
        footer={null}
        onCancel={() => {
          confirm({
            title: "确认离开?",
            okType: "primary",
            content: "确认文件已保存后离开,否则文件无法保存",
            okText: "确认",
            cancelText: "取消",
            onOk() {
              hideUploadBookModal();
            },
            onCancel() {},
          });
        }}
        okText="保存"
        cancelText="取消"
      >
        <UploadBookContent />
      </Modal>
      <div className="write-description-box">
        <Skeleton loading={writeBookLoading}>
          {writeBookList?.length ? (
            writeBookList.map((item, index) => (
              <Descriptions
                key={item.uuid}
                title={
                  <div>
                    <div className="write-description-title">
                      <div className="description-title-text">
                        <span>{`专著${index + 1}:  ${item.name}`}</span>
                        <Tag
                          className="content-tag"
                          color={verifyStatusToColor(item.isVerify)}
                        >
                          {item.isVerify}
                        </Tag>
                        <Tag
                          className="content-tag"
                          color={scoreToColor(item.score)}
                        >
                          {item.score ? `评分:${item.score}` : "未评分"}
                        </Tag>
                        {/* <span>{`最近填写/修改于: ${
                        item.currentWriteTime
                          ? moment(item.currentWriteTime).format(
                              'YYYY-MM-DD h:mm:ss a'
                            )
                          : ''
                      }`}</span> */}
                      </div>
                      <div className="description-title-button">
                        <Button
                          type="link"
                          onClick={() => {
                            showModifyBookModal(item.uuid);
                          }}
                          className="link-button"
                          disabled={item.isVerify === "核实通过"}
                          icon="edit"
                        >
                          <span>修改</span>
                        </Button>
                        <Button
                          type="link"
                          className="link-button"
                          icon="delete"
                          disabled={item.isVerify === "核实通过"}
                          onClick={() => {
                            confirm({
                              title: "删除专著?",
                              okType: "primary",
                              content: "确认要删除专著?",
                              okText: "确认",
                              cancelText: "取消",
                              onOk() {
                                handleDelete(item.uuid);
                              },
                              onCancel() {},
                            });
                          }}
                        >
                          <span>删除</span>
                        </Button>
                      </div>
                    </div>
                    {item.verifyRemarks || item.reviewRemarks ? (
                      <Alert
                        type="warning"
                        description={
                          <div>
                            {item.verifyRemarks ? (
                              <div>{`核实建议: ${item.verifyRemarks}`}</div>
                            ) : null}
                            {item.reviewRemarks ? (
                              <div>{`评审建议: ${item.reviewRemarks}`}</div>
                            ) : null}
                          </div>
                        }
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
                <Descriptions.Item label="上传/查看附件">
                  <Button
                    type="link"
                    onClick={() => {
                      showUploadBookModal(item.uuid);
                    }}
                    className="link-button"
                  >
                    <Icon type="upload" />
                    <span>上传/查看</span>
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
