
setTimeout(() => {
    let all_links = document.querySelectorAll('a.yt-simple-endpoint.style-scope.ytd-grid-video-renderer')
    chrome.storage.local.get('links_Obj', links => {
    let { channel_url, videoUrl } = JSON.parse(links.links_Obj)
    for (let i = 0; i < all_links.length; i++) {
            if (all_links[i].href.includes(videoUrl)) {
                // all_links[index].click()
                all_links[i].click();
                break;
            }
        
    }

})
            
}, 1500);

    