/* eslint-disable @sap/ui5-jsdocs/no-jsdoc */
sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "./model/models",   
    "./controller/ErrorHandler",
    "./controller/MetadataService",
    "./Controller",
    "./model/AppModel",
    "./model/WorklistModel",
    "./model/TableModel"
], function (UIComponent, Device, models, ErrorHandler, MetadataService, Controllers, AppModel, WorklistModel, TableModel) {
    "use strict";

    return UIComponent.extend("horvath.staffingapp.Component", {

        metadata: {
            manifest: "json"
        },
        oControllers: undefined,
        models: undefined,
        /**
         * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
         * In this function, the device models are set and the router is initialized.
         * @public
         * @override
         */
        init: function () {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);
            let oBundle = this.getModel("i18n").getResourceBundle();

            // initialize the error handler with the component
            this._oErrorHandler = new ErrorHandler(this);

            // initialize the Metadata with the component
            this._oMetadataService = new MetadataService(this);

            let aEssentialControllers = ["header"];
            this.oControllers = new Controllers(aEssentialControllers);

            this.setModel(new AppModel(oBundle), "app");
            this.setModel(new WorklistModel(oBundle), "Worklist");
            this.setModel(new TableModel(oBundle), "Table");
            this.models = {
                app: this.getModel("app"),
                worklist: this.getModel("worklist"),
                table: this.getModel("Table")
            };
            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // create the views based on the url/hash
            this.getRouter().initialize();
        },

        /**
         * The component is destroyed by UI5 automatically.
         * In this method, the ErrorHandler is destroyed.
         * @public
         * @override
         */
        destroy: function () {
            this._oErrorHandler.destroy();
            // call the base component's destroy function
            UIComponent.prototype.destroy.apply(this, arguments);
        },

        /**
         * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
         * design mode class should be set, which influences the size appearance of some controls.
         * @public
         * @return {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
         */
        getContentDensityClass: function () {
            if (this._sContentDensityClass === undefined) {
                // check whether FLP has already set the content density class; do nothing in this case
                // eslint-disable-next-line sap-no-proprietary-browser-api
                if (document.body.classList.contains("sapUiSizeCozy") || document.body.classList.contains("sapUiSizeCompact")) {
                    this._sContentDensityClass = "";
                } else if (!Device.support.touch) { // apply "compact" mode if touch is not supported
                    this._sContentDensityClass = "sapUiSizeCompact";
                } else {
                    // "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
                    this._sContentDensityClass = "sapUiSizeCozy";
                }
            }
            return this._sContentDensityClass;
        }

    });

});