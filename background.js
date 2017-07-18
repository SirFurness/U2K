var oauth = ChromeExOAuth.initBackgroundPage({
  'request_url': "https://www.khanacademy.org/api/auth2/request_token",
  'authorize_url': "https://www.khanacademy.org/api/auth2/authorize",
  'access_url': "https://www.khanacademy.org/api/auth2/access_token",
  'consumer_key': "dWLEv4kwWTHQzDWk",
  'consumer_secret': "5mPtJ5tRU7dXQf48",
  'scope': "https://www.khanacademy.org/api/v1/",
  'app_name': "U2K"
});

function callback(resp, xhr) {
    console.log(resp)
    console.log(xhr)
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
	if(request.message == "u2k") {
	    oauth.authorize(function() {
		console.log("on authorize");
		var url = 'https://khanacademy.org/api/v1/user/exercises/progress_changes'
		var request = {
		    'method': 'GET'
		}
		oauth.sendSignedRequest(url, callback, request);
	    });
	}
    }
);
