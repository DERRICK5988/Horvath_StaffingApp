/* eslint-disable @sap/ui5-jsdocs/no-jsdoc */
sap.ui.define([
    // "capacityGridUi/capacityGridUi/view/Views", 
    "sap/ui/core/format/DateFormat"],
    (function (e) {
        "use strict";
        let n = e.getDateInstance({
            format: "MMM"
        }),
            a = e.getDateInstance({
                format: "EEE"
            }),
            r = e.getDateInstance({
                format: "yyyyMMM"
            }),
            o = e.getDateInstance({
                style: "medium"
            }),
            y = e.getDateInstance({
                pattern: "yyyy-MM-ddThh:mm:ss"
            }),
            i = e.getDateInstance({
                format: "MMMdd"
            });
        return {
            rangeByView: function (e, n, a) {
                // if (e === t.MONTHLY) {
                //     return this.rangeByYearMonth(n, a);
                // }
                // if (e === t.DAILY || e === t.WEEKLY) {
                //     return this.rangeByDay(n, a);
                // }
                // throw Error("unknown view " + e);
                return this.rangeByYearMonth(n, a);
            },
            rangeByDay: function (t, e) {
                return this.dateByDay(t) + " - " + this.dateByDay(e);
            },
            rangeByYearMonth: function (t, e) {
                return this.dateByYearMonth(t) + " - " + this.dateByYearMonth(e);
            },
            rangeByMonthDay: function (t, e) {
                return this.dateByMonthDay(t) + " - " + this.dateByMonthDay(e);
            },
            dateToEdm: function (t) {
                return y.format(t) + "Z";
            },
            dateByDay: function (t) {
                return o.format(t);
            },
            dateByYearMonth: function (t) {
                return r.format(t);
            },
            dateByMonth: function (t) {
                return n.format(t);
            },
            dateByMonthDay: function (t) {
                return i.format(t);
            },
            dateByWeekDay: function (t) {
                return a.format(t);
            }
        }
    }
    ));
