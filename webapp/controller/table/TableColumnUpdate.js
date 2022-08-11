/* eslint-disable guard-for-in */
/* eslint-disable @sap/ui5-jsdocs/no-jsdoc */
sap.ui.define([
    "horvath/staffingapp/base/BaseViewChildController",
    // "capacityGridUi/capacityGridUi/view/Views", 
    "sap/base/util/deepClone",
    "horvath/staffingapp/controller/table/TableColumnFactory"
],
    (function (t, a, TableColumnFactory) {
        "use strict";
        return t.extend("horvath.staffingapp.controller.table.TableColumnUpdate", {
            constructor: function () {
                t.apply(this, arguments);
                this.injectMembers();
                this.oTable = this.byId("idTreeTable");
                this.oFactory = new TableColumnFactory(this.oComponent);
            },
            update: function (t, i) {
                this.oTable.destroyColumns();
                // Not implement yet, so hardcore columns for now
                // let a = this.oControllers.variant.getVariant();
                let a = {
                    columns: [
                        { id: "idTimeRecording", columnKey: "timeRecording", label: "Time Recordings", index: 0, visible: true, width: "200px" },
                        { id: "idStaffed", columnKey: "Staffed", label: "Staffed", visible: false, index: 1, width: "150px" },
                        { id: "idUnassignedCapacity", columnKey: "UnassignedCapacity", label: "Unassigned Capacity", visible: true, index: 2, width: "120px" },
                        { id: "idStaffedNew", columnKey: "StaffedNew", label: "Staffed New", visible: true, index: 3, width: "120px" },
                        { id: "idBaseLine", columnKey: "BaseLine", label: "Base Line", visible: true, index: 4, width: "120px" },
                        { id: "idWriteOffs", columnKey: "WriteOffs", label: "Write Offs", visible: true, index: 5, width: "120px" },
                        { id: "idPostponed", columnKey: "Postponed", label: "Postponed", visible: true, index: 6, width: "120px" },
                        { id: "idContractType", columnKey: "ContractType", label: "Contract Type", visible: true, index: 7, width: "120px" }]
                };
                this._aColumns = [];
                
                this._pushNameColumn(a);
                // In case variant is implemented, then push this to variant
                this._pushVariantColumns(a);
                if (i) {
                    this._pushTimeColumns(t, i);
                }
                for (let aCol of this._aColumns) {
                    this.oTable.addColumn(aCol);
                }
            },
            _pushNameColumn: function (t) {
                // if (!t || !t.nameColumnWidth) {
                //     throw Error("cannot create name column. invalid variant");
                // }
                this._aColumns.push(this.oFactory.createNameColumn(t.nameColumnWidth));
            },
            _pushVariantColumns: function (t) {
                // if (!t || !t.columns)
                //     throw Error("cannot create variant columns. invalid variant");
                let i = a(t.columns),
                    e = i.length;
                i.forEach((t => {
                    void 0 !== t.index && null !== t.index || (t.index = e)
                }
                ));
                //     i.sort((function (t, i) {
                //         return t.index - i.index
                //     }
                //     )),
                
                for (let index in t.columns) {
                    this._aColumns.push(this.oFactory.createColumn(t.columns[index]));
                }
                // i.forEach((t => {
                //     switch (t.columnKey) {
                //         case "costCenter":
                //             this._aColumns.push(this.oFactory.createCostCenterColumn(t.visible, t.width));
                //             break;
                //         case "staffingHrs":
                //             this._aColumns.push(this.oFactory.createStaffingHoursColumn(t.visible, t.width));
                //             break;
                //         case "staffingSummary":
                //             this._aColumns.push(this.oFactory.createStaffingSummaryColumn(t.visible, t.width));
                //             break;
                //         case "deliveryOrg":
                //             this._aColumns.push(this.oFactory.createDeliveryOrgColumn(t.visible, t.width));
                //             break;
                //         case "assignmentStatus":
                //             this._aColumns.push(this.oFactory.createAssignmentStatusColumn(t.visible, t.width));
                //             break;
                //         default:
                //             throw new Error("unknown column key: " + t.columnKey);
                //     }
                // }
                // ));
            },
            _pushTimeColumns: function (t, a) {
                let e = 0;
                a.forEach(((a, n) => {
                    let s = "110px",
                        o = this.oFactory.createTimeColumn(a, e, s);
                    this._aColumns.push(o);
                    e++;
                }
                ));
            }
        });
    }
    ));
