import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import Dashboard from "./dashboard";
import PendingLeaves from "./pendingLeaves";
import ApprovedLeaves from "./approvedLeaves";
import './index.css';
import { logOut } from "../../redux/actions";
import NewLeave from "./newLeaves";
import MyLeaves from "./myleaves";

export default function HomePage() {
    const { loginStatus, loggedInDetails } = useSelector(state => state.loginData);
    const dispatch = useDispatch();
    return (loginStatus ? (
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark home-nav">
            <div className="nav navbar-nav">
                <NavLink to="/home/dashboard" className="nav-link">Dashboard</NavLink>
                {loggedInDetails.role === "ADMIN" && <>
                    <NavLink to="/home/pending" className="nav-link">Pending Leave Requests</NavLink>
                    <NavLink to="/home/approved" className="nav-link">Approved Leaves</NavLink>
                </>}
                {loggedInDetails.role === "USER" && <>
                    <NavLink to="/home/existing" className="nav-link">My Leaves</NavLink>
                    <NavLink to="/home/new" className="nav-link">New Leave</NavLink>
                </>}
            </div>
            <div className="nav navbar-nav navbar-right">
                <button className="nav-link btn-link" onClick={() => dispatch(logOut())}>
                    <i className="material-icons">logout</i>Logout
                </button>
            </div>
        </nav>
        <Switch>
            <Route exact path="/home/dashboard" component={Dashboard} />
            <Route exact path="/home/pending" component={PendingLeaves} />
            <Route exact path="/home/approved" component={ApprovedLeaves} />
            <Route exact path="/home/new" component={NewLeave} />
            <Route exact path="/home/existing" component={MyLeaves} />
        <Redirect from="/home/" to="/home/dashboard" />
      </Switch>
    </div>) : <Redirect to="/login" />)
}