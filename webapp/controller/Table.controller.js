// [
// "./BaseController",
// "capacityGridUi/capacityGridUi/view/quickView/ResourceQuickView.controller", 
// "capacityGridUi/capacityGridUi/view/persoDialog/PersoDialog.controller", 
// "capacityGridUi/capacityGridUi/view/table/TableExport", 
// "capacityGridUi/capacityGridUi/view/table/DataManager", 
// "capacityGridUi/capacityGridUi/view/table/TableShowRow", 
// "capacityGridUi/capacityGridUi/view/table/TableFetch", 
// "capacityGridUi/capacityGridUi/view/table/TimeColumnsMap", 
// "capacityGridUi/capacityGridUi/view/Views", 
// "sap/m/MessageToast",
// "sap/m/MessageBox",
// "horvath/staffingapp/controller/table/TableColumnUpdate"
// ],
//  (function (e, t, o, i, n, a, s, r, l, h, d, c)
/* eslint-disable @sap/ui5-jsdocs/no-jsdoc */
sap.ui.define([
    "./BaseController",
    // "capacityGridUi/capacityGridUi/view/quickView/ResourceQuickView.controller", 
    // "capacityGridUi/capacityGridUi/view/persoDialog/PersoDialog.controller", 
    // "capacityGridUi/capacityGridUi/view/table/TableExport", 
    // "capacityGridUi/capacityGridUi/view/table/DataManager", 
    // "capacityGridUi/capacityGridUi/view/table/TableShowRow", 
    // "capacityGridUi/capacityGridUi/view/table/TableFetch", 
    "./table/TableColumnUpdate",
    "./table/TableFetch",
    "./table/TimeColumnsMap",
    // "capacityGridUi/capacityGridUi/view/Views", 
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
],
    (function (BaseController, TableColumnUpdate, TableFetch, TimeColumnsMap, MessageToast, MessageBox, JSONModel) {
        "use strict";
        return BaseController.extend("horvath.staffingapp.controller.Table", {
            oTable: null,
            oResourceQuickViewController: void 0,
            oPersoDialogController: void 0,
            oTableFetch: void 0,
            oTableExport: void 0,
            oTableColumnUpdate: void 0,
            oTimeColumnsMap: void 0,
            onInit: function () {

                this.injectMembers();
                this.oComponent.oControllers.add("table", this);
                this.getView().setModel(new JSONModel(this.oComponent.oControllers.table.models.table.getData()), "table");
                this.oTable = this.byId("idTreeTable");
                // this.oTable.setModel(this.models.table);
                this.oTable.setModel(this.oComponent.getModel());

                // this.oTable.bindRows({
                //     path: "/WorkPackageSet",
                //     parameters: {
                //         arrayNames: ["WorkPackageSet"],
                //         // numberOfExpandedLevels: 1
                //         countMode: "Inline",
                //         operationMode: "Server",
                //         // treeAnnotationProperties: {
                //         //     hierarchyLevelFor: "0",
                //         //     hierarchyNodeFor: "WorkPackageID",
                //         //     hierarchyParentNodeFor: "WorkPackageID",
                //         //     hierarchyDrillStateFor: "expanded"
                //         // }
                //     }
                // });

                this.oTableColumnUpdate = new TableColumnUpdate(this);
                // Logic from apply variant (temporary)
                this.models.table.setProperty("/sortOrder", BaseController.sortOrder);
                this.models.table.setProperty("/sortProperty", BaseController.sortProperty);
                this.updateColumns({
                    leadingColumns: !0,
                    timeColumns: false
                });
                this.oTableFetch = new TableFetch(this);
                // this.oTableExport = new i(this),
                // this.oTableShowRow = new a(this)
            },
            // onExit: function () {
            //     this.oResourceQuickViewController.destroy();
            //         this.oPersoDialogController.destroy();
            // },
            updateColumns: function (e) {

                let t = this.models.app.getProperty("/selectedView"),
                    oHdr = this.oComponent.oControllers.header,
                    oHdrView = oHdr.getView();

                // Set Logic manually on month
                let oProjectDate = oHdrView.byId("idProjectDate"),
                    dSDate = oProjectDate.getProperty("dateValue"),
                    dEDate = oProjectDate.getProperty("secondDateValue");
                this.oTimeColumnsMap = new TimeColumnsMap(this.oBundle, t, dSDate, dEDate);
                // Check search is clicked
                // this.oTable.bindRows({
                //     path: "/WorkPackageSet",
                //     parameters: {
                //         arrayNames: ["WorkPackageSet"],
                //         // numberOfExpandedLevels: 1
                //         countMode: "Inline",
                //         operationMode: "Server",
                //         // treeAnnotationProperties: {
                //         //     hierarchyLevelFor: "0",
                //         //     hierarchyNodeFor: "WorkPackageID",
                //         //     hierarchyParentNodeFor: "WorkPackageID",
                //         //     hierarchyDrillStateFor: "expanded"
                //         // }
                //     }
                // });

                // if (e.timeColumns && oHdrView) {
                //     let oProjectDate = e.oWorkListView.byId("idProjectDate"),
                //         dSDate = oProjectDate.getProperty("dateValue"),
                //         dEDate = oProjectDate.getProperty("secondDateValue");
                //     this.oTimeColumnsMap = new TimeColumnsMap(this.oBundle, t, dSDate, dEDate);
                //     // this.oTable.bindRows({
                //     //     path: "/WorkPackageSet",
                //     //     parameters: {
                //     //         arrayNames: ["WorkPackageSet"],
                //     //         // numberOfExpandedLevels: 1
                //     //         countMode: "Inline",
                //     //         operationMode: "Server",
                //     //         // treeAnnotationProperties: {
                //     //         //     hierarchyLevelFor: "0",
                //     //         //     hierarchyNodeFor: "WorkPackageID",
                //     //         //     hierarchyParentNodeFor: "WorkPackageID",
                //     //         //     hierarchyDrillStateFor: "expanded"
                //     //         // }
                //     //     }
                //     // });
                // }
                this.oTableColumnUpdate.update(t, this.oTimeColumnsMap);
            },
            fetchData: function (e) {
                this.oTableFetch.fetchData(e.reset, this.oTimeColumnsMap);
            },
            // applyVariant: function (e) {
            //     this.models.table.setProperty("/sortOrder", e.sortOrder),
            //         this.models.table.setProperty("/sortProperty", e.sortProperty),
            //         this.oControllers.header.fetchKPI(),
            //         this.updateColumns({
            //             leadingColumns: !0,
            //             timeColumns: !0
            //         }),
            //         this.fetchData({
            //             reset: !0
            //         })
            // },
            // onSort: function (e) {
            //     e.preventDefault();
            //     let t = e.getParameter("column")
            //         , o = e.getParameter("sortOrder")
            //         , i = t.getSortProperty();
            //     this.models.table.setProperty("/sortOrder", o),
            //         this.models.table.setProperty("/sortProperty", i),
            //         this.oControllers.variant.changeVariant("sortOrder", null, o),
            //         this.oControllers.variant.changeVariant("sortProperty", null, i),
            //         this.fetchData({
            //             reset: !0
            //         })
            // },
            // onExpandRow: function (e) {
            //     let t = e.getParameter("expanded")
            //         , o = e.getParameter("rowContext");
            //     if (t) {
            //         let t = e.getParameter("rowIndex");
            //         this.oTable.collapse(t),
            //             this.models.table.setProperty("/busy", !0),
            //             this.models.table.setProperty("/resetBusyOnRowUpdated", !1),
            //             this.oTableFetch.fetchAssignments(o).then((() => {
            //                 this.oTable.expand(t),
            //                     this.models.table.setProperty(o.getPath() + "/expanded", !0),
            //                     this.models.table.setProperty("/busy", !1)
            //             }
            //             ))
            //     } else
            //         this.models.table.setProperty(o.getPath() + "/expanded", !1)
            // },
            // handleColumnMenuOpen: function (e) {
            //     this.models.app.getProperty("/IsEditMode") && (e.preventDefault(),
            //         d.show(this.oBundle.getText("SAVE_CHANGES_TO_PROCEED")))
            // },
            // handleEmployeeQuickViewPress: function (e) {
            //     let t = e.getSource();
            //     this.oResourceQuickViewController.openEmployee(t)
            // },
            // handleAssignmentQuickViewPress: function (e) {
            //     let t = e.getSource();
            //     this.oResourceQuickViewController.openAssignment(t)
            // },
            // formatTitle: function (e) {
            //     if (null != e)
            //         return this.oBundle.getText("RESOURCES", [e])
            // },
            // // onScroll: function (e) {
            // //     this.oTableFetch.fetchOnScroll(e)
            // // },
            // onColumnResize: function (e) {
            //     let t = e.getParameter("column")
            //         , o = e.getParameter("width")
            //         , i = t.getId()
            //         , n = this.oControllers.table.getView().getId();
            //     i === n + "--idNameLabel" ? this.oControllers.variant.changeVariant("nameColumnWidth", null, o) : i === n + "--idDeliveryOrgLabel" ? this.updateVariantColumnWidth("deliveryOrg", o) : i === n + "--idCostCenterLabel" ? this.updateVariantColumnWidth("costCenter", o) : i === n + "--idStaffingHrs" ? this.updateVariantColumnWidth("staffingHrs", o) : i === n + "--idStaffingSummary" ? this.updateVariantColumnWidth("staffingSummary", o) : i === n + "--idAssignmentStatus" && this.updateVariantColumnWidth("assignmentStatus", o)
            // },
            // updateVariantColumnWidth: function (e, t) {
            //     let o = this.oControllers.variant.getVariant().columns;
            //     for (let i = 0; i < o.length; i++) {
            //         let n = o[i];
            //         if (n.columnKey === e)
            //             return n.width = t,
            //                 void this.oControllers.variant.changeVariant("columns", null, o)
            //     }
            //     throw Error("column not found " + e)
            // },
            // onOpenPersoDialog: function (e) {
            //     this.oPersoDialogController.open()
            // },
            // onExportToExcel: function (e) {
            //     this.oTableExport.export()
            // },
            // onToggleFilter: function (e) {
            //     this.oControllers.page.toggleFilter()
            // },
            handleEmployeeDetailPress: function (oEvent) {
                debugger;
                this.getOwnerComponent().getRouter().navTo("EmployeeDetail");
            },
            onEdit: function (oEvent) {
                debugger;
                // this.oComponent.oControllers.page.toggleEditMode();
                this.getView().getModel("table").setProperty("/btnVisible", false);
                this.getView().getModel("table").setProperty("/isInputVisible", true);
                this.getModel("table").setProperty("/isInputVisible", true);
                this.getView().getModel("table").updateBindings(true);
                this.getView().getModel("table").refresh(true);
                this.getModel("table").refresh(true);
            },
            onSave: function (oEvent) {
                this.getView().getModel("table").setProperty("/btnVisible", true);
                this.getView().getModel("table").setProperty("/isInputVisible", false);
                this.getModel("table").setProperty("/isInputVisible", false);
                this.getView().getModel("table").updateBindings(true);
                this.getView().getModel("table").refresh(true);
                this.getModel("table").refresh(true);
            },
            onCancel: function (oEvent) {
                this.getView().getModel("table").setProperty("/btnVisible", true);
                this.getView().getModel("table").setProperty("/isInputVisible", false);
                this.getView().getModel("table").updateBindings();
                this.getView().getModel("table").refresh();
            }
            // showRow: function (e) {
            //     this.oTableShowRow.showRow(e)
            // },
            // onRowSelectionChange: function (e) {
            //     let t = this.oTable.getSelectedIndices().length > 0;
            //     this.models.table.setProperty("/rowsSelected", t)
            // },
            // _getSelectedAssignmentPaths: function () {
            //     let e = [];
            //     return this.oTable.getSelectedIndices().forEach((t => {
            //         let o = this.oTable.getContextByIndex(t)
            //             , i = o.getObject()
            //             , n = o.getPath();
            //         i.child ? i.utilization.length > 0 && i.asgId && e.push(n) : i.assignments && i.assignments.forEach((t => {
            //             t.asgId && e.push(n)
            //         }
            //         ))
            //     }
            //     )),
            //         e
            // },
            // onRevertSelected: function () {
            //     let e = this._getSelectedAssignmentPaths();
            //     0 === e.length ? d.show(this.oBundle.getText("NO_ASSIGNMENTS_CHANGED")) : this._atLeastOneAssignmentChanged(e) ? c.confirm(this.oBundle.getText("DISCARD_SELECTED_CONFIRM"), function (t) {
            //         "OK" === t && this.oControllers.page.revertSelectedAssignments(e)
            //     }
            //         .bind(this)) : c.information(this.oBundle.getText("SELECTED_ASSIGNMENTS_NOT_CHANGED"))
            // },
            // onSaveSelected: function () {
            //     let e = this._getSelectedAssignmentPaths();
            //     0 === e.length ? d.show(this.oBundle.getText("NO_ASSIGNMENTS_CHANGED")) : this._atLeastOneAssignmentChanged(e) ? this.oControllers.page.saveAssignments(e, !1) : c.information(this.oBundle.getText("SELECTED_ASSIGNMENTS_NOT_CHANGED"))
            // },
            // _atLeastOneAssignmentChanged: function (e) {
            //     for (let t of e) {
            //         if (this.models.table.getProperty(t).changed)
            //             return !0
            //     }
            //     return !1
            // },
            // onRowsUpdated: function () {
            //     this.oTableFetch.onRowsUpdated()
            // },
            // onInfoBar: function (e) {
            //     this.models.app.getProperty("/IsDisplayMode") && this.oControllers.page.toggleFilter()
            // },
            // formatInfoBarText: function (e, t) {
            //     if (e && t) {
            //         let o = "";
            //         return o = e <= 1 ? this.oBundle.getText("FILTER_ACTIVE", [e]) + ": " : this.oBundle.getText("FILTERS_ACTIVE", [e]) + ": ",
            //             t.forEach((function (e, i) {
            //                 i !== t.length - 1 ? o += e + ", " : o += e
            //             }
            //             )),
            //             o
            //     }
            // },
            // onCloseFilterBar: function () {
            //     this.byId("idFilterToggleButton").focus()
            // }
        });
    }
    ));
