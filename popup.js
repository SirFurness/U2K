document.addEventListener('DOMContentLoaded', function() {
    var continueButton = document.getElementById('btn');

    continueButton.addEventListener('click', function() {    
	chrome.runtime.sendMessage({"message": "k2u"});
    }, false);
}, false);
