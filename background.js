var tabs = []

chrome.tabs.on

chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
	if(tab.url.indexOf("youtube.com") !== -1 && tab.url.indexOf("&list=") === -1) {
	    addTabIfNeeded(tab);
	    u2k(tab.url, tab);
	}
    }
);

function u2k(url, currentTab) {
    if(currentTab.url != tabs[currentTab.id].pastUrl) {
	chrome.tabs.update(currentTab.id, {url: "https://www.khanacademy.org/mission/algebra2"});
	tabs[currentTab.id].pastUrl = url;
	tabs[currentTab.id].canContinue = true;
    }
}

function k2u(currentTab) {
    if(!(currentTab.id in tabs)) {
	return;
    }
    if(tabs[currentTab.id].canContinue) {
	chrome.tabs.update(currentTab.id, {url: tabs[currentTab.id].pastUrl});
    }
    tabs[currentTab.id]['canContinue'] = false;
}

function addTabIfNeeded(currentTab) {
    if(!(currentTab.id in tabs)) {
	tabs[currentTab.id] = {tab: currentTab, id: currentTab.id, shouldChange: true, pastUrl: '', canContinue: false};
    }
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
	chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
	    var currentTab =  arrayOfTabs[0];
	    
	   // if(request.message == "u2k") {
	//	addTabIfNeeded(currentTab);
	//	u2k(request.url, currentTab);

	  //  }
	    if(request.message == "k2u") {
	        k2u(currentTab);
	    }
	});
	
    }
);
