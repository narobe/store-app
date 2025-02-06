const search_bar_toggle = document.getElementById("search_bar_toggle");
const filter_toggle = document.getElementById("filter_toggle");
const min_max_filter_toggle = document.getElementById("min_max_filter_toggle");
const min_max_filter_input = document.getElementById("min_max_filter_input");
const search_bar = document.getElementById("search_bar");
const filter_bar = document.getElementById("filter_bar");

filter_toggle.addEventListener("click", () => {
    filter_bar.classList.toggle("hidden");
    !search_bar.classList.contains("hidden")
        ? search_bar.classList.add("hidden")
        : "";
});
search_bar_toggle.addEventListener("click", () => {
    search_bar.classList.toggle("hidden");
    !filter_bar.classList.contains("hidden")
        ? filter_bar.classList.add("hidden")
        : "";
});
const min_max_toggle = () => {
    min_max_filter_toggle.innerText == "max"
        ? (min_max_filter_toggle.innerText = "min")
        : (min_max_filter_toggle.innerText = "max");

    min_max_filter_input.value == "max"
        ? (min_max_filter_input.value = "min")
        : (min_max_filter_input.value = "max");
};
min_max_filter_toggle.addEventListener("click", () => {
    min_max_toggle();
});
