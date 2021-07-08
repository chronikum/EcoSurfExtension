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

	console.log("Running request to multiple validations at once")
	const response = await fetch(endpointValidations, requestOptions).then(response => {
		response.json().then(body => {
			counter = 0;
			for (let validation in body?.validations) {
				console.log(validation)
				if (body?.validations[validation]?.validation.validation.isGreen == 1)
				{
					putGreenHostBadge(elementsArray[counter])
				}
				counter++;
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