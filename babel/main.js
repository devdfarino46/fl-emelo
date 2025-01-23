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

  authFormInit: function () {
    document.querySelectorAll('.auth-form').forEach((auth) => {
      const authSection = auth.closest('.auth');
      const register = document.querySelector('.register');
      const tabBtns = auth.querySelectorAll('.auth-form__tabs .tab-btn');
      const tabs = authSection.querySelectorAll('.register-info');
      const ierNavLink = document.querySelector('.ier-nav a.--choosed');
      const registerLink = auth.querySelector('._register-link');

      registerLink.addEventListener('click', () => {
        if (authSection) authSection.classList.add('--hidden');
        if (register) register.classList.remove('--hidden');
      });

      tabBtns.forEach((tabBtn, i) => {
        tabBtn.addEventListener('click', () => {
          tabBtns.forEach((el) => {
            el.classList.remove('--choosed');
          });
          tabs.forEach((el) => {
            el.classList.remove('--choosed');
          })

          tabBtn.classList.add('--choosed');
          if (tabs[i]) tabs[i].classList.add('--choosed');
          if (ierNavLink) ierNavLink.textContent = tabBtn.querySelector('span._pc').textContent;
        });
      });
    });
  },

  init: function () {
    this.langSelectInit();
    this.menuInit();
    this.authFormInit();
  }
}
Ui.init();