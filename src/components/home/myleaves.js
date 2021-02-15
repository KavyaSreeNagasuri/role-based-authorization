import moment from 'moment';
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function MyLeaves() {
    const { loggedInDetails } = useSelector(state => state.loginData);
    const leavesData = useSelector(state => state.leavesData);

    const getSortedData = () => {
        const userLeaves = leavesData.filter(leave => leave.username === loggedInDetails.username);
        return userLeaves.sort((a, b) => {
            return new Date(a.startDate) - new Date(b.startDate); 
        });
    }
    const sortedLeavesData = getSortedData();

    return (
        <div className="jumbotron">
            {(sortedLeavesData && sortedLeavesData.length > 0) ?
            <React.Fragment>
                <h3 className="login-title">List of Existing Leaves</h3>
                <div className="container existing-leaves-container">
                    <div className="table-responsive-xs">
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Leave Type</th>
                                    <th scope="col">From Date</th>
                                    <th scope="col">To Date</th>
                                    <th scope="col">Leave Count</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedLeavesData.map((leave, index) => {
                                    return <tr key={`my-leave-${index}`}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{leave.leaveType}</td>
                                        <td>{moment(leave.startDate, "YYYY-MM-DD").format("DD-MM-YYYY")}</td>
                                        <td>{moment(leave.endDate, "YYYY-MM-DD").format("DD-MM-YYYY")}</td>
                                        <td>{leave.leaveCount}</td>
                                        <td>{leave.status}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
            : <div className="login-title existing-leaves-container">
                <h3>No Existing Leaves for this user</h3>
                <div><Link to="/home/new">Click here</Link> to create a new leave</div>
            </div>
            }
        </div>)
}