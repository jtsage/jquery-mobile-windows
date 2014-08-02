---
title: "mDialog API: Callbacks"
layout: mdialog
---


# mDialog

## callbackOpen

This is a function that is called once the mDialog control has opened.

## callbackOpenArgs

This is a list of arguments that is passed to the callbackOpen function.

## callbackClose

This is a function that is called once the mDialog control has closed.

## callbackCloseArgs

This is a list of arguments that is passed to the callbackClose function.  Note
that if you are using the menuInputList option, this will be **appended** with an array
for each input listed.  Those arrays are two element with arr[0] == "Input ID" and 
arr[1] == "Input Value".

You can see this in action on the [mDialog Input Demo]({{site.basesite}}doc/1-4-md-input/).



