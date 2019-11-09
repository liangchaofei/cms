/*
 * @Author: your name
 * @Date: 2019-10-29 15:38:24
 * @LastEditTime: 2019-11-08 22:19:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-redux/src/redux/employee/index.ts
 */
import { Dispatch } from 'redux';
import _ from 'lodash';
import { message } from 'antd';
import { get, post, del ,put} from '../../utils/request';
import { department, level } from '../../constants/options';

import {
    GET_EMPLOYEE_URL,
    CREATE_EMPLOYEE_URL,
    DELETE_EMPLOYEE_URL,
    UPDATE_EMPLOYEE_URL,
    UPDATE_Blog_URL,
    CREATE_BLOG_URL,
    UPLOAD_IMG,
    GET_COMMENT_URL,
    CREATE_COMMENT_URL,
    USER_LOGIN_URL
} from '../../constants/urls';

import {
    GET_EMPLOYEE,
    CREATE_EMPLOYEE,
    DELETE_EMPLOYEE,
    UPDATE_EMPLOYEE,
    CREATE_BLOG,
    UPDATE_BLOG,
    GET_COMMENT,
    CREATE_COMMENT,
    USER_LOGIN
} from '../../constants/actions';

import {
    EmployeeInfo,
    EmployeeRequest,
    EmployeeResponse,
    CreateRequest,
    DeleteRequest,
    UpdateRequest,
    CreateBlogRequest,
    CommentRequest,
    CommentResponse,
    LoginRequest
} from '../../interface/employee';

type State = Readonly<{
    employeeList: EmployeeResponse
    commentList: CommentResponse
}>

type Action = {
    type: string;
    payload: any;
}

const initialState: State = {
    employeeList: undefined,
    commentList: undefined
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

export function getComment(param: CommentRequest, callback:() => void ){
    return (dispatch: Dispatch) => {
        get(GET_COMMENT_URL,param).then(res => {
            dispatch({
                type: GET_COMMENT,
                payload: res.data
            })
            callback()
        })
    }
} 
export function addComment(param:CommentRequest){
    return (dispatch: Dispatch) => {
        post(CREATE_COMMENT_URL,param).then((res:any) => {
            if(res.code === 200){
                message.success(res.msg)
            }
            console.log('res', res)
            dispatch({
                type: CREATE_COMMENT,
                payload:{
                    id:param.id,
                    comment:param.comment,
                    ...res.data
                }
            })
        })
    }
}

export function user_login(param: LoginRequest, callback: () => void){
    return (dispatch: Dispatch) => {
        post(USER_LOGIN_URL,param).then((res: any) => {
            dispatch({
                type: USER_LOGIN,
            })
            callback()
        })
    }
}
export function createBlog(param: CreateBlogRequest, callback: () => void){
    return (dispatch: Dispatch) => {
        post(CREATE_BLOG_URL, param).then((res: any) => {
            if(res.code === 200){
                message.success(res.msg)
            }
            dispatch({
                type: CREATE_BLOG,
                payload: {
                    title: param.title,
                    author: param.author,
                    content: param.content,
                    ...res.data
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
export function updateBlog(param: UpdateRequest) {
    return (dispatch: Dispatch) => {
        put(UPDATE_Blog_URL, param).then((res: any) => {
            if(res.code === 200){
                message.success(res.msg)
            }
            dispatch({
                type: UPDATE_BLOG,
                payload: param
            });
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
        case GET_COMMENT:
            return {
                ...state,
                commentList: action.payload
            }
        case CREATE_EMPLOYEE:
            let newList = [action.payload, ...(state.employeeList as EmployeeInfo[])]
            return {
                ...state,
                employeeList: newList
            }
        case CREATE_COMMENT:
            let newComment = [action.payload, ...(state.commentList as CommentResponse[])]
            return {
                ...state,
                commentList: newComment
            }
        case CREATE_BLOG:
            let newBlog = [action.payload]
            return {
                ...state,
                employeeList: newBlog
            }
        case DELETE_EMPLOYEE:
            let reducedList = [...(state.employeeList as EmployeeInfo[])];
            _.remove(reducedList, (item: EmployeeInfo) => {
                return item.id === action.payload.id
            });
            return {
                ...state,
                employeeList: reducedList
            }
        case UPDATE_BLOG:
                let updatedList = [...(state.employeeList as EmployeeInfo[])];
                let item: UpdateRequest = action.payload;
                let index = _.findIndex(updatedList, {
                    id: item.id
                });
                updatedList[index] = {
                    id: item.id,
                    title: item.title,
                    author: item.author,
                    content:item.content,
                }
                return {
                    ...state,
                    employeeList: updatedList
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
