require('./components/nav');
require('./components/scroll');
const {replace, request, returnURLName} = require('./utils/utils');
const content = document.getElementById('container__content');
let navpages = document.querySelectorAll('.nav-page');

function updateNavPages() {
    navpages = document.querySelectorAll('.nav-page');
    setListeners();
}

function getPageTitle() {
    request('GET', './includes/pages.json', true, null, (response) => {
        for (let path of JSON.parse(response)) {
            if (window.location.pathname === path.url) {
                return document.title = path.title;
            }
        }
        document.title = "404 Page";
    });
}

function loadPageContent(filepath) {
    request('GET', filepath, true, null, (response) => {
        getPageTitle();
        content.style.display = "none";
        replace(content, response);
        setTimeout(() => {
            content.style.display = "block";
        }, 100);
        updateNavPages();
    });
}

function updateState(e) {
    e.preventDefault();
    if (e.target.pathname === "/") {
        history.pushState(null, null, e.target.pathname);
        return loadPageContent(`./includes/page-contents/home-content.php`);
    }
    history.pushState(null, null, returnURLName(e.target.pathname));
    loadPageContent(`./includes/page-contents/${returnURLName(e.target.pathname)}-content.php`);
}

function setListeners() {
    Array.from(navpages).forEach(function (page) {
        page.addEventListener("click", updateState);
    });
}

function checkExists(params) {
    request('POST', './includes/functions/checkExists.php', true, params, (response) => {
        if (JSON.parse(response).success) {
            loadPageContent(`./includes/page-contents/${returnURLName(window.location.pathname)}-content.php`);
        } else {
            loadPageContent('./includes/page-contents/404-content.php');
        }
    });
}

function checkForExtension() {
    if (window.location.pathname.includes(".")) {
        window.location.pathname = window.location.pathname.substr(0, window.location.pathname.lastIndexOf('.'));
    }
}

function init() {
    checkForExtension();
    if (window.location.pathname === "/" || window.location.pathname === "/index" || window.location.pathname === '/index.php') {
        loadPageContent(`./includes/page-contents/home-content.php`);
    } else {
        checkExists(`filepath=${returnURLName(window.location.pathname)}`);
    }

    window.addEventListener('popstate', () => {
        if (window.location.pathname === "/" || window.location.pathname === "/index" || window.location.pathname === '/index.php') {
            loadPageContent(`./includes/page-contents/home-content.php`);
        } else {
            checkExists(`filepath=${returnURLName(window.location.pathname)}`);
        }
    });
}

init();