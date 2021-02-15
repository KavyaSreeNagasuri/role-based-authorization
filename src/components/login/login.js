import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import './login.css';
import { useSelector, useDispatch } from "react-redux";
import { checkUser } from "../../redux/actions";
import { Redirect } from "react-router-dom";

export default function LoginPage() {
    const { isInvalidUser, loginStatus } = useSelector(state => state.loginData);
    const dispatch = useDispatch();

    return loginStatus ? <Redirect to="/home/dashboard" /> : (
        <div className="jumbotron">
            <div className="container">
                <h2 className="login-title">Leave Tracking Application</h2>
                <div className="row">
                    <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2 login-container">
                        <div className={`alert alert-danger ${isInvalidUser ? 'invalid-alert-visible' : 'invalid-alert'}`}>{"Invalid Username (or) Password"}</div>
                        <Formik
                            initialValues={{
                                username: '',
                                password: ''
                            }}
                            validationSchema={Yup.object().shape({
                                username: Yup.string()
                                    .email('Enter valid username')
                                    .required('Username is required'),
                                password: Yup.string()
                                    .min(8, 'Password should be atleast 8 characters long')
                                    .required('Password is required')
                            })}
                            onSubmit={(values) => {
                                setTimeout(() => {
                                    dispatch(checkUser(values));
                                }, 1000);
                            }}
                        >
                            {({ errors, touched, isSubmitting, isValid }) => (
                                <Form>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <Field name="username" type="text" className='form-control' />
                                        {touched.username && errors.username && <div className="error-message" >{errors.username}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <Field name="password" type="password" className='form-control' />
                                        {touched.password && errors.password && <div className="error-message" >{errors.password}</div>}
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>Login</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>)
}