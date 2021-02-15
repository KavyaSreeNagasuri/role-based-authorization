import moment from 'moment';
import React from "react";
import { useSelector } from "react-redux";

export default function ApprovedLeaves() {
    const leavesData = useSelector(state => state.leavesData);
    const approvedLeaves = leavesData.filter(leave => leave.status === "Approved");

    return (
        <div className="jumbotron">
            {(approvedLeaves && approvedLeaves.length > 0) ?
            <React.Fragment>
                <h3 className="login-title">List of Approved Leaves</h3>
                <div className="container approved-leaves-container">
                    <div className="table-responsive-xs">
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Created By</th>
                                    <th scope="col">Leave Type</th>
                                    <th scope="col">From Date</th>
                                    <th scope="col">To Date</th>
                                    <th scope="col">Leave Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {approvedLeaves.map((leave, index) => {
                                    return <tr key={`approved-leave-${index}`}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{leave.createdBy}</td>
                                        <td>{leave.leaveType}</td>
                                        <td>{moment(leave.startDate, "YYYY-MM-DD").format("DD-MM-YYYY")}</td>
                                        <td>{moment(leave.endDate, "YYYY-MM-DD").format("DD-MM-YYYY")}</td>
                                        <td>{leave.leaveCount}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
            : <div className="login-title pending-leaves-container">
                <h3>No Approved Leaves</h3>
            </div>
            }
        </div>)
}