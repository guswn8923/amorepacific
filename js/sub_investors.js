

function initializePagination(tbodySelector, paginationSelector) {
    var rowsPerPage = 10;
    var rows = $(tbodySelector).find('tr');
    var rowsCount = rows.length;
    var pageCount = Math.ceil(rowsCount / rowsPerPage);

    const numbers = $(paginationSelector).find('.numbers'); // ID에서 class로 변경
    const prevBtn = $(paginationSelector).find('.prev-btn');
    const nextBtn = $(paginationSelector).find('.next-btn');
    const maxPageNum = 3;
    let pageActiveIdx = 0;

    let numberHTML = '';
    for (let i = 1; i <= pageCount; i++) {
        numberHTML += `<li><a href="#">${i}</a></li>`;
    }
    numbers.html(numberHTML);

    const numberBtn = numbers.find('a');
    const pageGroupCount = Math.ceil(pageCount / maxPageNum);

    function displayRow(num) {
        rows.hide();
        let start = rowsPerPage * num;
        let end = start + rowsPerPage;
        rows.slice(start, end).show();
    }

    displayRow(0);

    numberBtn.each(function (idx) {
        $(this).on('click', function (e) {
            e.preventDefault();
            displayRow(idx);
            numberBtn.removeClass('active');
            $(this).addClass('active');
        });
    });

    function displayPagination(num) {
        numberBtn.hide();
        let start = maxPageNum * num;
        let end = start + maxPageNum;

        numberBtn.slice(start, end).show();
        numberBtn.removeClass('active');
        numberBtn.eq(start).addClass('active');
        displayRow(start);

        pageActiveIdx = num;

        prevBtn.prop('disabled', pageActiveIdx === 0);
        nextBtn.prop('disabled', pageActiveIdx === pageGroupCount - 1);
    }

    displayPagination(0);

    nextBtn.on('click', function () {
        if (pageActiveIdx < pageGroupCount - 1) {
            displayPagination(pageActiveIdx + 1);
        }
    });

    prevBtn.on('click', function () {
        if (pageActiveIdx > 0) {
            displayPagination(pageActiveIdx - 1);
        }
    });
}


  // Bootstrap 탭 전환 이벤트 감지
  $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
      var target = $(e.target).attr("data-bs-target"); // 활성화된 탭의 ID
      if (target === '#result') {
          initializePagination('#result tbody', '#result .pagination');
      } else if (target === '#business') {
          initializePagination('#business tbody', '#business .pagination');
      } else if (target === '#sales') {
          initializePagination('#sales tbody', '#sales .pagination');
      } else if (target === '#report') {
          initializePagination('#report tbody', '#report .pagination');
      }
  });

  // 페이지 로드 시 첫 번째 탭에 대해 초기화
  initializePagination('#result tbody', '#result .pagination');

  var mixer = mixitup('.product_list');

  document.querySelectorAll('.dropdown-item').forEach(function(button) {
      button.addEventListener('click', function() {
          var filterValue = button.getAttribute('data-filter') || 'all';
          mixer.filter(filterValue);
      });
  });


