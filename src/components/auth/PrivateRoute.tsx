import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RouteProps, Navigate } from "react-router-dom";

import { RootState } from "../../store";

interface Props extends RouteProps {
    children: any;
}

const PrivateRoute: FC<Props> = ({ children: Component }) => {
    const { authenticated } = useSelector((state: RootState) => state.auth);

    return authenticated ? Component : <Navigate to="/signin" />
}

export default PrivateRoute;