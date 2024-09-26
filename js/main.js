/* MODAL - 강현주
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */
 // 쿠키 설정 함수
  function setCookie(name, value, days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // 쿠키 만료 시간 설정
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  }

  // 쿠키 가져오기 함수
  function getCookie(name) {
    let cookieArr = document.cookie.split(';');
    for (let i = 0; i < cookieArr.length; i++) {
      let cookiePair = cookieArr[i].trim().split('=');
      if (cookiePair[0] === name) {
        return cookiePair[1];
      }
    }
    return null;
  }

  // 페이지 로드 시 쿠키 확인 후 모달 표시 여부 결정
  if (!getCookie('modalClosed')) {
    $('#cookieMobal').css('visibility', 'visible');  // 쿠키가 없으면 모달 표시
  } else {
    $('#cookieMobal').hide();  // 쿠키가 있으면 모달 숨김
  }

  // 닫기 버튼 클릭 시
  $('#closeBtn').click(function() {
    if ($('#check').is(':checked')) {
      // "하루 동안 안 보기" 체크 시 쿠키 설정
      setCookie('modalClosed', 'true', 1);  // 1일 동안 쿠키 유지
    }
    $('#cookieMobal').fadeOut(); // 모달 닫기
  });
/* HEADER - 배유나
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */

$(window).scroll(function(){
  if($(this).scrollTop() > 500){
    header.addClass('shrink');
  }else {
    header.removeClass('shrink');
  }
});

var prevST = 0;
$(window).scroll(function(){
  currentST = $(this).scrollTop();
  if(currentST > prevST){
    header.css('top', '-145px');
  }else {
    header.css('top', '0');
  }
  prevST = currentST;
});

/* MAIN BANNER - 한태희
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */
let $mainBanner = $(".main_banner"); 
let $video = $mainBanner.find(".video");
let $slides = $video.find("li");
let $videos = $video.find("video");
let videoLength = [];
let slideCount = $slides.length;
let currentSlideIdx = 0;
let timer;

  // 모든 비디오가 메타데이터 로드를 완료할 때까지 기다리기 위한 Promise 배열
  let metadataPromises = [];

  $videos.each(function(){
    let $this = $(this);
    let metadataPromise = new Promise((resolve) => {
      $this.on("loadedmetadata", function (){
        const duration = this.duration; // 재생 시간(초 단위)
        videoLength.push(duration);
        resolve();
      });
    });
    metadataPromises.push(metadataPromise);
  });

  // 모든 비디오의 메타데이터가 로드된 후 videoLength 출력
  Promise.all(metadataPromises).then(() => {
    console.log(videoLength); // 모든 비디오의 재생 시간 출력
    moveSlide(0);  // 첫 번째 슬라이드로 이동
    autoSlide();   // 자동 슬라이드 시작
  });

  if (slideCount > 1) {
    $slides.each(function (idx) {
      $(this).css("left", `${idx * 100}%`);
    });
  }

  function moveSlide(num) {
    // 비디오 전환을 부드럽게 하기 위한 처리
    $video.css("left", `${-num * 100}%`);
    currentSlideIdx = num;
  
    // 현재 슬라이드 비디오 일시 정지 및 초기화
    $slides.removeClass("active").find('video').each(function() {
      this.pause();
      this.currentTime = 0;
    });
  
    // 현재 슬라이드의 progress bar 숨기기
    $slides.find('.progress-btn span').each(function() {
      $(this).css({'width':'0'});
    });
  
    // 다음 슬라이드 비디오 재생
    let $currentVideo = $slides.eq(currentSlideIdx).addClass("active").find('video').prop("muted", true).get(0);
    
    // 비디오 재생을 명확하게 시도하고 오류 처리
    $currentVideo.play().then(() => {
      console.log("비디오가 재생되었습니다.");
    }).catch(error => {
      console.error("비디오 재생 오류:", error);
      // 재생이 차단될 경우 재생 버튼을 활성화
      $('.m_control').addClass('play').removeClass('pause');
    });
  
    // 자동 슬라이드 타이머 초기화
    clearInterval(timer);
    autoSlide();
  }

  function autoSlide() {
    let time = videoLength[currentSlideIdx] * 1000;
    console.log(time);
    timer = setInterval(() => {
      let nextIdx = (currentSlideIdx + 1) % slideCount;

      // 현재 비디오가 끝나기 전에 다음 슬라이드로 이동
      let currentVideo = $slides.eq(currentSlideIdx).find('video').get(0);
      if (currentVideo.currentTime >= currentVideo.duration - 0.5){
        moveSlide(nextIdx);
      }
    }, 500); // 일정 시간마다 체크
  }

  var videos = document.querySelectorAll(".video video");
  var progressBars = document.querySelectorAll(".progress-btn span");

  // 각 비디오에 대해 progressbar 업데이트
  videos.forEach(function(video, index) {
    var progressBar = progressBars[index];

    video.addEventListener("timeupdate", function () {
      var value = (video.currentTime / video.duration) * 100;
      progressBar.style.width = value + '%'; // '%'로 수정
    });

    // video.addEventListener("ended", function () {
    // progressBar.style.width = '0';
    // });
  });

  // 각 progress-btn에 인덱스 설정
  $('.progress-btn').each(function(index) {
    $(this).data('index', index);
  });

  // progress-btn 클릭 시 슬라이드 이동 및 비디오 재생
  $('.progress-btn').click(function() {
    // progress-btn의 데이터 속성에서 인덱스 얻기
    let index = $(this).data('index');
    
    // 해당 인덱스의 슬라이드로 이동
    moveSlide(index);
    $('.m_control').removeClass('pause');
    $('.m_control').addClass('play');
    
    // 해당 슬라이드의 비디오 재생
    $slides.eq(index).find('video').get(0).play().catch(error => {
    });
  });

  $('.m_control').click(function(){
    $(this).toggleClass('play pause');
    if ($(this).hasClass('pause')){
      clearInterval(timer);
      $slides.eq(currentSlideIdx).find('video').get(0).pause();
    } else {
      $slides.eq(currentSlideIdx).find('video').get(0).play().catch(error => {
      });
      autoSlide();
    }
  });

