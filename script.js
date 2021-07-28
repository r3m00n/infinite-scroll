const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let isInitialLoad = true;
let initialCount = 5;
const apiKey = "csz-Hhlkw4-VBFw6KaW2IQKnH3aJJ0QW3tANMr7RNjs";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

function updateAPIURLWithNewCount(picCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

const setAttributes = (element, attributes) => {
  for (const key in attributes) element.setAttribute(key, attributes[key]);
};

const displayPhotos = () => {
  // IDEA: display load when user is on bottom of page
  imagesLoaded = 0;
  totalImages = photosArray.length;

  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blanc",
    });

    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener("load", imageLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

const getPhotosFromApi = async () => {
  try {
    const res = await fetch(apiUrl);
    photosArray = await res.json();
    displayPhotos();
    if (isInitialLoad) {
      updateAPIURLWithNewCount(30);
      isInitialLoad = false;
    }
  } catch (error) {
    console.error(error);
  }
};

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY > document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotosFromApi();
  }
});

// On Load
getPhotosFromApi();
