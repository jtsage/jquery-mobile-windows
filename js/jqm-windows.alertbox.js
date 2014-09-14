 /*
 * jQuery Mobile Framework : plugin to provide a popup wrapper
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * https://github.com/jtsage/jquery-mobile-windows
 */
 
(function($, undefined ) {
  $.widget( "mobile.alertbox", $.mobile.widget, {
	options: {
		version: "1.4.4-2014091400", // jQueryMobile-YrMoDaySerial
		closeTime: 5000,
		positionTo: "window",
		transition: "pop",
		dismissible: true,
	},
	_mrclose: function () { 
		clearTimeout(this.closer);
	},
	_create: function () {
		var self = this,
			o = $.extend(this.options, this._getLongOptions(this.element)),
			basePop = this.element;
			
		self.basePop = this.element;
		self.closer = false;
		
		basePop.popup({
			transition:o.transition,
			dismissible: o.dismissible,
			positionTo:o.positionTo,
			history: false
		});
		basePop.on("popupafterclose", function () { self._mrclose.apply(self); });
		
		self.open();
	},
	open: function () {
		var self = this,
			o = this.options;
			
		self.basePop.popup("open");
		if ( parseInt(o.closeTime,10) > 0 ) {
			self.closer = setTimeout( 
				$.proxy(function() { this.basePop.popup("close"); },self), o.closeTime
			);
		}
	},
	_getLongOptions: function(element) {
		var key, temp,
			retty = {},
			prefix = "alertbox";
		
		for (key in element.data()) {
			if (key.substr(0, prefix.length) === prefix && key.length > prefix.length) {
				temp = key.substr(prefix.length);
				temp = temp.charAt(0).toLowerCase() + temp.slice(1);
				retty[temp] = element.data(key);
			}
		}
		return retty;
    },
	
  });
  $(document).on("pageshow", function(e) {
	$(".jqm-alert-box", e.target).each(function() {
		var defed = typeof $(this).data("mobile-alertbox");
		if (defed === "undefined") {
			setTimeout($.proxy(function() {$(this).alertbox();}, this), 250);
		} else {
			setTimeout($.proxy(function() {$(this).alertbox("open");}, this), 250);
		}
	});
  });
})( jQuery );
