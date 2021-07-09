const endpointLegacy = "https://ecosurf.io/api/getValidation"
const endpointValidations = "https://ecosurf.io/api/getValidations"


/**
 * Thanks
 * https://stackoverflow.com/a/23945027
 */
function extractHostname(url) {
	url = url.replace("http://", "");
	url = url.replace("https://", "");
	url = url.replace("www.", "");
	return url;
}

/**
 * Returns the page speed as a number between 1 and 100 (100 is good)
 */
function calculatePageSpeed(pageSpeed) {
	return 100;
}

/**
 * Checks if the website is bigger than 3 MB
 */
function checkIfWebsiteisBiggerThan3MB(bytesTotal) {
	return (bytesTotal > 3000000);
}

/**
 * Returns the name of the icon to be used
 */
function evaluateRatingOfWebsite(validation) {
	let fileName = "b";
	// Everything ok
	console.log(validation)
	if (validation.validation?.isGreen) {
		fileName += "g"
	}
	if (!validation.validation?.checkIfWebsiteisBiggerThan3MB) {
		fileName += "si"
	}
	if (validation.validation?.calculatePageSpeed > 75) {
		fileName += "speed"
	}

	return fileName
}

/**
 * Adds a green hosting badge
 */
function putGreenHostBadge(element) {
	if (element)
	{
		var el = document.createElement("span");
		el.innerHTML = "<b>Certified Green Host</b>";
		el.style.backgroundColor = 'darkgreen';
		el.style.padding = '2px'
		el.style.fontSize = "10px"
		el.style.color = 'white'
		element.parentNode.insertBefore(el, element)
	}
}

/**
 * Put badge determined by validation object
 */
function putBadge(validation, element) {
	const fileName = evaluateRatingOfWebsite(validation);
	let filePath = `chrome-extension://${chrome.runtime.id}/assets/${fileName}.svg`
	if (element)
	{
		var el = document.createElement("span");
		el.innerHTML = `<img style="width: 16px" src="${filePath}"> <span style="color: gray">hover for information</span>`;
		element.parentNode.insertBefore(el, element)
	}
}

/**
 * basically the same as makeAPICallForLink. But it sends multiple url at once so we save bandwidth.
 * @param  linkArray 
 * @param  elementsArray 
 */
async function makeAPICallWithArray(linkArray, elementsArray) {
	// Extract hostname from every link
	for (linkArrayRef in linkArray) {
		linkArray[linkArrayRef] = extractHostname(linkArray[linkArrayRef])
	}
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var requestOptions = {
		method: 'POST',
		mode: 'cors',
		headers: myHeaders,
		body: JSON.stringify({
			"keys": linkArray
		}),
		redirect: 'follow'
	};
	// Receiving response here
	const response = await fetch(endpointValidations, requestOptions).then(response => {
		response.json().then(body => {
			for (let element in elementsArray) {
				let directLink = elementsArray[element]?.querySelector("div a div cite")?.textContent?.split(" ")[0];
				if (directLink)
				{
					directLink = directLink.replace("www.", "")
					directLink = directLink.replace("https://", "")
					directLink = directLink.replace("http://", "")
					let getValidatonElement = body?.validations?.filter(element => element?.validation?.url == directLink)[0]
					if (getValidatonElement && getValidatonElement?.validation)
					{
						putBadge(getValidatonElement, elementsArray[element])
					}
				}
			}
		})
	});
}

/**
 * Load validation for each link
 */
async function getInformationForLinkAndSetAtElement(link, element) {
	makeAPICallForLink(link, element)
}

function collectSearchResultsandMakeCal() {
	console.log("Starting")
	let elements = document.getElementsByClassName("g");

	const allUrls = []
	const elementsArray = [];

	for (var elementRef in elements)
	{
		const element = elements[elementRef]
		
		if (element instanceof HTMLElement)
		{
			// TODO: Search de.wikipedia.org and fix that
			const link = element?.querySelector(".g div div div a div cite")?.textContent;
			if (link)
			{
				console.log("FOUND LINK")
				const onlyLink = link.split(" ")[0];
				allUrls.push(onlyLink)
				elementsArray.push(element);
			}
		}
	}
	console.log("Making call")
	makeAPICallWithArray(allUrls, elementsArray)
}

collectSearchResultsandMakeCal();