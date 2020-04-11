import * as DominConfigs from './domin-constants';

export const UPLOAD_TO_QiNiu = 'https://upload-z2.qiniup.com'; // 上传七牛

/**
 * 用户
 **/
export const GET_USER_TOKEN = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/getUserToken`; // 登录
export const GET_MY_INFO = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/getMyInfo`;

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
