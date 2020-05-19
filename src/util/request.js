import * as DominConfigs from '../constants/domin-constants';
import moment from 'moment';
import { message } from 'antd';
import wait from '@/util/wait-helper';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';
let enMoment = moment().locale('en');

// 请求包装
export default async (
  url,
  params = {},
  requestType = 'POST',
  ignoreParam = false
) => {
  // headers
  const t = enMoment.format('Unix Timestamp');
  const os = 'opt';

  let headers = new Headers({
    Accept: '*/*',
    'Content-Type': 'application/json',
    Connection: 'keep-alive',
    t,
    os,
    authorization: `Bearer ${localStorage.getItem(`${LOCAL_STORAGE}-token`)}`,
  });

  const fetchParams = {
    method: requestType,
    headers,
  };

  // 根据不同的请求类型 拼装请求参数
  if (requestType === 'POST') {
    fetchParams.body = JSON.stringify(params);
  } else if (requestType === 'GET') {
    if (!ignoreParam) {
      const allKey = Object.keys(params);

      if (allKey && allKey.length > 0) {
        if (url.indexOf('?') === -1) {
          url = `${url}?`;
        } else {
          if (url.indexOf('=') !== -1) {
            url = url + '&';
          }
        }

        let query = '';
        for (let i = 0; i < allKey.length; i += 1) {
          query = `${query + allKey[i]}=${params[allKey[i]]}`;
          if (i !== allKey.length - 1) {
            query = `${query}&`;
          }
        }

        url = url + query;
      }
    }
  } else if (requestType === 'PUT') {
    fetchParams.body = JSON.stringify(params);
  } else if (requestType === 'DELETE') {
    fetchParams.body = JSON.stringify(params);
  }

  // 进行请求
  // 防闪烁
  const [res] = await Promise.all([
    _fetch(url, params, requestType, fetchParams),
    wait(300),
  ]);

  return res;
};

/**
 * 上传项目作品照片到七牛
 *
 * result: {
 *      url: 照片展示url
 *      key: 上传用key
 * }
 *
 * @param imagePath 照片路径
 * @param success
 * @param failed
 * @returns {function(*)}
 */
// export function uploadProjectImageToQiniu(image) {
//   return new Promise(async (resolve, reject) => {
//     const formdata = new FormData();
//     let fetchParams = {},
//       responseData = {};

//     // 获取上传token
//     let tokenResponse = await launchRequest(APIs.GetUploadToken, {
//       fileType: image.type
//     });

//     formdata.append('key', tokenResponse.key);
//     formdata.append('token', tokenResponse.token);
//     formdata.append('file', image);

//     fetchParams = {
//       method: DominConfigs.REQUEST_TYPE.POST,
//       body: formdata
//     };

//     responseData = await _fetch(
//       APIs.UPLOAD_TO_QiNiu,
//       {},
//       DominConfigs.REQUEST_TYPE.POST,
//       fetchParams
//     );

//     if (responseData) {
//       resolve(responseData);
//     } else {
//       reject();
//     }
//   });
// }

async function _fetch(url, params = {}, requestType, fetchParams = {}) {
  console.log(
    `-----------------\n发起${requestType}请求\n * url: ${url}\n * params:`
  );
  console.dir(params);

  try {
    const response = await fetch(url, fetchParams);
    const responseData = await response.json();

    console.log('请求返回: status:' + responseData.status + '\n');
    console.dir(responseData);
    console.log('-----------------');

    // 请求成功 status: 200
    return responseHandle(responseData);
  } catch (error) {
    console.log(error);
    message.error('网络有点问题呦,请稍后再试');
  }
}

/**
 * 返回值处理
 * @param {*} responseData
 */
const responseHandle = (responseData) => {
  if (responseData.status) {
    return _responseHandle[responseData.status](responseData);
  } else {
    return null;
  }
};

const _responseHandle = {
  [DominConfigs.RESPONSE_CODE.success]: (responseData) => {
    if (responseData.msg) {
      message.success(responseData.msg);
    }

    return responseData.data;
  },
  [DominConfigs.RESPONSE_CODE.created]: (responseData) => {
    if (responseData.msg) {
      message.success(responseData.msg);
    }

    return responseData.data;
  },
  [DominConfigs.RESPONSE_CODE.noContent]: (responseData) => {
    if (responseData.msg) {
      message.success(responseData.msg);
    }

    return responseData.data;
  },
  [DominConfigs.RESPONSE_CODE.error]: (responseData) => {
    if (responseData.msg) {
      message.error(responseData.msg);
    }

    return null;
  },
  [DominConfigs.RESPONSE_CODE.unauthorized]: (responseData) => {
    message.warning(responseData.msg);
    // 清除过期的token
    localStorage.removeItem(`${LOCAL_STORAGE}-token`);

    return null;
  },
};

/**
 * 上传文件
 */

export const proxyFileFetch = async (url, data) => {
  const formData = new FormData();

  for (let key in data) {
    formData.append(key, data[key]);
  }

  let headers = new Headers({
    Accept: '*/*',
    authorization: `Bearer ${localStorage.getItem(`${LOCAL_STORAGE}-token`)}`,
  });

  const fetchParams = {
    method: 'POST',
    headers,
    body: formData,
  };

  const [res] = await Promise.all([
    _fetch(url, {}, 'POST', fetchParams),
    wait(300),
  ]);

  return res;
};
