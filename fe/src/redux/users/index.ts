/*
 * @Author: your name
 * @Date: 2019-11-08 14:01:58
 * @LastEditTime: 2019-11-08 14:39:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cms/fe/src/redux/users/index.ts
 */
import { get, del } from '../../utils/request';
import _ from 'lodash';
import { UserRequest,UserResponse } from '../../interface/users';
import { Dispatch } from 'redux'
import { GET_USER_URL, DEL_USER_URL} from '../../constants/urls';
import { GET_USER, DEL_USER} from '../../constants/actions'
import { read } from 'fs';
type State = {
    userList: UserResponse
}
type Action = {
    type: string;
    payload: any;
}
const initState: State = {
    userList: []
}

export function getUsers(param: UserRequest){
    return (dispatch: Dispatch) => {
        get(GET_USER_URL,param).then((res: any) => {
            dispatch({
                type: GET_USER,
                payload:res.data
            })
        })
    }
}

export function delUser(param: UserRequest, callback: () => {}){
    return (dispatch: Dispatch) => {
        del(DEL_USER_URL,param).then((res: any) => {
            dispatch({
                type: DEL_USER,
                payload: param
            })
        })
    }
}

export default function(state = initState, action : Action){
    switch(action.type){
        case GET_USER:
            let data = action.payload
            return {
                ...state,
                userList:data
            }
        case DEL_USER:
            let userList = [...(state.userList as UserRequest[])];
            _.remove(userList, (item: UserRequest) => {
                return item.id === action.payload.id
            });
            return {
                ...state,
                userList: userList
            }
        default:
            return state
    }
}