// channel link url
// on filling channel link able all other form fields
// click the start button and get the current url
let delay_time=0
startBtn.addEventListener('click',()=>{
    // validate all fields before
    if (channel_link.value.trim()<1 || videoId.value.trim()<1 || delay.value.trim()<1) {
        alert('Please Fill all the fields!')
        return
    }
    // from videoid make youtube watch url
    let videoUrl=new URL('https://www.youtube.com/watch')
    videoUrl.searchParams.set("v",videoId.value.trim())
    let channel_url = new URL(channel_link.value.trim())
    delay_time=parseInt(delay.value.trim())
    let links_Obj={
        videoUrl,channel_url,
    }
    chrome.storage.local.set({"links_Obj":JSON.stringify(links_Obj)})
    countDown(delay_time)

})
  
function countDown(delay_time) {
    let t= delay_time
    setInterval(() => {
        chrome.action.setBadgeText({text:''+t})
        t--;
        if (t<1) {
            reload_handler()
            t=delay_time
        }
    }, 1000);
}

function reload_handler() {
    chrome.runtime.sendMessage({message:'reload-executing'})
}
// stop button handler
stopBtn.addEventListener('click',()=>{
    window.location.reload(true)
})
function resetAll() {
    delay_time=0
    chrome.action.setBadgeText({text:''})
}
document.addEventListener('DOMContentLoaded',()=>{
   resetAll()
})