/* HEADER - 배유나
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */

let header = $('header');
let headerTop = $('.header');
let sideBtn = $('.side_btn');
let goToTop = $('.go_to_top');

$(window).scroll(function(){
  let fOffsetTop = $('.footer_box').offset().top;

  if($(this).scrollTop() >= fOffsetTop - $(window).innerHeight()){
    let bottom = $(window).scrollTop() - fOffsetTop + $(window).innerHeight() + 20
    sideBtn.css({"bottom" : bottom});
  } else {
    sideBtn.css({"bottom" : "20px"});
  }
});

$(window).scroll(function(){
  if(header.hasClass('sub_header')){
    if($(this).scrollTop() > 100){
      sideBtn.addClass('on');
    }else {
      sideBtn.removeClass('on');
    }
  }else{
    if($(this).scrollTop() > 500){
      sideBtn.addClass('on');
    }else {
      sideBtn.removeClass('on');
    }
  }
});

goToTop.click(function(e){
  e.preventDefault();
    $('html, body').animate({
        scrollTop: 0
    }, 200);
  $('html, body').css('scroll-behavior', 'smooth');
});


$('.search-button').click(function(){
  header.toggleClass('open');
  if(header.hasClass('open')){
    $('.hamburger-button').css({"visibility":"hidden"});
  }else{
    $('.hamburger-button').css({"visibility":"visible"});
  }
});

$('.header_overlay').click(function(){
  header.removeClass('open');
  if(!header.hasClass('open')){
    $('.hamburger-button').css({"visibility":"visible"});
  }
});

$('.hamburger-button').click(function(){
  $(this).addClass('navOpen');
  if($(this).hasClass('navOpen')){
    $('aside').addClass('navOpen');
    $('html').addClass('navOpen');
  }
})

$('.content_wrap .x-button').click(function(){
  $('.hamburger-button').removeClass('navOpen');
  if(!$('.hamburger-button').hasClass('navOpen')){
    $('aside').removeClass('navOpen');
    $('html').removeClass('navOpen');
  }
})

$('.gnb-item').mouseenter(function(){
  $(this).addClass('active');
  $('.header_overlay').addClass('active');
})

$('.gnb-item').mouseleave(function(){
  $(this).removeClass('active');
  $('.header_overlay').removeClass('active');
})

$('.resize_gnb .gnb_item').click(function(){
  $(this).toggleClass('re-active');
})

let apiUrl = `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=bAyCLfuK3Qtrz6nJ9J%2BsVV7zH2dC1T86Gjo0QfMo6trW7eXUGhI2FW0YepT6264Q64dx4g%2FX%2B%2FJt0DKzGBL%2Bxw%3D%3D&numOfRows=10&resultType=json&basDt=20240925&itmsNm=%EC%95%84%EB%AA%A8%EB%A0%88%ED%8D%BC%EC%8B%9C%ED%94%BD`;

$.get(apiUrl, function(response) {

  const items = response.response.body.items.item;

  let tableContent = '';
  items.forEach(item => {
    let NumClpr = Number(item.clpr).toLocaleString();
    let NumVs = Number(item.vs).toLocaleString();
    let NumFltRt = Number(item.fltRt).toLocaleString(); 
    function formatDate(dateStr) {
      const year = dateStr.slice(0, 4);
      const month = dateStr.slice(4, 6);
      const day = dateStr.slice(6, 8);

      const shortYear = year.slice(2);

      return `${shortYear}/${month}/${day}`;
    }

      tableContent += `
          <div class="stock-cell">
            <h4>아모레퍼시픽</h4>
            <span>${formatDate(item.basDt)}</span>
          </div>
          <div class="stock-cell">
            <i class="price">${NumClpr}</i>
            <span class="state">
              <b>-${NumVs}</b>
              <i>(-${NumFltRt}%)</i>
            </span>
          </div>
      `;
  });
  $('#stock-box').html(tableContent);
})

$('.resize_gnb .gnb_item').click(function(){
  var $this = $(this);
  var $lnbList = $this.find('.lnb_list');

  $('.resize_gnb .lnb_list').not($lnbList).removeClass('re-active').css('height', '0');
  $('.resize_gnb .gnb_item').not($this).removeClass('re-active').find('> a').css('color', '');

  if ($lnbList.hasClass('re-active')) {
    $lnbList.removeClass('re-active').css('height', '');
    $this.removeClass('re-active');
    $this.find('> a').css('color','');
  }else {
    $lnbList.addClass('re-active').css('height', $lnbList.attr('data-height'));
    $this.addClass('re-active');
    $this.find('> a').css('color','#062C5E');
  }
})

$(window).scroll(function(){
  var scrollAmt = $(this).scrollTop();
  if(scrollAmt > 135){
    $('.line_guide').addClass('fixed');
  }else {
    $('.line_guide').removeClass('fixed');
  }
})

$('.navigation > div').click(function() {
  var $button = $(this).find('button');
  var $ul = $(this).find('ul');

  $('.navigation > div').not($(this)).each(function() {
    $(this).find('button').removeClass('on');
    $(this).find('ul').slideUp(200).removeClass('open');
  });

  $button.toggleClass('on');
  
  if ($ul.is(':visible')) {
    $ul.slideUp(200).removeClass('open');
  } else {
    $ul.slideDown(200).addClass('open');
  }
});

var lineprevST = 0;
function updateLineGuide(){
  let $lineGuide = $('.line_guide');
  
    let currentST = $(this).scrollTop();
    let windowWidth = $(window).width();
  
    if(currentST > lineprevST){
      $lineGuide.css({'top': '-60px','transition': 'top 0.3s ease'});
      $('.cont_nav').css('transform', 'translateY(0)');
    }else{
      if (currentST <= 135) {
        if (windowWidth > 1024) {
          $lineGuide.css({'top': '135px','transition': ''});
        } else {
          $lineGuide.css({'top': '64px','transition': ''});
        }
      } else {
        $lineGuide.css({'top': '0','transition': 'top 0.3s ease'});
        $('.cont_nav').css('transform', 'translateY(54px)');
      }
    }
    
    lineprevST = currentST;
}

$(window).scroll(updateLineGuide);
$(window).resize(updateLineGuide);

$('main').click(function(){
  $('.navigation > div > ul').slideUp(200).removeClass('open');
  $('.navigation > div').find('button').removeClass('on');
});

$('.resize_gnb_inner').click(function(event) {
  event.stopPropagation();
});

$('.resize_gnb').click(function(){
  $('aside').removeClass('navOpen');
  $('html').removeClass('navOpen');
});

/* 서브페이지 상단 공통
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */
const subtopBg = $('.sub_top_bg');

$(window).scroll(function(){
    subtopBg.addClass('on')
});
