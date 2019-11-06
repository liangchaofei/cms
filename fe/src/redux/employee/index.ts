/*
 * @Author: your name
 * @Date: 2019-10-29 15:38:24
 * @LastEditTime: 2019-11-04 18:47:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-redux/src/redux/employee/index.ts
 */
import { Dispatch } from 'redux';
import _ from 'lodash';

import { get, post, del } from '../../utils/request';
import { department, level } from '../../constants/options';

import {
    GET_EMPLOYEE_URL,
    CREATE_EMPLOYEE_URL,
    DELETE_EMPLOYEE_URL,
    UPDATE_EMPLOYEE_URL,
    CREATE_BLOG_URL,
} from '../../constants/urls';

import {
    GET_EMPLOYEE,
    CREATE_EMPLOYEE,
    DELETE_EMPLOYEE,
    UPDATE_EMPLOYEE,
    CREATE_BLOG
} from '../../constants/actions';

import {
    EmployeeInfo,
    EmployeeRequest,
    EmployeeResponse,
    CreateRequest,
    DeleteRequest,
    UpdateRequest,
    CreateBlogRequest
} from '../../interface/employee';

type State = Readonly<{
    employeeList: EmployeeResponse
}>

type Action = {
    type: string;
    payload: any;
}

const initialState: State = {
    employeeList: undefined
}

export  function getEmployee(param: EmployeeRequest, callback: () => void) {
    return (dispatch: Dispatch) => {
        get(GET_EMPLOYEE_URL, param).then(res => {
            dispatch({
                type: GET_EMPLOYEE,
                payload: res.data
            });
            callback();
        });
    }
}

export function createBlog(param: CreateBlogRequest, callback: () => void){
    return (dispatch: Dispatch) => {
        post(CREATE_BLOG_URL, param).then(res => {
            dispatch({
                type: CREATE_BLOG,
                payload: {
                    title: param.title,
                    author: param.author,
                    content: param.content,
                    ...res
                }
            });
        });
    }
}

export function createEmployee(param: CreateRequest, callback: () => void) {
    return (dispatch: Dispatch) => {
        post(CREATE_EMPLOYEE_URL, param).then(res => {
            dispatch({
                type: CREATE_EMPLOYEE,
                payload: {
                    name: param.name,
                    department: department[param.departmentId],
                    departmentId: param.departmentId,
                    hiredate: param.hiredate,
                    level: level[param.levelId],
                    levelId: param.levelId,
                    ...res.data
                }
            });
            callback();
        });
    }
}

export function deleteEmployee(param: DeleteRequest) {
    return (dispatch: Dispatch) => {
        del(DELETE_EMPLOYEE_URL, param).then(res => {
            dispatch({
                type: DELETE_EMPLOYEE,
                payload: param
            })
        });
    }
}

export function updateEmployee(param: UpdateRequest, callback: () => void) {
    return (dispatch: Dispatch) => {
        post(UPDATE_EMPLOYEE_URL, param).then(res => {
            dispatch({
                type: UPDATE_EMPLOYEE,
                payload: param
            });
            callback();
        });
    }
}

export default function(state = initialState, action: Action) {
    switch (action.type) {
        case GET_EMPLOYEE:
            return {
                ...state,
                employeeList: action.payload
            }
        case CREATE_EMPLOYEE:
            let newList = [action.payload, ...(state.employeeList as EmployeeInfo[])]
            return {
                ...state,
                employeeList: newList
            }
        case CREATE_BLOG:
                console.log('action', action)
                console.log('state',state)
                let newBlog = [action.payload]
                console.log('newBlog', action.payload)
                return {
                    employeeList: action.payload,
                    ...state
                }
        case DELETE_EMPLOYEE:
            let reducedList = [...(state.employeeList as EmployeeInfo[])];
            _.remove(reducedList, (item: EmployeeInfo) => {
                return item.id === action.payload
            });
            return {
                ...state,
                employeeList: reducedList
            }
        // case UPDATE_EMPLOYEE:
        //     let updatedList = [...(state.employeeList as EmployeeInfo[])];
        //     let item: UpdateRequest = action.payload;
        //     let index = _.findIndex(updatedList, {
        //         id: item.id
        //     });
        //     updatedList[index] = {
        //         id: item.id,
        //         key: item.id,
        //         name: item.name,
        //         department: department[item.departmentId],
        //         departmentId: item.departmentId,
        //         hiredate: item.hiredate,
        //         level: level[item.levelId],
        //         levelId: item.levelId
        //     }
        //     return {
        //         ...state,
        //         employeeList: updatedList
        //     }
        default:
            return state
    }
}
