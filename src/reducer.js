const defaultState = {
    "currentYear": "CY2007",
    "currentViolation": "DISORDERLY CONDUCT",
}

export default function reducer(state = defaultState, action) {
    switch(action.type) {
    case 'UPDATE_YEAR':
        return {...state, currentYear: action.currentYear};
    case 'UPDATE_VIOLATION':
        return {...state, currentViolation: action.currentViolation};
    default:
        return state;
    }
}
