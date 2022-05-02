/* 工具函数... 文件 */
import dayjs from 'dayjs'
/**
 * @method: 获取 token
 * @param: {}
 * @return:
 */
export const getToken = () => {
  return localStorage.getItem('Utoken');
};


/**
 * @method: 格式化时间
 * @param: { String } 
 * @return: { Boolean }
*/
export const formatterDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}