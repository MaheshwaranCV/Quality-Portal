/*global QUnit*/

sap.ui.define([
	"mahesh_quality_portal/controller/Viewl.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Viewl Controller");

	QUnit.test("I should test the Viewl controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
