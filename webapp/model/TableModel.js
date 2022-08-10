/* eslint-disable no-unused-expressions */
// eslint-disable-next-line @sap/ui5-jsdocs/no-jsdoc
sap.ui.define([
    "sap/ui/model/json/JSONModel", 
], (function(JSONModel) {
    "use strict";
    return JSONModel.extend("horvath.staffingapp.model.TableModel", {
        constructor: function(e) {
            JSONModel.call(this, {
                sortProperty: null,
                sortOrder: null,
                // resources: [],
                // resourcesCount: 0,
                rows: [],
                rowsSelected: !1,
                columns: [],
                busy: !1,
                resetBusyOnRowUpdated: !1
            });
            this.oBundle = e;
        },
        // setAssignmentChanged: function(t, e) {
        //     this.setProperty(t + "/changed", e),
        //     this.setProperty(t + "/changeTime", e ? (new Date).getTime() : null)
        // },
        // countExpandedAssignments: function() {
        //     let t = 0
        //       , e = this.getProperty("/rows");
        //     for (let s of e)
        //         s.expanded && (t += s.assignments.length);
        //     return t
        // },
        // getAssignmentPaths: function(t) {
        //     let e = this.getProperty("/rows");
        //     for (let s = 0; s < e.length; s++) {
        //         let i = e[s];
        //         if (i.assignments)
        //             for (let e = 0; e < i.assignments.length; e++) {
        //                 if (i.assignments[e].asgId === t)
        //                     return {
        //                         resourcePath: "/rows/" + s,
        //                         asgPath: "/rows/" + s + "/assignments/" + e
        //                     }
        //             }
        //     }
        //     throw new Error("assignment not found " + t)
        // },
        // getChangedAssignmentPaths: function() {
        //     let t = []
        //       , e = this.getProperty("/rows");
        //     for (let s = 0; s < e.length; s++) {
        //         let i = e[s];
        //         if (i.assignments)
        //             for (let e = 0; e < i.assignments.length; e++) {
        //                 if (i.assignments[e].changed) {
        //                     let i = "/rows/" + s + "/assignments/" + e;
        //                     t.push(i)
        //                 }
        //             }
        //     }
        //     return t
        // },
        // getAssignmentPathsByRequest: function(t) {
        //     let e = this.getProperty("/rows")
        //       , s = [];
        //     for (let i = 0; i < e.length; i++) {
        //         let n = e[i];
        //         if (n.assignments)
        //             for (let e = 0; e < n.assignments.length; e++) {
        //                 if (n.assignments[e].resourceRequest_ID === t) {
        //                     let t = "/rows/" + i + "/assignments/" + e;
        //                     s.push(t)
        //                 }
        //             }
        //     }
        //     return s
        // },
        // getUtilizationPath: function(t, e) {
        //     let s = this.getProperty("/rows");
        //     for (let i = 0; i < s.length; i++) {
        //         let n = s[i];
        //         if (n.assignments)
        //             for (let s = 0; s < n.assignments.length; s++) {
        //                 let r = n.assignments[s];
        //                 if (r.asgId === t)
        //                     for (let t = 0; t < r.utilization.length; t++) {
        //                         if (r.utilization[t].timePeriod === e)
        //                             return "/rows/" + i + "/assignments/" + s + "/utilization/" + t
        //                     }
        //             }
        //     }
        //     throw new Error("utilization not found " + t)
        // },
        // getChangePaths: function(t) {
        //     let e = this.getProperty(t)
        //       , s = [];
        //     "Information" !== e.softBookingValueState && "Error" !== e.softBookingValueState || s.push(t);
        //     for (let i = 0; i < e.utilization.length; i++) {
        //         let n = e.utilization[i];
        //         "Information" !== n.utilizationValueState && "Error" !== n.utilizationValueState || s.push(t + "/utilization/" + i)
        //     }
        //     return s
        // },
        // calculateRowHighlight: function(t) {
        //     let e = 0
        //       , s = 0
        //       , i = this.getAssignmentPaths(t)
        //       , n = this.getProperty(i.resourcePath);
        //     for (let t = 0; t < n.assignments.length; t++) {
        //         let r = n.assignments[t]
        //           , o = 0
        //           , a = 0;
        //         "Information" === r.softBookingValueState ? (e++,
        //         o++) : "Error" === r.softBookingValueState && (s++,
        //         a++),
        //         "Error" === r.assignmentValueState && (s++,
        //         a++);
        //         for (let t = 0; t < r.utilization.length; t++) {
        //             let i = r.utilization[t];
        //             if ("Information" === i.utilizationValueState)
        //                 e++,
        //                 o++;
        //             else if ("Error" === i.utilizationValueState) {
        //                 s++,
        //                 a++;
        //                 break
        //             }
        //         }
        //         let l = this._getHighlight(o, a);
        //         this.setProperty(i.resourcePath + "/assignments/" + t + "/rowHighlight", l)
        //     }
        //     let r = this._getHighlight(e, s);
        //     this.setProperty(i.resourcePath + "/rowHighlight", r)
        // },
        // _getHighlight: function(t, e) {
        //     return e > 0 ? "Error" : t > 0 ? "Information" : "None"
        // },
        // calculateUtilization: function(t) {
        //     let s = new e(t)
        //       , i = this.getProperty(t)
        //       , n = this.getProperty(s.resourcePath)
        //       , r = this.getProperty(s.resourceUtilizationPath)
        //       , o = this.getProperty(s.assignmentPath)
        //       , a = parseInt(i.asgUtil) - parseInt(i.copyAsgUtil);
        //     r.freeHours -= a,
        //     o.assignmentDurationInHours = o.assignmentDurationInHours + a,
        //     i.copyAsgUtil = i.asgUtil,
        //     0 !== r.availableHours ? r.colUtil = Math.floor(100 * (r.availableHours - r.freeHours) / r.availableHours) : r.colUtil = 0 === r.freeHours ? 0 : 999;
        //     let l = 0
        //       , g = 0;
        //     n.utilization.forEach((t=>{
        //         l += t.freeHours,
        //         g += t.availableHours
        //     }
        //     )),
        //     n.avgUtilGrid = 0 !== g ? Math.floor((g - l) / g * 100) : 0 === l ? 0 : 999,
        //     this.getAssignmentPathsByRequest(o.resourceRequest_ID).forEach((t=>{
        //         let e = this.getProperty(t);
        //         e.staffedHours += a,
        //         e.staffedHoursText = this.oBundle.getText("STAFFED_HOURS", [e.staffedHours, e.requestedCapacityInHours]),
        //         e.RemainingEffort = e.RequiredEffort - e.staffedHours
        //     }
        //     )),
        //     this.setProperty(s.resourcePath, n)
        // }
    })
}
));
