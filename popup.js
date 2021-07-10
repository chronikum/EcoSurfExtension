/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   popup.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfritz <jfritz@student.42heilbronn.de>     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/07/10 20:21:40 by jfritz            #+#    #+#             */
/*   Updated: 2021/07/10 20:21:41 by jfritz           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

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