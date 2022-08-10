sap.ui.define([
    "horvath/staffingapp/base/BaseViewController",
    // "/home/user/projects/staffingapp/webapp/base/BaseViewController",
    "horvath/staffingapp/model/HeaderModel"
], (function(BaseViewController, HeaderModel) {
    "use strict";
    return BaseViewController.extend("horvath.staffingapp.controller.Header", {
        // oDateRangePopoverController: void 0,
        onInit: function() {
            debugger;
            
            this.injectMembers();
            this.oComponent.oControllers.add("header", this);
            this.oHeaderModel = new HeaderModel(this.oBundle);
            this.getView().setModel(this.oHeaderModel, "header");
        }
        // applyVariant: function(e) {
        //     if (this.models.app.setProperty("/selectedView", e.view),
        //     this.models.date.setDataByView(e.view),
        //     "Date Range" !== e.timePeriod.selectedKey) {
        //         this.models.date.setProperty("/timePeriodKey", e.timePeriod.selectedKey);
        //         let t = this.models.date.getDateRangeListItem(e.timePeriod.selectedKey);
        //         if (!t)
        //             throw Error("no date Range for Key" + e.timePeriod.selectedKey);
        //         this.models.date.setProperty("/sFromDate", t.from),
        //         this.models.date.setProperty("/sEndDate", t.to)
        //     } else {
        //         this.models.date.setProperty("/timePeriodKey", e.timePeriod.selectedKey);
        //         let t = new Date(e.timePeriod.fromDate)
        //           , o = new Date(e.timePeriod.toDate);
        //         this.models.date.setProperty("/sFromDate", t),
        //         this.models.date.setProperty("/sEndDate", o)
        //     }
        //     this.oDateRangePopoverController.resetValueState()
        // },
        // formatUtilizationPercentState: i,
        // onDateRangeValueHelp: function(e) {
        //     let t = e.getSource()._getValueHelpIcon();
        //     this.oDateRangePopoverController.openBy(t)
        // },
        // formatTimePeriodText: function(e, t, i, r) {
        //     if (e && t && i && r) {
        //         let a = this.models.date.getDateRangeListItem(t);
        //         if (a)
        //             return a.text + " (" + o.rangeByView(e, i, r) + ")"
        //     }
        // },
        // onViewSelectChange: function(e) {
        //     let t = e.getParameter("item").getKey();
        //     this.models.date.setDataByView(t),
        //     this.oDateRangePopoverController.resetValueState(),
        //     this.oControllers.variant.changeVariant("view", null, t),
        //     this.changeVariantTimePeriod(),
        //     this.oControllers.header.fetchKPI(),
        //     this.oControllers.table.updateColumns({
        //         leadingColumns: !0,
        //         timeColumns: !0
        //     }),
        //     this.oControllers.table.fetchData({
        //         reset: !0
        //     })
        // },
        // changeVariantTimePeriod: function() {
        //     let e = this.models.date.getProperty("/timePeriodKey")
        //       , t = "Date Range" !== e
        //       , o = this.models.date.getProperty("/sFromDate")
        //       , i = this.models.date.getProperty("/sEndDate");
        //     if (o && i) {
        //         let r = t ? null : o.toISOString()
        //           , a = t ? null : i.toISOString();
        //         this.oControllers.variant.changeVariant("timePeriod", "selectedKey", e),
        //         this.oControllers.variant.changeVariant("timePeriod", "fromDate", r),
        //         this.oControllers.variant.changeVariant("timePeriod", "toDate", a)
        //     }
        // },
        // fetchKPI: function() {
        //     this.oHeaderModel.setProperty("/kpisBusy", !0),
        //     this.models.oDataV4.bindList("/" + a.KPI_ENTITY_SET, void 0, void 0, void 0, {
        //         "sap-valid-from": o.dateToEdm(this.models.date.getProperty("/sFromDate")),
        //         "sap-valid-to": o.dateToEdm(this.models.date.getProperty("/sEndDate"))
        //     }).requestContexts(0, 1e4).then((e=>{
        //         this._storeKPI(e),
        //         this.oHeaderModel.setProperty("/kpisBusy", !1)
        //     }
        //     ), (e=>{
        //         this.oControllers.error.handleServiceError(e)
        //     }
        //     ))
        // },
        // _storeKPI: function(e) {
        //     let t = e.length > 0 ? e[0].getObject() : null;
        //     this.oHeaderModel.setProperty("/avgUtilization", t ? t.totalAvgUtilPercentage : 0),
        //     this.oHeaderModel.setProperty("/totalResources", t ? t.resourceCount : 0),
        //     this.oHeaderModel.setProperty("/freeResources", t ? t.freeResourcesCount : 0),
        //     this.oHeaderModel.setProperty("/overbookedResources", t ? t.overstaffedResourcesCount : 0)
        // }
    });
}
));
//# sourceURL=https://cprtrialprod.res.projectscloud.cfapps.eu10.hana.ondemand.com/cp.portal/%3Cunknown%3E/capacityGridUi/capacityGridUi/view/header/Header.controller.js?eval
