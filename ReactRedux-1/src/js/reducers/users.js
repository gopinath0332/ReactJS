import _ from "lodash";
let defaultState = {"users":[]};
export default function reducer(state = defaultState, action) {
    state = _.clone(state);
    return state;
}