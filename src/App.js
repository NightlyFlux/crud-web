import React, { useEffect, useState } from 'react'
import http from './api'
import 'antd/dist/antd.css'
import { Button, Form, Input, Layout, Modal, Radio } from 'antd'
import { TeamOutlined, UserAddOutlined } from '@ant-design/icons'
import { Content, Footer, Header } from 'antd/lib/layout/layout'
import Title from 'antd/lib/typography/Title'
import EmployeeTable from './components/EmployeeTable'

const App = () => {
  const [form] = Form.useForm()
  const [employees, setEmployees] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentId, setCurrentId] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const addEmployee = ({ name, email, address, phone, role_id }) => {
    setIsLoading(true)
    http
      .post('/employees', {
        name,
        email,
        address,
        phone,
        role_id,
      })
      .then(() => {
        loadEmployees()
        closeModal()
        setIsLoading(false)
      })
  }

  const loadEmployees = () => {
    setIsLoading(true)
    http.get('/employees').then(({ data }) => {
      setEmployees(data)
      setIsLoading(false)
    })
  }

  const updateEmployee = ({ name, email, address, phone, role_id }) => {
    setIsLoading(true)
    http
      .patch(`/employees/${currentId}`, {
        name,
        email,
        address,
        phone,
        role_id,
      })
      .then(({ status }) => {
        debugger
        if (status === 200) {
          loadEmployees()
          closeModal()
          setIsLoading(false)
        }
      })
      .catch(() => {
        console.log('ERROR')
      })
  }

  const deleteEmployee = (id) => {
    setIsLoading(true)
    http.delete(`/employees/${id}`).then(() => {
      const updatedEmployees = employees.filter(
        (employee) => employee.id !== id
      )
      setEmployees(updatedEmployees)
      setIsLoading(false)
    })
  }

  useEffect(() => {
    loadEmployees()
  }, [setEmployees])

  useEffect(() => {
    if (currentId !== null) {
      form.setFieldsValue(
        employees.find((employee) => employee.id === currentId)
      )
      showModal()
    }
  }, [currentId, employees, form])

  const showModal = () => {
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setIsModalVisible(false)
    form.resetFields()
    setCurrentId(null)
  }

  return (
    <>
      <Layout>
        <Header style={{ paddingTop: '0.5rem' }}>
          <Title style={{ color: 'white', textAlign: 'center' }}>
            <TeamOutlined /> Employees CRUD App
          </Title>
        </Header>

        <Content style={{ padding: '0 1rem' }}>
          <Button
            type='primary'
            icon={<UserAddOutlined />}
            style={{ margin: '1rem 0' }}
            onClick={showModal}>
            Add Employee
          </Button>
          <EmployeeTable
            employees={employees}
            loading={isLoading}
            showModal={showModal}
            setCurrentId={setCurrentId}
            deleteEmployee={deleteEmployee}
          />
        </Content>

        <Footer align='center'>
          Made by
          <Button
            type='link'
            href='https://nightlyflux.tk'
            target='_blank'
            size='small'>
            Salvador Gómez
          </Button>
        </Footer>
      </Layout>
      <Modal
        title={`${currentId ? 'Edit' : 'Add'} Employee`}
        visible={isModalVisible}
        okText={currentId ? 'Save changes' : 'Add'}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              currentId ? updateEmployee(values) : addEmployee(values)
            })
            .catch((info) => {
              console.log('Validation Failed:', info)
            })
        }}
        onCancel={closeModal}
        centered>
        <Form
          form={form}
          layout='vertical'
          name='EmployeeForm'
          initialValues={{ role_id: 1 }}>
          <Form.Item
            name='name'
            label='Name'
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name='email'
            label='Email'
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}>
            <Input type='email' />
          </Form.Item>
          <Form.Item
            name='address'
            label='Address'
            rules={[
              {
                required: true,
                message: 'Please input your address!',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name='phone'
            label='Phone number'
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
            ]}>
            <Input type='tel' />
          </Form.Item>
          <Form.Item name='role_id' label='Role' style={{ marginBottom: 0 }}>
            <Radio.Group>
              <Radio value={1}>Admin</Radio>
              <Radio value={2}>User</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default App
