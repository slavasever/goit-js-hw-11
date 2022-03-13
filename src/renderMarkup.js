export default function renderMarkup(arrayOfPictures, elem) {
  const markup = arrayOfPictures
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `<li class="gallery__item">
  <a href="${largeImageURL}" class="gallery__link">
  <img src="${webformatURL}" alt="${tags}" class="gallery__image" title="${tags}" loading="lazy" />
  <span class="info">
    <p class="info-item">
      <b>likes: </b>${likes}
    </p>
    <p class="info-item">
      <b>views: </b>${views}
    </p>
    <p class="info-item">
      <b>comments: </b>${comments}
    </p>
    <p class="info-item">
      <b>downloads: </b>${downloads}
    </p>
  </span>
  </a>
</li>`;
    })
    .join('');

  elem.insertAdjacentHTML('beforeend', markup);
}
