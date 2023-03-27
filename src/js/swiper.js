const swiper = new Swiper('.innovation-slider', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidePerView: 1,
    // If we need pagination
    pagination: {
      el: '.innovation-pagination',
      clickable: true,
    //   type: 'progressbar'
    },
  
    
  });

//Slide to clicked slider
  let in_items = document.querySelectorAll('.innovation-nav_item');
  in_items.forEach((e, i) => {
    in_items[0].classList.add('active_nav-item')
    e.addEventListener('click', (elem) => {
        in_items.forEach((elemtoRemove) => {
            elemtoRemove.classList.remove('active_nav-item')
        })
        e.classList.add('active_nav-item')
        swiper.slideTo(i)
    })
  })