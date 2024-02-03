// Preloader
document.getElementById('preloader').style.display = 'flex';

setTimeout(function () {
    document.getElementById('preloader').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
}, 4900);
