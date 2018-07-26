'use strict';
// 页面的请求接口管理

import fetch from 'utils/fetch';

class Fetcher {
  /**
   * 获取用户信息
   **/
  static getGlobalContext() {
    //return fetch.get('/api/session/get_user.json');
    return {
      success: true,
      error: 0,
      message: '调用成功',
      data: {
        loginUser: {
          id: 123,
          empId: '123',
          nickNameCn: 'zeromike'
        }
      }
    };
  }

  /**
   * 获取权限
   **/
  static getPermissions() {
    // return fetch.get('/test/permissions.json');
    return {
      success: true,
      message: null,
      data: {
        code: 'DENY',
        message: null,
        passList: ['MP'],
        failList: ['TEST'],
        pass: false
      },
      debugInfo: null
    };
  }
}

export default Fetcher;
