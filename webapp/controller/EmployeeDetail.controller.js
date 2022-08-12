/* eslint-disable valid-jsdoc */
/* eslint-disable @sap/ui5-jsdocs/no-jsdoc */
sap.ui.define([
    "./BaseController"
], (function (BaseController) {
    "use strict";
    return BaseController.extend("horvath.staffingapp.controller.EmployeeDetail", {
        onInit: function () { 

        },
        		/**
		 * Event Handler for confirmation to navigate back the list screen
		 * @public
		 */
		onBack: function () {
            debugger;
            this.getOwnerComponent().getRouter().navTo("Worklist");
			// // Prompt for confirm
			// var oModel = this.getView().getModel();
			// if (oModel.hasPendingChanges()) {
			// 	var sConfirmMessage = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("ExitWarining");
			// 	MessageBox.warning(sConfirmMessage, {
			// 		actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
			// 		onClose: function (sAction) {
			// 			if (sAction === MessageBox.Action.OK) {
			// 				oModel.resetChanges();
			// 				this.getOwnerComponent().getRouter().navTo("main");
			// 			}
			// 			return;
			// 		}.bind(this)
			// 	});
			// } else {
			// 	this.getOwnerComponent().getRouter().navTo("main");
			// }
		},
    });
}));