/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable @sap/ui5-jsdocs/no-jsdoc */
sap.ui.define([
    "horvath/staffingapp/base/BaseViewChildController",
    "sap/ui/core/format/DateFormat",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/m/MessageToast",
    // "capacityGridUi/capacityGridUi/view/Views", 
    // "capacityGridUi/capacityGridUi/view/table/TableRowTransformation", 
    // "capacityGridUi/capacityGridUi/view/table/DraftActions", 
    // "capacityGridUi/capacityGridUi/utils/Utils", 
    // "capacityGridUi/capacityGridUi/utils/DateFormatter", 
    // "capacityGridUi/capacityGridUi/utils/ODataEntities"
],
    // (function (BaseViewChildController, t, s, r, o, a, i, n, l, d, c, p) {
    // @ts-ignore
    (function (BaseViewChildController, DateFormat, Filter, FilterOperator, Sorter, MessageToast) {
        "use strict";
        return BaseViewChildController.extend("horvath.staffingapp.controller.table.TableFetch", {
            oTable: void 0,
            oTimeColumnsMap: void 0,
            onInit: function () {
                this.injectMembers();
                this.oTable = this.byId("idTreeTable");
            },
            // @ts-ignore
            fetchData: function (e, t) {
                var oHdrView = this.oComponent.oControllers.header.getView(),
                    oProject = oHdrView.byId("idProject"),
                    oModel = this.oComponent.getModel(),
                    aFilter = [],
                    aFilters = [],
                    oParam = {
                        "$expand": "ProjectRoleSet,WorkPackageSet,WorkPackageSet/to_ResourceDemand,WorkPackageSet/WorkItemSet,WorkPackageSet/WorkPackageFunctionSet,WorkPackageSet/to_ResourceDemand/to_ResourceDemandDistribution"
                    };

                // this.oTimeColumnsMap = t;
                // this.oComponent.oTracer.reset("Table Loading: ");
                // this.models.table.setProperty("/busy", true);
                // this.models.table.setProperty("/resetBusyOnRowUpdated", !1);
                this.getView().getModel("table").setProperty("/busy", true);
                // aFilters = new Filter({
                //     filters: oProject.getTokens().map(function(oToken) { return  }),
                //     and: false
                // });
                debugger;
                oProject.getTokens().map(function (oItem) {
                    let sKey = oItem.getProperty("key");
                    aFilter.push(new Filter("ProjectID", FilterOperator.EQ, sKey));
                });
                var oFilter = new Filter({
                    filters: aFilter,
                    and: false
                });
                aFilters.push(oFilter);
                // @ts-ignore
                Promise.all([
                    this._fetchResources(oModel, "/ProjectSet", aFilters, oParam),
                    // this._fetchResources(oModel, "/WorkPackageSet", aFilters, { "$expand": "to_ResourceDemand" })
                ]).then(function (oResp) {
                    debugger;
                    oHdrView = this.oComponent.oControllers.header.getView();
                    var oTableModel = this.getView().getModel("table"),
                        aResults = oResp[0].results,
                        oProjDt = oHdrView.byId("idProjectDate"),
                        oTreeData = { Node: [] };

                    for (var index in aResults) {
                        var oData = aResults[index];
                        // Project
                        // @ts-ignore
                        oTreeData.Node.push({
                            Name: oData.ProjectID,
                            Parent: true,
                            Employee: false,
                            inputVisible: false,
                            Node: []
                        });
                        for (var idx in oData.WorkPackageSet.results) {
                            var oWorkPackage = oData.WorkPackageSet.results[idx],
                                oChildNode = oTreeData.Node[index];

                            // Workpackage Resource Distribution
                            // Get latest version and resource demand
                            let oNodeData = { Parent: true, Employee: false, Node: [] };
                            if (oWorkPackage.to_ResourceDemand.results.length > 0) {
                                var oUpdatedRes = oWorkPackage.to_ResourceDemand.results.sort((a, b) => b.version - a.version || b.ResourceDemand - a.ResourceDemand)[0],
                                    aMonths = [];
                                // oUpdatedRes.to_ResourceDemandDistribution.results.filter(item => ["7","8"].includes(item.CalendarMonth));

                                for (var i = oProjDt.getDateValue().getMonth() + 1; i <= oProjDt.getSecondDateValue().getMonth() + 1; i++) {
                                    aMonths.push(i.toString());
                                }
                                let aResDistribution = oUpdatedRes.to_ResourceDemandDistribution.results.filter(item => aMonths.includes(item.CalendarMonth));
                                oNodeData = {
                                    Name: [oWorkPackage.WorkPackageName, oWorkPackage.WorkPackageID].join(" "),
                                    Staffed: oUpdatedRes.Quantity,
                                    Parent: true,
                                    Employee: false,
                                    inputVisible: false,
                                    Node: []
                                };
                                var oTrData = oTreeData.Node.slice(-1)[0],
                                    nStaffed = (oTrData.Staffed) ? +oTrData.Staffed : 0;
                                
                                oTreeData.Node.slice(-1)[0].Staffed = (nStaffed) ? nStaffed + +oUpdatedRes.Quantity : +oUpdatedRes.Quantity;
                                aResDistribution.map(function (oResDis, i) {
                                    Object.assign(oNodeData, { ["Month" + i]: oResDis.Quantity });
                                });
                            }
                            // Employee
                            for (var roleIdx in oData.ProjectRoleSet.results) {
                                var oEmployee = oData.ProjectRoleSet.results[roleIdx],
                                    oNode = {
                                        Name: oEmployee.BusinessPartnerName,
                                        Employee: true,
                                        Parent: false,
                                        // inputVisible: this.getView().getModel("table").getProperty("/isInputVisible")
                                        inputVisible: true
                                    };
                                oNodeData.Node.push(oNode);
                            }
                            oChildNode.Node.push(oNodeData);
                            // Sum the hour
                        }
                    }
                    // this.getView().getModel("table").getData().resources
                    this.getView().getModel("table").setProperty("/resource", oTreeData);
                    // this._fetchDataByKey().then
                    //   bind jsonmodel to table
                    this.oTable.bindRows({
                        path: "table>/resource",
                        parameters: {
                            arrayNames: ["Node"]
                            // numberOfExpandedLevels: 1
                            // countMode: "Inline",
                            // operationMode: "Server",
                            // treeAnnotationProperties: {
                            //     hierarchyLevelFor: "0",
                            //     hierarchyNodeFor: "WorkPackageID",
                            //     hierarchyParentNodeFor: "WorkPackageID",
                            //     hierarchyDrillStateFor: "expanded"
                            // }
                        }
                    });
                    this.getView().getModel("table").setProperty("/busy", false);
                    // @ts-ignore
                }.bind(this)).catch(function (oErr) {
                    this.getView().getModel("table").setProperty("/busy", false);
                }.bind(this));
                // this.oComponent.oTracer.message("columns created");
                // this._fetchResources(e).then((() => {
                //     this._fetchUtilizations(e).then((() => {
                //         this.models.table.setProperty("/resetBusyOnRowUpdated", !0),
                //             e && this.oTable.collapseAll()
                //     }
                //     ))
                // }
                // ))
            },
            // onRowsUpdated: function () {
            //     let e = this.models.table.getProperty("/busy")
            //         , t = this.models.table.getProperty("/resetBusyOnRowUpdated");
            //     e && t && (this.oComponent.oTracer.message("UI rendering"),
            //         this.oComponent.oTracer.show(),
            //         this.models.table.setProperty("/busy", !1),
            //         this.models.table.setProperty("/resetBusyOnRowUpdated", !1))
            // },
            // fetchOnScroll: function (e) {
            //     let t = e.getSource().getVisibleRowCount()
            //         , s = e.getParameter("firstVisibleRow");
            //     this._fetchRequired(s, t) && this.fetchData(!1, this.oTimeColumnsMap)
            // },
            // _fetchRequired: function (e, t) {
            //     let s = this.models.table.getProperty("/resources").length;
            //     if (s >= this.models.table.getProperty("/resourcesCount"))
            //         return !1;
            //     return e + t - this.models.table.countExpandedAssignments() >= s
            // },
            _fetchResources: function (oModel, sPath, aFilters, oParams, groupId) {
                // @ts-ignore
                return new Promise(
                    function (resolve, reject) {
                        oModel.read(sPath, {
                            filters: aFilters,
                            urlParameters: oParams,
                            groupId: groupId,
                            // @ts-ignore
                            success: function (oData, oResponse) {
                                resolve(oData);
                            }.bind(this),
                            error: function (error) {
                                reject(error);
                            }.bind(this)
                        });
                    });
                // let t = this.oControllers.variant.getVariant();
                // if (!t || !t.sortProperty || !t.sortOrder)
                //     throw new Error("failed to sort. invalid variant");
                // let s = new o({
                //     path: t.sortProperty,
                //     descending: "Ascending" !== t.sortOrder,
                //     group: !0
                // })
                //     , r = this.oControllers.verticalFilter.getFilters()
                //     , a = this._getDateRange()
                //     , i = this.models.oDataV4.bindList("/" + p.RESOURCES_ENTITY_SET, void 0, [s], r, {
                //         $apply: "groupby((ID,emailAddress,mobileNumber,resourceName,firstName,lastName,managerName,costCenterForDisplay,deliveryOrgForDisplay,jobTitle,country,workforcePersonID,avgUtilization,bookedHours,availableHours,assignmentExistsForTheResource),aggregate(validFrom with min as startdatenew))",
                //         "sap-valid-from": a.oDateValidFrom,
                //         "sap-valid-to": a.oDateValidTo,
                //         $count: !0
                //     });
                // return this.oComponent.oTracer.message("prepare request capacityGridHeaderTemporal"),
                //     new Promise(function (t, s) {
                //         let r = e ? 0 : this.models.table.getProperty("/rows").length;
                //         i.requestContexts(r, 50, "$auto.resourceData").then((s => {
                //             this.oComponent.oTracer.message("receive response capacityGridHeaderTemporal"),
                //                 this._storeResources(e, i, s),
                //                 this.oComponent.oTracer.message("store capacityGridHeaderTemporal"),
                //                 t()
                //         }
                //         ), (e => {
                //             this.oControllers.error.handleServiceError(e),
                //                 s()
                //         }
                //         ))
                //     }
                //         .bind(this))
            },
            fetchDataByKey: function () {

            },
            // _storeResources: function (e, t, s) {
            //     let r = e ? [] : this.models.table.getProperty("/resources");
            //     s.forEach((e => {
            //         let t = e.getObject();
            //         r.push(t)
            //     }
            //     )),
            //         this.models.table.setProperty("/resources", r);
            //     let o = t.getLength();
            //     this.models.table.setProperty("/resourcesCount", o)
            // },
            // _fetchUtilizations: function (e) {
            //     let t = []
            //         , o = e ? 0 : this.models.table.getProperty("/rows")
            //         , a = this.models.table.getProperty("/resources");
            //     for (let e = o.length; e < o.length + 50 && e < a.length; e++)
            //         t.push(new Filter({
            //             filters: [new Filter({
            //                 path: "ID",
            //                 operator: r.EQ,
            //                 value1: a[e].ID
            //             }), new Filter({
            //                 path: "validFrom",
            //                 operator: r.EQ,
            //                 value1: a[e].startdatenew
            //             })],
            //             and: !0
            //         }));
            //     let i = new Filter({
            //         filters: t,
            //         and: !1
            //     })
            //         , n = this._getDateRange()
            //         , l = this.models.app.getProperty("/selectedView")
            //         , d = "/" + p.utilizationEntitySet(l)
            //         , c = this.models.oDataV4.bindList(d, void 0, void 0, i, {
            //             "sap-valid-from": n.oDateValidFrom,
            //             "sap-valid-to": n.oDateValidTo
            //         });
            //     return this.oComponent.oTracer.message("prepare request AssignmentBuckets"),
            //         new Promise(function (t, s) {
            //             c.requestContexts(0, 1200, "$auto.tableData").then((s => {
            //                 this.oComponent.oTracer.message("receive response AssignmentBuckets"),
            //                     this._storeUtilizations(e, s),
            //                     t()
            //             }
            //             ), (e => {
            //                 this.oControllers.error.handleServiceError(e),
            //                     s()
            //             }
            //             ))
            //         }
            //             .bind(this))
            // },
            // _storeUtilizations: function (e, t) {
            //     let s = this.models.table.getProperty("/resources")
            //         , r = e ? [] : this.models.table.getProperty("/rows")
            //         , o = s.slice(r.length, r.length + 50)
            //         , a = this.models.app.getProperty("/selectedView")
            //         , i = n.transformResourceUtilizations(this.oTimeColumnsMap, o, t, a);
            //     this.oComponent.oTracer.message("store AssignmentBuckets - rows"),
            //         i.forEach((e => {
            //             r.push(e)
            //         }
            //         )),
            //         this.models.table.setProperty("/rows", r)
            // },
            // fetchAssignments: function (e) {
            //     return e.getObject().assignmentsLoaded ? Promise.resolve() : this._fetchAssignments(e)
            // },
            // _fetchAssignments: function (e) {
            //     let t = [];
            //     t.push(new Filter({
            //         path: "resource_ID",
            //         operator: r.EQ,
            //         value1: e.getObject().resourceID
            //     }));
            //     let o = this._getAssignmentDateRange();
            //     t.push(new Filter({
            //         path: "requestStartDate",
            //         operator: r.LE,
            //         value1: o.oDateValidTo
            //     })),
            //         t.push(new Filter({
            //             path: "requestEndDate",
            //             operator: r.GE,
            //             value1: o.oDateValidFrom
            //         }));
            //     let a = {
            //         $expand: this._getAssignmentExpandParams(o.oDateValidFrom, o.oDateValidTo)
            //     }
            //         , i = this.models.oDataV4.bindList("/" + p.ASSIGNMENT_ENTITY_SET, void 0, void 0, t, a);
            //     return new Promise(function (t, s) {
            //         return i.requestContexts().then((s => {
            //             this._storeAssignments(e, s),
            //                 t()
            //         }
            //         ), (e => {
            //             this.oControllers.error.handleServiceError(e),
            //                 s()
            //         }
            //         ))
            //     }
            //         .bind(this))
            // },
            // _storeAssignments: function (e, t) {
            //     if (t.length > 0) {
            //         let s = this.models.app.getProperty("/selectedView")
            //             , r = n.transformAssignments(this.oTimeColumnsMap, t, this.oBundle, s)
            //             , o = e.getPath();
            //         this.models.table.setProperty(o + "/assignments", r),
            //             this.models.table.setProperty(o + "/assignmentsLoaded", !0)
            //     } else
            //         a.show(this.oBundle.getText("RESOURCE_HAS_NO_ASSIGNMENTS"))
            // },
            // _getDateRange: function () {
            //     return {
            //         oDateValidTo: c.dateToEdm(this.models.date.getProperty("/sEndDate")),
            //         oDateValidFrom: c.dateToEdm(this.models.date.getProperty("/sFromDate"))
            //     }
            // },
            // _getAssignmentExpandParams: function (e, t) {
            //     let s = this.models.app.getProperty("/selectedView")
            //         , r = p.bucketNavProperty(s);
            //     return s === i.DAILY ? r + "($filter=date le " + t + " and date ge " + e + ")" : r + "($filter=startDate le " + t + " and endDate ge " + e + ")"
            // },
            // _getAssignmentDateRange: function () {
            //     let e = t.getInstance({
            //         pattern: "yyyy-MM-dd"
            //     })
            //         , s = this._getDateRangeLastDay();
            //     return {
            //         oDateValidTo: String(e.format(s)),
            //         oDateValidFrom: String(e.format(this.models.date.getProperty("/sFromDate")))
            //     }
            // },
            // _getDateRangeLastDay: function () {
            //     let e = this.models.date.getProperty("/sEndDate");
            //     if (this.models.app.getProperty("/selectedView") === i.MONTHLY) {
            //         let t = new Date(e)
            //             , s = t.getMonth()
            //             , r = t.getFullYear();
            //         return new Date(r, s + 1, 0)
            //     }
            //     return e
            // }
        });
    }
    ));