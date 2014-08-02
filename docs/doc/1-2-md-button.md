---
title: mDialog Menus - Buttons
layout: mdialog
---

# mDialog

## Menu Mode - Buttons

Simply put, menu mode allows you to pass an object of buttons with associated functions.  This shows this working in "button" mode.

<a href="#" data-role="button" id="md1">Open Dialog</a>

<script type="text/javascript"> 
	$(document).on('vclick', '#md1', function() {
		$('<div>').mdialog({
			useMenuMode: true,
			menuButtonType:  'button',
			menuHeaderText:  'Buttons',
			menuSubtitle:    'Pick one, eh?',
			menuMinWidth: '300px',
			popDismissable: false,
			closeButton: true,
			buttons: {
				'OK': {
					click: function () { 
						alert('You clicked OK');
					}
				},
				'Cancel': {
					click: function () { 
						alert('You clicked CANCEL');
					},
					icon: "delete",
					theme: "b",
				}
			}
		});
	});
</script>

{% highlight js %}
$('<div>').mdialog({
  useMenuMode: true,
  menuButtonType: 'button',
  popDismissable: false,
  closeButton: true,
  menuHeaderText: 'Buttons',
  menuSubtitle: 'Pick one, eh?',
  menuMinWidth: '300px',
  buttons: {
    'OK': {
      click: function () { 
        alert('You clicked OK');
      }
    },
    'Cancel': {
      click: function () { 
        alert('You clicked CANCEL');
      },
      icon: "delete",
      theme: "b",
    }
  }
});
{% endhighlight %}

