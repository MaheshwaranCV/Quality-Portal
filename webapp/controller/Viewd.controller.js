sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("maheshqualityportal.controller.Viewd", {
            onLogin1: function () {
                var oR = sap.ui.core.UIComponent.getRouterFor(this);
                oR.navTo("RouteViewi");
            },
            onLogin2: function () {
                var oR = sap.ui.core.UIComponent.getRouterFor(this);
                oR.navTo("RouteViewr");
            },
            onLogin3: function () {
                var oR = sap.ui.core.UIComponent.getRouterFor(this);
                oR.navTo("RouteViewu");
            },
            // logout   : function(){
            //     var oR = sap.ui.core.UIComponent.getRouterFor(this);
            //     oR.navTo("RouteViewl");
            // }
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
			}
        });
    });