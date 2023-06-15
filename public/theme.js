(function initTheme() {
    let theme = localStorage.getItem("theme");
    if (theme) {
        document.querySelector("html").classList.add(`theme-${theme}`);
    }

    // if (theme === "dark") {
    //     document.querySelector("html").classList.add("dark");
    // }
})();
