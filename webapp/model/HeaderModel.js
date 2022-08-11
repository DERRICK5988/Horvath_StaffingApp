/* eslint-disable @sap/ui5-jsdocs/no-jsdoc */
sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "horvath/staffingapp/controller/Views",
    "sap/base/util/UriParameters"
// @ts-ignore
], (function (JSONModel, Views, UriParameters) {
    "use strict";
    return JSONModel.extend("horvath.staffingapp.model.HeaderModel", {
        constructor: function (t) {
            let oModel = {
                // kpisBusy: !1,
                // avgUtilization: null,
                // totalResources: null,
                // freeResources: null,
                // overbookedResources: null,
                Views: [{
                    Key: Views.HOUR,
                    Text: t.getText("HOUR")
                }, {
                    Key: Views.DAY,
                    Text: t.getText("DAY")
                }]
            };
            JSONModel.call(this, oModel);
        },
        _ValueHelpconfig: function () {
            return {
                "Project": {
                    "isValueHelp": true,
                    "EntitySet": "PROJENGAGEMENT_SRV>/YY1_PROJENGAGEMENT_SRV",
                    "bSuspend": true,
                    "sTitle": "Project",
                    "aCols": [{
                        "label": "Project ID",
                        "name": "Code",
                        "template": "PROJENGAGEMENT_SRV>Code",
                        "width": "6rem"
                    }, {
                        "label": "Project Name",
                        "name": "Description",
                        "template": "PROJENGAGEMENT_SRV>Description",
                        "width": "20rem"
                    }]
                },
            };
        },
        // @ts-ignore
        get ValueHelpconfig() {
            return this._ValueHelpconfig;
        },
        // @ts-ignore
        set ValueHelpconfig(value) {
            this._ValueHelpconfig = value;
        }
    });
}
));