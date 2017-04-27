import axios from "axios";

export function getList() {
    return { "type": "GET_LIST", payload: axios.get("/data/contact.json") };
};

export function filterList(value){
    return { "type": "FILTER_LIST", value };
};
