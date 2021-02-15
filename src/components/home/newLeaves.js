import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { addLeave } from "../../redux/actions";

export default function NewLeave() {
    const { loggedInDetails } = useSelector(state => state.loginData);
    const [ isSuccess, setSuccess ] = useState(false);
    const dispatch = useDispatch();
    return (
        <div className="jumbotron">
            <h3 className="login-title">Apply for New Leave</h3>
            <div className="container new-leave-container">
                <Formik
                    initialValues={{
                        leaveType: '',
                        startDate: '',
                        endDate: '',
                        leaveCount:0
                    }}
                    validationSchema={Yup.object().shape({
                        leaveType: Yup.string().required('Please select the leave type'),
                        startDate: Yup.date().required('Start date is required'),
                        endDate: Yup.date().required('End date is required'),
                        leaveCount: Yup.number().notRequired()
                    })}
                    onSubmit={(values, { resetForm }) => {
                        const {name, username} = loggedInDetails;
                        dispatch(addLeave({
                            username,
                            ...values,
                            createdBy: name,
                        }));
                        setSuccess(true);
                        resetForm();
                        setTimeout(() => {
                            setSuccess(false);
                        }, 10000);
                    }}
                >
                    {({ errors, touched, setFieldValue, setFieldError, values, isValid }) => {
                        const onFieldChange = (event) => {
                            const { name, value } = event.target;
                            const temp = {
                                ...values,
                                [name] : value
                            }
                            setFieldValue(name, value);
                            if((name === "startDate" || name === "endDate")) {
                                const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                                const firstDate = new Date(temp.endDate);
                                const secondDate = new Date(temp.startDate);
                                const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
                                if(secondDate.getTime() <= firstDate.getTime() && (diffDays + 1) !== values.leaveCount) {
                                    setFieldValue("leaveCount", diffDays + 1);
                                }
                            }
                        }
                        if(touched.endDate && touched.startDate &&!errors.startDate && new Date(values.startDate).getTime() > new Date(values.endDate).getTime()) {
                            setFieldError("startDate", "Start Date should be less than End Date");
                        }
                        return <Form className="col-xs-8 col-xs-offset-2">
                            <div className={`alert alert-success ${isSuccess ? 'invalid-alert-visible' : 'invalid-alert'}`}>{"Leave Requested Successfully"}</div>
                            <div className="form-group">
                                <div className="row">
                                    <label className="col-xs-4">Leave Type</label>
                                    <div className="col-xs-8">
                                        <select name="leaveType" value={values.leaveType} onChange={onFieldChange} className="form-control">
                                            <option value="">-- Select Type --</option>
                                            <option value="Earned Leave">Earned Leave</option>
                                            <option value="Sick Leave">Sick Leave</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-6 col-xs-offset-4">
                                        {touched.leaveType && errors.leaveType && <div className="error-message">{errors.leaveType}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <label className="col-xs-4">Start Date</label>
                                    <div className="col-xs-8">
                                        <Field name="startDate" type="date" className='form-control' onChange={onFieldChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-6 col-xs-offset-4">
                                        {touched.startDate && errors.startDate && <div className="error-message" >{errors.startDate}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <label className="col-xs-4">End Date</label>
                                    <div className="col-xs-8">
                                        <Field name="endDate" type="date" className='form-control' onChange={onFieldChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-6 col-xs-offset-4">
                                        {touched.endDate && errors.endDate && <div className="error-message" >{errors.endDate}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <label className="col-xs-4">Number of Leaves</label>
                                    <div className="col-xs-8">
                                        <Field name="leaveCount" type="number" className='form-control' disabled/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row text-right">
                                    <button type="reset" className="btn btn-link">Cancel</button>
                                    <button type="submit" className="btn btn-primary" disabled={!isValid}>Submit</button>
                                </div>
                            </div>
                        </Form>
                    }}
                </Formik>
            </div>
        </div>)
}