window.addEventListener('scroll', function() {
    var header = document.getElementById('main-header');
    var navBar = document.getElementById('nav-bar');
    var scrollY = window.scrollY;

    // When the user scrolls past 100px, move the navbar to the bottom-right
    if (scrollY > 100) {
        navBar.classList.add('bottom-right');
    } else {
        navBar.classList.remove('bottom-right');
    }
});