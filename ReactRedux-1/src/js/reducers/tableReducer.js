let defaultState = {
    "filter": "",
    "list": []
};
export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case "GET_LIST":
            return {...state };
            break;
        case "GET_LIST_FULFILLED":
            return {...state, list: action.payload.data, filter: "" };
        case "FILTER_LIST":
            return {...state, filter: action.value };
    }
    return state;
}
