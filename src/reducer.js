const defaultState = {
    "currentYear": "2007",
    "currentViolation": "DISORDERLY CONDUCT",
    "currentPrecinct": null,
}

export default function reducer(state = defaultState, action) {
    switch(action.type) {
    case 'UPDATE_YEAR':
        return {...state, currentYear: action.currentYear};
    case 'UPDATE_VIOLATION':
        return {...state, currentViolation: action.currentViolation};
    case 'PRECINCT_HOVER':
        return {...state, currentPrecinct: action.currentPrecinct, mouseX: action.mouseX, mouseY: action.mouseY };
    case 'PRECINCT_UNHOVER':
        return {...state, currentPrecinct: null, mouseX: null, mouseY: null };
    default:
        return state;
    }
}
