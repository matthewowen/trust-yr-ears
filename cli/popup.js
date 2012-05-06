var bg = chrome.extension.getBackgroundPage();

document.getElementsByTagName('body')[0].innerHTML = bg.document.getElementsByTagName('body')[0].innerHTML;