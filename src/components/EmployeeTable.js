import React from 'react'
import './styles.css'
import { Button, Popconfirm, Table } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const EmployeeTable = ({
  employees,
  loading,
  showModal,
  setCurrentId,
  deleteEmployee,
}) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Phone number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      align: 'center',
      title: 'Edit',
      key: 'edit',
      render: (record) =>
        employees.length > 0 ? (
          <Button
            type='primary'
            shape='round'
            icon={<EditOutlined />}
            onClick={() => {
              setCurrentId(record.id)
            }}
          />
        ) : null,
    },
    {
      align: 'center',
      title: 'Delete',
      key: 'delete',
      render: (record) =>
        employees.length > 0 ? (
          <Popconfirm
            title='Are you sure?'
            onConfirm={() => deleteEmployee(record.id)}>
            <Button
              type='dashed'
              danger
              shape='round'
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        ) : null,
    },
  ]
  return (
    <Table
      dataSource={employees}
      columns={columns}
      loading={loading}
      pagination={false}
      rowKey='id'
      style={{ overflow: 'auto' }}
    />
  )
}

export default EmployeeTable
