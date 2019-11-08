import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Form, Input, Button, DatePicker, Modal, Card, Row, Col } from 'antd';
import { getEmployee } from '../../redux/employee'
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import './index.css'
import Comments from '../Comments'

import { CreateBlogRequest, EmployeeResponse, EmployeeRequest } from '../../interface/employee'
interface Props {
    form: any;
    history: any;
    employeeList: EmployeeResponse;
    onGetEmployee(param: EmployeeRequest, callback: () => void): void;
}

interface State {
}
class Blog extends Component<Props, State> {
    state: State = {
    }
    componentDidMount(){
        const { pathname } = window.location
        const id = parseInt(pathname.substring(6))
        this.props.onGetEmployee({id},() => {})
    }

    render() {
        const { form: { getFieldDecorator }, employeeList } = this.props;
        const data = employeeList && employeeList[0];
        return (
            <div>
                <Card bordered={false}>
                    <h2>{data && data.title}</h2>
                    <p style={{marginBottom: 30}}>
                        <span style={{display: 'inline-block',marginRight: 20}}>作者：{data && data.author}</span>
                        <span>时间：{moment(data && data.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                    </p>
                    <ReactMarkdown source={data && data.content} />
                    <div style={{marginTop: 30}}>
                         <Comments  />
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Blog));