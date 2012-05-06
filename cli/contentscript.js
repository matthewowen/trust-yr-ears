function artist() {
    console.log('happening')
    m = document.getElementById('main');
    h = m.getElementsByTagName('h1')[0];
    a = h.getElementsByTagName('a')[0];
    return a.textContent;
};

function album() {
    m = document.getElementById('main');
    h = m.getElementsByTagName('h2')[0];
    return h.textContent;
};

chrome.extension.onRequest.addListener (
    function (request, sender, sendResponse) {
        var ar, al, m, h, a;
        if (request.service === 'rdio') {
            console.log('doing')
            ar = artist();
            al = album();
            console.log(al + ar)
            sendResponse({'album': al, 'artist': ar});
        }
    }
);

console.log('present')