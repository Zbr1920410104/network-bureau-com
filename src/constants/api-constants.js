import * as DominConfigs from "./domin-constants";

export const UPLOAD_TO_QiNiu = "https://upload-z2.qiniup.com"; // 上传七牛

/**
 * 用户
 **/
export const GET_USER_TOKEN = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/getUserToken`; // 登录
export const GET_USER_NAME = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/getUserName`; // 登录
export const GET_MY_INFO = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/getMyInfo`;
export const SAVE_PASSWORD = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/savePassword`;
export const GET_DEFAULT_PASSWORD = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/getDefaultPassword`;

/**
 * 管理员
 **/
export const QUARY_DEPARTMENT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ADMIN}/quaryDepartment`;
export const SAVE_DEPARTMENT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ADMIN}/saveDepartment`;
export const DELETE_DEPARTMENT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ADMIN}/deleteDepartment`;
export const SAVE_BUSINESS_MANAGER_TIME = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ADMIN}/saveBusinessManagerTime`;
export const SELECT_BUSINESS_MANAGER_TIME = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ADMIN}/selectBusinessManagerTime`;
export const SELECT_REVIEW_MANAGER_TIME = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ADMIN}/selectReviewManagerTime`;
export const SAVE_REVIEW_MANAGER_TIME = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ADMIN}/saveReviewManagerTime`;
export const SELECT_STAFF_TIME = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ADMIN}/selectStaffTime`;
export const SAVE_STAFF_TIME = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ADMIN}/saveStaffTime`;
export const QUARY_ACCOUNT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ADMIN}/quaryAccount`;
export const ADD_ACCOUNT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ADMIN}/addAccount`;
export const GET_DEPARTMENT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ADMIN}/getDepartment`;
export const RESET_PASSWORD = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ADMIN}/resetPassword`;
export const ACCOUNT_CANCEL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ADMIN}/accountCancel`;
export const SELECT_ACCOUNT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ADMIN}/selectAccount`;
export const MODIFY_ACCOUNT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ADMIN}/modifyAccount`;
export const ACCOUNT_EXPORT_ALL_STAFF_INFO_EXCEL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ADMIN}/accountExportAllStaffInfoExcel`;
export const CHANGE_DEFAULT_PASSWORD = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ADMIN}/changeDefaultPassword`;

/**
 * 普通员工
 **/
export const SAVE_STAFF_BASIC = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/saveStaffBasic`;
export const MODIFY_STAFF_BASIC = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/modifyStaffBasic`;
export const GET_STAFF_BASIC = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/getStaffBasic`;
export const GET_STAFF_DEPARTMENT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/getStaffDepartment`;
export const GET_STAFF_WRITE_INFO = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/getStaffWriteInfo`;
export const CREATE_STAFF_PROJECT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/createStaffProject`;
export const GET_WRITE_PROJECT_LIST = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/getWriteProjectList`;
export const GET_STAFF_PROJECT_BY_UUID = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/getStaffProjectByUuid`;
export const MODIFY_STAFF_PROJECT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/modifyStaffProject`;
export const DELETE_PROJECT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/deleteProject`;
export const CREATE_STAFF_PATENT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/createStaffPatent`;
export const GET_WRITE_PATENT_LIST = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/getWritePatentList`;
export const GET_STAFF_PATENT_BY_UUID = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/getStaffPatentByUuid`;
export const MODIFY_STAFF_PATENT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/modifyStaffPatent`;
export const DELETE_PATENT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/deletePatent`;
export const CREATE_STAFF_COPYRIGHT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/createStaffCopyright`;
export const GET_WRITE_COPYRIGHT_LIST = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/getWriteCopyrightList`;
export const GET_STAFF_COPYRIGHT_BY_UUID = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/getStaffCopyrightByUuid`;
export const MODIFY_STAFF_COPYRIGHT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/modifyStaffCopyright`;
export const DELETE_COPYRIGHT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/deleteCopyright`;
export const CREATE_STAFF_AWARD = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/createStaffAward`;
export const GET_WRITE_AWARD_LIST = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/getWriteAwardList`;
export const GET_STAFF_AWARD_BY_UUID = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/getStaffAwardByUuid`;
export const MODIFY_STAFF_AWARD = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/modifyStaffAward`;
export const DELETE_AWARD = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/deleteAward`;
export const CREATE_STAFF_THESIS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/createStaffThesis`;
export const GET_WRITE_THESIS_LIST = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/getWriteThesisList`;
export const GET_STAFF_THESIS_BY_UUID = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/getStaffThesisByUuid`;
export const MODIFY_STAFF_THESIS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/modifyStaffThesis`;
export const DELETE_THESIS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/deleteThesis`;

export const CREATE_STAFF_BOOK = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/createStaffBook`;
export const GET_WRITE_BOOK_LIST = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/getWriteBookList`;
export const GET_STAFF_BOOK_BY_UUID = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/getStaffBookByUuid`;
export const MODIFY_STAFF_BOOK = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/modifyStaffBook`;
export const DELETE_BOOK = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/deleteBook`;

