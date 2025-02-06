const theme_toggle = document.getElementById("theme_toggle");

// On page load or when changing themes, best to add inline in `head` to avoid FOUC
document.documentElement.classList.toggle(
    "dark",
    localStorage.theme === "dark"
);
theme_toggle.addEventListener("click", () => {
    // document.querySelector("body").classList.add("transition-all");
    document.querySelector("body").style.transition = "200ms";
    document.documentElement.classList.toggle("dark");
    localStorage.theme == "dark"
        ? (localStorage.theme = "light")
        : (localStorage.theme = "dark");
});
