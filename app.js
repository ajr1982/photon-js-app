const auth = '563492ad6f91700001000001b76b6d65a3dd4080a9f369ebd655d88e';
const gallery = document.querySelector('.gallery');
const searchInput= document.querySelector('.search-input');
const searchForm= document.querySelector('.search-form');
const more = document.querySelector('.more');
let searchValue;
let page = 1;
let fetchLink;
let currentSearch = searchValue;

//Event listeners
searchInput.addEventListener('input', updateInput);
searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    gallery.innerHTML = '';
    currentSearch = searchValue;
    searchPhotos(searchValue);
    searchInput.value = " ";
    

});
more.addEventListener('click', loadMore);



function updateInput(e){
    searchValue= e.target.value;
}

async function fetchAPI(url){
    const dataFetch = await fetch(url,{
        method:'GET',
        headers:{
            Accept:'application/json',
            Authorization: auth
        }
    });
    const data = await dataFetch.json();
    
    return data;
}

function generatePhotos(data){
    data.photos.forEach(photo =>{
                const galleryImg = document.createElement('div');
                galleryImg.classList.add('gallery-img');
                galleryImg.innerHTML = 
                `<div class="gallery-info">
                <a href=${photo.photographer_url}>${photo.photographer}</a>
                <a href=${photo.src.original}>Download</a>
                </div>
                <img src=${photo.src.large}></img>`;
                gallery.appendChild(galleryImg);
            })
}



async function curatedPhotos(){
    fetchLink = `https://api.pexels.com/v1/curated`;
        const data = await fetchAPI(fetchLink);
        generatePhotos(data);
}


async function searchPhotos(query){
    fetchLink = `https://api.pexels.com/v1/search?query=${query}`;
         const data = await fetchAPI(fetchLink);
         generatePhotos(data);
}


async function loadMore(){
page++;
if(currentSearch){
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&page=${page}`;
}else{
    fetchLink = `https://api.pexels.com/v1/curated?page=${page}`;
}
const data = await fetchAPI(fetchLink);
generatePhotos(data);

}


curatedPhotos();