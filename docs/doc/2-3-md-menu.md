---
title: "mDialog API: Menu Mode"
layout: mdialog
---


# mDialog API - Menu Mode Options

## useMenuMode

This controls whether to use the menu mode.

<ul data-role="listview" data-inset="true" data-divider-theme="b"><li data-role="list-divider">Default Value</li>
	<li><em>false</em></li></ul>

## menuHeaderText

If set to non-false, this text will be used for the header string.

<ul data-role="listview" data-inset="true" data-divider-theme="b"><li data-role="list-divider">Default Value</li>
	<li><em>false</em></li></ul>

## menuHeaderTheme

With above, this is the theme for the header to use.

<ul data-role="listview" data-inset="true" data-divider-theme="b"><li data-role="list-divider">Default Value</li>
	<li>"a"</li></ul>

## menuMinWidth

If you wish to make sure you popup is of a minimum width, and you are using menuHeaderText, you can set this to any valid css string.

<ul data-role="listview" data-inset="true" data-divider-theme="b"><li data-role="list-divider">Default Value</li>
	<li><em>false</em></li></ul>

## menuSubtitle

When set to non-false, this will be a second string under menuHeaderText.  For "button" style, it is a paragraph, for "list" style it is a list divider.

This will appear below inputs.

<ul data-role="listview" data-inset="true" data-divider-theme="b"><li data-role="list-divider">Default Value</li>
	<li><em>false</em></li></ul>

## menuButtonType

The style of buttons to use, either "list" or "button"

<ul data-role="listview" data-inset="true" data-divider-theme="b"><li data-role="list-divider">Default Value</li>
	<li>"list"</li></ul>

## menuButtonTheme

The default theme for the buttons or list items.

<ul data-role="listview" data-inset="true" data-divider-theme="b"><li data-role="list-divider">Default Value</li>
	<li>"a"</li></ul>
		
## menuInputList

This is a list of input elements to appear in the control.  Object parts are:

 - **id** *(required)* : The ID of the element
 - **title** : Placeholder text for the element
 - **type** : The type of input.  Any text style should work (i.e. 'password'). Defaults to "text"
 - **value** : Preset value of the element

Example of 2 elements:
{% highlight js %} 
menuInputList: [
  {'id': 'firstIN', 'title':'An Input #1', 'type':'text', 'value':'xxx'},
  {'id': 'secondIN', 'title':'An Input #2', 'type':'text'}
],
{% endhighlight %}

Note that these are supplied to both the "click" function for each button and the 
callbackClose function as array pairs of [&lt;element ID>, &lt;element Value>]

<ul data-role="listview" data-inset="true" data-divider-theme="b"><li data-role="list-divider">Default Value</li>
	<li><em>false</em></li></ul>

## clickEvent

This is the click event that is listened for on the buttons.  'click' or 'vclick' are the usual options.

<ul data-role="listview" data-inset="true" data-divider-theme="b"><li data-role="list-divider">Default Value</li>
	<li>'click'</li></ul>




