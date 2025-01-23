export const Ui = {
  inputInit: function () {
    document.querySelectorAll('.input').forEach( input => {
      const inputElem = input.querySelector('input');
      const textareaElem = input.querySelector('textarea');
      const clearBtn = input.querySelector('i');
      const form = input.closest('form');
      

      if (inputElem) inputElem.addEventListener('input', ev => {
        if (inputElem.value.length > 0) {
          input.classList.add('--allow-clear');
        } else {
          input.classList.remove('--allow-clear');
        }
      });
      if (textareaElem) textareaElem.addEventListener('input', ev => {
        if (textareaElem.value.length > 0) {
          input.classList.add('--allow-clear');
        } else {
          input.classList.remove('--allow-clear');
        }
      });
      if (clearBtn) clearBtn.addEventListener('click', ev => {
        input.classList.remove('--allow-clear');
        if (inputElem) inputElem.value = '';
        if (textareaElem) textareaElem.value = '';
      });
    });
  },

  inputClear: function (input) {
    const inputElem = input.querySelector('input');
    const textareaElem = input.querySelector('textarea');
    input.classList.remove('--allow-clear');
    if (inputElem) inputElem.value = '';
    if (textareaElem) textareaElem.value = '';
  },

  portfolioInit: function () {
    document.querySelectorAll('.portfolio').forEach( portfolio => {
      const slider = portfolio.querySelector('.portfolio__slider');
      const slidePrev = portfolio.querySelector('.portfolio__slide-prev');
      const slideNext = portfolio.querySelector('.portfolio__slide-next');

      const swiper = new Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 20,
        mousewheel: {
          enabled: true,
          forceToAxis: true,
        },
        navigation: {
          nextEl: slideNext,
          prevEl: slidePrev,
        },
        breakpoints: {
          741: {
            slidesPerView: 2
          },
          941: {
            slidesPerView: 3
          }
        }
      });

      const update = () => {
        swiper.update();
      }

      window.addEventListener('resize', update);
    });
  },

  reviewsInit: function () {
    document.querySelectorAll('.reviews').forEach( reviews => {
      const slider = reviews.querySelector('.reviews__slider');
      const btnPrev = reviews.querySelector('.reviews__btn-prev');
      const btnNext = reviews.querySelector('.reviews__btn-next');

      const swiper = new Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 20,
        slidesOffsetAfter: 0,
        slidesOffsetBefore: 0,
        
        noSwiping: false,
        slideClass: 'swiper-slide-all',
        autoHeight: true,

        mousewheel: {
          enabled: true,
          forceToAxis: true,
        },
        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev,
        },
        breakpoints: {
          741: {
            slidesPerView: 2,
            slidesOffsetAfter: 0,
            slidesOffsetBefore: 0,
        
            noSwiping: false,
            slideClass: 'swiper-slide-all',
          },
          941: {
            slidesPerView: 3,
            slidesOffsetAfter: 130,
            slidesOffsetBefore: 130,

            slideClass: 'swiper-slide',
            noSwiping: true,
          }
        }
      });

      window.addEventListener('resize', swiper.update);
    });
  },

  targetSectionLink: function () {
    const links = document.querySelectorAll('.target-section-link');
    const sections = document.querySelectorAll('.target-section');

    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        const section = document.querySelector(target);

        window.scroll({
          top: section.offsetTop - 100,
          behavior: 'smooth'
        });
      });
    });
  },

  openFormPopupInit: function () {
    document.querySelectorAll('.open-form-popup').forEach((openFormPopup) => {
      openFormPopup.addEventListener('click', (e) => {
        const formPopup = document.querySelector('.form-popup');
        formPopup.classList.add('--opened');
        document.body.classList.add('no-scroll');
      });
    })
  },

  formPopupInit: function () {
    document.querySelectorAll('.form-popup').forEach((formPopup) => {
      const wrapper = formPopup.querySelector('.form-popup__wrapper');
      const close = formPopup.querySelector('.form-popup__close');

      formPopup.addEventListener('click', (e) => {
        if (!e.composedPath().includes(wrapper)) {
          formPopup.classList.remove('--opened');
          document.body.classList.remove('no-scroll');
        }
      });

      close.addEventListener('click', (e) => {
        formPopup.classList.remove('--opened');
        document.body.classList.remove('no-scroll');
      })

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          formPopup.classList.remove('--opened');
          document.body.classList.remove('no-scroll');
        }
      })
    });
  },

  orderFormInit: function () {

    document.querySelectorAll('.order-form').forEach((orderForm) => {
      const checkboxPolicy = orderForm.querySelector('.checkbox input[name="policy"]');
      const submit = orderForm.querySelector('.btn[type="submit"]');
      const status = orderForm.querySelector('.status');

      const update = () => {
        if (
          checkboxPolicy.checked) {
          submit.removeAttribute('disabled');
        } else {
          submit.setAttribute('disabled', '');
        }
      }

      orderForm.addEventListener('change', update);
    });
  },

  init: function () {
    this.inputInit();
    this.portfolioInit();
    this.reviewsInit();
    this.formPopupInit();
    this.openFormPopupInit();
    this.targetSectionLink();
    this.orderFormInit();
  }
}

Ui.init();