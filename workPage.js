// Get the `slug` value from the query parameter
const params = new URLSearchParams(window.location.search);
const workSlug = params.get('slug');

// Fetch the work data based on the `slug`
const sanityUrl = 'https://c2s2sg6g.api.sanity.io/v2022-03-07/data/query/production';
const query = `*[_type == "work" && slug.current == "${workSlug}"] {
  title,
  yearCreated,
  medium,
  "description": pt::text(body),
  "mainImage": mainImage.asset->url, 
  "moreImages": moreImages[].asset->url
}`;

fetch(`${sanityUrl}?query=${encodeURIComponent(query)}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    if (data.result.length > 0) {
      const work = data.result[0];
      
      // Populate main content
      document.getElementById('workTitle').innerText = work.title;
      document.getElementById('workYear').innerText = work.yearCreated;
      document.getElementById('workMedium').innerText = work.medium;
      document.getElementById('workDescription').innerText = work.description;
      document.getElementById('workImage').src = work.mainImage;
      document.getElementById('workImage').alt = work.title;

      // Render gallery images
      const moreImagesDiv = document.getElementById('moreImagesGrid');
      if (work.moreImages && work.moreImages.length > 0) {
        // Apply the correct layout class
        if (work.moreImages.length > 3) {
          moreImagesDiv.classList.add('threeCol');
          moreImagesDiv.classList.remove('autoFit');
        } else {
          moreImagesDiv.classList.add('autoFit');
          moreImagesDiv.classList.remove('threeCol');
        }
      
        moreImagesDiv.innerHTML = work.moreImages
          .map((image) => `<div class="moreImages-item"><img src="${image}" alt="${work.title}"></div>`)
          .join('');
      } else {
        moreImagesDiv.innerHTML = '<p></p>';
      }
    } else {
      document.getElementById('detailsContainer').innerText = 'Work not found!';
    }
  })
  .catch((error) => console.error('Error fetching work data:', error));
