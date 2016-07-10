var React = require("react"),
    $ = require("jquery");

import {EventEmitter} from "events";

class Store extends EventEmitter {
    constructor() {
        super();
        // this.fetchData();
        this.data = [
            {
                "id": 1,
                "first_name": "Amanda",
                "last_name": "Bishop",
                "email": "abishop0@usa.gov",
                "gender": "Female",
                "ip_address": "95.119.130.234"
            }, {
                "id": 2,
                "first_name": "Annie",
                "last_name": "Matthews",
                "email": "amatthews1@marketwatch.com",
                "gender": "Female",
                "ip_address": "104.18.13.129"
            }, {
                "id": 3,
                "first_name": "Juan",
                "last_name": "Tucker",
                "email": "jtucker2@pbs.org",
                "gender": "Male",
                "ip_address": "76.65.193.243"
            }, {
                "id": 4,
                "first_name": "Joyce",
                "last_name": "Perry",
                "email": "jperry3@simplemachines.org",
                "gender": "Female",
                "ip_address": "47.110.12.26"
            }
        ];
    }
    fetchData() {
        $.ajax({
            url: "students.json",
            dataType: "json",
            cache: false,
            asyc: true,
            success: (response) => {
                this.data = response;
            },
            error: (error) => {
                console.error("Error in fetching table data:::", error);
            }
        });
    }
    getData() {
        return this.data;
    }
}
const store = new Store();
window.store = store;

export default store;
