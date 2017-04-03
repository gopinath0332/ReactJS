import _ from "lodash";

var bookReducer = (state = [], action) => {
    switch (action.type) {
        case "CREATE_BOOK":
            // state.push(_.assign({}, action.book));
            return [...state,_.assign({}, action.book)];
        default:
            console.debug("no action matched", action);
            return state;
    }
};

export default bookReducer;