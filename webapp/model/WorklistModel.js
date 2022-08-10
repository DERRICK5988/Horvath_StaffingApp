/* eslint-disable @sap/ui5-jsdocs/no-jsdoc */
sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "horvath/staffingapp/controller/Views"], (function (JSONModel, Views) {
        "use strict";
        return JSONModel.extend("horvath.staffingapp.model.WorklistModel", {
            constructor: function (oPara) {
                let WorklistSetting = {
                    DateState: "None",
                    DateStateText: "",
                    ProjectState: "None",
                    ProjectStateText: ""
                };
                JSONModel.call(this, WorklistSetting);
            }
        });
    }
));
