/* eslint-disable @sap/ui5-jsdocs/no-jsdoc */
sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "horvath/staffingapp/controller/Views",
    "sap/base/util/UriParameters"
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
        }
    });
}
));