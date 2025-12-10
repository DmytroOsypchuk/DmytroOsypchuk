let currentLang = localStorage.getItem("lang");
if (!currentLang) {
    currentLang = "en";               // DEFAULT LANGUAGE
    localStorage.setItem("lang", "en");
}

function getPageName() {
    // Determine logical page name: if URL has a filename, use it (without extension), otherwise 'index'
    const path = (window.location.pathname || '').split('/').filter(Boolean);
    if (path.length === 0) return 'index';
    const last = path[path.length - 1];
    // remove query or hash
    const clean = last.split(/[?#]/)[0];
    return clean.includes('.') ? clean.replace(/\.html?$/i, '') : clean;
}

function loadLang(lang) {
    const folder = (lang === 'uk' || lang === 'ua') ? 'ua' : lang;

    // Always try to load menu.json plus a page-specific file (e.g., index.json)
    const pageName = getPageName();
    const files = [`locales/${folder}/menu.json`, `locales/${folder}/${pageName}.json`];

    // Fetch all files in parallel and merge the results; ignore 404s
    const fetches = files.map(url =>
        fetch(url).then(res => (res.ok ? res.json() : {})).catch(() => ({}))
    );

    Promise.all(fetches).then(results => {
        // merge all translation objects: later files override earlier ones
        const data = Object.assign({}, ...results);

        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (data && data[key]) {
                el.innerHTML = data[key];
            }
        });

        if (typeof setLangLabel === 'function') setLangLabel(lang);
    }).catch(err => console.warn('i18n load error:', err));
}

function setLang(lang) {
    localStorage.setItem("lang", lang);
    currentLang = lang;
    // Load language data (map for folder names inside loadLang)
    loadLang(lang);
}

// Load language on page load
document.addEventListener("DOMContentLoaded", () => {
    // Call loadLang with the stored/initial language
    loadLang(currentLang);
});
