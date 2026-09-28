/* Переключатель ролей CTO / CDTO / CPO: смена акцентного блока и подсветка
   релевантных мест карьеры — без перезагрузки. Внешних зависимостей нет. */
(function () {
  "use strict";

  var buttons = Array.prototype.slice.call(
    document.querySelectorAll(".role-switch button[data-role]")
  );
  var cards = Array.prototype.slice.call(
    document.querySelectorAll(".about-card[data-about]")
  );
  // Подсвечиваемые узлы: карточки карьеры и подпункты с data-roles="cto cdto cpo"
  var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-roles]"));

  if (!buttons.length || !cards.length) return;

  function setRole(role) {
    buttons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.dataset.role === role ? "true" : "false");
    });
    cards.forEach(function (card) {
      if (card.dataset.about === role) {
        card.removeAttribute("hidden");
      } else {
        card.setAttribute("hidden", "");
      }
    });
    nodes.forEach(function (node) {
      var roles = (node.getAttribute("data-roles") || "").split(/\s+/);
      var hot = roles.indexOf(role) !== -1;
      node.classList.toggle("is-hot", hot);
      node.classList.toggle("is-dim", !hot);
    });
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setRole(btn.dataset.role);
    });
  });

  // Стартовое состояние: CTO — основная роль.
  setRole("cto");

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
