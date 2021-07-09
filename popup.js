document.getElementById("button1").onclick = function(){
	openLink("https://ecosurf.io")
};

document.getElementById("button2").onclick = function(){
	openLink("https://ecosurf.io/donate")
};

/**
 * Open link
 */
function openLink(link) {
    chrome.tabs.create({active: true, url: link});
}