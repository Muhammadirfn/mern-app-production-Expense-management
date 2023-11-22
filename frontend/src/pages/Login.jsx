import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import image from '../images/login.avif';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post('http://localhost:8080/api/v1/users/login', values);
      setLoading(false);
      message.success('Login Successful');
      localStorage.setItem('users', JSON.stringify({ ...data.user, password: '' }));
      navigate('/');
    } catch (error) {
      setLoading(false);
      message.error('Invalid username or password');
    }
  };

  // prevent login user
  useEffect(() => {
    if (localStorage.getItem('users')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <div className="container mx-auto mt-8 px-4 bg-white rounded-lg shadow flex">
        <div className="w-1/2 pr-8">
          <img src={image} alt="" className="w-full h-auto rounded-bl-full" style={{ maxHeight: '300px' }} />
        </div>
        <div className="w-1/2">
          {loading && <Spinner />}
          <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
          <Form className="flex flex-col items-center justify-center" layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email!' },
                { type: 'email', message: 'Please enter a valid email address!' },
              ]}
            >
              <Input
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Your Email"
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
            >
              <Input.Password
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Your Password"
              />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }} className="text-center">
              <Button className="rounded bg-blue-300 text-white" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
          <div className="text-center mt-4">
            <p>
              Don't have an account? <Link to="/register" className="text-blue-500 underline">Please Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
