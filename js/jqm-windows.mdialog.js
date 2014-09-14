 /*
 * jQuery Mobile Framework : plugin to provide a mobile dialog Widget. 
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * https://github.com/jtsage/jquery-mobile-windows
 */
 
(function($, undefined ) {
  $.widget( "mobile.mdialog", $.mobile.widget, {
	options: {
		version: "1.4.4-2014091400", // jQueryMobile-YrMoDaySerial
		
		useMenuMode: false,
		
		containerTheme: false,
		
		popOverlay: "b",
		popDismissable: true,
		popPosition: "window",
		popPosX: false,
		popPosY: false,
		popAutoPad: true,
		
		transition: "pop",
		clickEvent: "click",
		
		content: false,
		
		closeButton: false,
		closeButtonTheme: "a",
		
		menuHeaderText: false,
		menuHeaderTheme: "a",
		menuMinWidth: false,
		menuSubtitle: false,
		menuButtonType: "list",
		menuButtonTheme: "a",
		menuInputList: false,
		
		// Gotta love some callbacks!
		callbackOpen: false,
		callbackOpenArgs: [],
		callbackClose: false,
		callbackCloseArgs: []
	},
	_create: function () {
		var self = this,
			o = this.options,
			funcs = {},
			theme = $.mobile.getInheritedTheme( ".ui-active-page" ),
			basePop = $("<div data-role='popup' data-theme='" + theme + "'></div>");
			
		self.internalID = new Date().getTime();
		
		if ( o.containerTheme !== false ) { basePop.attr("data-theme", o.containerTheme); }
		
		if ( o.popOverlay !== false ) { basePop.attr("data-overlay-theme", o.popOverlay); }
		
		if ( o.popAutoPad === true && o.content !== false) {
			if ( o.content.search("<") === -1 ) {
				basePop.attr("class", "ui-content"); 
				o.content = "<p>" + o.content + "</p>";
			}
		}
		
		// Jackass trap.
		if ( o.popDismissable === false && o.closeButton === false ) { o.popDismissable = true; }
		
		if ( o.useMenuMode === false ) {
			// BLANK mode
			if ( o.closeButton === "left" ) {
				o.content = "<a href='javascript:void(0);' data-rel='back' data-role='button'" +
					" data-theme='" + o.closeButtonTheme + 
					"' data-icon='delete' data-iconpos='notext' " +
					" class='ui-btn-left'>Close</a>" + o.content;
			}
			if ( o.closeButton === "right" ) {
				o.content = "<a href='javascript:void(0);' data-rel='back' data-role='button'" + 
					" data-theme='" + o.closeButtonTheme + 
					"' data-icon='delete' data-iconpos='notext' " +
					" class='ui-btn-right'>Close</a>" + o.content;
			}
		} else {
			o.content = "";
			// BUTTON mode basics
			if ( o.closeButton === "left" ) {
				o.content = "<a href='javascript:void(0);' data-rel='back' data-role='button'" + 
					" data-theme='" + o.closeButtonTheme +
					"' data-icon='delete' data-iconpos='notext' " +
					" class='ui-btn-left'>Close</a>";
			}
			if ( o.closeButton === "right" ) {
				o.content = "<a href='javascript:void(0);' data-rel='back' data-role='button'" + 
					" data-theme='" + o.closeButtonTheme +
					"' data-icon='delete' data-iconpos='notext' " +
					" class='ui-btn-right'>Close</a>";
			}
			if ( o.menuHeaderText !== false ) {
				o.content = o.content + "<div data-role='header' data-theme='" + o.menuHeaderTheme +
					"'" +
					((o.menuMinWidth !== false) ? " style='min-width: " + o.menuMinWidth + "'":"") +
					"><h1>" + o.menuHeaderText + "</h1></div>";
			}
			o.content = o.content + "<div data-role='content'>";
			
			if ( o.menuSubtitle !== false && o.menuButtonType === "button" ) {
				o.content = o.content + "<p>" + o.menuSubtitle + "</p>";
			}

			if ( o.menuInputList !== false ) {
				o.content = o.content + "<div style='padding-bottom:1em;'>";
				funcs.inputs = [];
				$.each(o.menuInputList, function(index, value) {
					o.content = o.content + "<input " + 
						(("value" in value)?"value='" + value.value + "'":"") +
						" type='" + (("type" in value) ? value.type : "text") +
						"' id='" + value.id + "' placeholder='" + value.title + "' />";
				});
				
				o.content = o.content + "</div>";
			}

			o.content = o.content + "<div class='popupbuttonshere'></div></div>";
		}
		
		$(o.content).appendTo(basePop).enhanceWithin();
		
		$.extend(self, {basePop: basePop});

		if ( o.useMenuMode === true ) {
			if ( o.menuButtonType === "list" ) {
				self._makeListButtons(basePop);
			} else {
				self._makeButtonButtons(basePop);
			}
		}
		
		funcs.clean = function () { basePop.remove(); self.destroy(); };
		
		funcs.getinput = function() {
			if ( o.menuInputList !== false && o.useMenuMode === true ) {
				$.each(o.menuInputList, function(index, value) {
					o.callbackCloseArgs.push([value.id, $("#" + value.id).val()]);
				});
			}
		};
		
		if ( $.isFunction(o.callbackOpen) ) {
			funcs.open = function() { o.callbackOpen.apply(self, o.callbackOpenArgs); };
		} else {
			funcs.open = false;
		}
		
		if ( $.isFunction(o.callbackClose) ) {
			if ( o.menuInputList !== false && o.useMenuMode === true ) {
				funcs.close = function() { 
					funcs.getinput.apply(self);
					o.callbackClose.apply(self, o.callbackCloseArgs);
					funcs.clean.apply(self);
				};
			} else {
				funcs.close = function() {
					o.callbackClose.apply(self, o.callbackCloseArgs);
					funcs.clean.apply(self);
				};
			}
		} else {
			funcs.close = function() { funcs.clean.apply(self); };
		}
		
		funcs.openext = {};
		
		if ( o.popPosX !== false && o.popPosY !== false ) {
			o.positionTo = "origin";
			funcs.openext.x = o.popPosX;
			funcs.openext.y = o.popPosY;
		}
		
		basePop.enhanceWithin();
		
		basePop.popup({
			transition:o.transition,
			dismissible: o.popDismissable,
			positionTo:o.positionTo,
			afteropen: funcs.open,
			afterclose: funcs.close
		});
		
		basePop.popup("open", funcs.openext);
	},
	_appendInput: function(start) {
		var o = this.options;
			
		if ( o.menuInputList !== false && o.useMenuMode === true ) {
			$.each(o.menuInputList, function(index, value) {
				start.push([value.id, $( "#" + value.id ).val()]);
			});
		}
		return start;
	},
	_makeButtonButtons: function (basePop) {
		var self = this,
			o = self.options,
			thisNode = basePop.find(".popupbuttonshere");
		
		self.butObj = [];
		
		$.each(o.buttons, function(name, props) {
			props = $.isFunction( props ) ? { click: props } : props;
			props = $.extend({
				text   : name,
				id     : name + self.internalID,
				theme  : o.menuButtonTheme,
				icon   : "check",
				iconpos: "left",
				corners: true,
				shadow : true,
				args   : [],
				close  : true
			}, props);
			
			self.butObj.push($("<a href='javascript:void(0);'>"+props.text+"</a>")
				.appendTo(thisNode)
				.attr("id", props.id)
				.buttonMarkup({
					theme  : props.theme,
					icon   : props.icon,
					iconpos: props.iconpos,
					corners: props.corners,
					shadow : props.shadow
				}).unbind("vclick click")
				.bind(o.clickEvent, function() {
					props.args = self._appendInput(props.args);
					var returnValue = props.click.apply(self, $.merge(arguments, props.args));
					if ( returnValue !== false && props.close === true ) {
						basePop.popup("close");
					}
				})
			);
		});
	},
	_makeListButtons: function (basePop) {
		var self = this,
			o = self.options,
			thisParentNode = basePop.find(".popupbuttonshere"),
			thisNode = $("<ul data-role='listview'></ul>");
		
		self.butObj = [];
		
		if ( o.subTitle !== false ) {
			$("<li data-role='list-divider'>"+o.menuSubtitle+"</li>").appendTo(thisNode);
		}
		
		$.each(o.buttons, function(name, props) {
			props = $.isFunction( props ) ? { click: props } : props;
			props = $.extend({
				text   : name,
				id     : name + self.internalID,
				icon   : "check",
				args   : [],
				close  : true
			}, props);
			
			self.butObj.push($("<li id='" + props.id + "' data-icon='" + props.icon +
					"'><a href='javascript:void(0);'>" + props.text + "</a></li>" )
				.appendTo(thisNode)
				.bind(o.clickEvent, function() {
					props.args = self._appendInput(props.args);
					var returnValue = props.click.apply(self, $.merge(arguments, props.args));
					if ( returnValue !== false && props.close === true ) {
						basePop.popup("close");
					}
				})
			);
		});
		
		thisNode.listview().appendTo(thisParentNode);
	}
  });
})( jQuery );
