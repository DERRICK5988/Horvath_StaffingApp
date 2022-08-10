/* eslint-disable @sap/ui5-jsdocs/no-jsdoc */
sap.ui.define([
    "horvath/staffingapp/base/BaseComponentController",
    // "capacityGridUi/capacityGridUi/utils/formatUtilizationPercentState",
    "sap/m/ObjectStatus",
    "sap/m/ObjectAttribute",
    "sap/m/HBox",
    "sap/m/Link",
    "sap/m/Label",
    "sap/m/Text",
    "sap/m/Input",
    "sap/m/Avatar",
    "sap/m/Select",
    "sap/ui/core/Item",
    "sap/m/ProgressIndicator",
    "sap/ui/layout/VerticalLayout",
    "sap/ui/layout/HorizontalLayout",
    "sap/ui/table/Column"
],
    (function (BaseComponentController, ObjectStatus, a, HBox, n, Label, Text, s, u, p, m, c, d, h, f) {
        "use strict";
        return BaseComponentController.extend("horvath.staffingapp.controller.table.TableColumnFactory", {
            constructor: function () {
                BaseComponentController.apply(this, arguments);
                this.injectMembers();
            },
            createNameColumn: function (t) {
                return this._createColumn({
                    template: this.createTemplate("{WorkPackageName} ({WorkPackageID})"),
                    id: "idNameLabel",
                    label: "Name",
                    sortProperty: "",
                    visible: !0,
                    width: "250px",
                    hAlign: "Left"
                });
            },
            createNameTemplate: function () {
                return new HBox({
                    alignItems: "Center",
                    width: "300px",
                    items: [new u({
                        visible: true,
                        initials: {
                            path: "{WorkPackageID}",
                            // formatter: this.formatNameInitials
                        },
                        displaySize: "XS"
                    }), new n({
                        visible: "{parent}",
                        text: "{WorkPackageID}",
                        tooltip: "{WorkPackageID}",
                        textAlign: "Begin",
                        // press: this.oControllers.table.handleEmployeeQuickViewPress.bind(this.oControllers.table)
                    }).addStyleClass("sapUiTinyMarginBegin"),
                    new n({
                        text: "{WorkPackageName}",
                        tooltip: "{WorkPackageName}",
                        visible: "{child}",
                        textAlign: "Begin",
                        // press: this.oControllers.table.handleAssignmentQuickViewPress.bind(this.oControllers.table)

                    })]
                });
            },
            createColumn: function (oCol) {
                return this._createColumn({
                    template: this.createTemplate(),
                    id: oCol.id,
                    label: oCol.label,
                    sortProperty: "",
                    visible: oCol.visible,
                    width: oCol.width,
                    hAlign: "Left"
                });
            },
            createTemplate: function (oBind) {
                // Bind later
                return new Text({
                    text: oBind,
                    tooltip: "",
                    maxLines: 2
                });
            },
            // createDeliveryOrgColumn: function (t, e) {
            //     return this._createColumn({
            //         template: this.createDeliveryOrgTemplate(),
            //         id: "idDeliveryOrgLabel",
            //         label: this.oBundle.getText("DELIVERY_ORGANIZATION"),
            //         sortProperty: "deliveryOrgForDisplay",
            //         visible: t,
            //         width: e,
            //         hAlign: "Left"
            //     });
            // },
            // createDeliveryOrgTemplate: function () {
            //     return new Text({
            //         text: "{deliveryOrg}",
            //         tooltip: "{deliveryOrg}",
            //         maxLines: 2
            //     });
            // },
            // createCostCenterColumn: function (t, e) {
            //     return this._createColumn({
            //         template: this.createCostCenterTemplate(),
            //         id: "idCostCenterLabel",
            //         label: this.oBundle.getText("COST_CENTER"),
            //         sortProperty: "costCenterForDisplay",
            //         visible: t,
            //         width: e,
            //         hAlign: "Left"
            //     });
            // },
            // createCostCenterTemplate: function () {
            //     return new Text({
            //         text: "{costCenter}",
            //         tooltip: "{costCenter}",
            //         maxLines: 2
            //     });
            // },
            // createStaffingSummaryColumn: function (t, e) {
            //     return this._createColumn({
            //         template: this.createStaffingSummaryTemplate(),
            //         id: "idStaffingSummary",
            //         label: this.oBundle.getText("STAFFING_SUMMARY"),
            //         sortProperty: null,
            //         visible: t,
            //         width: e,
            //         hAlign: "Left"
            //     });
            // },
            // createStaffingSummaryTemplate: function () {
            //     return new c({
            //         displayAnimation: !1,
            //         displayValue: "{staffedHoursText}",
            //         percentValue: {
            //             parts: ["staffedHours", "requestedCapacityInHours"],
            //             formatter: this.formatUtilizationPercent
            //         },
            //         showValue: !0,
            //         state: "None",
            //         width: "100%",
            //         visible: "{child}"
            //     })
            // },
            // createStaffingHoursColumn: function (t, e) {
            //     return this._createColumn({
            //         template: this.createStaffingHoursTemplate(),
            //         id: "idStaffingHrs",
            //         label: this.oBundle.getText("STAFFING_HRS"),
            //         sortProperty: "avgUtilization",
            //         visible: t,
            //         width: e,
            //         hAlign: "Right"
            //     })
            // },
            // createStaffingHoursTemplate: function () {
            //     return new d({
            //         content: [new ObjectStatus({
            //             text: "{avgUtilGrid} %",
            //             inverted: !0,
            //             state: {
            //                 path: "avgUtilGrid",
            //                 formatter: e
            //             },
            //             visible: "{parent}"
            //         }), new Text({
            //             text: "{staffedHours} {i18n>HOUR}",
            //             visible: "{child}"
            //         })]
            //     })
            // },
            // createAssignmentStatusColumn: function (t, e) {
            //     return this._createColumn({
            //         template: this.createAssignmentStatusTemplate(),
            //         id: "idAssignmentStatus",
            //         label: this.oBundle.getText("ASSIGNMENT_STATUS"),
            //         sortProperty: null,
            //         visible: t,
            //         width: e,
            //         hAlign: "Left"
            //     })
            // },
            // createAssignmentStatusTemplate: function () {
            //     return new r({
            //         alignItems: "Center",
            //         width: "100%",
            //         items: [new Text({
            //             text: "{softBookingText}",
            //             visible: {
            //                 parts: ["child", "app>/IsDisplayMode"],
            //                 formatter: this.formatTextVisible
            //             }
            //         }), new p({
            //             items: [new m({
            //                 key: "{i18n>SOFT_BOOKED}",
            //                 text: "{i18n>SOFT_BOOKED}"
            //             }), new m({
            //                 key: "{i18n>HARD_BOOKED}",
            //                 text: "{i18n>HARD_BOOKED}"
            //             })],
            //             selectedKey: "{softBookingText}",
            //             visible: {
            //                 parts: ["child", "app>/IsEditMode"],
            //                 formatter: this.formatInputVisible
            //             },
            //             editable: {
            //                 parts: ["isAssignmentEditable", "softBooking"],
            //                 formatter: this.formatStatusEditable
            //             },
            //             valueState: "{softBookingValueState}",
            //             valueStateText: "{softBookingValueStateText}",
            //             change: this.oControllers.page.onStatusChanged.bind(this.oControllers.page)
            //         }).addStyleClass("sapUiTinyMarginBegin")]
            //     })
            // },
            createTimeColumn: function (t, e, i) {
                debugger;
                return this._createColumn({
                    template: this.createTimeTemplate(e),
                    id: "idMonthColumn" + e,
                    label: t,
                    sortProperty: null,
                    visible: !0,
                    width: i,
                    hAlign: "Right"
                });
            },
            createTimeTemplate: function (t) {
                // let a = new d({
                //     content: [new ObjectStatus({
                //         text: "{colUtil} {i18n>PERCENTAGE}",
                //         visible: "{parent}",
                //         state: {
                //             path: "colUtil",
                //             formatter: e
                //         }
                //     }), new Text({
                //         text: "{freeHours} / {availableHours} {i18n>HOUR}",
                //         visible: "{parent}",
                //         tooltip: "{freeHours} / {availableHours} {i18n>HOUR}",
                //         wrapping: !1
                //     }), new Text({
                //         text: "{asgUtil} {i18n>HOUR}",
                //         visible: {
                //             parts: ["child", "app>/IsDisplayMode"],
                //             formatter: this.formatTextVisible
                //         }
                //     }), new s({
                //         value: "{asgUtil}",
                //         visible: {
                //             parts: ["child", "app>/IsEditMode"],
                //             formatter: this.formatInputVisible
                //         },
                //         type: "Number",
                //         description: "{i18n>HOUR}",
                //         width: "100%",
                //         fieldWidth: "60%",
                //         autocomplete: !1,
                //         editable: "{isAssignmentEditable}",
                //         change: this.oControllers.page.onInputChanged.bind(this.oControllers.page),
                //         valueState: "{utilizationValueState}",
                //         valueStateText: "{utilizationValueStateText}"
                //     }).addEventDelegate({
                //         onfocusin: function(t) {
                //             t.currentTarget.getElementsByTagName("input")[0].select()
                //         }
                //     })]
                // });
                // return a.bindContext("utilization/" + t),
                // a
                debugger;
                let a = new d({
                    content: [new ObjectStatus({
                        text: "{colUtil} {i18n>PERCENTAGE}",
                        visible: true,
                        state: {
                            path: "colUtil",
                            // formatter: e
                        }
                    }), new Text({
                        text: "{freeHours} / {availableHours} {i18n>HOUR}",
                        visible: true,
                        tooltip: "{freeHours} / {availableHours} {i18n>HOUR}",
                        wrapping: !1
                    }), new Text({
                        text: "{asgUtil} {i18n>HOUR}",
                        visible: true
                    }), new s({
                        value: "{asgUtil}",
                        visible: true,
                        type: "Number",
                        description: "{i18n>HOUR}",
                        width: "100%",
                        fieldWidth: "60%",
                        autocomplete: !1,
                        editable: "{isAssignmentEditable}",
                        // change: this.oControllers.page.onInputChanged.bind(this.oControllers.page),
                        // valueState: "{utilizationValueState}",
                        // valueStateText: "{utilizationValueStateText}"
                    }).addEventDelegate({
                        onfocusin: function (t) {
                            t.currentTarget.getElementsByTagName("input")[0].select()
                        }
                    })]
                });
                // Bind workpackage
                return a.bindContext("" + t);
            },
            _createColumn: function (t) {
                debugger;
                return new f({
                    label: new Label({
                        text: t.label,
                        wrapping: !0
                    }),
                    id: this.oControllers.table.createId(t.id),
                    hAlign: t.hAlign,
                    visible: t.visible,
                    sorted: {
                        path: "/sortProperty",
                        formatter: function (e) {
                            return t.sortProperty === e;
                        }
                    },
                    tooltip: t.label,
                    template: t.template,
                    sortProperty: t.sortProperty,
                    minWidth: 50,
                    width: t.width,
                    sortOrder: "{/sortOrder}",
                    // columnMenuOpen: this.oControllers.table.handleColumnMenuOpen.bind(this.oControllers.table)

                });
            },
            formatUtilizationPercent: function (t, e) {
                return Math.round(t / e * 100);
            },
            formatNameInitials: function (t) {
                if (t) {
                    let e = t.split(" ");
                    return e[0].charAt(0).toUpperCase() + e[1].charAt(0).toUpperCase();
                }
                return "NN";
            },
            formatTextVisible: function (t, e) {
                return t && e;
            },
            formatInputVisible: function (t, e) {
                return t && e;
            },
            formatStatusEditable: function (t, e) {
                return t && e;
            }
        })
    }
    ));
