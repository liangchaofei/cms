import React, { Component } from 'react';
import { Table, Button } from 'antd';

import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import './index.css';

import QueryForm from './QueryForm';
import InfoModal from './InfoModal';

import getColunms from './columns';
import { DOWNLOAD_EMPLOYEE_URL } from '../../constants/urls';
import {
    EmployeeInfo,
    EmployeeRequest,
    EmployeeResponse,
    CreateRequest,
    DeleteRequest,
    UpdateRequest
} from '../../interface/employee';
import {
    getEmployee,
    createEmployee,
    deleteEmployee,
    updateEmployee
} from '../../redux/employee';

interface Props {
    onGetEmployee(param: EmployeeRequest, callback: () => void): void;
    onCreateEmployee(param: CreateRequest, callback: () => void): void;
    onDeleteEmployee(param: DeleteRequest): void;
    onUpdateEmployee(param: UpdateRequest, callback: () => void): void;
    employeeList: EmployeeResponse;
    history: any;
}

interface State {
    loading: boolean;
    showModal: boolean;
    edit: boolean;
    rowData: Partial<EmployeeInfo>;
}

class Employee extends Component<Props, State> {
    state: State = {
        loading: false,
        showModal: false,
        edit: false,
        rowData: {}
    }
   
    setLoading = (loading: boolean) => {
        this.setState({
            loading
        })
    }
    hideModal = () => {
        this.setState({
            showModal: false,
            rowData: {}
        })
    }
    handleCreate = () => {
        this.setState({
            showModal: true,
            edit: false,
            rowData: {}
        });
    }
    handleDelete = (param: DeleteRequest) => {
        this.props.onDeleteEmployee(param)
    }
    handleUpdate = (record: EmployeeInfo) => {
        this.props.history.push(`/admin_editblog/${record.id}`)
    }
    changePage = (pagination: any) => {
        const { current, pageSize} = pagination;
        this.props.onGetEmployee(pagination,()=>{})
    }
    render() {
        const {
            employeeList,
            onGetEmployee,
            onCreateEmployee,
            onUpdateEmployee
        } = this.props;
        return (
            <>
                <QueryForm getData={onGetEmployee} setLoading={this.setLoading} />
                <Table
                    columns={getColunms(this.handleUpdate, this.handleDelete)}
                    dataSource={employeeList}
                    loading={this.state.loading}
                    className="table"
                />
            </>
        )
    }
}

const mapStateToProps = (state: any) => ({
    employeeList: state.employee.employeeList
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    onGetEmployee: getEmployee,
    onCreateEmployee: createEmployee,
    onDeleteEmployee: deleteEmployee,
    onUpdateEmployee: updateEmployee
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Employee);
