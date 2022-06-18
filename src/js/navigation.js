let page = 1;
let paginated;

searchFormBtn.addEventListener('click', () => {
    if (searchFormInput.value) {
        location.hash = '#search=' + searchFormInput.value;
    }

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
    if (document.domain !== "christopherdavideh.github.io") {
        location.hash = '#home'
    } else {
        history.back();
    }
});

window.addEventListener('load', navigator, false);
window.addEventListener('hashchange', navigator, false);


function navigator(){
    //console.log({location});
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
    //console.log("Home");
    if (page !== 1){
        genericListContainer.innerHTML="";
        page = 1;
    }

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
    //console.log("trends");
    trendingMoviesPreviewList.innerHTML = "";
    trendingTvPreviewList.innerHTML = "";
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
    //getTrendingMovies(media_type);
    paginated = new IntersectionObserver((entries, paginated) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                page ++;
                getTrendingMovies(media_type, page);
                paginated.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: "0px 0px 0px 0px",
        threshold: 1.0
    });
    getTrendingMovies(media_type, page);
}

function searchPage(){
    //console.log('search');
    trendingMoviesPreviewList.innerHTML = "";
    trendingTvPreviewList.innerHTML = "";
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

    let [, query] = location.hash.split("=");
    if (query.includes("%20")){
        query = query.replaceAll("%20", " ").trim();
        //console.log("trim", query.length)
    }
    paginated = new IntersectionObserver((entries, paginated) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                page ++;
                getMoviesBySearch(query, page);
                paginated.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: "0px 0px 0px 0px",
        threshold: 1.0
    });

    getMoviesBySearch(query, page);
}

function movieDetailsPage(){
    //console.log('Movie detail');
    trendingMoviesPreviewList.innerHTML = "";
    trendingTvPreviewList.innerHTML = "";
    headerSection.classList.add('header-container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerLogo.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');
    footerSection.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    trendingPreviewSectionTV.classList.add('inactive');
    categoriesPreviewSectionTV.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    const [, url] = location.hash.split("=");
    const [id, media_type] = url.split("-");
    //console.log(media_type)
    getMoviesById(id, media_type);

}

function categoriesPage(){
    trendingMoviesPreviewList.innerHTML = "";
    trendingTvPreviewList.innerHTML = "";
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