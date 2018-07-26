/**
 * 将一个字符串截取到指定的长度，
 * 中文字符作为两个普通字符处理，比如如果是保留长度是2，那么是一个中文文字或者2个数字字母。
 * 超出长度会增加...
 *
 * @param {String} str 要截取的字符串
 * @param {Number} len 要截取的长度
 *
 * @return String 返回新的字符串
 *
 */

export default function toFixedString(str, len) {
  const reg = /[^\x00-\xff]/;
  let index = 0;
  let count = 0;
  let result = '';
  while (count < len && index < str.length) {
    const char = str[index++];
    result += char;
    if (reg.test(char)) {
      count += 2;
    } else {
      count++;
    }
  }
  if (index < str.length - 1) {
    result += '...';
  }
  return result;
}
