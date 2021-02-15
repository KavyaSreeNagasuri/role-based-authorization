export const CHECK_USER = "CHECK_USER";
export const LOG_OUT = "LOG_OUT";
export const ADD_LEAVE = "ADD_LEAVE";
export const APPROVE_LEAVE = "APPROVE_LEAVE";
export const REJECT_LEAVE = "ADD_LEAVE";

export function checkUser(credentials) {
    return {
        type: CHECK_USER,
        payload: credentials,
    }
}

export function logOut() {
    return {
        type: LOG_OUT
    }
}

export function addLeave(payload) {
    return {
        payload,
        type: ADD_LEAVE
    }
}

export function approveLeave(payload) {
    return {
        payload,
        type: APPROVE_LEAVE
    }
}

export function rejectLeave(payload) {
    return {
        payload,
        type: REJECT_LEAVE
    }
}