 /*
 * jQuery Mobile Framework : plugin to provide a mobile dialog Widget. 
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * https://github.com/jtsage/jquery-mobile-windows
 */
 
(function($, undefined ) {
  $.widget( "mobile.mdialog", $.mobile.widget, {
	options: {
		version: '1.4.3-201408010', // jQueryMobile-YrMoDaySerial
		
		useMenuMode: false,
		
		containerTheme: false,
		
		popOverlay: 'b',
		popDismissable: true,
		popPosition: 'window',
		popPosX: false,
		popPosY: false,
		popAutoPad: true,
		
		transition: 'pop',
		clickEvent: 'vclick',
		
		content: false,
		
		closeButton: false,
		closeButtonTheme: 'a',
		
		menuHeaderText: false,
		menuHeaderTheme: 'a',
		menuMinWidth: false,
		menuSubtitle: false,
		menuButtonType: 'list',
		menuButtonTheme: 'a',
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
			basePop = $('<div data-role="popup"></div>'), gennyPop, funcs = {},
			gennyPage = $('<div data-role="page"></div>');
			
		self.internalID = new Date().getTime();
		
		if ( o.containerTheme !== false ) { basePop.attr('data-theme', o.containerTheme); }
		
		if ( o.popOverlay !== false ) { basePop.attr('data-overlay-theme', o.popOverlay); }
		
		if ( o.popAutoPad === true && o.content !== false ) {
			if ( o.content.search('<') === -1 || o.useMenuMode == true ) {
				basePop.attr('class', 'ui-content'); 
			}
		}
		
		// Jackass trap.
		if ( o.popDismissable === false && o.closeButton === false ) { o.popDismissable = true; }
		
		if ( o.useMenuMode === false ) {
			// BLANK mode
			if ( o.closeButton === "left" ) {
				o.content = '<a href="#" data-rel="back" data-role="button" data-theme="'+o.closeButtonTheme+'" data-icon="delete" data-iconpos="notext" class="ui-btn-left">Close</a>' + o.content;
			}
			if ( o.closeButton === "right" ) {
				o.content = '<a href="#" data-rel="back" data-role="button" data-theme="'+o.closeButtonTheme+'" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>' + o.content;
			}
		} else {
			// BUTTON mode basics
			if ( o.closeButton === "left" ) {
				o.content = '<a href="#" data-rel="back" data-role="button" data-theme="'+o.closeButtonTheme+'" data-icon="delete" data-iconpos="notext" class="ui-btn-left">Close</a>';
			}
			if ( o.closeButton === "right" ) {
				o.content = '<a href="#" data-rel="back" data-role="button" data-theme="'+o.closeButtonTheme+'" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>';
			}
			if ( o.menuHeaderText !== false ) {
				o.content = o.content + '<div data-role="header" data-theme="' + o.menuHeaderTheme + '"' +
					((o.menuMinWidth !== false) ? ' style="min-width: ' + o.menuMinWidth + '"' : '') +
					"><h1>" + o.menuHeaderText + "</h1></div>";
			}
			o.content = o.content + '<div data-role="content">';
			
			if ( o.subTitle !== false && o.menuButtonType === 'button' ) {
				o.content = o.content + '<p>' + o.subTitle + '</p>';
			}

			if ( o.inputList !== false ) {
				o.content = o.content + '<div style="padding-bottom:1em;">';
				$.each(o.inputList, function(index, value) {
					o.content = o.content +	"<input type='"+(("type" in value)?value.type:"text")+"' id='"+value.id+"' placeholder='"+value.title+"' />";
				});
				o.content = o.content + '</div>';
			}

			o.content = o.content + '<div class="popupbuttonshere"></div></div>';
		}
		
		// The rationale behind this: Things do not always generate properly
		// if they aren't on a page.  So, I made a page, I generated everything,
		// then I pluck it back off there and drop it in the popup.  And of 
		// course clean up the leavings.
		$(o.content).appendTo(gennyPage);//.trigger('create');
		gennyPage.appendTo('body').page().trigger('create');
		basePop.append(gennyPage.children());
		gennyPage.remove();
		basePop.appendTo($('.ui-page-active'));
		
		$.extend(self, {basePop: basePop});

		if ( o.displayMode === 'button' ) {
			if ( o.buttonMode === 'list' ) {
				self._makeListButtons(basePop);
			} else {
				self._makeButtonButtons(basePop);
			}
		}
		
		funcs.clean = function () { basePop.remove(); self.destroy(); }
		
		if ( $.isFunction(o.callbackOpen) ) {
			funcs.open = function() { o.callbackOpen.apply(self, o.callbackOpenArgs); }
		} else {
			funcs.open = false;
		}
		
		if ( $.isFunction(o.callbackClose) ) {
			funcs.close = function() { o.callbackClose.apply(self, o.callbackCloseArgs); funcs.clean.apply(self); }
		} else {
			funcs.close = function() { funcs.clean.apply(self); }
		}
		
		funcs.openext = {};
		
		if ( o.popPosX !== false && o.popPosY !== false ) {
			o.positionTo = "origin";
			funcs.openext.x = o.popPosX;
			funcs.openext.y = o.popPosY;
		}
		
		basePop.popup({
			'transition':o.transition,
			'dismissible': o.popDismissable,
			'positionTo':o.positionTo,
			'afteropen': funcs.open,
			'afterclose': funcs.close
		});
		
		basePop.popup('open', funcs.openext);
	},
	_makeButtonButtons: function (basePop) {
		var self = this,
			o = self.options,
			thisNode = basePop.find('.popupbuttonshere');
		
		self.butObj = [];
		
		$.each(o.buttons, function(name, props) {
			props = $.isFunction( props ) ? { click: props } : props;
			props = $.extend({
				text   : name,
				id     : name + self.internalID,
				theme  : o.buttonDefaultTheme,
				icon   : 'check',
				iconpos: 'left',
				corners: 'true',
				shadow : 'true',
				args   : [],
				close  : true
			}, props);
			
			self.butObj.push($("<a href='#'>"+props.text+"</a>")
				.appendTo(thisNode)
				.attr('id', props.id)
				.buttonMarkup({
					theme  : props.theme,
					icon   : props.icon,
					iconpos: props.iconpos,
					corners: props.corners,
					shadow : props.shadow
				}).unbind("vclick click")
				.bind(o.clickEvent, function() {
					var returnValue = props.click.apply(self, $.merge(arguments, props.args));
					if ( returnValue !== false && props.close === true ) {
						basePop.popup('close');
					}
				})
			);
		});
	},
	_makeListButtons: function (basePop) {
		var self = this,
			o = self.options,
			thisParentNode = basePop.find('.popupbuttonshere'),
			thisNode = $('<ul data-role="listview"></ul>'),
			gennyPage = $('<div data-role="page"><div id="tempcontent" data-role="content"></div></div>');
		
		self.butObj = [];
		
		if ( o.subTitle !== false ) {
			$("<li data-role='list-divider'>"+o.subTitle+"</li>").appendTo(thisNode)
		}
		
		$.each(o.buttons, function(name, props) {
			props = $.isFunction( props ) ? { click: props } : props;
			props = $.extend({
				text   : name,
				id     : name + self.internalID,
				icon   : 'check',
				args   : [],
				close  : true
			}, props);
			
			self.butObj.push($("<li id='"+props.id+"' data-icon='"+props.icon+"'><a href='#'>"+props.text+"</a></li>")
				.appendTo(thisNode)
				.bind(o.clickEvent, function() {
					var returnValue = props.click.apply(self, $.merge(arguments, props.args));
					if ( returnValue !== false && props.close === true ) {
						basePop.popup('close');
					}
				})
			);
		});
		
		thisNode.appendTo(gennyPage.find('#tempcontent'));
		gennyPage.appendTo('body').page().trigger('create');
		thisParentNode.append(gennyPage.find('#tempcontent').children());
		gennyPage.remove();
	}
  });
})( jQuery );

