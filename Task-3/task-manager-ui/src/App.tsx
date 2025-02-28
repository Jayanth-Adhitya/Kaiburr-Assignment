import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Modal, Form, message } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/tasks';

interface Task {
  id: string;
  name: string;
  owner: string;
  command: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [outputModalVisible, setOutputModalVisible] = useState(false);
  const [commandOutput, setCommandOutput] = useState('');
  const [form] = Form.useForm();

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get<Task[]>(API_BASE_URL);
      setTasks(response.data);
    } catch (error) {
      message.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  // Search tasks
  const handleSearch = async (query: string) => {
    setSearchText(query);
    try {
      const response = await axios.get<Task[]>(`${API_BASE_URL}/search?name=${query}`);
      setTasks(response.data);
    } catch (error) {
      message.error('Search failed');
    }
  };

  // Create task
  const handleCreate = async (values: Omit<Task, 'id'>) => {
    try {
      await axios.post(API_BASE_URL, values);
      message.success('Task created successfully');
      setIsModalVisible(false);
      form.resetFields();
      fetchTasks();
    } catch (error) {
      message.error('Failed to create task');
    }
  };

  // Delete task
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      message.success('Task deleted successfully');
      fetchTasks();
    } catch (error) {
      message.error('Failed to delete task');
    }
  };

  // Execute command
  const handleExecute = async (id: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/${id}/execute`);
      setCommandOutput(response.data.output); // Store command output
      setOutputModalVisible(true); // Show the output modal
    } catch (error) {
      console.error('Failed to execute command:', error);
      message.error('Failed to execute command');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Task Manager</h1>

      {/* Search and Create Button */}
      <div style={{ marginBottom: '20px' }}>
        <Input
          placeholder="Search tasks..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 200, marginRight: '10px' }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Create Task
        </Button>
      </div>

      {/* Task Table */}
      <Table
        dataSource={tasks}
        loading={loading}
        rowKey="id"
        columns={[
          { title: 'Name', dataIndex: 'name', key: 'name' },
          { title: 'Owner', dataIndex: 'owner', key: 'owner' },
          { title: 'Command', dataIndex: 'command', key: 'command' },
          {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
              <>
                <Button type="link" onClick={() => handleExecute(record.id)}>
                  Run
                </Button>
                <Button danger onClick={() => handleDelete(record.id)}>
                  Delete
                </Button>
              </>
            ),
          },
        ]}
      />

      {/* Create Task Modal */}
      <Modal
        title="Create Task"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleCreate}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter a task name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Owner"
            name="owner"
            rules={[{ required: true, message: 'Please enter an owner' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Command"
            name="command"
            rules={[
              { required: true, message: 'Please enter a command' },
              {
                validator: (_, value) =>
                  !value.includes('rm') && !value.includes('sudo')
                    ? Promise.resolve()
                    : Promise.reject('Unsafe command'),
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form>
      </Modal>

      {/* Command Output Modal */}
      <Modal
        title="Command Execution Output"
        open={outputModalVisible}
        onCancel={() => setOutputModalVisible(false)}
        footer={null}
      >
        <pre style={{ whiteSpace: 'pre-wrap' }}>{commandOutput}</pre>
      </Modal>
    </div>
  );
};

export default App;