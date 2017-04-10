import _ from "lodash";
let defaultState = {
    "books": []
};
export default function reducer(state = defaultState, action) {
    state = _.clone(state);
    switch (action.type) {
        case "ADD_BOOK":
            let user = {
                "name": action.payload,
                "id": _.now()
            };
            state.books.push(user);
            break;
        case "GET_BOOKS":
          console.debug("fetchig books");
          console.debug(state);
        break;
        default:
            console.debug("No defaul action handled");
    }
    return state;
}