var service = {};

function updateHTML(service) {
    var e, i, newURL;
    document.getElementById('artist').textContent = service.artist;
    document.getElementById('album').textContent = service.album;
    e = document.getElementById('embed');
    i = document.createElement('iframe');
    // i have no idea why this next thing is necessary, but it is.
    // the api returns the URL with /e/ in the url
    // but the embed is really flaky unless you change it to /i/
    newURL = service.embedURL.replace('\/e\/', '\/i\/')
    i.setAttribute('src', newURL);
    i.setAttribute('width', '400px');
    i.setAttribute('height', '300px');
    e.appendChild(i);
}

function getID(service, callback) {
    var url, encurl;
    console.log('start of getID');
    url = "http://0.0.0.0:5000/" + service.artist + ' ' + service.album;
    encurl = encodeURI(url);
    httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", encurl, true);

    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                console.log(httpRequest.responseText);
                service.embedURL = httpRequest.responseText;
                updateHTML(service);
            }
        }
    };

    httpRequest.send(null);
}

chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendRequest(tab.id, {'service': 'rdio'}, function(response) {
        var service = {};
        console.log(response);
        console.log('response from contentscript');
        if (response.stat === 'ok') {
            service.album = response.album;
            service.artist = response.artist;
            getID(service, updateHTML);
        }
    });
});