import dispatcher from "./dispatcher";

class Actions {
    addStudent(value) {
        dispatcher.dispatch({
            "type": "ADD_STUDENT",
            value
        });
    }
}


export default new Actions();
