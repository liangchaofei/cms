import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Modal,
  Card,
  Row,
  Checkbox,
  Icon
} from "antd";
import { user_login } from "../../redux/employee";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import moment from "moment";
import { Link } from "react-router-dom";
import "./index.css";

import {
  CreateBlogRequest,
  EmployeeResponse,
  EmployeeRequest
} from "../../interface/employee";
import { thisExpression } from "@babel/types";
interface Props {
  form: any;
  history: any;
  employeeList: EmployeeResponse;
  onLogin(param: EmployeeRequest, callback: () => void): void;
}

interface State {}
class Login extends Component<Props, State> {
  state: State = {};

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
          delete values.remember;
        console.log("Received values of form: ", values);
        this.props.onLogin(values,() => {
            this.props.history.push('/index')
        })
      }
    });
  };
  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  employeeList: state.employee.employeeList
});
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onLogin: user_login
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Login));
