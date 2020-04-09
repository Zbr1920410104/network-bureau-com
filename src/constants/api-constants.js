import * as DominConfigs from './domin-constants';

export const UPLOAD_TO_QiNiu = 'https://upload-z2.qiniup.com'; // 上传七牛

/**
 * 用户
 **/
export const GET_USER_TOKEN = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/getUserToken`; // 登录
export const GET_MY_INFO = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/getMyInfo`;
