export const SET_USER = "SET_USER";
export const SIGN_OUT = "SIGN_OUT";
export const CREATE_VISITOR = "CREATE_VISITOR"
export const FETCH_VISITORS = "FETCH_VISITORS"
export const FILTER_VISITORS = "FILTER_VISITORS"
export const SET_ATTEND = "SET_ATTEND";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const SET_SUCCESS = "SET_SUCCESS";

export interface User {
    name: string;
    email: string;
    id: string;
    createdAt: any;
}

export interface Visitor {
    fullName: string;
    email: string;
    hesCode: string;
    isAttented: boolean;
    createdAt: any;
    id: string;
}

export interface AuthState {
    user: User | null;
    authenticated: boolean;
    loading: boolean;
    error: string;
    success: string;
}

export interface VisitorState {
    visitors: Visitor[],
    filteredVisitors: Visitor[],
    loadingVisitor: boolean;
    error: string;
    success: string;
}

export interface SignUpData {
    name: string;
    email: string;
    password: string;
}

export interface SignInData {
    email: string;
    password: string;
}

export interface CreateVisitorData {
    fullName: string,
    email: string,
    hesCode: string
}

//Actions

interface SetUserAction {
    type: typeof SET_USER;
    payload: User;
}

interface SetLoadingAction {
    type: typeof SET_LOADING;
    payload: boolean;
}

interface SignOutAction {
    type: typeof SIGN_OUT;
}

interface SetErrorAction {
    type: typeof SET_ERROR;
    payload: string;
}

interface SetSuccessAction {
    type: typeof SET_SUCCESS;
    payload: string;
}

interface CreateVisitorAction {
    type: typeof CREATE_VISITOR;
    payload: Visitor;
}

interface FetchVisitors {
    type: typeof FETCH_VISITORS;
    payload: Visitor[];
}

interface FilterVisitors {
    type: typeof FILTER_VISITORS;
    payload: string;
}

interface SetAttend {
    type: typeof SET_ATTEND;
    payload: Visitor;
}

export type AuthAction = SetUserAction | SetLoadingAction | SignOutAction | SetErrorAction | SetSuccessAction;
export type VisitorAction = SetLoadingAction | SetErrorAction | SetSuccessAction | CreateVisitorAction | FetchVisitors | FilterVisitors | SetAttend;