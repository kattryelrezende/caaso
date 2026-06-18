// js/utils/domHelpers.js
export function toggleMenu() {
    const nav = document.getElementById('nav-links');
    if (nav) nav.classList.toggle('active');
}