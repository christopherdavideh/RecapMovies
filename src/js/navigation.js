searchFormBtn.addEventListener('click', () => {
    location.hash = '#search=' + searchFormInput.value;
});

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends-movies';
});

trendingSeriesBtn.addEventListener('click', () => {
    location.hash = '#trends-tv';
});

arrowBtn.addEventListener('click', () => {
    //history.back();
    //location.hash = '#home';
    if (document.domain !== "127.0.0.1") {
        location.hash = '#home'
    } else {
        history.back();
    }
});

window.addEventListener('load', navigator, false);
window.addEventListener('hashchange', navigator, false);


function navigator(){
    console.log({location});
    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith("#search=")) {
        searchPage();
    } else if (location.hash.startsWith("#movie=")){
        movieDetailsPage();
    } else if (location.hash.startsWith("#category=")){
        categoriesPage();
    } else {
        homePage();
    }
    smoothscroll();
    smoothscrollY();
}

function homePage(){
    console.log("Home");

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerLogo.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    trendingPreviewSectionTV.classList.remove('inactive');
    categoriesPreviewSectionTV.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    headerTitle.textContent = "Recap Movies & TV";

    getTrendingMoviesPreview("movie");
    getTrendingMoviesPreview("tv");
    getCategoryMoviesPreview("movie");
    getCategoryMoviesPreview("tv");
}

function trendsPage(){
    console.log("trends");
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerLogo.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    trendingPreviewSectionTV.classList.add('inactive');
    categoriesPreviewSectionTV.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [, media_type] = location.hash.split("-");
    headerTitle.textContent = `Trending ${media_type[0].toUpperCase() + media_type.substring(1)}`;
    getTrendingMovies(media_type);
}

function searchPage(){
    console.log('search');
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerLogo.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    trendingPreviewSectionTV.classList.add('inactive');
    categoriesPreviewSectionTV.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [, query] = location.hash.split("=");
    getMoviesBySearch(query);
}

function movieDetailsPage(){
    console.log('Movie detail');
    headerSection.classList.add('header-container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerLogo.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    trendingPreviewSectionTV.classList.add('inactive');
    categoriesPreviewSectionTV.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    const [, url] = location.hash.split("=");
    const [id, media_type] = url.split("-");
    console.log(media_type)
    getMoviesById(id, media_type);

}

function categoriesPage(){
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerLogo.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    trendingPreviewSectionTV.classList.add('inactive');
    categoriesPreviewSectionTV.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [, url] = location.hash.split("=");
    const [id, category, media_type] = url.split("-");
    const name = category.replaceAll("%20", " ");

    getMoviesByCategory(id, name, media_type);
}