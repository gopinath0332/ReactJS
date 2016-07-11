var React = require("react"),
    $ = require("jquery");

import {EventEmitter} from "events";
import dispatcher from "./dispatcher";

class Store extends EventEmitter {
    constructor() {
        super();
        this.data = [];
        this.updateStore();
    }
    updateStore() {
        $.ajax({
            url: "students.json",
            dataType: "json",
            cache: false,
            success: (response) => {
                this.data = response;
                this.emit("store_update");
            },
            error: (error) => {
                console.error("Error in fetching table data:::", error);
            }
        });
    }
    getData() {
        return this.data;
    }
    addStudent(student) {
        this.data.splice(0,0,student);
        this.emit("store_update");
    }
    handleDispatcherActions(action) {
        switch (action.type) {
            case "ADD_STUDENT":
                this.addStudent(action.value);
                break;
        }
    }
}

const store = new Store();
window.store = store;

dispatcher.register(store.handleDispatcherActions.bind(store));

export default store;
