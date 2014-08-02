---
title: mDialog Features
layout: mdialog
---

# mDialog

mDialog attempts to be a jQM style replacement for dialog() and alert().

I has a few operating modes:

 - **bare** mode - the standard, use custom text or html
 - **menu** mode - present a menu of buttons and inputs
 
The next few pages will give a glimpse of what mDialog can do.  Note that this is 
geared towards programmers, as this is a solution for a heavy client side scripting 
challange that has not really been addressed in jQueryMobile.

## Installation

Installation is as simple as including a single script tag.

{% highlight html %}
<script type="text/javascript" src="http://cdn.jtsage.com/windows/latest/jqm-windows.mdialog.js"></script>
{% endhighlight %}

There are other versions available in the [CDN](http://cdn.jtsage.com/windows/). 
If you are working on a **production** application, it is **highly** recommended 
that you make a local copy.  I try not to move things on the CDN, but it does happen
occasionally.
