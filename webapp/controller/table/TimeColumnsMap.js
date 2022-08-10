// sap.ui.define([
//     "capacityGridUi/capacityGridUi/view/Views", 
//     "capacityGridUi/capacityGridUi/utils/Utils", 
//     "capacityGridUi/capacityGridUi/utils/DateFormatter", 
//     "sap/ui/core/format/DateFormat"], (function(t, e, a, r) {
//     "use strict";

sap.ui.define([
    // "capacityGridUi/capacityGridUi/utils/Utils", 
    "horvath/staffingapp/utils/DateFormatter", 
    "sap/ui/core/format/DateFormat"
], (function (a, r) {
    "use strict";
    return class extends Map {
        constructor(e, a, s, i) {
            super();
            this.oBundle = e;
            let n = "yyyyMM",
                g = r.getInstance({
                    pattern: n
                }),
                o = String(g.format(s)),
                l = String(g.format(i));
            this.create(o, l);
        }
        create(r, s) {
            // if (a === t.MONTHLY) {
            //     let t = parseInt(r.substr(4), 10)
            //       , e = parseInt(r.substr(0, 4), 10)
            //       , a = parseInt(s.substr(4), 10)
            //       , i = parseInt(s.substr(0, 4), 10);
            //     this.createMonthly(t, e, a, i)
            // } else if (a === t.WEEKLY) {
            //     let t = e.getCalendarWeek(r)
            //       , a = e.getCalendarWeek(s)
            //       , i = parseInt(r.substr(0, 4), 10)
            //       , n = parseInt(s.substr(0, 4), 10);
            //     this.createWeekly(t, i, a, n)
            // } else
            //     this.createDaily(r, s)
            let t = parseInt(r.substr(4), 10)
                , e = parseInt(r.substr(0, 4), 10)
                , k = parseInt(s.substr(4), 10)
                , i = parseInt(s.substr(0, 4), 10);
            this.createMonthly(t, e, k, i);
        }
        createMonthly(t, e, r, s) {
            debugger;
            let yrMth,
                n = new Date(e, t - 1),
                g = 12 * (s - e) + (r - t) + 1;
            for (let ind = 0; ind < g; ind++) {
                yrMth = a.dateByYearMonth(n);
                this.set(this.getMapKey(n), yrMth);
                n.setMonth(n.getMonth() + 1);
            }
        }
        // createWeekly(t, e, a, r) {
        //     let s, i = this.getNumberofCalWeeks(e);
        //     s = t > a ? i - t + a + 1 : a - t + 1;
        //     let n = t
        //       , g = e;
        //     for (let t = 0; t < s; t++) {
        //         n > i && (g = r,
        //         n = 1);
        //         let t = this.getWeekDateRange(n, g)
        //           , e = this.oBundle.getText("CAL_WEEK", [this.formatCW(n)]) + "\n" + t
        //           , a = "";
        //         a = g.toString() + this.formatCW(n),
        //         this.set(a, e),
        //         n++
        //     }
        // }
        // createDaily(t, e) {
        //     let r, s = new Date(t.substr(0, 4),t.substr(4, 2) - 1,t.substr(6, 2)), i = new Date(e.substr(0, 4),e.substr(4, 2) - 1,e.substr(6, 2)).getTime() - s.getTime(), n = Math.round(i / 864e5);
        //     for (let t = 0; t <= n; t++)
        //         r = a.dateByWeekDay(s) + "\n" + a.dateByMonthDay(s),
        //         this.set(this.getMapKey(s), r),
        //         s.setDate(s.getDate() + 1)
        // }
        // formatCW(t) {
        //     return t < 10 ? "0" + t.toString() : t.toString()
        // }
        // getWeekDateRange(t, e) {
        //     let r, s = new Date(e,0,1 + 7 * (t - 1)), i = s.getDay(), n = s;
        //     i <= 4 ? n.setDate(s.getDate() - s.getDay() + 1) : n.setDate(s.getDate() + 8 - s.getDay());
        //     let g = new Date(n);
        //     return g.setDate(g.getDate() + 6),
        //     r = a.rangeByMonthDay(n, g),
        //     r
        // }
        // getNumberofCalWeeks(t) {
        //     let a = String(t + 1)
        //       , r = new Date(a);
        //     return r.setHours(0, 0, 0),
        //     r.setDate(r.getDate() - 1),
        //     e.getWeek(r)
        // }
        getMapKey(t) {
            let e = t.getDate()
              , a = t.getMonth() + 1
              , r = e <= 9 ? 0 + e.toString() : e.toString()
              , s = a <= 9 ? 0 + a.toString() : a.toString();
            return t.getFullYear() + s + r;
        }
    };
}
));
