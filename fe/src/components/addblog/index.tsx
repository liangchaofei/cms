import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Form, Input, Button, DatePicker, Modal } from 'antd';
import { createBlog } from '../../redux/employee' 
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';

import { CreateBlogRequest,EmployeeResponse } from '../../interface/employee' 
interface Props {
    form: any;
    history: any;
    onCreateBlog: (param:CreateBlogRequest) => void;
    employeeList: EmployeeResponse;
}

interface State {
    MOCK_DATA: any;
}
class AddBlog extends Component<Props, State> {
    mdParser = null;
    constructor(props: any) {
        super(props);
        // @ts-ignore
        this.mdParser = new MarkdownIt(/* Markdown-it options */);
    }
    state: State = {
        MOCK_DATA: ''
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
            const { MOCK_DATA } = this.state;
            values.content = MOCK_DATA;
          if (!err) {

            let res = this.props.onCreateBlog(values)
            console.log('res',res)
            // if(res.code === 1 ){
            //   Modal.confirm({
            //     title: '创建成功!是否查看？',
            //     onOk: () => this.props.history.push(`/employee`),
            //   });
            // }else{
            //   Modal.confirm({
            //     title: res.msg,
            //   });
            // }
          }
        });
    }
    render() {
        const { form: { getFieldDecorator } } = this.props;
        const { MOCK_DATA } = this.state;
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item label="标题">
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入标题' }],
                        })(
                            <Input
                                placeholder="请输入标题"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="作者">
                        {getFieldDecorator('author', {
                            rules: [{ required: true, message: '请输入标题' }],
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
                            value={MOCK_DATA}
                            // @ts-ignore
                            renderHTML={text => this.mdParser.render(text)}
                            // @ts-ignore
                            onChange={this.handleEditorChange}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            创建
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
    onCreateBlog: createBlog
},dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(AddBlog));