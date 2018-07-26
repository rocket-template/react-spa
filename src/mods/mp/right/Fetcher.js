'use strict';
// 页面请求接口管理

import fetch from 'utils/fetch';

class Fetcher {
  /**
   * 获取列表
   * @param query
   *        pageNo
   *        pageSize
   */
  static getList(query) {
    //return fetch.get('/api/test/testkey/page', { params: query });
    return new Promise((resolve, reject) => {
      let res = {
        success: true,
        error: 0,
        msg: '调用成功',
        message: '调用成功',
        data: {
          success: true,
          error: 0,
          total: 6,
          pageNo: 1,
          pageSize: 20,
          data: [
            {
              id: 1,
              parentId: 0,
              appId: 1,
              appName: 'miniap',
              name: '测试1',
              value: 'test1',
              childList: []
            },
            {
              id: 2,
              parentId: 0,
              appId: 1,
              appName: 'miniap',
              name: '测试2',
              value: 'test2',
              childList: []
            },
            {
              id: 3,
              parentId: 0,
              appId: 1,
              appName: 'miniap',
              name: '测试3',
              value: 'test3',
              childList: []
            },
            {
              id: 4,
              parentId: 0,
              appId: 1,
              appName: 'miniap',
              name: '测试4',
              value: 'test4',
              childList: []
            },
            {
              id: 5,
              parentId: 0,
              appId: 1,
              appName: 'miniap',
              name: '测试5',
              value: 'test5',
              childList: []
            },
            {
              id: 6,
              parentId: 0,
              appId: 1,
              appName: 'miniap',
              name: '测试6',
              value: 'test6',
              childList: [
                {
                  id: 7,
                  parentId: 6,
                  appId: 1,
                  appName: 'miniap',
                  name: '测试7',
                  value: 'test7',
                  childList: []
                },
                {
                  id: 8,
                  parentId: 6,
                  appId: 1,
                  appName: 'miniap',
                  name: '测试8',
                  value: 'test8',
                  childList: []
                }
              ]
            }
          ]
        }
      };
      resolve(res);
    });
  }
  /**
   * 列表
   * @param query
   */
  static getTopLevel(query) {
    return fetch.get('/api/test/top/testkey', { params: query });
  }

  static getEnviroments() {
    // return fetch.get('/api/test/applist');
    return new Promise(resolve => {
      let res = {
        success: true,
        error: 0,
        msg: '调用成功',
        message: '调用成功',
        data: [{ id: 1, name: 'miniap', appKeys: null }]
      };
      resolve(res);
    });
  }

  static deleteRight(testkeyId) {
    return fetch.delete(`/api/test/testkey/${testkeyId}`);
  }

  static addRight(data = {}) {
    return fetch.put('/api/test/testkey', { ...data });
  }

  static updateRight(testkeyId, data = {}) {
    return fetch.post(`/api/test/testkey/${testkeyId}`, { ...data });
  }

  static get(id) {
    return fetch.get(`/api/test/testkey/${id}`);
  }
}

export default Fetcher;
