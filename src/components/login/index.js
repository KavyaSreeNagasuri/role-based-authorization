import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginPage from "./login";

export default function LoginComponent(props) {
    const { loginStatus } = useSelector(state => state.loginData);

    return <React.Fragment>
        {loginStatus ? <Redirect to='/home/dashboard' /> : <LoginPage /> }
    </React.Fragment>
}