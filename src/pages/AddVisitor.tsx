import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd'
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../store';
import { createVisitor, setError, setSuccess } from '../store/actions/visitorActions';
import { errorToast, successToast } from '../components/Toast';

import ReactGA from 'react-ga4';

function initialGA() {
    ReactGA.initialize('G-2BLEQ6HW0K');
    ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });
};

const AddVisitor = () => {

    useEffect(() => {
        initialGA();
    }, []);
    
    const dispatch = useDispatch()
    const { error, loadingVisitor, success } = useSelector((state: RootState) => state.visitor);

    const onFinish = (values: any) => {
        dispatch((createVisitor(values)))
        ReactGA.event('VISITOR', `${values.fullName} added`)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (success) {
            successToast(success)
            dispatch(setSuccess(''))
        }
        if (error) {
            errorToast(error)
            dispatch(setError(''))
        }
    }, [success, dispatch])

    return (
        <div className="container center">
            <h2>Add Visitor Page</h2>
            <Form autoComplete="off" onFinishFailed={onFinishFailed} onFinish={onFinish}>
                <Form.Item
                    hasFeedback
                    name="fullName"
                    rules={[{
                        pattern: new RegExp("(^[A-Za-z]{1,16})([ ]{0,1})([A-Za-z]{1,16})?([ ]{0,1})?([A-Za-z]{1,16})?([ ]{0,1})?([A-Za-z]{1,16})"),
                        required: true,
                        message: 'Please input your name! Must be in "Firstname Lastname" format'
                    }]}
                >
                    <Input
                        className="input"
                        placeholder="Fullname"
                    />
                </Form.Item>

                <Form.Item
                    hasFeedback
                    name="email"
                    rules={[{
                        type: "email",
                        required: true,
                        message: 'Please input your email!'
                    }]}
                >
                    <Input
                        className="input"
                        placeholder="email"
                    />
                </Form.Item>

                <Form.Item
                    hasFeedback
                    name="hesCode"
                    rules={[{
                        pattern: new RegExp("^[A-Z][0-9][A-Z][0-9]-[0-9][0-9][0-9][0-9]-[0-9][0-9]$"),
                        required: true,
                        message: 'Please input your name! Must be in "A1A1-1111-11" format!'
                    }]}
                >
                    <Input
                        className="input"
                        placeholder="Hes Code"
                    />
                </Form.Item>


                <Button className="btn" disabled={loadingVisitor} htmlType="submit" >Save</Button>
            </Form>
        </div>
    )
}

export default AddVisitor
