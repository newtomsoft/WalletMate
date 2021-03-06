﻿import rootReducer from './rootReducer'
import {
    setPair, setPeriods, openSpendingDialog, openRecipeDialog,
    setOperations, setBalance, setConnectedUser,
    disconnectUser, showActionMenu, showLoginMenu,
    hideAllMenu, panelLoading
} from './actions'

var redux;

beforeEach(() => {
    redux = new Redux();
});


test("Reducer should set pair when calling SET_PAIR",
    () => {
        redux.dispatch(setPair({ firstPairName: "aurelien", secondPairName: "marie" }));
        expect(redux.state.firstPairName).toBe("aurelien");
        expect(redux.state.secondPairName).toBe("marie");
    });


test("Reducer should set periods when callin SET_PERIODS",
    () => {
        var periods = ["Janvier 2017", "Février 2017", "Mars 2017"];

        redux.dispatch(setPeriods(periods));

        expect(redux.state.periods).toHaveLength(3);
        expect(redux.state.periods).toContain("Janvier 2017");
        expect(redux.state.periods).toContain("Février 2017");
        expect(redux.state.periods).toContain("Mars 2017");
    });

test("Reducer should dispatch two elements",
    () => {
        const periodId = '2007-01';
        redux.dispatch(openSpendingDialog(periodId));
        redux.dispatch(openRecipeDialog(periodId));

        expect(redux.state.spendingDialog).toEqual({ isOpen: true, periodId:periodId, data:null});
        expect(redux.state.recipeDialog).toEqual({ isOpen: true, periodId: periodId, data: null });
        expect(redux.state.periods).toEqual([]);
    });

test("Set operation when calling SET_OPERATIONS",
    () => {
        const periodId = "2007-01";
        const operations = [{ test: "1234" }];

        redux.dispatch(setOperations(periodId, operations));

        expect(redux.state.periodsData[periodId].operations).toEqual(operations);
        expect(redux.state.periodsData[periodId].balance).toBeNull();
    });

test("Set balance when calling SET_BALANCE",
    () => {
        const periodId = "2007-01";
        const balance = { by:"Aurelien", amountDue:100}

        redux.dispatch(setBalance(periodId, balance));
        expect(redux.state.periodsData[periodId].balance).toEqual(balance);
        expect(redux.state.periodsData[periodId].operations).toEqual([]);
    });

test("Set panelLoading when calling PANEL_LOADDING",
    () => {
        const periodId = "2007-01";
        redux.dispatch(panelLoading(periodId));
        expect(redux.state.periodsData[periodId].isLoading).toBe(true);
    });

test("Set operations and balance when calling each other",
    () => {
        const periodId = "2007-01";
        const operations = [{ test: "1234" }];
        const balance = { by: "Aurelien", amountDue: 100 }

        redux.dispatch(setOperations(periodId, operations));
        redux.dispatch(setBalance(periodId, balance));

        expect(redux.state.periodsData[periodId].operations).toEqual(operations);
        expect(redux.state.periodsData[periodId].balance).toEqual(balance);

    });

test("Set operations and balance when calling each other inverted",
    () => {
        const periodId = "2007-01";
        const operations = [{ test: "1234" }];
        const balance = { by: "Aurelien", amountDue: 100 }

        redux.dispatch(setBalance(periodId, balance));
        redux.dispatch(setOperations(periodId, operations));

        expect(redux.state.periodsData[periodId].operations).toEqual(operations);
        expect(redux.state.periodsData[periodId].balance).toEqual(balance);

    });

test("connectedUser should be in localStorage",
    () => {
        const user = { username: "Aurelien", authKey: "1234" };
        localStorage.clear();
        redux.dispatch(setConnectedUser(user));
        expect(redux.state.connectedUser).toEqual(user);
        expect(JSON.parse(localStorage.getItem('connectedUser'))).toEqual(user);
    });

test("reset connected user should clear state and local storage",
    () => {
        const user = { username: "Aurelien", authKey: "1234" };
        redux.dispatch(setConnectedUser(user));
        redux.dispatch(disconnectUser());

        expect(redux.state.connectedUser).toBeNull();
        expect(localStorage.getItem('connectedUser')).toBe("null");
    });

test("showActionMenu should set anchorActionMenu",
    () => {
        redux.dispatch(showActionMenu("menu"));
        expect(redux.state.mainMenu.anchorActionMenu).toBe("menu");
    });

test("showLoginMenu should set anchorLoginMenu",
    () => {
        redux.dispatch(showLoginMenu("menu"));
        expect(redux.state.mainMenu.anchorLoginMenu).toBe("menu");
    });

test("HideAllMenu should set anchorLoginMenu and anchorActionMenu to null",
    () => {
        redux.dispatch(hideAllMenu());
        expect(redux.state.mainMenu.anchorLoginMenu).toBeNull();
        expect(redux.state.mainMenu.anchorActionMenu).toBeNull();
    });


function Redux() {
    Redux.prototype.dispatch = (action) => this.state = rootReducer(this.state, action);    
}
