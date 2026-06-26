(function () {
    const root = document.documentElement;
    const button = document.querySelector(".theme-toggle");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    function getStoredTheme() {
        try {
            return localStorage.getItem("theme");
        } catch (error) {
            return null;
        }
    }

    function setStoredTheme(theme) {
        try {
            localStorage.setItem("theme", theme);
        } catch (error) {
            return;
        }
    }

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        if (button) {
            button.setAttribute("aria-pressed", String(theme === "dark"));
        }
    }

    const stored = getStoredTheme();

    if (stored === "light" || stored === "dark") {
        applyTheme(stored);
    } else {
        applyTheme(prefersDark.matches ? "dark" : "light");
    }

    prefersDark.addEventListener("change", function (event) {
        if (!getStoredTheme()) {
            applyTheme(event.matches ? "dark" : "light");
        }
    });

    if (button) {
        button.addEventListener("click", function () {
            const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
            setStoredTheme(next);
            applyTheme(next);
        });
    }
})();
