

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}


// grab the channel link and video url 
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message == "reload-executing") {
    // get the urls from storage
    var millisecondsPerDay = 1000 * 60 * 60 * 24;
    var oneDayAgo = (new Date()).getTime() - millisecondsPerDay;
    chrome.browsingData.remove({
      "since": oneDayAgo
    }, {
      "appcache": true,
      "cache": true,
      "cacheStorage": true,
      "cookies": true,
      "downloads": true,
      "fileSystems": true,
      "formData": true,
      "history": true,
      "indexedDB": true,
      "localStorage": true,
      "passwords": true,
      "serviceWorkers": true,
      "webSQL": true
    }, callback);

  }
  sendResponse({});
  return true;
})

// page navigation handler
function reload_handler() {
  // change loaction 
  chrome.storage.local.get('links_Obj', links => {
    let { channel_url, videoUrl } = JSON.parse(links.links_Obj)
    document.location.href = channel_url
    chrome.runtime.sendMessage({ message: 'click-video' })
  })
}



///click the video handler
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  // check message type
  if (request.message == 'click-video') {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      // match page
      if (tab.status == 'complete') {
        // match the pattern
        let url_pattern = /^(https):\/\/www\.youtube\.com\/c\/[a-zA-Z]+\/videos/ig
        if (url_pattern.test(tab.url)) {
          console.log(tab.url);
          // now execute scrapper
          chrome.scripting.executeScript(({
            target: { tabId },
            files: ['scrapper.js']
          }))
        }


      }
    })
  }
})
function callback() {
  // Do something clever here once data has been removed.
  getCurrentTab().then(tab => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: reload_handler,
    })
  })
};

