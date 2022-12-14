(function ($, window, document) {
  "use strict";
  $(window).on("scroll load", function () {
    if ($(this).scrollTop() >= 30) {
      if ($(".site-header.header_trans-fixed").length) {
        $(".site-header.header_trans-fixed")
          .not(".fixed-dark")
          .addClass("pix-header-fixed");
        $(".fixed-dark").addClass("bg-fixed-dark");
        $(".sticky-logo, .header-button-scroll").show();
        $(".main-logo, .header-button-default").hide();
      }
      if ($(".right-menu.modern").length) {
        $(".right-menu.modern")
          .closest(".fixed-header")
          .addClass("fixed-header-scroll");
      }
    } else {
      if ($(".site-header.header_trans-fixed").length) {
        $(".site-header.header_trans-fixed")
          .not(".fixed-dark")
          .removeClass("pix-header-fixed");
        $(".fixed-dark").removeClass("bg-fixed-dark");
        $(".sticky-logo, .header-button-scroll").hide();
        $(".main-logo, .header-button-default").show();
      }
      if ($(".right-menu.modern").length) {
        $(".right-menu.modern")
          .closest(".fixed-header")
          .removeClass("fixed-header-scroll");
      }
    }
  });

  if ($(window).width() >= $(".menu-wrapper").data("top")) {
    $('.site-main-menu li:not(.menu-item-has-children) > a[href^="#"]').on(
      "click",
      function (e) {
        e.preventDefault();
        var elem = $(this).attr("href");
        if ($(elem).length) {
          $("html,body").animate(
            {
              scrollTop:
                $(elem).offset().top -
                $(".header_trans-fixed").outerHeight() -
                $("#wpadminbar").outerHeight(),
            },
            "slow"
          );
        }
      }
    );
  }

  $(".toggle-menu").on("click", function (e) {
    e.preventDefault();
    var mask = '<div class="mask-overlay">';
    $(mask).hide().appendTo("body").fadeIn("fast");
    $("html")
      .addClass("no-scroll sidebar-open")
      .height(window.innerHeight + "px");
    if ($("#wpadminbar").length) {
      $(".sidebar-open .site-nav").css("top", "46px");
    } else {
      $(".sidebar-open .site-nav").css("top", "0");
    }
  });

  $(".close-menu, .mask-overlay").on("click", function (e) {
    e.preventDefault();

    $("html").removeClass("no-scroll sidebar-open").height("auto");
    $(".mask-overlay").remove();
  });

  function toggleAsideMenu() {
    $(".menu-wrapper:not(.unit) .menu-item-has-children > a").on(
      "click",
      function (e) {
        e.preventDefault();
      }
    );
    var dataTop = $(".menu-wrapper").data("top");
    if (window.outerWidth >= dataTop) {
    } else {
      $(".menu-item-has-children a").removeClass("hide-drop");
    }
    if ($(".aside-fix").length && $(window).width() > dataTop) {
      var logoWidth = $(".logo span, .logo img").outerWidth();
      $(".logo").css("top", logoWidth + "px");
    }
  }

  function fixedMobileMenu() {
    var headerHeight = $(".site-header")
      .not(".header_trans-fixed")
      .outerHeight();
    var offsetTop;
    var dataTop = $(".menu-wrapper").data("top");
    var adminbarHeight = $("#wpadminbar").outerHeight();
    if ($("#wpadminbar").length) {
      offsetTop = adminbarHeight + headerHeight;
      $(".site-header").css("margin-top", adminbarHeight);
    } else {
      offsetTop = headerHeight;
    }
    if ($(window).width() < dataTop) {
      $(".menu-wrapper").css("padding-top", offsetTop + "px");
    } else {
      if (
        $("#wpadminbar").length &&
        $(".site-header").hasClass("header_trans-fixed")
      ) {
        $(".menu-wrapper").css("padding-top", adminbarHeight + "px");
      } else {
        $(".menu-wrapper").css("padding-top", "0");
      }
    }
    if ($("#wpadminbar").length && $(window).width() < 768) {
      $("#wpadminbar").css({
        position: "fixed",
        top: "0",
      });
    }
  }

  function menuArrows() {
    var mobW = $(".menu-wrapper").attr("data-top");
    if (
      window.outerWidth < mobW ||
      $(".site-header").hasClass("topmenu-arrow")
    ) {
      if (!$(".menu-item-has-children i").length) {
        $("header .menu-item-has-children").append(
          '<i class="fa fa-angle-down"></i>'
        );
        $("header .menu-item-has-children i").addClass("hide-drop");
      }
      $("header .menu-item-has-children i").on("click", function () {
        if (!$(this).hasClass("animation")) {
          $(this).parent().toggleClass("is-open");
          $(this).addClass("animation");
          $(this)
            .parent()
            .siblings()
            .removeClass("is-open")
            .find(".fa")
            .removeClass("hide-drop")
            .prev(".sub-menu")
            .slideUp(250);
          if ($(this).hasClass("hide-drop")) {
            if ($(this).closest(".sub-menu").length) {
              $(this)
                .removeClass("hide-drop")
                .prev(".sub-menu")
                .slideToggle(250);
            } else {
              $(".menu-item-has-children i")
                .addClass("hide-drop")
                .next(".sub-menu")
                .hide(250);
              $(this)
                .removeClass("hide-drop")
                .prev(".sub-menu")
                .slideToggle(250);
            }
          } else {
            $(this)
              .addClass("hide-drop")
              .prev(".sub-menu")
              .hide(100)
              .find(".menu-item-has-children a")
              .addClass("hide-drop")
              .prev(".sub-menu")
              .hide(250);
          }
        }
        setTimeout(removeClass, 250);

        function removeClass() {
          $("header .site-main-menu i").removeClass("animation");
        }
      });
    } else {
      $("header .menu-item-has-children i").remove();
    }
  }

  function calcOffsetMenu() {
    var offsetAdditionalMenu = $("#wpadminbar").length
      ? $("#wpadminbar").outerHeight()
      : 0;
    $(".additional-inner-wrap").css("top", offsetAdditionalMenu + "px");
  }
  $(".additional-nav").on("click", function (e) {
    e.preventDefault();
    $(".additional-menu-wrapper").addClass("menu-open");
    $(".menu-wrapper").addClass("additional-menu-open");
  });
  $(".additional-nav-close, .additional-menu-overlay").on("click", function () {
    $(".additional-menu-wrapper").removeClass("menu-open");
    $(".menu-wrapper").removeClass("additional-menu-open");
  });
  $(window).on("load", function () {
    toggleAsideMenu();
  });
  $(window).on("scroll", function () {});
  $(window).on("load resize", function () {
    fixedMobileMenu();
    menuArrows();
    calcOffsetMenu();
  });
  window.addEventListener("orientationchange", function () {
    calcOffsetMenu();
    fixedMobileMenu();
    menuArrows();
  });
})(jQuery, window, document);
