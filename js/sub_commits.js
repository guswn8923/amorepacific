

AOS.init();

//----------------------------------------------------------------------- 
//commits_achivement 스크롤 넘버 카운팅 이벤트
//----------------------------------------------------------------------- 


const numbersWrap = $('.commits_achivement');
let numbersOST = numbersWrap.offset().top - 500;
let animated = false;



$(window).on('scroll', function() {
  if ($(window).scrollTop() > numbersOST) {
    if (!animated) {
      let numbers = $('.commits_achivement .number');
      numbers.each(function() {
        let $item = $(this);
        let oneLimit = Number($item.data('num'));
        let count = 0;
        let autoNumber = setInterval(function() {
          count += 10;
          if (count >= oneLimit) {
            $item.text(oneLimit.toLocaleString());
            clearInterval(autoNumber);
          } else {
            $item.text(count.toLocaleString());
          }
        }, 60);
      });
      animated = true;
    }
  }
});
