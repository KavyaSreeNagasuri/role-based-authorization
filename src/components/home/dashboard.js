import React from "react";
import { useSelector } from "react-redux";

export default function Dashboard() {
    const { loggedInDetails } = useSelector(state => state.loginData);
    const leavesData = useSelector(state => state.leavesData);

    const pendingLeaves = leavesData.filter(leave => leave.status === "Pending");
    const approvedLeaves = leavesData.filter(leave => leave.status === "Approved");

    return (
        <div className="jumbotron">
            <h3 className="login-title">Leave Tracking Application Dashboard</h3>
            <div className="login-title">{`Welcome, ${loggedInDetails.name}`}</div>
            <div className="container dashboard-container">
                {loggedInDetails.role === "ADMIN" && (
                <div className="row">
                    <div className="col-xs-6 col-xs-offset-4">
                        <div className="row">
                            <label className="col-xs-6">Number of Pending Leaves</label>
                            <span className="col-xs-6">: {pendingLeaves.length}</span>
                        </div>
                        <div className="row">
                            <label className="col-xs-6">Number of Approved Leaves</label>
                            <span className="col-xs-6">: {approvedLeaves.length}</span>
                        </div>
                        <div className="row">
                            <label className="col-xs-6">Last LoggedIn</label>
                            <span className="col-xs-6">: {loggedInDetails.lastLogged ? loggedInDetails.lastLogged : 'Not Available'}</span>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>)
}