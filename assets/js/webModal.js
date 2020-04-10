$(document).ready(function() {
    /* === 열기 버튼 클릭시
    1) 스크린리더에서는 열려진 모달 말고는 접근하지 못하도록 제어(보조기술이 미구현 되어서 추가해 줌)
        aria-hidden="true" inert(비활성, 불활성)
    2) #dim 동적 생성
    3) resize 이벤트로 열려질 모달의 위치 제어
    4) #dim, 모달 컨텐츠를 보여지게 처리, 첫번째 링크에 포커스 강제 이동

    5) 접근성을 위해 추가 : 닫기 버튼을 누르기 전까지 포커스는 모달 내부에 존재해야 함
    첫번째 링크에서 shift+tab을 누르면 가장 마지막으로 포커스 강제이동
    마지막 링크에서 shift(X)+tab을 누르면 가장 처음으로 포커스 강제이동 */
    $('.open_btn').on('click', function () {
        var $openBtn = $(this);   //모달 닫기를 클릭시 열어준 버튼에 포커스 강제 이동
        var $mdSub = $( $(this).data('href') ); //$()로 감싸서 선택자로 변경
        var $closeBtn = $mdSub.find('.close_btn'); //열려진 모달 내부의 닫기버튼
        var $first = $mdSub.find('[data-link="first"]'); //열려진 모달 내부의 첫번째 포커스가 갈 대상
        var $last = $mdSub.find('[data-link="last"]'); //열려진 모달 내부의 마지막 포커스가 갈 대상
        console.log($mdSub, typeof $mdSub);
        var timer = 0; //누적되는 resize 이벤트를 제어 => 성능 향상

        //1) 스크린리더에서는 열려진 모달 말고는 접근하지 못하도록 제어
        $mdSub.siblings().attr({'aria-hidden': true, inert: ''});

        //2) #dim 동적 생성
        $mdSub.before('<div id="dim"></div>');
        var $dim = $('#dim');

        //3) resize 이벤트로 열려질 모달의 위치 제어
        $(window).on('resize', function () {
            clearTimeout(timer);

            timer = setTimeout(function () {
                //문서가운데 위치(가로) : (윈도창의 너비-열려질모달의가로) / 2
                var xpos = ($(this).width() - $mdSub.outerWidth()) / 2;
                var ypos = ($(this).height() - $mdSub.outerHeight()) / 2;
                console.log(xpos, ypos);
                $mdSub.css({left: xpos, top: ypos});
            }, 50);
        });
        $(window).trigger('resize');

        //4) #dim, 모달 컨텐츠를 보여지게 처리, 첫번째 링크에 포커스 강제 이동
        $dim.stop().fadeIn().next().css('visibility', 'visible');
        $first.focus();

        //5-1) 접근성 추가 : 첫번째 링크에서 shift+tab을 누르면 가장 마지막으로 포커스 강제이동
        $first.on('keydown', function (e) {
            console.log( e.keyCode ); //tab => 9
            if (e.shiftKey && e.keyCode == 9) {
                e.preventDefault();
                $last.focus();
            }
        });

        //5-2) 접근성 추가 : 마지막 링크에서 shift(X)+tab을 누르면 가장 처음으로 포커스 강제이동
        $last.on('keydown', function (e) {
            console.log( e.keyCode ); //tab => 9
            if ( !e.shiftKey && e.keyCode == 9 ) {
                e.preventDefault();
                $first.focus();
            }
        });

        //닫기 버튼 클릭시
        $closeBtn.on('click', function () {
            //1) $dim 투명도 0으로 사라지기(완료함수로 remove()로 제거), 
            $dim.stop().fadeOut('fast', function () {
                $(this).remove();
            });

            //2) 모달컨텐츠 숨기기(visibility)
            //모달상세컨텐츠의 나머지 형제들을 스크린리더에서 접근할수 있도록 되돌리기(제거 - aria-hidden, inert)
            $mdSub.css('visibility', 'hidden').siblings().removeAttr('aria-hidden inert');

            //3) 열기 버튼으로 포커스 강제 이동
            $openBtn.focus();
        });

        //#dim을 클릭해도 모달 닫기기
        $dim.on('click', function () {
            $closeBtn.click();
        });

        //esc 키보드를 클릭하면 모달 닫기기
        $(window).on('keydown', function (e) {
            console.log(e.keyCode);  //27
            if (e.keyCode == 27) $closeBtn.click();
        });
    });
});

