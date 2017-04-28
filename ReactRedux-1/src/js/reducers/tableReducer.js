import _ from "lodash";

let defaultState = {
	"filter": "",
	"list": [],
	"showForm": false
};

export default function reducer(state = defaultState, action) {
	switch (action.type) {
		case "GET_LIST":
			return { ...state };
		case "GET_LIST_FULFILLED": {
			let list = _.sortBy(action.payload.data, ["name"]);
			return { ...state, list, filter: "" };
		}
		case "FILTER_LIST":
			return { ...state, filter: action.value };
		case "SHOW_FORM":
			return { ...state, showForm: true };
		case "HIDE_FORM":
			return { ...state, showForm: false };
		case "ADD_USER": {
			let list = _.sortBy(state.list.concat([action.payload]), ["name"]);
			return { ...state, showForm: false, list };
		}
	}
	return state;
}
