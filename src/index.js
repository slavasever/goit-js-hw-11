import './sass/main.scss';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';
import getPictures from './getPictures';
import renderMarkup from './renderMarkup';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
let page = null;
let query = null;
const lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 });

refs.form.addEventListener('submit', handleSubmit);

refs.loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleSubmit(evt) {
  try {
    evt.preventDefault();

    query = evt.currentTarget.elements.searchQuery.value;

    refs.loadMoreBtn.classList.add('is-hidden');

    if (query === '') return;

    refs.gallery.innerHTML = '';
    page = 1;

    const response = await getPictures(query, page);
    const pictures = response.data.hits;
    const totalHits = response.data.totalHits;

    if (pictures.length === 0) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
    }

    Notify.success(`Hooray! We found ${totalHits} images.`);

    renderMarkup(pictures, refs.gallery);

    lightbox.refresh();

    if (pictures.length < 40) return;

    refs.loadMoreBtn.classList.remove('is-hidden');
  } catch (error) {
    Notify.failure(`${error.message}`);
  }
}

async function handleLoadMore() {
  try {
    page += 1;

    const response = await getPictures(query, page);
    const pictures = response.data.hits;

    renderMarkup(pictures, refs.gallery);

    lightbox.refresh();

    if (pictures.length < 40) {
      refs.loadMoreBtn.classList.add('is-hidden');
      Notify.failure("We're sorry, but you've reached the end of search results.");
      return;
    }
  } catch (error) {
    Notify.failure(`${error.message}`);
  }
}
