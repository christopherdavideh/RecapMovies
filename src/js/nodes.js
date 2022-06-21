// Sections
const headerSection = document.querySelector('#header');
const trendingPreviewSection = document.querySelector('#trendingPreview');
const trendingPreviewSectionTV = document.querySelector('#trendingPreviewTV');
const categoriesPreviewSection = document.querySelector('#categoriesPreview');
const categoriesPreviewSectionTV = document.querySelector('#categoriesPreviewTV');
const genericSection = document.querySelector('#genericList');
const movieDetailSection = document.querySelector('#movieDetail');
const footerSection = document.querySelector('#footer_main');

// Lists & Containers
const searchForm = document.querySelector('#searchForm');
const trendingMoviesPreviewList = document.querySelector('.trendingPreview-movieList');
const trendingTvPreviewList = document.querySelector('.trendingPreview-serieList');
const categoriesPreviewList = document.querySelector('.categoriesPreview-list');
const categoriesPreviewListTV = document.querySelector('.categoriesPreview-listTV');
const movieDetailCategoriesList = document.querySelector('#movieDetail .categories-list');
const relatedMoviesContainer = document.querySelector('.relatedMovies-scrollContainer');
const genericListContainer = document.querySelector('.genericList-container__div');

// Elements
const headerTitle = document.querySelector('.header-title');
const headerLogo = document.querySelector('.header-logo');
const arrowBtn = document.querySelector('.header-arrow');
const headerCategoryTitle = document.querySelector('.header-title--categoryView');
const languageSection = document.querySelector('.language-section');

const searchFormInput = document.querySelector('#searchForm input');
const searchFormBtn = document.querySelector('#searchBtn');

const trendingBtn = document.querySelector('.trendingPreview-btn');
const trendingSeriesBtn = document.querySelector('.trendingPreviewSeries-btn');
const favoriteBtn = document.querySelector('.favorites-btn');

const movieDetailTitle = document.querySelector('.movieDetail-title');
const movieDetailDescription = document.querySelector('.movieDetail-description');
const movieDetailScore = document.querySelector('.movieDetail-score');

function smoothscroll(){
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo (0,currentScroll - (currentScroll/5));
    }
};

function smoothscrollY(){
    const currentScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
    if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo (0,currentScroll - (currentScroll/5));
    }
};