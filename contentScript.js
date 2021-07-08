let elements = document.getElementsByClassName("g");

const allUrls = []

for (var elementRef in elements)
{
	const element = elements[elementRef];

	const link = element.querySelector(".g div div div a div cite")?.textContent;
	if (link)
	{
		allUrls.push(link)
		console.log(link)
	}
}

if (allUrls) {
	console.log(allUrls)
}