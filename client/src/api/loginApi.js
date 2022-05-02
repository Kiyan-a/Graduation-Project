import axios from '@/utils/HttpAjax.js'

/**
 * @method: 登录
 * @param: {String} email , password
 * @return: Promise
*/

export const getLogin = (data) => {
    return axios.post('/api/users/login',data)
};


/**
 * @method: 登录
 * @param: {String} email , password
 * @return: Promise
*/

export const getRegister = (data) => {
    return axios.post('/api/users/register',data)
};




