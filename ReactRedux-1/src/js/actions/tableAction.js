import axios from "axios";

export function getList() {
    return { "type": "GET_LIST", payload: axios.get("/data/contact.json") };
}

export function filterList(value){
    return { "type": "FILTER_LIST", value };
}


export function showForm(){
	return { type: "SHOW_FORM" };
}


export function hideForm(){
	return { type: "HIDE_FORM" };
}
export function addUser(payload){
	return { type: "ADD_USER" , payload};
}
