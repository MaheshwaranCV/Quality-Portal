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

		return Controller.extend("maheshqualityportal.controller.Viewu", {
			onInit: function () {
				var url = "/sap/opu/odata/sap/ZODATA_QUALITY_MAHESH_SRV/";
				var d;
				var oe = new sap.ui.model.odata.ODataModel(url, true);
				//var uri = "PoNum='" + plant + "'";
				//window.console.log(uri);
				oe.read("/ZODATA_QP_USAGE_MAHESHSet?$filter=IPlant eq '1001'", {
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
			onQuantityFilterChange: function (oEvent) {
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
				this.getView().byId("quantityFilter").setSelectedKey("");
				this._applyFilters();
			},
	
			_applyFilters: function () {
				var sInspectionLot = this.getView().byId("inspectionLotFilter").getValue();
				var sQuantity = this.getView().byId("quantityFilter").getSelectedKey();
	
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
	
				if (sQuantity !== "") {
					aFilters.push(new Filter({
						path: "QualityScore",
						operator: FilterOperator.EQ,
						value1: sQuantity
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
				var learnMoreLink = "https://www.tutorialspoint.com/sap_qm/sap_qm_usage_decision.htm#:~:text=Usage%20decision%20is%20used%20to,process%20is%20marked%20as%20completed.&text=Step%201%20%E2%88%92%20Go%20to%20T,QA32%20and%20Enter%20Plant%20Code.";
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
				var sQualityScore =oContext.getProperty("QualityScore");
				var sUdCatalogType = oContext.getProperty("UdCatalogType");
				var sUdSelectedSet = oContext.getProperty("UdSelectedSet");
				var sUdCodeGroup = oContext.getProperty("UdCodeGroup");
				var sUdCode = oContext.getProperty("UdCode");
				var sUdRecordedByUser = oContext.getProperty("UdRecordedByUser");
				var sUdRecordedOnDate = this.formatDate(oContext.getProperty("UdRecordedOnDate"));
			
				// Create a message box to display the details
				var sDetails = "INSPECTION LOT : " + sInsplot + "\n\n"
							 + "QUALITY : " + sQualityScore + "\n\n"
							 + "CATALOG-TYPE : " + sUdCatalogType + "\n\n"
							 + "SELECTION SET : " + sUdSelectedSet + "\n\n"
							 + "CODE-GROUP : " + sUdCodeGroup + "\n\n"
							 + "DECISION : " + sUdCode + "\n\n"
							 + "RECORDED BY USER : " + sUdRecordedByUser + "\n\n"
							 + "RECORDED ON DATE : " + sUdRecordedOnDate + "\n\n";
			
				MessageBox.information(sDetails, {
					title: "DETAILS",
					actions: [MessageBox.Action.OK]
				});
			}
		});
	});