import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Form, Input, Button, DatePicker, Modal, Card, Row, Col, Comment, Avatar, List } from 'antd';
import { getComment,addComment } from '../../redux/employee'
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import './index.css'

import { CreateBlogRequest, CommentResponse, CommentRequest } from '../../interface/employee'

const { TextArea } = Input;
interface Props {
    form: any;
    history: any;
    commentList: CommentResponse;
    onGetComment(param: CommentRequest, callback: () => void): void;
    onCreateComment(param: CommentRequest):void;
}

interface State {
    comments: any[];
    value: any;
    submitting: boolean;
    id: number;
}
const CommentList = ({ comments }: any) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        // @ts-ignore
        renderItem={(props:any, index: number) => {
            return (
                <div key={index}>
                    <p>{moment(props.createdAt).format('YYYY-MM-DD HH:mm:ss')}</p>
                    <p>{props.comment}</p>
                </div>
            )
        }}
    />
);
const Editor = ({ onChange, onSubmit, submitting, value }: any) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                评论
        </Button>
        </Form.Item>
    </div>
);
class Comments extends Component<Props, State> {
    state: State = {
        comments: [],
        submitting: false,
        value: '',
        id: -1
    }
    componentDidMount() {
        const { pathname } = window.location
        const id = parseInt(pathname.substring(6))
        this.setState({id})
        this.props.onGetComment({ id }, () => { })
    }
    handleChange = (e: any) => {
        this.setState({
            value: e.target.value,
        })
    }
    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }
        const { id,value } = this.state;
        this.setState({
            submitting: true,
        });
        this.props.onCreateComment({id,comment:value})
        this.setState({
            submitting: false,
        });
    }
    render() {
        const { form: { getFieldDecorator }, commentList } = this.props;
        const data = []
        const { value, submitting, comments } = this.state;
        return (
            <div>
                {/* 
                // @ts-ignore */}
                {commentList && commentList.length > 0 && <CommentList comments={commentList} />}
                <Comment
                    avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt="Han Solo"
                        />
                    }
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    commentList: state.employee.commentList
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    onGetComment: getComment,
    onCreateComment: addComment
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Comments));