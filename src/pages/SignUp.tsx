import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Input, Form } from 'antd';

import { setError, signup, setLoading } from '../store/actions/authActions';
import { RootState } from '../store';
import { errorToast } from '../components/Toast';

const SignUp = () => {
    const dispatch = useDispatch();
    const { error, loading } = useSelector((state: RootState) => state.auth);

    const onFinish = (values: any) => {
        setLoading(true);
        dispatch(signup(values, () => setLoading(false)));
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (error) {
            errorToast(error)
            dispatch(setError(''))
        }
    }, [error, dispatch]);


    return (
        <section className="container center">
            <h2>Sign Up</h2>
            <Form autoComplete="off" onFinishFailed={onFinishFailed} onFinish={onFinish}>
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input
                        size="large"
                        className="input"
                        placeholder="name"
                    />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input
                        size="large"
                        className="input"
                        placeholder="email"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input
                        size="large"
                        className="input"
                        type="password"
                        placeholder="password"
                    />
                </Form.Item>


                <Button className="btn" disabled={loading} type="primary" htmlType="submit" >Sign Up</Button>
            </Form>
        </section>
    )
}

export default SignUp
