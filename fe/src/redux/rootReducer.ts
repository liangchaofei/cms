/*
 * @Author: your name
 * @Date: 2019-10-29 18:21:07
 * @LastEditTime: 2019-10-29 18:44:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-redux/src/redux/rootReducer.ts
 */
import { combineReducers} from 'redux';

import employee from './employee';

const reducers = {
    employee
};

export default combineReducers(reducers)