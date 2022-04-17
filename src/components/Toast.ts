import { notification } from "antd";

export function successToast(content: string) {
    notification['success']({
        message: 'Success',
        description:
            content
    });
};

export function errorToast(content: string) {
    notification['error']({
        message: 'Error',
        description:
            content
    });
};