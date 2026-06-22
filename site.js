(function () {
    const root = document.documentElement;
    const button = document.querySelector(".theme-toggle");
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
    }

    if (stored === "light" || stored === "dark") {
        applyTheme(stored);
    } else {
        applyTheme(prefersDark.matches ? "dark" : "light");
    }

    prefersDark.addEventListener("change", function (event) {
        if (!localStorage.getItem("theme")) {
            applyTheme(event.matches ? "dark" : "light");
        }
    });

    if (button) {
        button.addEventListener("click", function () {
            const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
            localStorage.setItem("theme", next);
            applyTheme(next);
        });
    }
})();
