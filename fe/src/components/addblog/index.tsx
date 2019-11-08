import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Form, Input, Button, DatePicker, Modal, Upload, message, Icon } from 'antd';
import { createBlog } from '../../redux/employee' 
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';

import { CreateBlogRequest,EmployeeResponse } from '../../interface/employee' 
interface Props {
    form: any;
    history: any;
    onCreateBlog: (param:CreateBlogRequest) => void;
    employeeList: EmployeeResponse;
    onUploadImg: () => void;
}

interface State {
    MOCK_DATA: any;
    loading: boolean;
    imageUrl: string;
}
class AddBlog extends Component<Props, State> {
    mdParser = null;
    constructor(props: any) {
        super(props);
        // @ts-ignore
        this.mdParser = new MarkdownIt(/* Markdown-it options */);
    }
    state: State = {
        MOCK_DATA: '',
        loading: false,
        imageUrl: '',
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
          }
        });
    }
     beforeUpload = (file: { type: string; size: number; }) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
      }

      handleChange = (info: any) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.getBase64(info.file.originFileObj, (imageUrl: any) =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
      };
       getBase64 = (img: Blob, callback: (arg0: string | ArrayBuffer | null) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }
    render() {
        const { form: { getFieldDecorator } } = this.props;
        const { MOCK_DATA, imageUrl } = this.state;
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
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
    onCreateBlog: createBlog,
},dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(AddBlog));