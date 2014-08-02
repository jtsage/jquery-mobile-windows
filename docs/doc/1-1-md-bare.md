---
title: mDialog Bare Mode
layout: mdialog
---

# mDialog

## Bare Text

In it's simplest mode, mDialog simply pops up some text. Here, we pop up "Some text".

<a href="#" data-role="button" id="md1">Open Dialog</a>

<script type="text/javascript"> 
	$(document).on('vclick', '#md1', function() {
		$('<div>').mdialog({
			closeButton: 'right',
			content: 'Some text'
		});
	});
</script>

{% highlight js %}
$('<div>').mdialog({
  closeButton: 'right',
  content: 'Some text'
});
{% endhighlight %}

## HTML

Of course, this is not terribly useful.  So, how bout we do the same with some HTML?

<a href="#" data-role="button" id="md2">Open Dialog</a>

<script type="text/javascript"> 
	$(document).on('vclick', '#md2', function() {
		$('<div>').mdialog({
			closeButton: 'right',
			content: 
				"<div data-role='header'><h1>Antigonish</h1></div><div data-role='content'><p>Yesterday, upon the stair,<br />I met a man who wasn't there<br />He wasn't there again today<br />I wish, I wish he'd go away...</p></div>"
		});
	});
</script>

{% highlight js %}
$('<div>').mdialog({
  closeButton: 'right',
  content: 
    "<div data-role='header'><h1>Antigonish</h1></div><div data-role='content'><p>Yesterday, upon the stair,<br />I met a man who wasn't there<br />He wasn't there again today<br />I wish, I wish he'd go away...</p></div>"
});
{% endhighlight %}

