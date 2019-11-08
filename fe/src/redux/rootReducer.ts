/*
 * @Author: your name
 * @Date: 2019-10-29 18:21:07
 * @LastEditTime: 2019-11-08 14:02:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-redux/src/redux/rootReducer.ts
 */
import { combineReducers} from 'redux';

import employee from './employee';
import users from './users'

const reducers = {
    employee,users
};

export default combineReducers(reducers)