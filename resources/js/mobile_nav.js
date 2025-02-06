const mobile_nav = document.getElementById("mobile_nav_toggle");
const link_group = document.getElementById("link_group");
const mobile_nav_dropdown = document.getElementById("mobile_nav_dropdown");
const profile = document.getElementById("profile");

mobile_nav.addEventListener("click", () => {
    mobile_nav_dropdown.classList.toggle("hidden");
    mobile_nav_dropdown.append(link_group);
    if (profile) link_group.prepend(profile);
    link_group.classList.toggle("max-sm:hidden");
    link_group.classList.toggle("max-sm:grid");
    profile.classList.toggle("max-sm:hidden");
});
