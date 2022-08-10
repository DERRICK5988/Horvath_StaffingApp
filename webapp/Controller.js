/* eslint-disable @sap/ui5-jsdocs/no-jsdoc */
sap.ui.define(["sap/ui/base/Object", "sap/base/Log"], (function (e, s) {
    "use strict";
    return e.extend("horvath.staffingapp.Controllers", {
        _aEssentialControllers: void 0,
        _pEssentialControllersAdded: void 0,
        _fnResolveEssential: void 0,
        constructor: function (t) {
            
            e.apply(this, arguments);
            this._oLogger = s.getLogger("horvath.staffingapp.Controller");
            this._aEssentialControllers = t;
            this._pEssentialControllersAdded = new Promise(function (e, s) {
                this._fnResolveEssential = e;
            }.bind(this));
        },
        essentialControllersAdded: function () {
            return this._pEssentialControllersAdded
        },
        add: function (e, s) {
            if (this[e]) {
                throw Error("cannot add controller second time: " + e);
            }
            this[e] = s;
            this._oLogger.debug("added: " + e);
            this._resolveEssentialControllersAdded();
        },
        _resolveEssentialControllersAdded: function () {
            let e = !0;
            for (let s = 0; s < this._aEssentialControllers.length; s++)
                if (!this[this._aEssentialControllers[s]]) {
                    e = !1;
                    break
                }
            e && (this._oLogger.debug("resolving essential controllers added"),
                this._fnResolveEssential())
        }
    })
}
));