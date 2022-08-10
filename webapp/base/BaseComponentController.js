sap.ui.define(["horvath/staffingapp/controller/ComponentController"], (function(e) {
    "use strict";
    return e.extend("horvath.staffingapp.base.BaseViewChildController", {
        injectMembers: function() {
            this.models = this.oComponent.models,
            this.oBundle = this.oComponent.getModel("i18n").getResourceBundle(),
            this.oControllers = this.oComponent.oControllers
        }
    })
}
));
