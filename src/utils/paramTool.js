// 参数处理相关的方法

/**
 * 去掉参数中无意义的键
 * @param params
 * @returns {*}
 */
export function cleanParams(params) {
  for (let k in params) {
    if (typeof(params[k]) === 'undefined' || params[k] === 'undefined' || params[k] === null || params[k] === '') {
      delete params[k];
    }
  }
  return params;
}
