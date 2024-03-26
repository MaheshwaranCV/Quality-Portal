sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageBox"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, Filter, FilterOperator, MessageBox) {
		"use strict";

		return Controller.extend("maheshqualityportal.controller.Viewi", {
			onInit: function () {
				var url = "/sap/opu/odata/sap/ZODATA_QUALITY_MAHESH_SRV/";
				var d;
				var oe = new sap.ui.model.odata.ODataModel(url, true);
				//var uri = "PoNum='" + plant + "'";
				//window.console.log(uri);
				oe.read("/ZODATA_QP_INSPECT_MAHESHSet?$filter=Plant eq '1001'", {
					context: null,
					urlParameter: null,
					async: false,
					success: function (oData, oResponse) {
						d = oData.results;
					}
				});
				var oen = new sap.ui.model.json.JSONModel();
				// created a JSON model
				oen.setData({
					"results": d
				});
				// oTable.setModel(tableModel);
				// set explored app's demo model on this sample
				this.getView().byId("producttable1").setModel(oen);
				this.getView().byId("producttable").setModel(oen); // added by me - tard
			},
			onSupplierFilterChange: function (oEvent) {
				this._applyFilters();
			},

			onInspectionLotFilterChange: function (oEvent) {
				this._applyFilters();
			},

			onSearch: function () {
				this._applyFilters();
			},

			onClearFilter: function () {
				this.getView().byId("inspectionLotFilter").setValue("");
				this.getView().byId("supplierFilter").setSelectedKey("");
				this._applyFilters();
			},

			_applyFilters: function () {
				var sInspectionLot = this.getView().byId("inspectionLotFilter").getValue();
				var sSupplier = this.getView().byId("supplierFilter").getSelectedKey();

				var oTable = this.getView().byId("producttable1");
				var oBinding = oTable.getBinding("items");

				var aFilters = [];

				if (sInspectionLot !== "") {
					aFilters.push(new Filter({
						path: "Insplot",
						operator: FilterOperator.Contains,
						value1: sInspectionLot
					}));
				}

				if (sSupplier !== "") {
					aFilters.push(new Filter({
						path: "Vendor",
						operator: FilterOperator.EQ,
						value1: sSupplier
					}));
				}

				oBinding.filter(aFilters);
			},
			formatDate: function (sDate) {
				if (sDate) {
					var oDateFormat = sap.ui.core.format.DateFormat.getInstance({
						pattern: "dd-MM-yyyy"
					});
					return oDateFormat.format(new Date(sDate));
				}
				return "";
			},
			onLearnMorePress: function() {
				var learnMoreLink = "https://www.tutorialspoint.com/sap_qm/sap_qm_lot_inspection.htm";
				window.open(learnMoreLink, "_blank");
			},
			// logout: function () {
			// 	var oR = sap.ui.core.UIComponent.getRouterFor(this);
			// 	oR.navTo("RouteViewl");
			// },
			logout: function () {
				var that = this;
				MessageBox.confirm("Are you sure you want to Logout?", {
					actions: [MessageBox.Action.YES, MessageBox.Action.NO],
					onClose: function (oAction) {
						if (oAction === MessageBox.Action.YES) {
							var oR = sap.ui.core.UIComponent.getRouterFor(that);
							oR.navTo("RouteViewl");
						}
					}
				});
			},	
			back: function () {
				var oR = sap.ui.core.UIComponent.getRouterFor(this);
				oR.navTo("RouteViewd");
			},
			onShowDetailsPress: function (oEvent) {
				var oButton = oEvent.getSource();
				var oRow = oButton.getParent();
				var oContext = oRow.getBindingContext();
			
				var sInsplot = oContext.getProperty("Insplot");
				var sCreatDat =this.formatDate(oContext.getProperty("CreatDat"));
				var sVendor = oContext.getProperty("Vendor");
				var sPoNumber = oContext.getProperty("PoNumber");
				var sMaterial = oContext.getProperty("Material");
				var sTxtMat = oContext.getProperty("TxtMat");
				var sPoItem = oContext.getProperty("PoItem");
				var sMatDoc = oContext.getProperty("MatDoc");
				var sMatdocItm = oContext.getProperty("MatdocItm");
				var sDocYear = oContext.getProperty("DocYear");
			
				// Create a message box to display the details
				var sDetails = "INSPECTION LOT : " + sInsplot + "\n\n"
							 + "CREATED ON : " + sCreatDat + "\n\n"
							 + "SUPPLIER : " + sVendor + "\n\n"
							 + "PURCHASING DOC. : " + sPoNumber + "\n\n"
							 + "MATERIAL NO. : " + sMaterial + "\n\n"
							 + "MAT DESCRIP. : " + sTxtMat + "\n\n"
							 + "ITEM : " + sPoItem + "\n\n"
							 + "MATERIAL DOC. : " + sMatDoc + "\n\n"
							 + "MAT DOC ITEM. : " + sMatdocItm + "\n\n"
							 + "MAT DOC YEAR. : " + sDocYear + "\n\n";
			
				MessageBox.information(sDetails, {
					title: "DETAILS",
					actions: [MessageBox.Action.OK]
				});
			}
		});
	});