/* eslint-disable @sap/ui5-jsdocs/no-jsdoc */
sap.ui.define(["sap/ui/core/mvc/Controller"], (function(Controller) {
    "use strict";
    return Controller.extend("horvath.staffingapp.base.BaseViewController", {
        injectMembers: function() {
            this.oComponent = this.getOwnerComponent();
            this.models = this.oComponent.models;
            this.oBundle = this.oComponent.getModel("i18n").getResourceBundle();
            this.oControllers = this.oComponent.oControllers;
        }
    });
}
));