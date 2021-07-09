window.addEventListener('scroll',function() {
    localStorage.setItem('scrollPosition',window.scrollY);
},false);

window.addEventListener('load',function() {
    if(localStorage.getItem('scrollPosition') !== null)
       window.scrollTo(0, localStorage.getItem('scrollPosition'));
},false);