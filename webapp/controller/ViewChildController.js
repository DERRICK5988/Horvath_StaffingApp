/* eslint-disable @sap/ui5-jsdocs/no-jsdoc */
sap.ui.define(["sap/ui/base/Object"], (function(t) {
    "use strict";
    return t.extend("horvath.staffingapp.controller.ViewChildController", {
        oParent: void 0,
        constructor: function(n) {
            t.prototype.constructor.apply(this, arguments);
            this.oParent = n;
            this.onInit();
        },
        destroy: function() {
            t.prototype.destroy.apply(this, arguments);
            this.onExit();
        },
        onInit: function() {},
        onExit: function() {},
        byId: function(t) {
            return this.oParent.byId(t);
        },
        createId: function(t) {
            return this.oParent.createId(t);
        },
        getOwnerComponent: function() {
            return this.oParent.getOwnerComponent();
        },
        getView: function() {
            return this.oParent.getView();
        }
    });
}
));
