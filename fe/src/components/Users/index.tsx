import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Form, Input, Button, DatePicker, Modal, Card, Table, Popconfirm,Icon } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './index.css'
import { getUsers, delUser } from '../../redux/users'
import { CreateBlogRequest, EmployeeResponse, EmployeeRequest } from '../../interface/employee'
import { UserRequest, UserResponse } from '../../interface/users';
interface Props {
    form: any;
    history: any;
    userList: UserResponse;
    onGetUsers(param: UserRequest, callback: () => void): void;
    onDelUser(param: UserRequest, callbacl: () => void): void;
}

interface State {
}
class Users extends Component<Props, State> {
    state: State = {
    }
    componentDidMount() {
        this.props.onGetUsers({}, () => { })
    }
    handleDelete = (id: number) =>{
        console.log('id',id)
        this.props.onDelUser({id},() => {
            this.props.onGetUsers({}, () => { })
        })
    }
    handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.props.onGetUsers(values,()=>{})
          }
        });
      };
    render() {
        const { form: { getFieldDecorator }, userList } = this.props;
        const columns = [{
            key:'username',
            title: '用户名',
            dataIndex: 'username'
        },{
            key:'createdAt',
            title: '创建时间',
            dataIndex:'createdAt',
            render: (createdAt: Date) => {
                return (
                    <span>{moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                )
            }
        },{
            key:'del',
            title: '操作',
            dataIndex:'del',
            render:(del:any, record:any) => {
                return (
                    <span>
                        <Popconfirm
                        title={`确定删除 ${record.username} 吗？`}
                        onConfirm={this.handleDelete.bind(this,record.id)}
                    >
                        <Button size="small" type="danger" icon="delete">删除</Button>
                     </Popconfirm>
                    </span>
                )
            }
        }]
        return (
            <div>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    <Button type="primary" htmlType="submit">
                        查询
                    </Button>
                    </Form.Item>
                </Form>
                        <Table dataSource={userList} columns={columns} />
                   
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    userList: state.users.userList
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    onGetUsers: getUsers,
    onDelUser: delUser,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Users));