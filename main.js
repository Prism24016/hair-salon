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

  function slideAnime() {
    //====左に動くアニメーションここから===
    $('.leftAnime').each(function () {
      var elemPos = $(this).offset().top - 50;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll >= elemPos - windowHeight) {
        //左から右へ表示するクラスを付与
        //テキスト要素を挟む親要素（左側）とテキスト要素を元位置でアニメーションをおこなう
        $(this).addClass("slideAnimeLeftRight"); //要素を左枠外にへ移動しCSSアニメーションで左から元の位置に移動
        $(this).children(".leftAnimeInner").addClass("slideAnimeRightLeft");  //子要素は親要素のアニメーションに影響されないように逆の指定をし元の位置をキープするアニメーションをおこなう
      } else {
        //左から右へ表示するクラスを取り除く
        $(this).removeClass("slideAnimeLeftRight");
        $(this).children(".leftAnimeInner").removeClass("slideAnimeRightLeft");

      }
    });

  }

  // 画面をスクロールをしたら動かしたい場合の記述
  $(window).scroll(function () {
    slideAnime();/* アニメーション用の関数を呼ぶ*/
  });// ここまで画面をスクロールをしたら動かしたい場合の記述

  // 画面が読み込まれたらすぐに動かしたい場合の記述
  $(window).on('load', function () {
    slideAnime();/* アニメーション用の関数を呼ぶ*/
  });// ここまで画面が読み込まれたらすぐに動かしたい場合の記述

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
    ボタン表示
  ===================================================*/

});
