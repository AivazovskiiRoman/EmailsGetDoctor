var emailArr = [
  "dist/gd_template_margarita.html",
  "dist/gd_template_org_letter.html", 
  "dist/getdoctor_hm_letter.html"
];
for (let i = 0; i < emailArr.length; i++) {
  $(".email-" + i).click(function () {
    $("#email-page").attr("include-html", emailArr[i]);
    includeHTML();
  });
}

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
};

var fullPageModal = (function ($) {
  var fpm = {};

  fpm.config = {
    $target: $(".js__target"),
    $pages: $("a.page"),
    $close: $(".js__target .js__close")
  };
  fpm.init = function () {
    fpm.ui();
  };
  fpm.ui = function () {
    fpm.config.$pages.on("click", this, function (e) {
      e.preventDefault();
      fpm.loadPage($(this).attr("href"), $(this));

    });
    fpm.config.$close.on("click", this, function (e) {
      e.preventDefault();
      fpm.closePage();
    });
  };
  fpm.loadPage = function (pageToLoad, page) {
    var $content = fpm.config.$target.find(".content");
    $.ajax({
      async: false,
      url: pageToLoad,
      dataType: 'html',
      success: function (res) {
        $content.html($(res).find("#content"));
      }
    });
    fpm.openPage(page);
  };
  fpm.openPage = function (page) {
    var offset = $(page).offset();
    fpm.config.$target
      .css({
        "left": offset.left,
        "top": offset.top,
        "width": $(page).outerWidth(),
        "height": $(page).outerHeight()
      })
      .addClass("open");
    setTimeout(
      function () {
        fpm.config.$target.addClass("expand").addClass("move");
      }, 500 //this should not be less than the ms value in .js__target.move
    );

  };
  fpm.closePage = function () {
    fpm.config.$target.removeClass("expand");
    setTimeout(
      function () {
        fpm.config.$target.removeClass("open");
      }, 500 //this should not be less than the ms value in .js__target.move
    );
  };
  return fpm;
})(jQuery);

$(function () {
  fullPageModal.init();
});