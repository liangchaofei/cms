/*
 * @Author: your name
 * @Date: 2019-11-08 14:08:09
 * @LastEditTime: 2019-11-08 14:16:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cms/fe/src/interface/users.ts
 */
export interface UserRequest {
    id?: number;
    username?: any;
    password?: any;
    createdAt?: any;
    updatedAt?:any;
}

export type UserResponse = UserRequest[] | undefined;