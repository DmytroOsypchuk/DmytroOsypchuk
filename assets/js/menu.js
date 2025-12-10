// Load menu.html into the menu container
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("menu-container");

    fetch("menu.html")
        .then(res => res.text())
        .then(html => {
            container.innerHTML = html;

            // After inserting menu, activate burger logic
            initMenuScripts();

            // Activate language button click
            initLangButton();

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

// Set the language label on the language switch button
function setLangLabel(lang) {
    const btn = document.getElementById("current-lang");
    if (!btn) return;

    // Accept both 'uk' and 'ua' as Ukrainian codes
    const isUkr = (lang === 'uk' || lang === 'ua');
    btn.textContent = isUkr ? 'UA' : 'EN';
}

// Initialize burger menu functionality
function initMenuScripts() {
    const burger = document.getElementById("burger-btn");
    const links = document.getElementById("nav-links");

    if (!burger || !links) {
        console.error("Menu not found");
        return;
    }

    // Toggle menu on burger click
    burger.addEventListener("click", (e) => {
        e.stopPropagation(); // prevent document click from firing
        links.classList.toggle("show");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!links.contains(e.target) && !burger.contains(e.target)) {
            links.classList.remove("show");
        }
    });
}

// Initialize language button click
function initLangButton() {
    const dropbtn = document.getElementById("current-lang");
    if (!dropbtn) return;

    const dropdown = dropbtn.nextElementSibling;
    if (!dropdown) return;

    // Toggle dropdown on click
    dropbtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("open");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", () => {
        dropdown.classList.remove("open");
    });
}