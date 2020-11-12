/*
Template Name: Skote - Responsive Bootstrap 4 Admin Dashboard
Author: Themesbrand
Version: 1.1.0
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Main Js File
*/

(function ($) {
  "use strict";

  // Success Function
  const successMsg = (msg) => {
    $(".notificationSuccess")
      .html( `
          <div class="cancelNotificationSuccess text-white" id="cancelNotificationSuccess">x</div>
          <audio autoplay class="d-none">
          <source src="
          /assets/sounds/notification.mp3" type="audio/mpeg">
          </audio>
          <h4 class="text-white">إشعار</h4>
          <p class="mb-0 text-white" style="font-size: 14px">${msg}</p>
        `
      )
      .show(100)
      .delay(5000)
      .hide(100);
  }


  // Error Function
  const errorMsg = (msg) => {
    $(".notificationError")
      .html(`
        <div class="cancelNotificationError text-white" id="cancelNotificationError">x</div>
        <audio autoplay class="d-none">
        <source src="
        /assets/sounds/notification.mp3" type="audio/mpeg">
        </audio>
        <h4 class="text-white">إشعار</h4>
        <p class="mb-0 text-white" style="font-size: 14px; color: white">${msg}</p>
      `
      )
      .show(100)
      .delay(5000)
      .hide(100);
  }

    $("body").on("click", ".cancelNotificationSuccess", () => {
      $(".notificationSuccess").hide();
  })

  $("body").on("click", ".cancelNotificationError", () => {
      $(".notificationError").hide();
  })

  /********************************** Request Page Ejs *******************************/

  // This Code is for Agreement
  const agreement = $("#agreement");
  agreement.click((e) => {
    e.preventDefault();
    const residentID = $('#residentID').val();
    fetch('/dashboard/agreement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ residentID: residentID }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.statusCode === 200) {
          successMsg(data.success);
          setTimeout(() => {
            window.location.reload();
          }, 6000);
        } else {
          if (data.statusCode === 500) {
            errorMsg(data.error);
            setTimeout(() => {
              window.location.reload();
            }, 6000);
          } else {
            errorMsg(data.error);
          }
        }
      })
      .catch((err) => {
        console.error(err.message);
        errorMsg(err.message);
      });
  });

  // This Code is for Disagreement
  const disagreement = $("#disagreement");
  disagreement.click((e) => {
    e.preventDefault();
    const residentID = $('#residentID').val();
    fetch('/dashboard/disagreement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ residentID: residentID }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.statusCode === 200) {
          successMsg(data.success);
          setTimeout(() => {
            window.location.assign('/dashboard/residents');
          }, 6000);
        } else {
          if (data.statusCode === 500) {
            errorMsg(data.error);
            setTimeout(() => {
              window.location.reload();
            }, 6000);
          } else {
            errorMsg(data.error);
          }
        }
      })
      .catch((err) => {
        console.error(err.message);
        errorMsg(err.message);
      });
  });

  /********************************** Request Page Ejs *******************************/

  function initMetisMenu() {
    //metis menu
    $("#side-menu").metisMenu();
  }

  function initLeftMenuCollapse() {
    $("#vertical-menu-btn").on("click", function (event) {
      event.preventDefault();
      $("body").toggleClass("sidebar-enable");
      if ($(window).width() >= 992) {
        $("body").toggleClass("vertical-collpsed");
      } else {
        $("body").removeClass("vertical-collpsed");
      }
    });
  }

  function initActiveMenu() {
    // === following js will activate the menu in left side bar based on url ====
    $("#sidebar-menu a").each(function () {
      var pageUrl = window.location.href.split(/[?#]/)[0];
      if (this.href == pageUrl) {
        $(this).addClass("active");
        $(this).parent().addClass("mm-active"); // add active to li of the current link
        $(this).parent().parent().addClass("mm-show");
        $(this).parent().parent().prev().addClass("mm-active"); // add active class to an anchor
        $(this).parent().parent().parent().addClass("mm-active");
        $(this).parent().parent().parent().parent().addClass("mm-show"); // add active to li of the current link
        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .addClass("mm-active");
      }
    });
  }

  function initMenuItem() {
    $(".navbar-nav a").each(function () {
      var pageUrl = window.location.href.split(/[?#]/)[0];
      if (this.href == pageUrl) {
        $(this).addClass("active");
        $(this).parent().addClass("active");
        $(this).parent().parent().addClass("active");
        $(this).parent().parent().parent().addClass("active");
        $(this).parent().parent().parent().parent().addClass("active");
        $(this).parent().parent().parent().parent().parent().addClass("active");
      }
    });
  }

  function initFullScreen() {
    $('[data-toggle="fullscreen"]').on("click", function (e) {
      e.preventDefault();
      $("body").toggleClass("fullscreen-enable");
      if (
        !document.fullscreenElement &&
        /* alternative standard method */ !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    });
    document.addEventListener("fullscreenchange", exitHandler);
    document.addEventListener("webkitfullscreenchange", exitHandler);
    document.addEventListener("mozfullscreenchange", exitHandler);
    function exitHandler() {
      if (
        !document.webkitIsFullScreen &&
        !document.mozFullScreen &&
        !document.msFullscreenElement
      ) {
        console.log("pressed");
        $("body").removeClass("fullscreen-enable");
      }
    }
  }

  function initRightSidebar() {
    // right side-bar toggle
    $(".right-bar-toggle").on("click", function (e) {
      $("body").toggleClass("right-bar-enabled");
    });

    $(document).on("click", "body", function (e) {
      if ($(e.target).closest(".right-bar-toggle, .right-bar").length > 0) {
        return;
      }

      $("body").removeClass("right-bar-enabled");
      return;
    });
  }

  function initDropdownMenu() {
    $(".dropdown-menu a.dropdown-toggle").on("click", function (e) {
      if (!$(this).next().hasClass("show")) {
        $(this)
          .parents(".dropdown-menu")
          .first()
          .find(".show")
          .removeClass("show");
      }
      var $subMenu = $(this).next(".dropdown-menu");
      $subMenu.toggleClass("show");

      return false;
    });
  }

  function initComponents() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });

    $(function () {
      $('[data-toggle="popover"]').popover();
    });
  }

  function initPreloader() {
    $(window).on("load", function () {
      $("#status").fadeOut();
      $("#preloader").delay(350).fadeOut("slow");
    });
  }

  function initSettings() {
    if (window.sessionStorage) {
      var alreadyVisited = sessionStorage.getItem("is_visited");
      if (!alreadyVisited) {
        sessionStorage.setItem("is_visited", "light-mode-switch");
      } else {
        $(".right-bar input:checkbox").prop("checked", false);
        $("#" + alreadyVisited).prop("checked", true);
        updateThemeSetting(alreadyVisited);
      }
    }
    $("#light-mode-switch, #dark-mode-switch, #rtl-mode-switch").on(
      "change",
      function (e) {
        updateThemeSetting(e.target.id);
      }
    );
  }

  function updateThemeSetting(id) {
    if (
      $("#light-mode-switch").prop("checked") == true &&
      id === "light-mode-switch"
    ) {
      $("#dark-mode-switch").prop("checked", false);
      $("#rtl-mode-switch").prop("checked", false);
      $("#bootstrap-style").attr("href", "/assets/css/bootstrap.min.css");
      $("#app-style").attr("href", "/assets/css/app-rtl.min.css");
      sessionStorage.setItem("is_visited", "light-mode-switch");
    } else if (
      $("#dark-mode-switch").prop("checked") == true &&
      id === "dark-mode-switch"
    ) {
      $("#light-mode-switch").prop("checked", false);
      $("#rtl-mode-switch").prop("checked", false);
      $("#bootstrap-style").attr("href", "/assets/css/bootstrap-dark.min.css");
      $("#app-style").attr("href", "/assets/css/app-dark.min.css");
      sessionStorage.setItem("is_visited", "dark-mode-switch");
    } else if (
      $("#rtl-mode-switch").prop("checked") == true &&
      id === "rtl-mode-switch"
    ) {
      $("#light-mode-switch").prop("checked", false);
      $("#dark-mode-switch").prop("checked", false);
      $("#bootstrap-style").attr("href", "/assets/css/bootstrap.min.css");
      $("#app-style").attr("href", "/assets/css/app-rtl.min.css");
      sessionStorage.setItem("is_visited", "rtl-mode-switch");
    }
  }

  function SocketRealTime() {
    // Connection to Socket
    const socket = io("http://socket.wezara.me");

    // If socket is disconnected
    socket.on("disconnect", () => {
      console.log("Disconnected from Socket");
    });

    // If socket is reconnected
    socket.on("reconnect", function () {
      setTimeout(() => {
        console.log("Reconnection to Socket");
      }, 4000);
    });

    // If socket is reconnect_failed
    socket.on("reconnect_failed", function () {
      console.log("Reconnection has been failed");
      window.location.reload();
    });

    // Admin Join
    socket.emit("adminJoin", {
      roomID: "1fe35579-5ce7-46ec-89e0-7e7236700297",
    });

    // Recieve User Notification
    socket.on("newUser", (data) => {
      successMsg(`قام ${ data.fullname } بعمل حساب جديد إلى الموقع`);
    });

    // Recieve Resident Notification
    socket.on("resident", (data) => {
      successMsg(`قام ${ data.user.fullname } بعل طلب زيارة عائلية للمقيمين قم <a href="/dashboard/resident/${ data.residentID }" target="_blank">زيارة الطلب</a>`);
    });

    // Recieve Code Notification
    socket.on("code", (data) => {
      if(data.codeStatus === true) {
        successMsg(`قام ${ data.user.fullname } بإرسال الرمز الكودي قم <a href="/dashboard/resident/${ data.residentID }" target="_blank">برؤية الكود</a>`);
      } else {
        successMsg(`قام ${ data.user.fullname } بطلب إعادة إرسال الرمز الكودي قم <a href="/dashboard/resident/${ data.residentID }" target="_blank">بإعادة إرسال الكود الرمزي</a>`);
      }
    });

    // Handle Error from Server
    socket.on("error", (data) => {
      console.log(data.errMessage);
    });
  }

  function init() {
    initMetisMenu();
    initLeftMenuCollapse();
    initActiveMenu();
    initMenuItem();
    initFullScreen();
    initRightSidebar();
    initDropdownMenu();
    initComponents();
    initSettings();
    initPreloader();
    Waves.init();
    SocketRealTime();
  }

  init();
})(jQuery);
