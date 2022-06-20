let page = 1;
let paginated;
let languageApi = "en-US";
location.hash='#home';

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
    if (document.domain !== "127.0.0.1" /*"christopherdavideh.github.io"*/) {
        location.hash = '#home'
    } else {
        if (location.hash.startsWith("#movie=")) {
            history.back();
            setTimeout(function(){
                location.reload()
            }, 100);
        } else {
            history.back();
        }
    }
});

function languagePage(language){
    languageApi = language;
    
    const [url_path,] = location.hash.split("/");
    location.hash = url_path + "/" + language;
    //location.reload();
}

function resetPage(numPage){
    if (numPage !== 1){
        //genericListContainer.innerHTML="";
        numPage = 1;
    }
    return numPage;
}

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
    languageSection.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    trendingPreviewSectionTV.classList.remove('inactive');
    categoriesPreviewSectionTV.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
    footerSection.classList.remove('inactive');

    headerTitle.textContent = "Recap Movies & TV";

    getTrendingMoviesPreview("movie");
    getTrendingMoviesPreview("tv");
    getCategoryMoviesPreview("movie");
    getCategoryMoviesPreview("tv");
}

function trendsPage(){
    //console.log("trends");
    page = resetPage(page);

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
    languageSection.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    trendingPreviewSectionTV.classList.add('inactive');
    categoriesPreviewSectionTV.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    //footerSection.classList.remove('inactive');

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
        rootMargin: "0px 0px 50px 0px",
        threshold: 1.0
    });
    getTrendingMovies(media_type, page);
}

function searchPage(){
    //console.log('search');
    page = resetPage(page);

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
    languageSection.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    trendingPreviewSectionTV.classList.add('inactive');
    categoriesPreviewSectionTV.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    //footerSection.classList.remove('inactive');

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
        rootMargin: "0px 0px 50px 0px",
        threshold: 1.0
    });

    getMoviesBySearch(query, page);
}

function movieDetailsPage(){
    page = resetPage(page);

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
    languageSection.classList.add('inactive');
    //footerSection.classList.add('inactive');

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
    page = resetPage(page);

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
    languageSection.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    trendingPreviewSectionTV.classList.add('inactive');
    categoriesPreviewSectionTV.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    //footerSection.classList.remove('inactive');

    const [, url] = location.hash.split("=");
    const [id, category, media_type] = url.split("-");
    const name = category.replaceAll("%20", " ");

    paginated = new IntersectionObserver((entries, paginated) => {
        //console.log(entries);
        entries.forEach(entry => {
            if(entry.isIntersecting){
                page ++;
                getMoviesByCategory(id, name, media_type, page);
                paginated.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: "0px 0px 50px 0px",
        threshold: 1.0
    });

    getMoviesByCategory(id, name, media_type, page);
}