export const SELECT_UPLOAD_PROJECT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/selectUploadProject`;
export const SAVE_UPLOAD_PROJECT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/saveUploadProject`;
export const SELECT_UPLOAD_PATENT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/selectUploadPatent`;
export const SAVE_UPLOAD_PATENT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/saveUploadPatent`;
export const SELECT_UPLOAD_COPYRIGHT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/selectUploadCopyright`;
export const SAVE_UPLOAD_COPYRIGHT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/saveUploadCopyright`;
export const SELECT_UPLOAD_AWARD = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/selectUploadAward`;
export const SAVE_UPLOAD_AWARD = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/saveUploadAward`;
export const SELECT_UPLOAD_THESIS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/selectUploadThesis`;
export const SAVE_UPLOAD_THESIS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/saveUploadThesis`;
export const SELECT_UPLOAD_BOOK = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/selectUploadBook`;
export const SAVE_UPLOAD_BOOK = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/saveUploadBook`;
export const FINISH_STAFF_WRITE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/finishStaffWrite`;
export const GET_PERSONAL_EXPORT_INFO_URL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_STAFF}/getPersonalExportInfoUrl`;

/**
 * 统计管理员
 **/
export const GET_BUSINESS_MANAGER_BASIC = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_BUSINESS_MANAGER}/getBusinessManagerBasic`;
export const GET_STAFF_VERIFY_INFO = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_BUSINESS_MANAGER}/getStaffVerifyInfo`;
export const GET_VERIFY_COPYRIGHT_LIST = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_BUSINESS_MANAGER}/getVerifyCopyrightList`;
export const GET_VERIFY_PATENT_LIST = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_BUSINESS_MANAGER}/getVerifyPatentList`;
export const GET_VERIFY_PROJECT_LIST = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_BUSINESS_MANAGER}/getVerifyProjectList`;
export const GET_VERIFY_AWARD_LIST = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_BUSINESS_MANAGER}/getVerifyAwardList`;
export const GET_VERIFY_THESIS_LIST = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_BUSINESS_MANAGER}/getVerifyThesisList`;
export const GET_VERIFY_BOOK_LIST = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_BUSINESS_MANAGER}/getVerifyBookList`;

export const SET_VERIFY_BASIC_FAIL_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_BUSINESS_MANAGER}/setVerifyBasicFailStatus`;
export const SET_VERIFY_BASIC_SUCCESS_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_BUSINESS_MANAGER}/setVerifyBasicSuccessStatus`;
export const SET_VERIFY_PROJECT_FAIL_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_BUSINESS_MANAGER}/setVerifyProjectFailStatus`;
export const SET_VERIFY_PROJECT_SUCCESS_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_BUSINESS_MANAGER}/setVerifyProjectSuccessStatus`;
export const SET_VERIFY_PATENT_FAIL_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_BUSINESS_MANAGER}/setVerifyPatentFailStatus`;
export const SET_VERIFY_PATENT_SUCCESS_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_BUSINESS_MANAGER}/setVerifyPatentSuccessStatus`;
export const SET_VERIFY_COPYRIGHT_FAIL_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_BUSINESS_MANAGER}/setVerifyCopyrightFailStatus`;
export const SET_VERIFY_COPYRIGHT_SUCCESS_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_BUSINESS_MANAGER}/setVerifyCopyrightSuccessStatus`;
export const SET_VERIFY_AWARD_FAIL_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_BUSINESS_MANAGER}/setVerifyAwardFailStatus`;
export const SET_VERIFY_AWARD_SUCCESS_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_BUSINESS_MANAGER}/setVerifyAwardSuccessStatus`;
export const SET_VERIFY_THESIS_FAIL_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_BUSINESS_MANAGER}/setVerifyThesisFailStatus`;
export const SET_VERIFY_THESIS_SUCCESS_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_BUSINESS_MANAGER}/setVerifyThesisSuccessStatus`;
export const SET_VERIFY_BOOK_FAIL_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_BUSINESS_MANAGER}/setVerifyBookFailStatus`;
export const SET_VERIFY_BOOK_SUCCESS_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_BUSINESS_MANAGER}/setVerifyBookSuccessStatus`;

