import { CHECK_USER, LOG_OUT, ADD_LEAVE, APPROVE_LEAVE } from './actions';
import { usersList, leavesList } from './states';
import { combineReducers } from 'redux';
import moment from 'moment';

const loginData = {
    users: usersList,
    loginStatus: false,
    loggedInDetails: {},
    isInvalidUser: false,
}

export let LoginReducer = (state = loginData, action) => {
    switch (action.type) {
        case CHECK_USER:
            const { username, password } = action.payload;
            const { users } = state;
            const index = users.findIndex((user =>
                user.username === username && user.password === password))
            if (index > -1) {
                const loggedInDetails = { ...users[index] };
                users[index].lastLogged = moment().format('MMMM Do YYYY, h:mm:ss a');
                return {
                    users,
                    loggedInDetails,
                    loginStatus : true,
                    isInvalidUser : false
                }
            }
            return {
                users,
                loggedInDetails : {},
                loginStatus : false,
                isInvalidUser : true
            }
        case LOG_OUT:
            return {
                ...loginData,
                users: state.users
            }
        default:
            return state;
    }
}

export let LeaveReducer = (state = leavesList, action) => {
    switch (action.type) {
        case ADD_LEAVE:
            return state.concat({
                ...action.payload,
                status: 'Pending',
                createdAt: Date.now()
            });
        case APPROVE_LEAVE:
            const temp = [ ...state ];
            const index = temp.findIndex(obj => obj.createdAt === action.payload.createdAt);
            if(index > -1) {
                temp[index].status = 'Approved';
            }
            return temp;
        default:
            return state;
    }
}

export const allReducers = combineReducers({
    loginData: LoginReducer,
    leavesData: LeaveReducer,
})