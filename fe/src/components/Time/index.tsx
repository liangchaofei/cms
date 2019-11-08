import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Form, Input, Button, DatePicker, Modal, Card, Row, Col,Timeline } from 'antd';
import { getEmployee } from '../../redux/employee'
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './index.css'

import { CreateBlogRequest, EmployeeResponse, EmployeeRequest } from '../../interface/employee'
interface Props {
    form: any;
    history: any;
    employeeList: EmployeeResponse;
    onGetEmployee(param: EmployeeRequest, callback: () => void): void;
}

interface State {
}
class Time extends Component<Props, State> {
    state: State = {
    }
    componentDidMount() {
        this.props.onGetEmployee({}, () => { })
    }

    render() {
        const { form: { getFieldDecorator }, employeeList } = this.props;
        const data = employeeList || [];
   
        return (
            <div>
                        <p style={{fontSize: 16}}>时间轴</p>
                        <Card bordered={false}>
                            <Timeline style={{padding: 0}}>
                                {
                                    data.map((item:any,index:number) => {
                                        return (
                                            <Timeline.Item key={index} >
                                                <Link to={`/blog/${item.id}`}>
                                                    <span style={{display: 'inline-block',marginRight:30,minWidth: 300}}>{item.title}</span>
                                                    <span>{moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                                                </Link>
                                            </Timeline.Item>
                                        )
                                    })
                                }
                            </Timeline>
                        </Card>
                   
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    employeeList: state.employee.employeeList
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    onGetEmployee: getEmployee,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Time));