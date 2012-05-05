var rdio = {};

chrome.tabs.getSelected(null, function(tab) {
    console.log('doing')
    chrome.tabs.sendRequest(tab.id, {'service': 'rdio'}, function(response) {
        rdio.album = response.album;
        rdio.artist = response.artist;
        console.log(rdio);
    });
});