/* 文章收藏api */
import axios from '@/utils/HttpAjax.js'

/**
 * @method: 获取表格数据
 * @param: {query}
 * @return: Promise
*/

export const getList = (query) => {
    return axios.get('/api/collection', { params: query })
};


/**
 * @method: 获取表格数据
 * @param: {query}
 * @return: Promise
*/

export const deleteRow = (query) => {
    return axios.delete('/api/collection/delete', { params: query })
};

/**
 * @method: 添加 or 编辑表格数据
 * @param: {query}
 * @return: Promise
*/

export const setArticle = (query) => {
    return axios.post('/api/collection/add', query)
};
