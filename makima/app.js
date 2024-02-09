document.addEventListener('DOMContentLoaded', function() {
    
});

const navbar = document.querySelector('#navbar');
const scrooled = false;
window.onscroll = function() {
    if(window.pageYOffset > 100){
        navbar.classList.remove('top');
        if(!scrooled){
            navbar.style.transform = 'translateY(-70px)';
        }
        setTimeout(() => {
            navbar.style.transform = 'translateY(0)';
            scrooled = true;
        }, 200);
    }
    else{
        navbar.classList.add('top');
        scrooled = false;
    }
}