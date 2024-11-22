const navBar = document.querySelector('.nav-bar');
const navMenu = document.querySelector('.menu-on-nav');

if (navBar) {
    navBar.addEventListener('click', function() {
        navBar.classList.toggle('open');
        navMenu.classList.toggle('active');
    });
}