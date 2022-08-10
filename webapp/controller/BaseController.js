/* eslint-disable @sap/ui5-jsdocs/no-jsdoc */
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/library",
    "../model/formatter",
], function (Controller, UIComponent, mobileLibrary, formatter) {
    "use strict";

    // shortcut for sap.m.URLHelper
    var URLHelper = mobileLibrary.URLHelper;

    return Controller.extend("horvath.staffingapp.controller.BaseController", {
        formatter: formatter,
        /**
         * Convenience method for accessing the router.
         * @public
         * @returns {sap.ui.core.routing.Router} the router for this component
         */
        getRouter: function () {
            return UIComponent.getRouterFor(this);
        },

        /**
         * Convenience method for getting the view model by name.
         * @public
         * @param {string} [sName] the model name
         * @returns {sap.ui.model.Model} the model instance
         */
        getModel: function (sName) {
            return this.getView().getModel(sName);
        },

        /**
         * Convenience method for setting the view model.
         * @public
         * @param {sap.ui.model.Model} oModel the model instance
         * @param {string} sName the model name
         * @returns {sap.ui.mvc.View} the view instance
         */
        setModel: function (oModel, sName) {
            return this.getView().setModel(oModel, sName);
        },

        /**
         * Getter for the resource bundle.
         * @public
         * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
         */
        getResourceBundle: function () {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        },

        /**
         * Event handler when the share by E-Mail button has been clicked
         * @public
         */
        // onShareEmailPress: function () {
        //     var oViewModel = (this.getModel("objectView") || this.getModel("worklistView"));
        //     URLHelper.triggerEmail(
        //         null,
        //         oViewModel.getProperty("/shareSendEmailSubject"),
        //         oViewModel.getProperty("/shareSendEmailMessage")
        //     );
        // }

        injectMembers: function() {
            this.oComponent = this.getOwnerComponent();
            this.models = this.oComponent.models;
            this.oControllers = this.oComponent.oControllers;
        },

        		/**
		 * Reuseable function and share across all controller
		 * Value help config is defined in ValueHelpModel.json
		 * Data access logic is included to filter data which has no permission
		 * @param:	{object} oInput 
		 *      	{object} oSetValConfig:  Set additional config on value help (master/ detail) 
		 *			{object} oUserAccess
		 * @public
		 */
		loadValueHelpFragment: function (oInput, oSetValConfig) {
			// var oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle(),
			// 	oValueHelpModel = this.oValueHelpModel.getData()[oInput.getName()],
			// 	aCols = oValueHelpModel.aCols;
			// Fragment.load({
			// 	name: [oResourceBundle.getText("fragmentPath"), "ValueHelpDialog"].join(""),
			// 	controller: this
			// }).then(function name(oFragment) {
			// 	this.oValueHelpDialogue = oFragment;
			// 	this.getView().addDependent(this.oValueHelpDialogue);
			// 	this.oValueHelpDialogue.setTitle(oValueHelpModel.sTitle);
			// 	this.oValueHelpDialogue.setKey("Project");
			// 	this.oValueHelpDialogue.setDescriptionKey(
			// 		aCols[1] ? aCols[1].template : aCols[0].template
			// 	);
			// 	this.oValueHelpDialogue.setSupportMultiselect(oSetValConfig.bMulti);
			// 	this.oValueHelpDialogue.setFilterBar(
			// 		new FilterBar({
			// 			advancedMode: false,
			// 			filterBarExpanded: true,
			// 			search: this._onFilterBarSearch.bind(this),
			// 			isRunningInValueHelpDialog: true,
			// 			showFilterConfiguration: false,
			// 			filterGroupItems: aCols.map(function (oColumn) {
			// 				return new FilterGroupItem({
			// 					groupName: "__$INTERNAL$",
			// 					name: oColumn.template,
			// 					label: oColumn.label,
			// 					visibleInFilterBar: true,
			// 					control: new Input({
			// 						name: oColumn.template
			// 					})
			// 				});
			// 			}),
			// 			basicSearch: new SearchField({
			// 				showSearchButton: true,
			// 				width: "77%",
			// 				search: this._onFilterBarSearch.bind(this)
			// 			})
			// 		})
			// 	);
			// 	if (oSetValConfig.bSupRange) {
			// 		this.oValueHelpDialogue.setSupportRanges(oSetValConfig.bSupRange);
			// 		this.oValueHelpDialogue.setRangeKeyFields([{
			// 			label: "Code",
			// 			key: "code",
			// 			type: "string"
			// 		}]);
			// 		this.oValueHelpDialogue.setIncludeRangeOperations([ValueHelpRangeOperation.EQ], "string");
			// 	}
			// 	var oBindingInfo = {
			// 			path: oValueHelpModel.EntitySet,
			// 			filters: [],
			// 			suspended: oValueHelpModel.bSuspend
			// 		},
			// 		aFilters = [];
			// 	if (aFilters.length > 0) {
			// 		oBindingInfo.filters.push(new Filter({
			// 			filters: aFilters,
			// 			and: oValueHelpModel.bAnd
			// 		}));
			// 	}
			// 	this.oValueHelpDialogue.getTableAsync().then(function (oTable) {
			// 		oTable.setEnableSelectAll(false);
			// 		oTable.setModel(new JSONModel({
			// 			cols: aCols
			// 		}), "columns");
			// 		if (oTable.bindRows) {
			// 			oTable.bindAggregation("rows", oBindingInfo);
			// 		}
			// 		if (oTable.bindItems) {
			// 			oTable.bindAggregation("items", oBindingInfo, function () {
			// 				return new ColumnListItem({
			// 					cells: aCols.map(function (column) {
			// 						return new Label({
			// 							text: "{" + column.template + "}"
			// 						});
			// 					})
			// 				});
			// 			});
			// 		}
			// 		this.oValueHelpDialogue.update();
			// 	}.bind(this));
			// 	this.oValueHelpDialogue.open();
			// }.bind(this));
		}
    });

});