export const FINISH_BUSINESS_MANAGER_VERIFY = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_BUSINESS_MANAGER}/finishBusinessManagerVerify`;
export const GET_STAFF_WRITE_STATUS_LIST = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_BUSINESS_MANAGER}/getStaffWriteStatusList`;
export const GET_STAFF_VERIFY_STATUS_LIST = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_BUSINESS_MANAGER}/getStaffVerifyStatusList`;
export const GET_STAFF_EXPORT_INFO_URL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_BUSINESS_MANAGER}/getStaffExportInfoUrl`;
export const GET_STAFF_EXPORT_ALL_INFO_URL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_BUSINESS_MANAGER}/getStaffExportAllInfoUrl`;

/**
 * 评审管理员
 **/
export const GET_REVIEW_MANAGER_BASIC = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_REVIEW_MANAGER}/getReviewManagerBasic`;
export const GET_STAFF_REVIEW_INFO = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_REVIEW_MANAGER}/getStaffReviewInfo`;
export const GET_REVIEW_COPYRIGHT_LIST = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_REVIEW_MANAGER}/getReviewCopyrightList`;
export const GET_REVIEW_PATENT_LIST = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_REVIEW_MANAGER}/getReviewPatentList`;
export const GET_REVIEW_PROJECT_LIST = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_REVIEW_MANAGER}/getReviewProjectList`;
export const GET_REVIEW_AWARD_LIST = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_REVIEW_MANAGER}/getReviewAwardList`;
export const GET_REVIEW_THESIS_LIST = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_REVIEW_MANAGER}/getReviewThesisList`;
export const GET_REVIEW_BOOK_LIST = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_REVIEW_MANAGER}/getReviewBookList`;

export const GET_PROJECT_SCORE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_REVIEW_MANAGER}/getProjectScore`;
export const SET_PROJECT_SCORE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_REVIEW_MANAGER}/setProjectScore`;
export const GET_PATENT_SCORE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_REVIEW_MANAGER}/getPatentScore`;
export const SET_PATENT_SCORE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_REVIEW_MANAGER}/setPatentScore`;
export const GET_COPYRIGHT_SCORE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_REVIEW_MANAGER}/getCopyrightScore`;
export const SET_COPYRIGHT_SCORE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_REVIEW_MANAGER}/setCopyrightScore`;
export const GET_AWARD_SCORE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_REVIEW_MANAGER}/getAwardScore`;
export const SET_AWARD_SCORE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_REVIEW_MANAGER}/setAwardScore`;
export const GET_THESIS_SCORE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_REVIEW_MANAGER}/getThesisScore`;
export const SET_THESIS_SCORE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_REVIEW_MANAGER}/setThesisScore`;
export const GET_BOOK_SCORE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_REVIEW_MANAGER}/getBookScore`;
export const SET_BOOK_SCORE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_REVIEW_MANAGER}/setBookScore`;

export const FINISH_REVIEW_MANAGER_REVIEW = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_REVIEW_MANAGER}/finishReviewManagerReview`;
export const EXPORT_ALL_STAFF_INFO_EXCEL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_REVIEW_MANAGER}/exportAllStaffInfoExcel`;
export const GE_REVIEW_MANAGER_EXPORT_INFO_URL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_REVIEW_MANAGER}/getReviewManagerExportInfoUrl`;
export const GET_REVIEW_MANAGER_EXPORT_ALL_INFO_URL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_REVIEW_MANAGER}/getReviewManagerExportAllInfoUrl`;

/**
 * 文件
 */
export const UPLOAD_JPG_FILE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_FILE}/uploadJpgFile`; // 上传jpg,png,jpeg文件
export const UPLOAD_ZIP_FILE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_FILE}/uploadZipFile`; // 上传word,pdf文件
export const UPLOAD_FILE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_FILE}/uploadFile`; // 上传文件
export const GET_FILE_URL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_FILE}/getFileUrl`; // 获取文件url
