/* eslint-disable valid-jsdoc */
/* eslint-disable @sap/ui5-jsdocs/no-jsdoc */
sap.ui.define([
    "horvath/staffingapp/base/BaseViewController",
    "sap/ui/model/json/JSONModel",
    "horvath/staffingapp/model/HeaderModel",
    "sap/ui/core/Fragment",
    "sap/ui/comp/filterbar/FilterBar",
    "sap/ui/comp/filterbar/FilterGroupItem",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/SearchField",
    "sap/m/ColumnListItem",
    "sap/m/Label",
    "sap/m/Token",
    "sap/m/Input",
    "sap/m/StandardListItem",
    "sap/ui/model/type/String"
], (function (BaseViewController, JSONModel, HeaderModel, Fragment, FilterBar, FilterGroupItem, Filter, FilterOperator,
    SearchField, ColumnListItem, Label, Token, Input, StandardListItem, String) {
    "use strict";
    return BaseViewController.extend("horvath.staffingapp.controller.Header", {
        // oDateRangePopoverController: void 0,
        onInit: function () {
            
            let oProjectDate = this.getView().byId("idProjectDate"),
                preMth = new Date(new Date().setMonth(new Date().getMonth() - 1)),
                pMth = new Date(new Date().setMonth(new Date().getMonth() - 1)),
                nMth = new Date(pMth.setMonth(pMth.getMonth() + 3));
            this.injectMembers();
            this.oComponent.oControllers.add("header", this);
            this.oHeaderModel = new HeaderModel(this.oBundle);
            this.getView().setModel(this.oHeaderModel, "header");
            oProjectDate.setDateValue(preMth);
            oProjectDate.setSecondDateValue(nMth);
            
            //Tempopary
            // this.getView().byId("idProject");
            this.getView().byId("idProject").addToken(new Token({
                key: "DE10SI21100023",
                text: "One ERP"
            }));
        },
        onValueHelpRequested: function (oEvent, skey) {
            
            var oValueHelpModel = this.oComponent.oControllers.header.oHeaderModel.ValueHelpconfig()[skey],
                aCols = oValueHelpModel.aCols;
            this._oInput = oEvent.getSource();
            Fragment.load({
                name: [this.oBundle.getText("fragmentPath"), "ValueHelpDialog"].join(""),
                controller: this
            }).then(function name(oFragment) {
                this.oValueHelpDialogue = oFragment;
                this.getView().addDependent(this.oValueHelpDialogue);
                this.oValueHelpDialogue.setTitle(oValueHelpModel.sTitle);
                this.oValueHelpDialogue.setKey("Code");
                this.oValueHelpDialogue.setDescriptionKey("Description");
                this.oValueHelpDialogue.setSupportMultiselect(true);
                this.oValueHelpDialogue.setFilterBar(
                    new FilterBar({
                        advancedMode: false,
                        filterBarExpanded: true,
                        search: this._onFilterBarSearch.bind(this),
                        isRunningInValueHelpDialog: true,
                        showFilterConfiguration: false,
                        filterGroupItems: aCols.map(function (oColumn) {
                            return new FilterGroupItem({
                                groupName: "__$INTERNAL$",
                                name: oColumn.name,
                                label: oColumn.label,
                                visibleInFilterBar: true,
                                control: new Input({
                                    name: oColumn.name
                                })
                            });
                        }),
                        basicSearch: new SearchField({
                            showSearchButton: true,
                            width: "77%",
                            search: this._onFilterBarSearch.bind(this)
                        })
                    })
                );
                //     if (oSetValConfig.bSupRange) {
                //         this.oValueHelpDialogue.setSupportRanges(oSetValConfig.bSupRange);
                //         this.oValueHelpDialogue.setRangeKeyFields([{
                //             label: "Code",
                //             key: "code",
                //             type: "string"
                //         }]);
                //         this.oValueHelpDialogue.setIncludeRangeOperations([ValueHelpRangeOperation.EQ], "string");
                //     }
                var oBindingInfo = {
                    path: oValueHelpModel.EntitySet,
                    filters: [],
                    suspended: oValueHelpModel.bSuspend
                },
                    aFilters = [];
                if (aFilters.length > 0) {
                    oBindingInfo.filters.push(new Filter({
                        filters: aFilters,
                        and: oValueHelpModel.bAnd
                    }));
                }
                this.oValueHelpDialogue.getTableAsync().then(function (oTable) {
                    oTable.setEnableSelectAll(false);
                    oTable.setModel(new JSONModel({
                        cols: aCols
                    }), "columns");
                    if (oTable.bindRows) {
                        oTable.bindAggregation("rows", oBindingInfo);
                    }
                    if (oTable.bindItems) {
                        oTable.bindAggregation("items", oBindingInfo, function () {
                            return new ColumnListItem({
                                cells: aCols.map(function (column) {
                                    return new Label({
                                        text: "{" + column.template + "}"
                                    });
                                })
                            });
                        });
                    }
                    this.oValueHelpDialogue.update();
                }.bind(this));
                this.oValueHelpDialogue.open();
            }.bind(this));
        },

        /**
		 * Trigger from onValueHelpRequested event
		 * @private
		 */
        _onFilterBarSearch: function () {
            var oFilterBar = this.oValueHelpDialogue.getFilterBar();
            var sSearchQuery = oFilterBar.getBasicSearchValue();
            var aFilterItems = oFilterBar.getFilterGroupItems();
            var aBasicFilters = [];
            var aFilters = [];
            aFilterItems.map(function (oItem) {
                if (sSearchQuery) {
                    aBasicFilters.push(
                        new Filter(oItem.getName(), FilterOperator.Contains, sSearchQuery)
                    );
                }
                if (oItem.getControl().getValue()) {
                    aFilters.push(
                        new Filter(oItem.getName(), (oItem.getControl().getProperty("name") === "Code" ? FilterOperator.EQ : FilterOperator.Contains),
                            oItem.getControl().getValue()
                        )
                    );
                }
            });
            if (aBasicFilters.length > 0) {
                aFilters.push(
                    new Filter({
                        filters: aBasicFilters,
                        and: false
                    })
                );
            }
            this.oValueHelpDialogue.getTableAsync().then(function (oTable) {
                if (oTable.getBinding("items")) {
                    oTable.getBinding("items").filter(aFilters);
                    if (oTable.getBinding("items").bSuspended) {
                        oTable.getBinding("items").resume();
                    }
                } else {
                    oTable.getBinding("rows").filter(aFilters);
                    if (oTable.getBinding("rows").bSuspended) {
                        oTable.getBinding("rows").resume();
                    }
                }
            });
        },
        onValueHelpOkPress: function (oEvent) {
            var aTokens = oEvent.getParameter("tokens");
            if (aTokens.length > 0) {
                this._oInput.setTokens(aTokens);
            }
            oEvent.getSource().close();
        },
        onValueHelpCancelPress: function (oEvent) {
            oEvent.getSource().close();
        },

        /**
		 * Event handler when press cancel button for value help
		 * @public
		 */
        onValueHelpAfterClose: function (oEvent) {
            oEvent.getSource().close();
        },

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