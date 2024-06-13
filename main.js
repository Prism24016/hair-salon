$(function () {
  /*=================================================
  ハンバーガーメニュー
  ===================================================*/
  $(".hamburger-btn").on("click", function () {
    // headerにopenクラスがあるか判定する
    if ($("header").hasClass("open")) {
      // headerにopenクラスが存在しない場合、openクラスを削除する
      $("header").removeClass("open");
    } else {
      // headerにopenクラスが存在する場合、openクラスを加える
      $("header").addClass("open");
    }
  });

  // メニューが表示されている時に画面をクリックした場合
  $("#mask").on("click", function () {
    $("header").removeClass("open");
  });

  // リンクをクリックした時にメニューを閉じる
  $('.hamburger-menu a').on('click', function () {
    // ここでheaderからopenクラスを削除します
    $('header').removeClass('open');
  });

  /*=================================================
  トップに戻る
  ===================================================*/
  //スクロールした際の動きを関数でまとめる
  function PageTopCheck() {
    var winScrollTop = $(this).scrollTop();
    var secondTop = $("#concept").offset().top - 100; //#conceptの上から100pxの位置まで来たら
    if (winScrollTop >= secondTop) {
      $('.js-scroll').removeClass('scroll-view');//.js-scrollからscroll-viewというクラス名を除去
      $('.js-pagetop').addClass('scroll-view');//.js-pagetopにscroll-viewというクラス名を付与
    } else {//元に戻ったら
      $('.js-scroll').addClass('scroll-view');//.js-scrollからscroll-viewというクラス名を付与
      $('.js-pagetop').removeClass('scroll-view');//.js-pagetopからscroll-viewというクラス名を除去
    }
  }

  //クリックした際の動き
  $('.scroll-top a').click(function () {
    var elmHash = $(this).attr('href'); //hrefの内容を取得
    if (elmHash == "#concept") {//もし、リンク先のhref の後が#conceptの場合
      var pos = $(elmHash).offset().top;
      $('body,html').animate({ scrollTop: pos }, pos); //#conceptにスクロール
    } else {
      $('body,html').animate({ scrollTop: 0 }, 500); //それ以外はトップへスクロール。数字が大きくなるほどゆっくりスクロール
    }
    return false;//リンク自体の無効化
  });

  // 画面をスクロールをしたら動かしたい場合の記述
  $(window).scroll(function () {
    PageTopCheck();/* スクロールした際の動きの関数を呼ぶ*/
  });

  // ページが読み込まれたらすぐに動かしたい場合の記述
  $(window).on('load', function () {
    PageTopCheck();/* スクロールした際の動きの関数を呼ぶ*/
  });

  /*=================================================
    main-img スライダー
===================================================*/
  $(document).ready(function () {
    $('.main-slick').slick({
      infinite: true,
      dots: true,
      fade: true,
      autoplay: true,
      autoplaySpeed: 1000,
    });
  });
  /*=================================================
    タイトル
  ===================================================*/
// glowAnimeにglowというクラス名を付ける定義
function GlowAnimeControl() {
  $('.glowAnime').each(function () {
    var elemPos = $(this).offset().top - 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("glow");
    } else {
      $(this).removeClass("glow");
    }
  });

  $('.glowAnime').on('animationend', function () {
    // 一つ目のアニメーションが終わったら、二つ目のアニメーションを開始
    $('.glowAnime2').addClass("glow2");
  });
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  GlowAnimeControl();/* アニメーション用の関数を呼ぶ*/
});

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
  //spanタグを追加する
  var elements = $(".glowAnime, .glowAnime2");
  elements.each(function () {
    var text = $(this).text();
    var textbox = "";
    text.split('').forEach(function (t, i) {
      if (t !== " ") {
        if (i < 10) {
          textbox += '<span style="animation-delay: .' + i + 's;">' + t + '</span>';
        } else {
          var n = i / 10;
          textbox += '<span style="animation-delay: ' + n + 's;">' + t + '</span>';
        }
      } else {
        textbox += t;
      }
    });
    $(this).html(textbox);
  });
  GlowAnimeControl();/* アニメーション用の関数を呼ぶ*/
});

  /*=================================================
    Hair catalog スライダー
  ===================================================*/
  $(".gallery-img").slick({
    arrows: false,
    centerMode: true,
    centerPadding: "25%",
    slidesToShow: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          centerPadding: "25%",
          slidesToShow: 1,
        },
      },
    ],
  });

  /*=================================================
    heading文字表示
  ===================================================*/
  // TextTypingというクラス名がついている子要素（span）を表示から非表示にする定義
  function TextTypingAnime() {
    $('.TextTyping').each(function () {
      var elemPos = $(this).offset().top - 50;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      var thisChild = "";
      if (scroll >= elemPos - windowHeight) {
        thisChild = $(this).children(); //spanタグを取得
        //spanタグの要素の１つ１つ処理を追加
        thisChild.each(function (i) {
          var time = 100;
          //時差で表示する為にdelayを指定しその時間後にfadeInで表示させる
          $(this).delay(time * i).fadeIn(time);
        });
      } else {
        thisChild = $(this).children();
        thisChild.each(function () {
          $(this).stop(); //delay処理を止める
          $(this).css("display", "none"); //spanタグ非表示
        });
      }
    });
  }
  // 画面をスクロールをしたら動かしたい場合の記述
  $(window).scroll(function () {
    TextTypingAnime();/* アニメーション用の関数を呼ぶ*/
  });// ここまで画面をスクロールをしたら動かしたい場合の記述

  // 画面が読み込まれたらすぐに動かしたい場合の記述
  $(window).on('load', function () {
    //spanタグを追加する
    var element = $(".TextTyping");
    element.each(function () {
      var text = $(this).html();
      var textbox = "";
      text.split('').forEach(function (t) {
        if (t !== " ") {
          textbox += '<span>' + t + '</span>';
        } else {
          textbox += t;
        }
      });
      $(this).html(textbox);
    });

    TextTypingAnime();/* アニメーション用の関数を呼ぶ*/
  });// ここまで画面が読み込まれたらすぐに動かしたい場合の記述
  /*=================================================
    Concept表示
  ===================================================*/
 // 動きのきっかけとなるアニメーションの名前を定義
