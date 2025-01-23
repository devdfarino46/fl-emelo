const Ui = {
  langSelectInit: function () {
    document.querySelectorAll('.lang-select').forEach((langSelect) => {
      const label = langSelect.querySelector('.lang-select__label');
      const selects = langSelect.querySelectorAll('.lang-select__select');

      label.addEventListener('click', () => {
        langSelect.classList.add('--active');
      });
      
      selects.forEach((select) => {
        select.addEventListener('click', () => {
          langSelect.classList.remove('--active');
        });
      });

      langSelect.addEventListener('mouseover', (e) => {
        langSelect.classList.add('--active');
      });

      langSelect.addEventListener('mouseout', (e) => {
        langSelect.classList.remove('--active');
      });

      window.addEventListener('scroll', (e) => {
        langSelect.classList.remove('--active');
      });
    });
  },

  menuInit: function () {
    const openMenuBtn = document.querySelector('.header .menu-btn');

    document.querySelectorAll('.menu').forEach((menu) => {
      const closeMenuBtn = document.querySelector('.menu .menu-btn');

      openMenuBtn.addEventListener('click', () => {
        menu.classList.add('--active');
      });

      closeMenuBtn.addEventListener('click', () => {
        menu.classList.remove('--active');
      });

      document.addEventListener('click', (e) => {
        if (!e.composedPath().includes(menu) && !e.composedPath().includes(openMenuBtn)) {
          menu.classList.remove('--active');
        }
      });
    });
  },

  init: function () {
    this.langSelectInit();
    this.menuInit();
  }
}
Ui.init();