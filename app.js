/* Лендинг-визитка: год в подвале, кнопка «наверх». Внешних зависимостей нет. */
(function () {
  "use strict";

  /* Текущий год в подвале */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* Кнопка «наверх»: показ после прокрутки */
  var toTop = document.querySelector(".to-top");
  if (toTop) {
    var onScroll = function () {
      if (window.scrollY > 600) {
        toTop.removeAttribute("hidden");
      } else {
        toTop.setAttribute("hidden", "");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
