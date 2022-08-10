/* eslint-disable @sap/ui5-jsdocs/no-jsdoc */
sap.ui.define([
    "sap/ui/model/json/JSONModel", 
    "horvath/staffingapp/controller/Views", 
    "sap/base/util/UriParameters"], (function(e, i, a) {
    "use strict";
    return e.extend("horvath.staffingapp.model.AppModel", {
        constructor: function(i) {
            let r = {
                IsFilterChanged: !1,
                InfoBarItems: [],
                InfoBarFilterCount: 0,
                IsFilterBarOpen: !1,
                IsDisplayMode: !0,
                IsEditMode: !1,
                selectedView: void 0,
                busyIndicatorDelay: 0,
                DevMode: a.fromQuery(window.location.search).has("sap-rm-dev"),
                showTraceMessage: a.fromQuery(window.location.search).has("sap-rm-perf"),
                traceMessage: ""
            };
            e.call(this, r);
        }
    });
}
));
