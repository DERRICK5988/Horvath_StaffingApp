/* eslint-disable @sap/ui5-jsdocs/no-jsdoc */
/* eslint-disable valid-jsdoc */
sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/library"
],
    function (BaseController, JSONModel, Filter, FilterOperator, CoreLibrary) {
        "use strict";
        // var ValueState = CoreLibrary.ValueState;

        return BaseController.extend("horvath.staffingapp.controller.Worklist", {

            /* =========================================================== */
            /* lifecycle methods                                           */
            /* =========================================================== */

            /**
             * Called when the worklist controller is instantiated.
             * @public
             */
            onInit: function () {
                debugger;
                this.injectMembers();
                // this.oComponent.oControllers.add("header", this);
                // this.oHeaderModel = new r(this.oBundle);
                // this.getView().setModel(this.oHeaderModel, "header");

                // dynamically structure table columns


                // // keeps the search state
                // this._aTableSearchState = [];

                // // Model used to manipulate control states
                // oViewModel = new JSONModel({
                //     worklistTableTitle : this.getResourceBundle().getText("worklistTableTitle"),
                //     shareSendEmailSubject: this.getResourceBundle().getText("shareSendEmailWorklistSubject"),
                //     shareSendEmailMessage: this.getResourceBundle().getText("shareSendEmailWorklistMessage", [location.href]),
                //     tableNoDataText : this.getResourceBundle().getText("tableNoDataText")
                // });
                // this.setModel(oViewModel, "worklistView");

            },

            /* =========================================================== */
            /* event handlers                                              */
            /* =========================================================== */

            /**
             * Triggered by the table's 'updateFinished' event: after new table
             * data is available, this handler method updates the table counter.
             * This should only happen if the update was successful, which is
             * why this handler is attached to 'updateFinished' and not to the
             * table's list binding's 'dataReceived' method.
             * @param {sap.ui.base.Event} oEvent the update finished event
             * @public
             */
            onUpdateFinished: function (oEvent) {
                // update the worklist's object counter after the table update
                var sTitle,
                    oTable = oEvent.getSource(),
                    iTotalItems = oEvent.getParameter("total");
                // only update the counter if the length is final and
                // the table is not empty
                if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
                    sTitle = this.getResourceBundle().getText("worklistTableTitleCount", [iTotalItems]);
                } else {
                    sTitle = this.getResourceBundle().getText("worklistTableTitle");
                }
                this.getModel("worklistView").setProperty("/worklistTableTitle", sTitle);
            },

            /**
             * Event handler when a table item gets pressed
             * @param {sap.ui.base.Event} oEvent the table selectionChange event
             * @public
             */
            onPress: function (oEvent) {
                // The source is the list item that got pressed
                this._showObject(oEvent.getSource());
            },

            /**
             * Event handler for navigating back.
             * Navigate back in the browser history
             * @public
             */
            onNavBack: function () {
                // eslint-disable-next-line sap-no-history-manipulation
                history.go(-1);
            },
            onSearch: function (oEvent) {
                debugger;
                let oProjectDate = this.getView().byId("idProjectDate"),
                    oProject = this.getView().byId("idProject");
                if (!oProjectDate.getValue()) {
                    this.getModel("Worklist").setProperty("/DateState", "Error");
                    this.getModel("Worklist").setProperty("/DateStateText", "Make sure project date is enter");
                    return;
                };
                // if (!oProject.getValue()) {
                //     this.getModel("Worklist").setProperty("/ProjectState", "Error");
                //     this.getModel("Worklist").setProperty("/ProjectStateText", "Make sure project is enter");
                //     return;
                // };
                this.getModel("Worklist").setProperty("/ProjectState", "None");
                this.getModel("Worklist").setProperty("/ProjectStateText", "");
                this.oControllers.table.updateColumns({
                    leadingColumns: !0,
                    timeColumns: true,
                    oWorkListView: this.getView()
                });
            },

            onValueHelpRequested: function (oEvent) {
                var oInput = oEvent.getSource(),
                    oSetValConfig = {
                        bMulti: true,
                        bSupRange: true
                    };
                this._oInput = oInput;
                this.loadValueHelpFragment(oInput, oSetValConfig);
            },

            /**
             * Event handler for refresh event. Keeps filter, sort
             * and group settings and refreshes the list binding.
             * @public
             */
            onRefresh: function () {
                var oTable = this.byId("table");
                oTable.getBinding("items").refresh();
            },

            /* =========================================================== */
            /* internal methods                                            */
            /* =========================================================== */

            /**
             * Shows the selected item on the object page
             * @param {sap.m.ObjectListItem} oItem selected Item
             * @private
             */
            _showObject: function (oItem) {
                this.getRouter().navTo("object", {
                    objectId: oItem.getBindingContext().getPath().substring("/A_EngmntProjRsceDmnd".length)
                });
            },

            /**
             * Internal helper method to apply both filter and search state together on the list binding
             * @param {sap.ui.model.Filter[]} aTableSearchState An array of filters for the search
             * @private
             */
            _applySearch: function (aTableSearchState) {
                // var oTable = this.byId("table"),
                //     oViewModel = this.getModel("worklistView");
                // oTable.getBinding("items").filter(aTableSearchState, "Application");
                // // changes the noDataText of the list in case there are no filter results
                // if (aTableSearchState.length !== 0) {
                //     oViewModel.setProperty("/tableNoDataText", this.getResourceBundle().getText("worklistNoDataWithSearchText"));
                // }
            }

        });
    });
