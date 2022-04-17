import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button, Form } from 'antd';

import { setError, signin, setLoading } from '../store/actions/authActions';
import { RootState } from '../store';
import { errorToast } from '../components/Toast';

const SignIn = () => {
    const onFinish = (values: any) => {
        setLoading(true)
        dispatch(signin(values, () => setLoading(false)));
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const dispatch = useDispatch();
    const { error, loading } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (error) {
            errorToast(error)
            dispatch(setError(''))
        }
    }, [error, dispatch]);

    return (
        <section className="container center">
            <h2>Sign in</h2>
            <Form
                autoComplete="off" onFinishFailed={onFinishFailed} onFinish={onFinish}>
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
                        placeholder="password"
                        type="password"
                    />
                </Form.Item>

                <Button className="btn" disabled={loading} htmlType="submit">Sign in</Button>
            </Form>
        </section>
    )
}

export default SignIn
