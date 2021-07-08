
const endpoint = "https://ecosurf.io/api/getValidation"

let elements = document.getElementsByClassName("g");

/**
 * Thanks
 * https://stackoverflow.com/a/23945027
 */
function extractHostname(url) {
    var hostname;

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
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

async function makeAPICallForLink(link, element)
{
	link = extractHostname(link)
	console.log("CALLING LINK: " + link)
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var requestOptions = {
		method: 'POST',
		mode: 'cors',
		headers: myHeaders,
		body: JSON.stringify({
			"key": link
		}),
		redirect: 'follow'
	};

	const response = await fetch(endpoint, requestOptions).then(response => {
		response.json().then(body => {
			console.log(body)
			if (body?.validation?.isGreen == 1)
			{
				putGreenHostBadge(element)
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
const allUrls = []

for (var elementRef in elements)
{
	const element = elements[elementRef]
	if (element)
	{
		const link = element.querySelector(".g div div div a div cite")?.textContent;
		if (link)
		{
			const onlyLink = link.split(" ")[0];
			allUrls.push(onlyLink)
			getInformationForLinkAndSetAtElement(onlyLink, element)
		}
	}
}
