const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

//  Unsplash API
const count = 5;
const apiKey = 'VdBQZLNeOWcOC2RloW0w7LRLHoVCrUmE4-6j9Utnsj4';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
		count = 30;
	}
}

// helper function to set attributes on DOM elements
function setAttribute(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

// Create Elements for links & photos, add to DOM
function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photosArray.length;
	// run function for each object in photoArray
	photosArray.forEach((photo) => {
		// create <a> to link to unsplash
		const item = document.createElement('a');
		setAttribute(item, {
			href: photo.links.html,
			target: '_blank'
		});
		// create <img> for photo
		const img = document.createElement('img');
		setAttribute(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description
		});
		// Event Listener, check when each is finished loading
		img.addEventListener('load', imageLoaded);
		// put <img> inside <a>, then put both inside imageContainer Element
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

// Get photos from unsplash API
async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos();
	} catch (error) {
		// Catch error here
	}
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
		ready = false;
		getPhotos();
	}
});
// On Load
getPhotos();
