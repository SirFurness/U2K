var tabs = []

chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
        //is youtube and is not a playlist
	if(tab.url.indexOf("youtube.com") !== -1 && tab.url.indexOf("&list=") === -1) {
	    addTabIfNeeded(tab);
	    u2k(tab.url, tab);
	}
    }
);

//youtube to khan
function u2k(url, currentTab) {
    //don't redirect back to khan if this is the youtube link just redirected from
    if(currentTab.url != tabs[currentTab.id].pastUrl) {
	chrome.tabs.update(currentTab.id, {url: "https://www.khanacademy.org/mission/algebra2"});
	tabs[currentTab.id].pastUrl = url;
	tabs[currentTab.id].canContinue = true;
    }
}

//khan to youtube
function k2u(currentTab) {
    if(currentTab.id in tabs && tabs[currentTab.id].canContinue) {
	chrome.tabs.update(currentTab.id, {url: tabs[currentTab.id].pastUrl});
        tabs[currentTab.id].canContinue = false;
    }
}

//add currentTab to tabs array if not already there
function addTabIfNeeded(currentTab) {
    if(!(currentTab.id in tabs)) {
	tabs[currentTab.id] = {pastUrl: '', canContinue: false};
    }
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
	chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
            //was continue pressed
	    if(request.message == "k2u") {
	        k2u(arrayOfTabs[0]);
	    }
	});
	
    }
);
