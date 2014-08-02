---
title: "mDialog API: Button Object"
layout: mdialog
---


# mDialog API - Button Object

The "button" object is a nested object with button definitions in it.  Most options are optional, but the full list is here:

## Required

At it's most basic, a button object can simply be:

{% highlight js %}
button: {
 'button': function () { alert('Clicked!'); }
}
{% endhighlight %}

Usually, however, it is better to provide more information.

### click (required)

The function to perfom when clicked (or, whatever option "clickEvent" is set to fires on the button).  

{% highlight js %}
button: {
 'button': {
    click: function () { alert('Clicked!'); }
  }
}
{% endhighlight %}

## Optional

The following are all optional parts of a button definition.

### args

The arguments list for the function - note that these start at arg[1].  Also, when using
inputs, the inputs are added to the end of this array.

{% highlight js %}
button: {
  'button': {
    'args': ['hello','world'],
    'click': function(e, argsA, argsB, inputA) {
      console.log('The event was: ' + e);
      console.log('First in "args" was: ' + argsA);
      console.log('Input Element #1 ID was: ' + inputA[0]);
      console.log('Input Element #1 Value was: ' + inputA[1]);
    }
  }
}
{% endhighlight %}

### close

This button closes the popup, unless the click function returned false.

### text

Override the text on the button. Useful for localization.

### id

An ID for the button.  If not provided, it will be generated

### theme

The theme for the button, otherwise it will use the option "menuButtonTheme"

### icon

The icon to use for the button, default is 'check'.

### iconpos (button style)

The position of the icon, default is 'left'.

### corners (button style)

Round the corners, default is 'true'

### shadow (button style)

Shadow the button, default is 'true'
