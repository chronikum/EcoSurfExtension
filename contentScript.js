/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   contentScript.js                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfritz <jfritz@student.42heilbronn.de>     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/07/10 20:21:35 by jfritz            #+#    #+#             */
/*   Updated: 2021/07/10 20:21:36 by jfritz           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

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
	var result = 110-(Math.sqrt(pageSpeed)/1.41)
	return result
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
	if (validation.validation?.isGreen) {
		fileName += "g"
	}
	if (!checkIfWebsiteisBiggerThan3MB(validation?.validation?.bytesTotal)) {
		fileName += "si"
	}
	if (calculatePageSpeed(validation?.validation?.SpeedIndex) > 50) {
		fileName += "speed"
	}

	return fileName
}


/**
 * Gets the title text for a website
 */
 function getTitleText(validation) {
	let fileName = "";
	// Everything ok
	if (validation.validation?.isGreen) {
		fileName += "g"
	}
	if (!checkIfWebsiteisBiggerThan3MB(validation?.validation?.bytesTotal)) {
		fileName += "si"
	}
	if (calculatePageSpeed(validation?.validation?.SpeedIndex) > 50) {
		fileName += "speed"
	}

	if (fileName == "gsispeed")
		return "Green Host, good size and great performance" // gsispeed
	if (fileName == "gspeed")
		return "Green Host, and great performance" // gspeed
	if (fileName == "sispeed")
		return "Good size and great performance" // sispeed
	if (fileName == "gsi")
		return "Green host and good size" // gsi
	if (fileName == "si")
		return "Good size" // si
	if (fileName == "g")
		return "Green Host" // g
	if (fileName == "speed")
		return "Good performance" // g
	return "Not climate friendly verified"
}

/**
 * Gets the alt text for a website
 */
function getAltText(validation) {
	let fileName = "";
	// Everything ok
	if (validation.validation?.isGreen) {
		fileName += "g"
	}
	if (!checkIfWebsiteisBiggerThan3MB(validation?.validation?.bytesTotal)) {
		fileName += "si"
	}
	if (calculatePageSpeed(validation?.validation?.SpeedIndex) > 50) {
		fileName += "speed"
	}

	if (fileName == "gsispeed")
		return "A green leaf, under it a green wave, under that another green wave" // gsispeed
	if (fileName == "gspeed")
		return "A green leaf, under it a black wave, under that a green wave" // gspeed
	if (fileName == "sispeed")
		return "A green leaf, under it a green wave, under that a black wave" // sispeed
	if (fileName == "gsi")
		return "A black leaf, under it a green wave, under that another green wave" // gsi
	if (fileName == "si")
		return "A black leaf, under it a green wave, under that a black wave" // si
	if (fileName == "g")
		return "A black leaf, under it a black wave, under that a green wave" // g
	if (fileName == "speed")
		return "A green leaf, under it a black wave, under that another black wave" // g
	return "A black leaf, under it a black wave, under that another black wave"
}

/**
 * Put badge determined by validation object
 */
function putBadge(validation, element) {
	const fileName = evaluateRatingOfWebsite(validation);
	const altText = getAltText(validation);
	const description = getTitleText(validation);
	let filePath = `chrome-extension://${chrome.runtime.id}/assets/${fileName}.svg`
	if (element)
	{
		var el = document.createElement("span");
		el.innerHTML = `<img title="${description}" alt="${altText}" style="width: 20px" src="${filePath}"> `;
		el.classList = "ecosurf"
		// hack to make sure ecosurf isn't displayed twice on smart results with rich content
		if (!element.querySelector("div a h3 span:nth-child(1)"))
		{
			element.querySelector("div a h3")?.prepend(el)
		}
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
				const onlyLink = link.split(" ")[0];
				allUrls.push(onlyLink)
				elementsArray.push(element);
			}
		}
	}
	makeAPICallWithArray(allUrls, elementsArray)
}

collectSearchResultsandMakeCal();