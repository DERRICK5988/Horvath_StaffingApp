/* eslint-disable @sap/ui5-jsdocs/no-jsdoc */
sap.ui.define([
    "sap/ui/base/Object",
    "sap/ui/model/json/JSONModel"
], function (UI5Object, JSONModel) {
    "use strict";

    return UI5Object.extend("horvath.staffingapp.controller.MetadataService", {

        /**
         * Handles application errors by automatically attaching to the model events and displaying errors when needed.
         * @class
         * @param {sap.ui.core.UIComponent} oComponent reference to the app's component
         * @public
         * @alias horvath.staffingapp.controller.MetadataService
         */
        constructor: function (oComponent) {
            // @ts-ignore
            this._oResourceBundle = oComponent.getModel("i18n").getResourceBundle();
            this._oComponent = oComponent;
            debugger;
            this._oModel = oComponent.getModel();
            // @ts-ignore
            this._oModel.metadataLoaded().then(this._onMetadataLoaded.bind(this));
        },

		/**
		 * Prepare any metadata service before render to controller/view
		 * @param {sap.ui.base.Event} The parsed metadata object
		 * @private
		 */
        // @ts-ignore
        _onMetadataLoaded: function (oEvent) {
            
            // this._oComponent.setModel(this._oModel.getServiceMetadata().dataServices.schema[0].entityType, "entitytype");
            // this._oComponent.setModel(new JSONModel({}), "Worklist");
            this._oComponent.setModel(new JSONModel({}), "Settings");
        }
    });
});