function lineAnime() {
  //動くきっかけのクラス名と動きのクラス名の設定
  $('.line, .button, .line .lineinappear').each(function () {
    var elemPos = $(this).offset().top + $(this).outerHeight(); //要素の下端の位置
    var scrollBottom = $(window).scrollTop() + $(window).height();
    if (scrollBottom >= elemPos) {
      $(this).addClass('bgextend');
      $(this).addClass('bgappear');
      $(this).addClass('bgLRextend');
      // 画面内に入ったらlineAnimeというクラス名を追記
    } else {
      $(this).removeClass('bgextend');
      $(this).removeClass('bgappear');
      $(this).removeClass('bgLRextend');
      // 画面外に出たらlineAnimeというクラス名を外す
    }
  });
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  lineAnime();/* アニメーション用の関数を呼ぶ*/
});

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
  lineAnime();/* アニメーション用の関数を呼ぶ*/
});
    /*=================================================
    ボタン表示
  ===================================================*/
 // 動きのきっかけとなるアニメーションの名前を定義
function lineAnime() {
  //動くきっかけのクラス名と動きのクラス名の設定
  $('.line, .button, .line .lineinappear').each(function () {
    var elemPos = $(this).offset().top - 50; //要素より、50px上の
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass('lineAnime');
      $(this).addClass('lineAnime2');
      $(this).addClass('lineinappear');
      // 画面内に入ったらlineAnimeというクラス名を追記
    } else {
      $(this).removeClass('lineAnime');
      $(this).removeClass('lineAnime2');
      $(this).removeClass('lineinappear');
      // 画面外に出たらlineAnimeというクラス名を外す
    }
  });
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  lineAnime();/* アニメーション用の関数を呼ぶ*/
});

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
  lineAnime();/* アニメーション用の関数を呼ぶ*/
});
});
