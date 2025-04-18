const Ui = {
  langSelectInit: function () {
    document.querySelectorAll('.lang-select').forEach((langSelect) => {
      const label = langSelect.querySelector('.lang-select__label');
      const selects = langSelect.querySelectorAll('.lang-select__select');
      const hiddenInput = langSelect.querySelector('input[type="hidden"]');

      label.addEventListener('click', () => {
        langSelect.classList.add('--active');
      });
      
      selects.forEach((select) => {
        select.addEventListener('click', () => {
          const value = select.getAttribute('data-value');
          langSelect.classList.remove('--active');

          hiddenInput.value = value;
          label.querySelector('span').textContent = select.textContent;
          langSelect.submit();
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

  btnInit: function () {
    document.querySelectorAll('.btn').forEach(btn => {
      if (btn.classList.contains('--add-file')) {
        const input = btn.querySelector('input[type="file"]');

        btn.addEventListener('click', () => {
          input.click();
        });
      }
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

      if (imgBtn) imgBtn.addEventListener('click', (ev) => {
        input.removeAttribute('capture');
        input.click();
      });

      if (cameraBtn) cameraBtn.addEventListener('click', (ev) => {
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

  formSelectInit: function () {
    document.querySelectorAll('.form-select').forEach(select => {
      const input = select.querySelector('.form-select .form-input');
      const items = select.querySelectorAll('.form-select__item');

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

  accGenItemInit: function () {
    document.querySelectorAll('.acc-gen-item').forEach(accGenItem => {
      const label = accGenItem.querySelector('.acc-gen-item__label');

      label.addEventListener('click', ev => {
        accGenItem.classList.toggle('--hidden');
      });
    });
  },

  clueBlockInit: function () {
    document.querySelectorAll('.clue-block').forEach(clueBlock => {
      if (clueBlock.classList.contains('--allow-hide-740w')) {
        clueBlock.addEventListener('click', ev => {
          clueBlock.classList.toggle('--opened');
        });
      }
    })
  },

  formEditingInit: function () {
    document.querySelectorAll('.form-editing').forEach(formEditing => {
      const dataAction = formEditing.dataset.action;
      const dataMethod = formEditing.dataset.method;

      const input = formEditing.querySelector('textarea');
      const btn = formEditing.querySelector('button');
      

      formEditing.addEventListener('click', ev => {
        if (!ev.composedPath().includes(btn)) {
          input.focus();
          formEditing.classList.add('--edit');
          input.removeAttribute('readonly');
        }
      });

      document.addEventListener('click', ev => {
        if (!ev.composedPath().includes(formEditing)) {
          formEditing.classList.remove('--edit');
          input.setAttribute('readonly', 'readonly');
        }
      });

      btn.addEventListener('click', ev => {
        formEditing.classList.remove('--edit');
        input.setAttribute('readonly', 'readonly');

        fetch(dataAction, {
          method: dataMethod,
          body: input.value
        });
      });
    });
  },

  dragDropTableInit: function() {
    document.querySelectorAll('.drag-drop-table').forEach(table => {
      const rows = table.querySelectorAll('tr[draggable="true"]');
      const hiddenInput = table.querySelector('input[type="hidden"]');
      
      rows.forEach(row => {
        row.addEventListener('dragstart', ev => {
          ev.dataTransfer.setData('text/plain', ev.target.id);
          ev.target.classList.add('dragging');
        });

        row.addEventListener('dragover', ev => {
          ev.preventDefault();
          const draggingRow = document.querySelector('.dragging');
          const targetRow = ev.target.closest('tr');

          if (targetRow && targetRow !== draggingRow) {
            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr[draggable="true"]'));
            const draggingIndex = rows.indexOf(draggingRow);
            const targetIndex = rows.indexOf(targetRow);

            if (draggingIndex < targetIndex) {
              tbody.insertBefore(draggingRow, targetRow.nextSibling);
              
            } else {
              tbody.insertBefore(draggingRow, targetRow);
            }
          }
        });

        row.addEventListener('dragend', ev => {
          ev.target.classList.remove('dragging');

          const rows = table.querySelectorAll('tr[draggable="true"]');
          const orders = Array.from(rows).map(row => row.dataset.id).join(',');
          fetch(`?order=${orders}`, {
            method: table.dataset.method,
          });
        });
      });
    });
  },

  diagramPieInit: function () {
    document.querySelectorAll('.diagram-pie').forEach(diagram => {
      const segmentsDivs = diagram.querySelectorAll('.diagram-pie__segments div');
      const segmentStrokes = diagram.querySelector('.diagram-pie__segment-strokes');
      const legendStrokes = diagram.querySelector('.diagram-pie__legend-strokes');
      const segmentLabels = diagram.querySelector('.diagram-pie__segment-labels');

      const total = Array.from(segmentsDivs).reduce((acc, segment) => acc + Number(segment.dataset.num), 0);
      
      Array.from(segmentsDivs).reduce((acc, segmentsDiv) => {
        const dataNum = Number(segmentsDiv.dataset.num);
        const dataColor = segmentsDiv.dataset.color;
        const dataLabel = segmentsDiv.dataset.label;

        const segmentStrokesDiv = segmentStrokes.appendChild(document.createElement('div'));
        const legendStrokesDiv = legendStrokes.appendChild(document.createElement('div'));
        const segmentLabelsDiv = segmentLabels.appendChild(document.createElement('div'));
        const segmentLabelsDivSpan = segmentLabelsDiv.appendChild(document.createElement('span'));

        segmentLabelsDivSpan.textContent = dataLabel;

        const percent = dataNum / total * 100;
        
        segmentsDiv.style.background = `conic-gradient(${dataColor} ${percent}% 0, transparent 0 0)`;
        segmentsDiv.style.transform = `rotate(${360 * acc / 100}deg)`;
        segmentStrokesDiv.style.transform = `rotate(${360 * acc / 100}deg)`;
        legendStrokesDiv.style.transform = `rotate(${360 * (acc + percent / 2) / 100}deg)`;
        segmentLabelsDiv.style.transform = `rotate(${360 * (acc + percent / 2) / 100}deg)`;
        segmentLabelsDivSpan.style.transform = 
          `translate(-50%, -150%) rotate(-${360 * (acc + percent / 2) / 100}deg)`;

        return acc + percent;
      }, 0);
    });
  },

  formRadioParentInit: function () {
    document.querySelectorAll('.form-radio-parent').forEach((formRadioLabel) => {
      const radios = formRadioLabel.querySelectorAll('.form-radio-label');
      
      radios.forEach((radio) => {
        console.log(radio);
        
        radio.addEventListener('click', () => {
          radios.forEach((r) => {
            r.querySelector('input').checked = false;
          });
          radio.querySelector('input').checked = true;
        });
      })
    });
  },

  candidatesSectionInit: function () {
    document.querySelectorAll('.candidates-section').forEach((candatesSection) => {
      const candidateItems = candatesSection.querySelectorAll('.candidate-item');
      const candidatesTabs = candatesSection.querySelectorAll('.candidates-tab');

      candidateItems.forEach((candidateItem, index) => {
        candidateItem.addEventListener('click', () => {
          candidateItems.forEach((item) => {
            item.classList.remove('--choosed');
          });
          candidatesTabs.forEach((tab) => {
            tab.classList.remove('--choosed');
          });

          candidateItem.classList.add('--choosed');
          if (candidatesTabs[index]) candidatesTabs[index].classList.add('--choosed');
        });
      });
    });
  },

  init: function () {
    this.btnInit();
    this.langSelectInit();
    this.menuInit();
    this.authFormInit();
    this.avaUploadInit();
    this.dateSelectInit();
    this.phoneSelectInit();
    this.formSelectInit();
    this.reviewsInit();
    this.accGenItemInit();
    this.clueBlockInit();
    this.formEditingInit();
    this.dragDropTableInit();
    this.diagramPieInit();
    this.candidatesSectionInit();
    this.formRadioParentInit();
  }
}
Ui.init();