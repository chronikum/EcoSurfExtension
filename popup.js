document.getElementById("button1").onclick = function(){
	openLink("https://ecosurf.io")
};

document.getElementById("button2").onclick = function(){
	openLink("https://ecosurf.io/clear-co2-footprint/")
};

document.getElementById("github").onclick = function(){
	openLink("https://github.com/chronikum/EcoSurfExtension")
};

/**
 * Open link
 */
function openLink(link) {
    chrome.tabs.create({active: true, url: link});
}