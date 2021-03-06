import { put, delay, call } from 'redux-saga/effects'
import * as actions from '../actions/index'
import axios from 'axios'
// import localForage from "localforage"

export function* logoutSaga(action) {
    yield call([localStorage, 'removeItem'], "token")
    yield call([localStorage, 'removeItem'], "expirationDate")
    yield call([localStorage, 'removeItem'], "userId")
    yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action) {
    // yield delay(action.expirationTime * 1000)
    console.log('delay time:' + action.expirationTime)
    yield delay(action.expirationTime)
    console.log('[checkAuthTimeoutSaga] token expired!')
    yield put(actions.logout())
}

export function* authUserSaga(action) {
    yield put(actions.authStart())
    let authData = {
        email: action.email,
        password: action.password,
    }
    let url = '/api/auth/login'
    if (action.isSignup) {
        authData = {
            firstName: action.firstName,
            lastName: action.lastName,
            email: action.email,
            password: action.password,
        }
        url = '/api/auth/signup'
    }
    try {
        const response = yield axios.post(url, authData)
        if (action.isSignup) {
            console.log('[authUserSaga] signup success')
            yield put(actions.authSuccess())
            return
        }
        console.log('[authUserSaga] login success')
        const remainingMilliseconds = 60 * 60 * 1000;
        const expirationDate = yield new Date(new Date().getTime() + remainingMilliseconds)
        yield localStorage.setItem('token', response.data.token)
        yield localStorage.setItem('expirationDate', expirationDate)
        yield localStorage.setItem('userId', response.data.userId)
        yield put(actions.authSuccess(response.data.token, response.data.userId))
        yield put(actions.checkAuthTimeout(remainingMilliseconds))
    } catch (error) {
        yield put(actions.authFail(error.response.data))
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token')
    if (!token) {
        yield put(actions.logout())
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'))
        if (expirationDate < new Date()) {
            yield put(actions.logout())
        } else {
            const userId = yield localStorage.getItem('userId')
            yield put(actions.authSuccess(token, userId))
            // console.log('diff = ', expirationDate.getTime() - new Date().getTime())
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime())))
        }
    }
}