/* SPACE - 홍은진
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */
const space = $('.space');
const spaceOST = space.offset().top - 500;
let excuted = false;

/*
윈도우에 스크롤이 생기면 할 일
  스크롤양이 300보다 크면 notepads에 active 추가
  아니라면 active 제거
*/

$(window).scroll(function(){
  if($(this).scrollTop() > spaceOST){
    if(!excuted){
      space.addClass('active');
      
      excuted = true;
    } //else{
    //   space.removeClass('active');
    // }
  }
});

/* BRANDS - 강현주
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */
 let brandButton = $('#brand .slider').slick({
  arrows:false,
  dots: false,
  infinite:false,
  speed: 300,
  slidesToShow: 1,
  centerMode: false,
  variableWidth: true
});
$('.button .prev').click(function(){
  brandButton.slick('slickPrev');
})
$('.button .next').click(function(){
  brandButton.slick('slickNext');
})


let brandSlides = $('.brand_row').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: true,
  arrows: false,
  dots: false,
  autoplay: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2
      }
    }
  ]
});
$(".slider a[href='#cosmetics']").addClass('active');
$('.slider li a').click(function(e){
  e.preventDefault();
  let target = $(this).attr('href');
  let targetIdx =  $(target).attr('data-id');
  brandSlides.slick('slickGoTo',targetIdx);

  $('.slider li a').removeClass('active');
  $(this).addClass('active');
})

$('.brand_row li').mouseenter(function() {
  $('.brand_row li').removeClass('slick-current'); // 모든 li에서 active 클래스 제거
  $(this).addClass('slick-current');    // 현재 hover한 li에 active 클래스 추가
});
$('.brand_row li').mouseleave(function() {
  $('.brand_row li').removeClass('slick-current'); // 모든 li에서 active 클래스 제거
  // $(this).addClass('slick-current');    // 현재 hover한 li에 active 클래스 추가
});






/* SNS - 배유나
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */

$('.video_slide video').each(function() {
  $(this).on('mouseover', function() {
    this.play();
  }).on('mouseout', function() {
    this.pause();
    this.currentTime = 0;
  });
});

$('.sns_slide').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: true,
  arrows: true,
  prevArrow: '<button class="slick-prev"><i class="bi bi-chevron-left"></i></button>',
  nextArrow: '<button class="slick-next"><i class="bi bi-chevron-right"></i></button>',
  dots: false,
  // autoplay: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1
      }
    }
  ]
});

$('.slick-prev').append('<i class="icon-class"></i>');