import axios from "axios";

export default {
//Functions that get/put/post from/to the database

    getCxplacesDistance: function () {
        return axios.get("/api/cxplaces/distance");
    },
    getCxplacesBuy: function () {
        return axios.get("/api/cxplaces/buy");
    },

    getCxplacesSell: function () {
        return axios.get("/api/cxplaces/sell");
    },
 
    getCxplace: function (id) {
        return axios.get("/api/cxplaces/" + id);
    },

    updateCxplace: function (id, obj) {
        return axios.put("/api/cxplaces/" + id, obj);
    }
};
