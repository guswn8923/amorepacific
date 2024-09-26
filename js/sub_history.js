const $pointer = $('.pointer');
const $historyBarOn = $('.history_bar_on');
const $historyBar = $('.history_bar');
const $contList = $('.cont_list');
const $contUl = $('.cont_list ul');
const $items = $('.item');
const $itemh4 = $('.item h4');

let pointerMaxScroll = $historyBar.height() - $pointer.height();
let historyMaxScroll = $historyBar.height() - $historyBarOn.height();
let listHeight = $items.height();
let listInnerHeight = $items.innerHeight();
let listOuterHeight = $items.outerHeight();
let h4OuterHeight = $itemh4.outerHeight();
let h4InnerHeight = $itemh4.innerHeight();
let h4Height = $itemh4.height();
let contListOffsetTop = $contList.offset().top;
let ulOffsetTop = $contUl.offset().top;
let itemOffsetTop = $items.offset().top;


function updateMeasurements() {
  // 각 아이템의 높이 및 리스트 offset 값을 갱신
  listInnerHeight = $items.outerHeight();
  offsetTop = $('.item').offset().top;
  offsetBottom = offsetTop + $('.item').innerHeight();
  contListOffsetTop = $contList.offset().top;
  ulOffsetTop = $contUl.offset().top;
  itemOffsetTop = $items.offset().top;
  pointerMaxScroll = $historyBar.height() - $pointer.height();
  historyMaxScroll = $historyBar.height() - $historyBarOn.height();
  scrollPos = $(window).scrollTop() + $(window).height() / 2;
}


function history(){
  
  $items.each(function(){
    let scrollPos = $(window).scrollTop() + $(window).height() / 2;

    var $this = $(this);
    var offsetTop = $this.offset().top;
    var offsetBottom = offsetTop + $this.innerHeight();
    var listInnerHeight = $this.innerHeight();

    if (scrollPos > offsetTop && scrollPos < offsetBottom) {
      let newTop = scrollPos - contListOffsetTop - h4Height;
      let newHeight = scrollPos - contListOffsetTop - h4Height;
     
      $this.addClass('active');
      $('.cont_nav').addClass('visible');
   
      $pointer.css('top', Math.min(Math.max(newTop, 0), pointerMaxScroll) + 'px');
      $historyBarOn.css('height', Math.min(Math.max(newHeight, 0), historyMaxScroll) + 'px');

    } else {
        $this.removeClass('active');
        $('.cont_nav').removeClass('visible');
    }


    $('.cont_list ul').each(function(){
      var $this = $(this);
      var $child = $this.find('.item');
     
      if ($child.hasClass('active')) {
        $this.addClass('active');
      } else {
        $this.removeClass('active');
      }    
      });
  });
}


// 리사이즈 시 높이 값과 offset 값을 다시 계산
$(window).resize(function(){
  updateMeasurements();
  if (scrollPos > offsetTop && scrollPos < offsetBottom) {
    let newTop = scrollPos - contListOffsetTop;
    let newHeight = scrollPos - contListOffsetTop;
   
    $('.item').addClass('active');
    $('.cont_nav').addClass('visible');
 
    $('.pointer').css('top', Math.max(newTop, 0) + 'px');
    $('.history_bar_on').css('height', Math.max(newHeight, 0) + 'px');
  } else {
    $('.item').removeClass('active');
      $('.cont_nav').removeClass('visible');
  }
});


// 스크롤 시에도 동작
$(window).scroll(function(){
  history();
});

$(window).scroll(function(){
  $contList.find('ul').each(function(index){
    if($(this).find('li:first-child').hasClass('active')){
      // 첫 번째 아이템이 활성화된 경우
      $('.img_cont').eq(index).siblings().find('.first img').removeClass('show');
      $('.img_cont').eq(index).find('.false img').removeClass('show').addClass('false');
      $('.img_cont').eq(index).find('.first img').removeClass('false').addClass('show');
    } else if($(this).find('li:nth-child(3)').hasClass('active')){
      // 세 번째 아이템이 활성화된 경우
      $('.img_cont').eq(index).find('.first img').removeClass('show').addClass('false');
      $('.img_cont').eq(index).find('.false img').removeClass('false').addClass('show');
    }
  });
});

let $contNav = $('.cont_nav');
var navOft = $('header').height() + $('.line_guide').height() + 180 + 217 + $('.subtopbg_warp').innerHeight();

$(window).scroll(function(){
  var scrollAmt = $(this).scrollTop();

  if(scrollAmt > navOft){
    $contNav.addClass('visible');
  }else {
    $contNav.removeClass('visible');
  }
});

$(window).scroll(function(){
  $('.cont_list ul').each(function(index) {
    if ($(this).hasClass('active')) {
      $('.cont_nav .inner li button').removeClass('active');
      $('.cont_nav .inner li button').eq(index).addClass('active');
    }
  });
    
  $('.cont_list ul').scroll(function() {
    var index = $(this).index();
    $('.cont_list ul').removeClass('active');
    $(this).addClass('active');
    $('.cont_nav .inner li button').removeClass('active').eq(index).addClass('active');
  });

  $('.cont_list ul').each(function(index){
    if($(this).hasClass('active')){
        $('.img_cont').eq(index).removeClass('disShowMotion');
        $('.img_cont').eq(index).addClass('showMotion');
    }else{
        $('.img_cont').eq(index).removeClass('showMotion');
        $('.img_cont').eq(index).addClass('disShowMotion');
    }
  });

  $('.cont_nav .inner li').click(function() {
    $('.cont_nav .inner li').removeClass('active');
    $(this).addClass('active');
    
    var index = $(this).index();
    var targetUl = $('.cont_list ul').eq(index);
    
    $('html, body').stop().animate({
        scrollTop: targetUl.offset().top - 300
      }, 100);
  });
});

$(window).scroll(function(){
  let bottomHt = 280 + 110 + $('footer').height() + 'px';
  let dcw = $(document).height() - $(window).height() - $('footer').height();
  if($(this).scrollTop() > 600 && $(this).scrollTop() < dcw) {
    $('.history_show').addClass('visible');
  } else {
    $('.history_show').removeClass('visible');
  }

  if(dcw >= $(this).scrollTop()){
    $('.history_show').css('bottom', bottomHt).css('top','');
  }else{
    $('.history_show').css('bottom', '0').css('top','0.5%');
  }
})

$('.line_guide .navigation > div').click(function(){
  $('.cont_nav.visible').css('transform','translateY(-60px)');
})