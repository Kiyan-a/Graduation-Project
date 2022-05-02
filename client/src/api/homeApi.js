/* https://interface.sina.cn/news/wap/fymap2020_data.d.json
 * 接口由新浪官方提供
 * 疫情数据
 */
import axios from '@/utils/HttpAjax.js'

/**
 * @method: 获取疫情数据
 * @param: {}
 * @return: Promise
*/

export const setInformation = (query) => {
    return axios.post('/api/users/modifyInformation', query)
};
