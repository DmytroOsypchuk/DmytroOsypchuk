// Load menu.html into the menu container
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("menu-container");

    fetch("menu.html")
        .then(res => res.text())
        .then(html => {
            container.innerHTML = html;

            // After menu is loaded – set current language and populate translations
            const currentLang = localStorage.getItem("lang") || "uk";
            setLangLabel(currentLang);
            // If i18n loader is available, populate translated text for [data-i18n]
            if (typeof loadLang === 'function') {
                // map 'uk' -> 'ua' for filesystem locale folder names (if needed)
                const langForFiles = currentLang === 'uk' ? 'ua' : currentLang;
                loadLang(langForFiles);
            }
        });
});

// NOTE: setLang is provided by the global i18n loader (assets/js/i18n.js).
// This function overrides it to also update the language label in the menu.
function setLangLabel(lang) {
    const btn = document.getElementById("current-lang");
    if (!btn) return;

    // Accept both 'uk' and 'ua' as Ukrainian codes
    const isUkr = (lang === 'uk' || lang === 'ua');
    btn.textContent = isUkr ? 'UA' : 'EN';
}
