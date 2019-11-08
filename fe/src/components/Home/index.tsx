import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Form, Input, Button, DatePicker, Modal, Card, Row, Col } from 'antd';
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
class Home extends Component<Props, State> {
    state: State = {
    }
    componentDidMount() {
        this.props.onGetEmployee({}, () => { })
    }

    render() {
        const { form: { getFieldDecorator }, employeeList } = this.props;
        const data = employeeList || [];
        let newData: any[] =[];
        for(let i = 0;i<data.length;i++){
            if(i<5){
                newData.push(data[i])
            }
        }
        return (
            <div>
                <Row type="flex">
                    <Col span={16}>
                        <p style={{fontSize: 16}}>最新文章</p>
                        <Card bordered={false}>
                            <ul style={{padding: 0}}>
                                {
                                    newData.map((item:any,index:number) => {
                                        return (
                                            <li key={index} className="article_li">
                                                <Col span={16}>
                                                <Link to={`/blog/${item.id}`}>{item.title}</Link>
                                                </Col>
                                                <Col span={8}>
                                                <span>{moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                                                </Col>
                                                
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </Card>
                    </Col>
                    <Col span={8}>
                    </Col>
                </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Home));