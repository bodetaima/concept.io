import {app, auth} from "../actions/actionTypes";
import Cookies from "../../utils/cookies";

const profile = JSON.parse(localStorage.getItem("_p_traits"));

const authInitialState = {
    getProfilesPending: false,
    createProfilePending: false,
    chooseProfilePending: false,
    loggedIn: Cookies.checkCookie("_p_logged_in"),
    profiles: [],
    profile: profile ? profile : {},
    getProfilesError: null,
    createProfileError: null,
    chooseProfileError: null,
};

function authReducers(state = authInitialState, action) {
    const { type, payload } = action;
    switch (type) {
        case auth.GET_PROFILES:
            return {
                ...state,
                getProfilesPending: true,
            };
        case auth.GET_PROFILES_SUCCESS:
            return {
                ...state,
                getProfilesPending: false,
                getProfilesError: null,
                profiles: payload,
            };
        case auth.GET_PROFILES_FAILED:
            return {
                ...state,
                getProfilesPending: false,
                getProfilesError: payload,
            };
        case auth.CREATE_PROFILE:
            return {
                ...state,
                createProfilePending: true,
            };
        case auth.CREATE_PROFILE_SUCCESS:
            return {
                ...state,
                createProfilePending: false,
                createProfileError: null,
            };
        case auth.CREATE_PROFILE_FAILED:
            return {
                ...state,
                createProfilePending: false,
                createProfileError: payload,
            };
        case auth.CHOOSE_PROFILE:
            return {
                ...state,
                chooseProfilePending: true,
            };
        case auth.CHOOSE_PROFILE_SUCCESS:
            return {
                ...state,
                chooseProfilePending: false,
                profile: payload,
                chooseProfileError: null,
                loggedIn: true,
            };
        case auth.CHOOSE_PROFILE_FAILED:
            return {
                ...state,
                chooseProfilePending: false,
                chooseProfileError: payload,
            };
        case auth.LOGOUT:
            return {
                ...state,
                loggedIn: false,
                profiles: [],
                profile: {},
            };
        default:
            return state;
    }
}

const appInitialState = {
    drawerState: false,
    profileCreatorState: false,
};

function appReducers(state = appInitialState, action) {
    const { type } = action;
    switch (type) {
        case app.OPEN_DRAWER:
            return {
                drawerState: true,
            };
        case app.CLOSE_DRAWER:
            return {
                drawerState: false,
            };
        case app.OPEN_PROFILE_CREATOR:
            return {
                profileCreatorState: true,
            };
        case app.CLOSE_PROFILE_CREATOR:
            return {
                profileCreatorState: false,
            };
        default:
            return state;
    }
}

export { authReducers, appReducers };
