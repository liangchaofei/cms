/*
 * @Author: your name
 * @Date: 2019-10-15 09:56:22
 * @LastEditTime: 2019-11-07 16:43:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /stc_fe/src/utils/request.ts
 */
import originAxios from 'axios';
import { message } from 'antd';
import { string } from 'prop-types';
import qs from 'qs'

const axios = originAxios.create({
    timeout: 20000
});

axios.interceptors.response.use(
    function(response) {
        if (response.data && response.data.flag === 1) {
            /*
                successful response:
                {"flag": 0, "data": ""}

                unsuccessful response:
                {"flag": 1, "msg": "server error"}
            */
            let errorMsg = response.data.msg;
            message.error(errorMsg);
            return Promise.reject(errorMsg);
        }
        return response.data;
    },
    function(error) {
        return Promise.reject(error);
    }
);

export function get(url: string, data: any) {
    return axios.get(url, {
        params: data
    });
};

// By default, axios serializes JavaScript objects to JSON.
export function post(url: string, data: any) {
    return axios({
        method: 'post',
        url,
        data:qs.stringify(data)
    });
};

export function put(url: string, data: any) {
    return axios({
        method: 'put',
        url,
        data
    });
};
export function del(url: string, data: any) {
    return axios({
        method: 'delete',
        url:`${url}/${data && data.id}`,
    });
};

export default axios;
