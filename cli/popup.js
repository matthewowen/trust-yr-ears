var service = {};

function updateHTML(embedURL) {
    var e = document.getElementById('embed');
    var i = document.createElement('iframe');
    console.log(embedURL);
    // i have no idea why this is necessary, but it is.
    // the api returns the URL with /e/ in the url
    // but the embed is really flaky unless you change it to /i/
    var newURL = embedURL.replace('\/e\/', '\/i\/')
    i.setAttribute('src', newURL);
    i.setAttribute('width', '300px');
    i.setAttribute('height', '200px');
    e.appendChild(i);
}

function getID(service, callback) {
    console.log('start of getID');
    url = "http://0.0.0.0:5000/" + service.artist + ' ' + service.album;
    encurl = encodeURI(url);
    console.log('url: ' + encurl);
    httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", encurl, true);

    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                console.log(httpRequest.responseText);
                updateHTML(httpRequest.responseText);
            }
        }
    };

    httpRequest.send(null);
}

chrome.tabs.getSelected(null, function(tab) {
    console.log('doing')
    chrome.tabs.sendRequest(tab.id, {'service': 'rdio'}, function(response) {
        console.log('response from contentscript');
        service.provider = 'rdio'
        service.album = response.album;
        service.artist = response.artist;
        getID(service, updateHTML);
    });
});