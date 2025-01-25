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

  avaUploadInit: function () {
    document.querySelectorAll('.ava-upload').forEach((avaUpload) => {
      const input = avaUpload.querySelector('input[type="file"]');
      const imgBtn = avaUpload.querySelector('.ava-upload__img-btn');
      const cameraBtn = avaUpload.querySelector('.ava-upload__camera-btn');
      const img = avaUpload.querySelector('.ava-upload__image img');

      imgBtn.addEventListener('click', (ev) => {
        input.removeAttribute('capture');
        input.click();
      });

      cameraBtn.addEventListener('click', (ev) => {
        input.setAttribute('capture', 'camera');
        input.click();
      })

      input.addEventListener('change', (ev) => {
        /**
         * @type {File}
         */
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            img.src = ev.target.result;
            avaUpload.classList.add('--uploaded');
          }
          reader.readAsDataURL(file);
        }
      });
    });
  },

  dateSelectInit: function () {
    document.querySelectorAll('.date-select').forEach((dateSelect) => {
      const tabBtns = dateSelect.querySelectorAll('.tab-btn');
      const lists = dateSelect.querySelectorAll('.date-select__list');
      const input = dateSelect.querySelector('.form-input');
      const acceptBtn = dateSelect.querySelector('.date-select__accept-btn');
      const items = dateSelect.querySelectorAll('.date-select__item');

      let day = '31';
      let month = '01';
      let year = '1999';

      tabBtns.forEach((tabBtn, i) => {
        tabBtn.addEventListener('click', ev => {
          tabBtns.forEach((btn) => {
            btn.classList.remove('--choosed');
          });
          lists.forEach((list) => {
            list.classList.remove('--choosed');
          });

          tabBtn.classList.add('--choosed');
          lists[i].classList.add('--choosed');
        });
      });

      input.addEventListener('click', ev => {
        dateSelect.classList.toggle('--opened');
      });

      acceptBtn.addEventListener('click', ev => {
        dateSelect.classList.remove('--opened');
        input.querySelector('input').value = `${day}.${month}.${year}`;
      });

      document.addEventListener('click', ev => {
        if (!ev.composedPath().includes(dateSelect)) {
          dateSelect.classList.remove('--opened');
        }
      });

      items.forEach(item => {
        item.addEventListener('click', ev => {
          if (item.dataset.category === 'day') {
            day = item.dataset.value;
          } else if (item.dataset.category === 'month') {
            month = item.dataset.value;
          } else if (item.dataset.category === 'year') {
            year = item.dataset.value;
          }
          input.querySelector('input').value = `${day}.${month}.${year}`;
        });
      });
    });
  },

  phoneSelectInit: function () {
    document.querySelectorAll('.phone-select').forEach(select => {
      const button = select.querySelector('.phone-select .form-input button');
      const buttonText = button.querySelector('span');
      const buttonInput = button.querySelector('input');

      const inputElem = select.querySelector('.phone-select .form-input input');
      const items = select.querySelectorAll('.phone-select__item');
      const dropdown = select.querySelector('.phone-select__dropdown');

      button.addEventListener('click', () => {
        select.classList.toggle('--opened');
      });

      inputElem.addEventListener('click', () => {
        select.classList.remove('--opened');
      });

      document.addEventListener('click', ev => {
        if (!ev.composedPath().includes(button) && !ev.composedPath().includes(dropdown)) {
          select.classList.remove('--opened');
        }
      });

      items.forEach(item => {
        item.addEventListener('click', () => {
          buttonText.textContent = item.textContent;
          buttonInput.value = item.textContent;
          select.classList.remove('--opened');
        });
      });
    });
  },

  countrySelectInit: function () {
    document.querySelectorAll('.country-select').forEach(select => {
      const input = select.querySelector('.country-select .form-input');
      const items = select.querySelectorAll('.country-select__item');

      input.addEventListener('click', () => {
        select.classList.toggle('--opened');
      });

      document.addEventListener('click', ev => {
        if (!ev.composedPath().includes(select)) {
          select.classList.remove('--opened');
        }
      });

      items.forEach(item => {
        item.addEventListener('click', ev => {
          input.querySelector('input').value = item.querySelector('span').textContent;
          select.classList.remove('--opened');
        });
      })
    })
  },

  reviewsInit: function () {
    document.querySelectorAll('.reviews').forEach(reviews => {
      const slider = reviews.querySelector('.reviews__slider');

      const swiper = new Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 1000,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        pagination: {
          el: reviews.querySelector('.reviews__pagination'),
          clickable: true,
        }
      });
    });
  },

  init: function () {
    this.langSelectInit();
    this.menuInit();
    this.authFormInit();
    this.avaUploadInit();
    this.dateSelectInit();
    this.phoneSelectInit();
    this.countrySelectInit();
    this.reviewsInit();
  }
}
Ui.init();