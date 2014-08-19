---
title: "mDialog API: Popup Options"
layout: mdialog
---


# mDialog API - Popup Options

Here, you will find all the options that control the behavior of the popup itself.  Most of them are passed directly to the jQM popup object.

## containerTheme

This allows you to set a theme for the entire container.  If non-false, it is always applied.

<ul data-role="listview" data-inset="true" data-divider-theme="b"><li data-role="list-divider">Default Value</li>
	<li><em>false</em></li></ul>

## popOverlay

This is the theme used for the overlay behind the control.  The default should pretty well grey out the background.

<ul data-role="listview" data-inset="true" data-divider-theme="b"><li data-role="list-divider">Default Value</li>
	<li>"b"</li></ul>

## popDismissable

This controls whether clicking outside of the control will close it. Note that if closeButton is set to false, this will
not take effect.

<ul data-role="listview" data-inset="true" data-divider-theme="b"><li data-role="list-divider">Default Value</li>
	<li><em>true</em></li></ul>

## popPosition / popPosX / popPosY

These control how the control is positioned.  "popPosX" and "popPosY" are hard coordinates on the page (not the window).

<ul data-role="listview" data-inset="true" data-divider-theme="b">
	<li data-role="list-divider">Valid Options for popPosition</li>
	<li><h2>"window"</h2><p>Center in the window</p></li>
	<li><h2>"origin"</h2><p>Use X/Y coordinates (auto-set if coordinates supplied</p></li>
	<li><h2>#id</h2><p>Center on HTML element named #id</p></li>
	<li data-role="list-divider">Default Value</li>
	<li>"window"</li>
</ul>

## transition

This is the transition effect to use to show the popup.

<ul data-role="listview" data-inset="true" data-divider-theme="b"><li data-role="list-divider">Default Value</li>
	<li><em>"pop"</em></li></ul>
	
	
## closeButton / closeButtonTheme

This is the theme for the close button, and it's position.

<ul data-role="listview" data-inset="true" data-divider-theme="b">
	<li data-role="list-divider">Valid Options for closeButton</li>
	<li><h2>"right"</h2><p>Top right corner</p></li>
	<li><h2>"left"</h2><p>Top left corner</p></li>
	<li><h2><em>true</em></h2><p>Don't add button, you have supplied one. (for popDismissable)</p></li>
	<li data-role="list-divider">Default Value - closeButton</li>
	<li><em>false</em></li>
	<li data-role="list-divider">Default Value - closeButtonTheme</li>
	<li><em>"a"</em></li>
</ul>

Note: if you want to use popDismissable, and you don't want the regular style of 
close button (you wish to supply your own - any link with data-rel="back" will work), you
must set closeButton to "true" instead.  Otherwise, popDismissable will be auto-set to
true.

