import axios from 'axios';

export default async function getPictures(query, page) {
  const params = new URLSearchParams({
    key: '26121034-8b2b223e077b6bd26f41dbdcc',
    q: `${query}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: `${page}`,
    per_page: 40,
  });
  const url = `https://pixabay.com/api/?${params}`;
  const response = await axios.get(url);

  return response;
}
