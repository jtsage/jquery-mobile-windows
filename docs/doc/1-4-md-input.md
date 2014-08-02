---
title: mDialog Menus - Inputs
layout: mdialog
---

# mDialog

# Menu Mode - Inputs

Menu mode also includes a provision for input elements.  This shows this working in "list" mode.

<a href="#" data-role="button" id="md1">Open Dialog</a>

<script type="text/javascript"> 
	$(document).on('vclick', '#md1', function() {
		$('<div>').mdialog({
			useMenuMode: true,
			menuButtonType:  'list',
			closeButton: true,
			menuHeaderText: 'Inputs!',
			menuSubtitle: 'Pick one, eh?',
			menuMinWidth: '300px',
			menuInputList: [
				{'id': 'firstIN', 'title':'An Input #1', 'type':'text', 'value':'xxx'},
				{'id': 'secondIN', 'title':'An Input #2', 'type':'text'}
			],
			callbackClose: function(inputA, inputB) { 
				if ( window.stopper === false ) {
					alert(inputA[0] + ' = ' + inputA[1] + "\n" + inputB[0] + ' = ' + inputB[1]);
				}
			},
			buttons: {
				'OK': {
					click: function (e,a,b) { 
						window.stopper = false;
						str = "You Clicked OK\n" +
							"Input ID:" + a[0] + " set to: " + a[1] + "\n" +
							"Input ID:" + b[0] + " set to: " + b[1] + "\n";
						alert(str);
					}
				},
				'Cancel': {
					click: function () { 
						window.stopper = true;
						alert('You clicked CANCEL');
					},
					icon: "delete",
					theme: "c",
				}
			}
		});
	});
</script>

{% highlight js %}
$('<div>').mdialog({
  useMenuMode: true,
  menuButtonType:  'list',
  closeButton: true,
  menuHeaderText: 'Inputs!',
  menuSubtitle: 'Pick one, eh?',
  menuMinWidth: '300px',
  menuInputList: [
    {'id': 'firstIN', 'title':'An Input #1', 'type':'text', 'value':'xxx'},
    {'id': 'secondIN', 'title':'An Input #2', 'type':'text'}
  ],
  callbackClose: function(inputA, inputB) { 
    if ( window.stopper === false ) {
      alert(inputA[0] + ' = ' + inputA[1] + "\n" + inputB[0] + ' = ' + inputB[1]);
    }
  },
  buttons: {
    'OK': {
      click: function (e,a,b) { 
        window.stopper = false;
        str = "You Clicked OK\n" +
          "Input ID:" + a[0] + " set to: " + a[1] + "\n" +
          "Input ID:" + b[0] + " set to: " + b[1] + "\n";
        alert(str);
      }
    },
    'Cancel': {
      click: function () { 
        window.stopper = true;
        alert('You clicked CANCEL');
      },
      icon: "delete",
      theme: "c",
    }
  }
});
{% endhighlight %}

