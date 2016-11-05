export const defaultState = {
    "currentYear": "2007",
    "currentViolation": "DISORDERLY CONDUCT",
}

export const reducer = (state = defaultState, action) => {
    const actionToState = {
        'UPDATE_YEAR': {...state, currentYear: action.currentYear},
        'UPDATE_VIOLATION': {...state, currentViolation: action.currentViolation},
    };

    return actionToState[action.type] || state;
}
