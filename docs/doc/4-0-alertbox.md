---
title: "AlertBox"
layout: abox
---


# AlertBox

AlertBox is a very, very simple **timed** replacement for JavaScript's alert().  And by timed, I mean it closes itself after a few seconds.

## Installation

Installation is as simple as including a single script tag.

{% highlight html %}
<script type="text/javascript" src="http://cdn.jtsage.com/windows/latest/jqm-windows.alertbox.js"></script>
{% endhighlight %}

There are other versions available in the [CDN](http://cdn.jtsage.com/windows/). 
If you are working on a **production** application, it is **highly** recommended 
that you make a local copy.  I try not to move things on the CDN, but it does happen
occasionally.

## Simple Usage

Just make a popup, and add the class "jqm-alert-box".  For Instance:

{% highlight html %}
<div data-role="popup" id="popupOpts" class="ui-content jqm-alert-box">
  <a href="#" data-rel="back" data-role="button" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>
  <p style="text-align:center">
    Welcome to jQM-AlertBox.<br />
    (these things are annoying, aren't they?)
  </p>
</div>
{% endhighlight %}

<div data-role="popup" id="popupOpts" class="ui-content jqm-alert-box">
  <a href="#" data-rel="back" data-role="button" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>
  <p style="text-align:center">
    Welcome to jQM-AlertBox.<br />
    (these things are annoying, aren't they?)
  </p>
</div>

## FAQ

### Can I have multiple alerts per site?

Of course.  One on every page if you like.

### Can I nest these / use multiple on a page?

Nope.  I can't stop you from hacking it together, but it's not something I will support.

### What was the class name again?

**.jqm-alert-box**


## Extra Options (Attributes)

You can play with a bit more of the configuration of this by playing with some 
extra data attributes.  These are added to the [data-role=popup] div (same place as the class name)

### data-alertbox-close-time

How long should the box be open? 5sec (5000ms) is default.
Note that this value is in milliseconds, not seconds.

### data-alertbox-transition

Takes the place of data-transition on the popup link.  Controls how the popup appears.  'pop' is the default.

### data-alertbox-dismissable

With this set to false, your user **has** to wait for the popup to timeout or 
explicitly click the close link (if included).  Otherwise, they can click anywhere
outside of the popup to close it.

### data-alertbox-position-to

Takes the place of data-position-to, but probably "window" is a good idea since it doesn't use an anchor, eh?
I have never tried to use a different value, but I suppose if you had some sort of infobar, you 
could use this to position over it.  Not sure.
