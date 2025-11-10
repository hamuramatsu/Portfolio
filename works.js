const sanityUrl = 'https://c2s2sg6g.api.sanity.io/v2022-03-07/data/query/production';
const query = '*[_type == "work"] | order(order asc) {title, order, slug, "mainImage": mainImage.asset->url, "moreImages": moreImages[].asset->url}';

  fetch(`${sanityUrl}?query=${encodeURIComponent(query)}`)

  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    // console.log(data);
    // Render data to the HTML
    const worksDiv = document.getElementById('worksGrid');
    worksDiv.innerHTML += data.result
      .map(
        (work, index) => {
          // Create a class name based on the index (e.g., one, two, three, etc.)
          const className = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen'][index % 15];

          // Check if the index is odd
          const isOdd = index % 2 !== 0;

          const textContent = `
            <div class="text-${className}" 
              style="text-align: ${isOdd ? 'right' : 'left'};">
              ${isOdd ? work.title + '_____' : '_____' + work.title}
            </div>
          `;
          return `
            <div class="${className}">
              <a href="workPage.html?slug=${work.slug.current}">
                <img src="${work.mainImage}" alt="${work.title}">
              </a>
            </div>
            ${textContent}
          `;
        }
      )
      .join('');
  })
  .catch((error) => console.error('Error fetching Sanity data:', error));


// Grayscale Toggle Functionality
const toggleGrayscaleButton = document.getElementById('toggleGrayscale');

// Add an event listener to toggle grayscale for all dynamically rendered images
toggleGrayscaleButton.addEventListener('click', () => {
  console.log("clicked");
  // Select all images inside the worksGrid container
  const images = document.querySelectorAll('#worksGrid img');
  images.forEach((img) => {
    img.classList.toggle('grayscale');
  });
});
