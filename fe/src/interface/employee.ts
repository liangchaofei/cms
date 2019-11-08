/*
import { department } from '../constants/options';
 * @Author: your name
 * @Date: 2019-10-23 20:50:49
 * @LastEditTime: 2019-11-08 11:15:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-redux/src/interface/employee.ts
 */
export interface EmployeeInfo {
    id: number;
    title: string;
    content: string;
    pv?: number;
    author: string;
    createdAt?: Date;
}

export interface EmployeeRequest {
    id?:number;
    title?: string;
    departmentId?: number;
}

export interface CommentResponse2 {
    id?: number;
    comment?: any;
} 
export type CommentResponse = CommentResponse2[] | undefined
export interface CommentRequest {
    id?: number;
    comment?: any;
}
export type EmployeeResponse = EmployeeInfo[] | undefined

export interface Loginrequest {
    username: any;
    password: any;
}
export interface CreateRequest {
    name: string;
    departmentId: number;
    hiredate: string;
    levelId: number;
}

export interface CreateBlogRequest {
    title: string;
    author: string;
    content: any;
}

export interface UpdateRequest {
    id: number;
    title: string;
    author: string;
    content: string;
}

export interface DeleteRequest {
    id: number;
}

export interface LoginRequest{
    username: any;
    password: any;
}
export interface LoginResponse {
    code: number;
    msg: string;
}