/*
 * @Author: your name
 * @Date: 2019-10-23 20:40:29
 * @LastEditTime: 2019-10-29 18:45:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-redux/src/redux/store.ts
 */
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import rootReducer from './rootReducer'

const store = createStore(rootReducer,compose(applyMiddleware(thunk)))

export default store;