import React from 'react';
import { Button, Divider, Popconfirm, DatePicker } from 'antd';
import moment from 'moment'

import {
    EmployeeInfo,
    DeleteRequest
} from '../../interface/employee';

const getColunms = (
    handleUpdate: (record: EmployeeInfo) => void,
    handleDelete: (record: DeleteRequest) => void
) => {
    return [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title'
        }, {
            title: '内容',
            dataIndex: 'content',
            key: 'content'
        }, {
            title: '作者',
            dataIndex: 'author',
            key: 'author'
        }, {
            title: 'pv',
            dataIndex: 'pv',
            key: 'pv'
        }, {
            title: '时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt: any) => {
                return (
                    <div>{moment().format('YYYY-MM-DD HH:mm:ss')}</div>
                )
            }
        }, {
            title: '操作',
            key: 'action',
            render: (text: string, record: EmployeeInfo) => (
                <span>
                    <Button size="small" icon="edit" onClick={() => {handleUpdate(record)}}>编辑</Button>
                    <Divider type="vertical" />
                    <Popconfirm
                        title={`确定删除 ${record.title} 吗？`}
                        onConfirm={() => {handleDelete({id: record.id})}}
                    >
                        <Button size="small" type="danger" icon="delete">删除</Button>
                    </Popconfirm>
                </span>
            )
        }
    ]
};

export default getColunms;