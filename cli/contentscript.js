function pitchforkArtist() {
    console.log('happening')
    m = document.getElementById('main');
    h = m.getElementsByTagName('h1')[0];
    a = h.getElementsByTagName('a')[0];
    return a.textContent;
}

function pitchforkAlbum() {
    m = document.getElementById('main');
    h = m.getElementsByTagName('h2')[0];
    return h.textContent;
}



function createResponse() {
    var d;
    var obj = {};
    d = window.location.hostname;
    if (d.indexOf('pitchfork') !== -1) {
        obj.artist = pitchforkArtist();
        obj.album = pitchforkAlbum();
        obj.stat = 'ok';
        console.log(obj);
    }
    return obj;
}


chrome.extension.onRequest.addListener (
    function (request, sender, sendResponse) {
        var resp;
        if (request.service === 'rdio') {
            console.log('doing')
            resp = createResponse();
            sendResponse(resp);
        }
    }
);