var w = window.innerWidth,
  h = window.innerHeight,
  canvas = document.getElementById('bubble'),
  ctx = canvas.getContext('2d'),
  rate = 60,
  arc = 100,
  time,
  count,
  size = 7,
  speed = 20,
  lights = new Array,
  colors = ['#d59254', '#ffffff', '#1f2839', '#cf7693'];

canvas.setAttribute('width', w);
canvas.setAttribute('height', h);


//navigation (this is my code)
var animation = 'easeOutCubic';
delay = 60;

$(document)
  .on('click', '.fa-bars', function () {
    let box = document.querySelector('.box');
    box.style.display = 'block';
    box.style="overflow:hidden";
    var i = 0;
    $('nav').before($('#bubble'));
    $('#bubble').fadeIn();
    $('#mainnav').find('li').each(function () {
      var that = $(this);
      i++;
      (function (i, that) {
        setTimeout(function () {
          that
            .animate(
              { 'left': '20px' },
              {
                duration: 350,
                easing: animation
              })
            .fadeIn({ queue: false });
        }, delay * i)
      }(i, that))
    });
    $('.fa-bars').fadeOut(100, function () {
      $(this)
        .removeClass('fa-bars')
        .addClass('fa-times')
        .fadeIn();
    });
  })
  .on('click', '#bubble, .fa-times', function () {
    let box = document.querySelector('.box');
    box.style.display = 'none';
    $('#bubble').fadeOut();
    $('#mainnav').find('li')
      .animate(
        { 'left': '-550px' },
        { duration: 250 })
      .fadeOut({ queue: false });

    $('.hamb').fadeOut(100, function () {
      $(this)
        .find($('i'))
        .removeClass('fa-times')
        .addClass('fa-bars')
        .end()
        .fadeIn();
    });
  })
