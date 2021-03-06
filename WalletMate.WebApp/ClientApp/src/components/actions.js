﻿import { Post, Get, PostAnonymous, GetAnonymous } from './Call'
import crypto from 'crypto'

export function setPair(pair) {
    return { type: 'SET_PAIR', pair}
};

export function setConnectedUser(authInfo) {
    return { type: 'SET_CONNECTED_USER', authInfo}
}

export function disconnectUser() {
    return { type: 'SET_CONNECTED_USER', authInfo:null }
}

export function selectUsername(selectedUsername) {
    return { type: 'SELECT_USERNAME', selectedUsername }
}

export function setPeriods(periods) {
    return { type: 'SET_PERIODS', periods}
}

export function openSpendingDialog(periodId) {
    return { type: 'OPEN_SPENDING_DIALOG', periodId}
}

export function openUpdateSpendingDialog(row) {
    return { type: 'OPEN_UPDATE_SPENDING_DIALOG', row }
}

export function searchLoading() {
    return { type: 'SEARCH_LOADING' }
}

export function panelLoading(periodId) {
    return {type: 'PANEL_LOADING', periodId }
}

export function closeSpendingDialog() {
    return { type: 'CLOSE_SPENDING_DIALOG' }
}

export function openRecipeDialog(periodId) {
    return { type: 'OPEN_RECIPE_DIALOG', periodId }
}

export function openUpdateRecipeDialog(row) {
    return { type: 'OPEN_UPDATE_RECIPE_DIALOG', row }
}

export function closeRecipeDialog() {
    return { type: 'CLOSE_RECIPE_DIALOG' }
}

export function closeDeleteOperationDialog() {
    return { type: 'CLOSE_DELETE_OPERATION_DIALOG'}
}

export function openDeleteOperationDialog(periodId, operationId) {
    return { type: 'OPEN_DELETE_OPERATION_DIALOG', periodId, operationId }
}

export function openCreatePeriodPopup() {
    return { type: 'OPEN_CREATE_PERIOD_POPUP' }
}

export function closeCreatePeriodPopup() {
    return { type: 'CLOSE_CREATE_PERIOD_POPUP' }
}

export function setOperations(periodId, operations) {
    return { type: 'SET_OPERATIONS', periodId, operations }
}

export function setBalance(periodId, balance) {
    return { type: 'SET_BALANCE', periodId, balance }
}

export function expandPeriodPanel(periodId) {
    return { type: 'EXPAND_PERIOD_PANEL', periodId }
}

export function showPeriodPanel(periodId) {
    return function (dispatch) {      
        dispatch(panelLoading(periodId));
        dispatch(getOperations(periodId));
        dispatch(getBalance(periodId));
    }
}

export function showLoginMenu(element) {
    return {type:"SHOW_LOGIN_MENU", element }
}

export function showActionMenu(element) {
    return { type: "SHOW_ACTION_MENU", element }
}

export function hideAllMenu() {
    return { type: "HIDE_ALL_MENU" }
}

export function setSearchResult(searchResult) {
    return { type: "SET_SEARCH_RESULT", searchResult }
}

export function collapsePeriodPanel(periodId) {
    return { type: 'COLLAPSE_PERIOD_PANEL', periodId }
}

export function searchOperations(filter) {
    return function (dispatch) {
        dispatch(searchLoading());
        Get('/api/Operation/Search?filter=' + filter)
            .then(response => dispatch(setSearchResult(response.data)))
            .catch((error) => handleError(error, dispatch));
    }
}

export function removeOperation(periodId, operationId) {
    return function(dispatch) {
        Post('/api/Operation/Remove', { periodId, operationId })
            .then(() => {
                dispatch(closeDeleteOperationDialog());
                dispatch(getOperations(periodId));
                dispatch(getBalance(periodId));
            })
            .catch((error) => handleError(error, dispatch));
    }
};

export function createPeriod(month, year) {
    return function(dispatch) {
        Post("/api/Period/Create", { Month: month, Year: year })
            .then(() => {
                dispatch(closeCreatePeriodPopup());
                dispatch(getAllPeriod());
            })
            .catch((error) => handleError(error, dispatch));
    }
}

export function getAllPeriod() {
    return function (dispatch) {
        Get("/api/Period/All")
            .then(response => dispatch(setPeriods(response.data)))
            .catch((error) => handleError(error, dispatch));
    }
}

export function authenticate(login, password) {
    return function (dispatch) {
        const authenticationInfos = {
            Username: login,
            Password: crypto.createHash('sha1').update(password).digest("hex")
        };

        PostAnonymous("/api/Authentication/authenticate", authenticationInfos)
            .then(r => dispatch(setConnectedUser(r.data)))
            .catch((error) => handleError(error, dispatch));
    }
}

export function getPair() {
    return function(dispatch) {
        GetAnonymous("/api/Pair/All")
            .then(r => dispatch(setPair(r.data)))
            .catch((error) => handleError(error, dispatch));
    }
}

export function addRecipe(periodId, amount, label, pair, category) {
    return function(dispatch) {
        Post("/api/Operation/addRecipe", { periodId, amount, label, pair, category })
            .then(() => {
                dispatch(closeRecipeDialog());
                dispatch(getOperations(periodId));
                dispatch(getBalance(periodId));
            })
            .catch((error) => handleError(error, dispatch));
    }
}

export function changeRecipe(periodId, operationId, amount, label, pair, category) {
    return function(dispatch) {
        Post("/api/Operation/changeRecipe", { periodId, operationId, amount, label, pair, category })
            .then(() => {
                dispatch(closeRecipeDialog());
                dispatch(getOperations(periodId));
                dispatch(getBalance(periodId));
            })
            .catch((error) => handleError(error, dispatch));
    }
}

export function addSpending(periodId, amount, label, pair, category) {
    return function (dispatch) {
        Post("/api/Operation/addSpending", { periodId, amount, label, pair, category })
            .then(() => {
                dispatch(closeSpendingDialog());
                dispatch(getOperations(periodId));
                dispatch(getBalance(periodId));
            })
            .catch((error) => handleError(error, dispatch));
    }
}

export function changeSpending(periodId, operationId, amount, label, pair, category) {
    return function (dispatch) {
        Post("/api/Operation/changeSpending", { periodId, operationId, amount, label, pair, category })
            .then(() => {
                dispatch(closeSpendingDialog());
                dispatch(getOperations(periodId));
                dispatch(getBalance(periodId));
            })
            .catch((error) => handleError(error, dispatch));
    }
}

export function getOperations(periodId) {
    return function(dispatch) {
        Get("/api/Operation/All?periodId=" + periodId)
            .then(response => dispatch(setOperations(periodId, response.data)))
            .catch((error) => handleError(error, dispatch));
    }
}

export function getBalance(periodId) {
    return function(dispatch) {
        Get("/api/Period/Balance?periodId=" + periodId)
            .then(r => dispatch(setBalance(periodId, r.data)))
            .catch((error) => handleError(error, dispatch));
    }
}

function handleError(error, dispatch) {
    if(!error.response)
        alert("Handle error : " + error);
    else if (error.response.status === 401)
        dispatch(disconnectUser());
}