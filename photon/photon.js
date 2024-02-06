const auth = '563492ad6f91700001000001ef613793a4674589910559c86ad9204c';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
const more = document.querySelector('.more')
let searchValue;
let page =1;
let fetchLink;
let currentSearch;
let apiLink;

searchInput.addEventListener('input',updateInput);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue);
})

more.addEventListener('click',loadMore);

function updateInput(e){
    searchValue = e.target.value;
}

async function fetchApi(url){
    const dataFetch = await fetch(url,{
        method: 'GET',
        headers: {
            accept: 'application/json',
            authorization: auth
        }
    });
    const data = await dataFetch.json();
    return data;
}

function generatePhotos(data){
    data.photos.forEach(photo => {
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img','col-md-6','col-lg-4','col-xl-3');
        galleryImg.innerHTML = `<img src="${photo.src.large}">
        <div class="gallery-info"
        <p>${photo.photographer}</p>
        <a href="${photo.src.original}">Download</a>
        </div>`;
        gallery.appendChild(galleryImg)
    });
}

async function curatedPhotos(){
    apiLink = "https://api.pexels.com/v1/curated?per_page=16&page=1"
    const data = await fetchApi(apiLink);
    generatePhotos(data)
}

async function searchPhotos(query){
    clear();
    apiLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=16&page=1`;
    const data = await fetchApi(apiLink);
    generatePhotos(data);
}

function clear(){
    gallery.innerHTML = '';
    searchInput.value = '';
}

async function loadMore(){
    page++;
    if(currentSearch){
        apiLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=16&page=${page}`
    }else {
        apiLink = `https://api.pexels.com/v1/curated?per_page=16&page=${page}`
    }
    const data = await fetchApi(apiLink);
    generatePhotos(data);
}

curatedPhotos();