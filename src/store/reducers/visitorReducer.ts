import {
    SET_LOADING,
    SET_ERROR,
    SET_SUCCESS,
    CREATE_VISITOR,
    VisitorAction,
    VisitorState,
    FETCH_VISITORS,
    FILTER_VISITORS,
} from '../types'

const initialState: VisitorState = {
    visitors: [{ id: '', fullName: '', hesCode: '', email: '', isAttented: false, createdAt: '' }],
    filteredVisitors: [{ id: '', fullName: '', hesCode: '', email: '', isAttented: false, createdAt: '' }],
    loadingVisitor: false,
    error: '',
    success: '',
}

const VisitorReducer = (state = initialState, action: VisitorAction) => {
    switch (action.type) {
        case CREATE_VISITOR:
            return {
                ...state,
                visitors: [...state.visitors, action.payload],
                filteredVisitors: [...state.visitors, action.payload]
            }
        case FETCH_VISITORS:
            return {
                ...state,
                visitors: action.payload,
                filteredVisitors: action.payload
            }
        case FILTER_VISITORS:
            const value = action.payload
            const filteredValues = state.visitors.filter(data => {
                return data.fullName.toLowerCase().includes(value)
            })
            console.log(filteredValues)
            return {
                ...state,
                filteredVisitors: action.payload === "" ? state.visitors : filteredValues
            }
        case SET_LOADING:
            return {
                ...state,
                loadingVisitor: action.payload
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case SET_SUCCESS:
            return {
                ...state,
                success: action.payload
            }
        default:
            return state;
    }
}

export default VisitorReducer