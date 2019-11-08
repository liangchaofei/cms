import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Form, Input, Button, DatePicker, Modal } from 'antd';
import { updateBlog,getEmployee } from '../../redux/employee' 
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';

import { CreateBlogRequest,EmployeeResponse,EmployeeRequest } from '../../interface/employee' 
interface Props {
    form: any;
    history: any;
    onUpdateBlog: (param:CreateBlogRequest) => void;
    employeeList: EmployeeResponse;
    onGetEmployee(param: EmployeeRequest, callback: () => void): void;
}

interface State {
    MOCK_DATA: any;
    id: number;
}
class EditBlog extends Component<Props, State> {
    mdParser = null;
    constructor(props: any) {
        super(props);
        // @ts-ignore
        this.mdParser = new MarkdownIt(/* Markdown-it options */);
    }
    state: State = {
        MOCK_DATA: '',
        id: -1
    }
    componentDidMount(){
        const { pathname } = window.location
        const id = parseInt(pathname.substring(16))
        this.setState({id})
        this.props.onGetEmployee({id},() => {})
    }
    handleEditorChange = (content: any) => {
        if (content) {
            this.setState({
                MOCK_DATA: content.text,
            });
        }
    };
    handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err:any, values:any) => {
            const { MOCK_DATA,id } = this.state;
            values.content = MOCK_DATA;
            values.id = id;
          if (!err) {
           this.props.onUpdateBlog(values)
          }
        });
    }
    render() {
        const { form: { getFieldDecorator },employeeList } = this.props;
        const { MOCK_DATA } = this.state;
        const data = employeeList && employeeList[0];
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item label="标题">
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入标题' }],
                            initialValue:data && data.title,
                        })(
                            <Input
                                placeholder="请输入标题"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="作者">
                        {getFieldDecorator('author', {
                            rules: [{ required: true, message: '请输入标题' }],
                            initialValue:data && data.author,
                        })(
                            <Input
                                placeholder="请输入标题"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="内容">
                        {/* 
                    // @ts-ignore */}
                        <MdEditor
                            style={{minHeight: 300}}
                            value={data && data.content || ''}
                            // @ts-ignore
                            renderHTML={text => this.mdParser.render(text)}
                            // @ts-ignore
                            onChange={this.handleEditorChange}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            更新
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    employeeList: state.employee.employeeList
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    onUpdateBlog: updateBlog,
    onGetEmployee: getEmployee,
},dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(EditBlog));