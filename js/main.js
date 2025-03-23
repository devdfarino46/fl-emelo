"use strict";

var Ui = {
  langSelectInit: function langSelectInit() {
    document.querySelectorAll('.lang-select').forEach(function (langSelect) {
      var label = langSelect.querySelector('.lang-select__label');
      var selects = langSelect.querySelectorAll('.lang-select__select');
      var hiddenInput = langSelect.querySelector('input[type="hidden"]');
      label.addEventListener('click', function () {
        langSelect.classList.add('--active');
      });
      selects.forEach(function (select) {
        select.addEventListener('click', function () {
          var value = select.getAttribute('data-value');
          langSelect.classList.remove('--active');
          hiddenInput.value = value;
          label.querySelector('span').textContent = select.textContent;
          langSelect.submit();
        });
      });
      langSelect.addEventListener('mouseover', function (e) {
        langSelect.classList.add('--active');
      });
      langSelect.addEventListener('mouseout', function (e) {
        langSelect.classList.remove('--active');
      });
      window.addEventListener('scroll', function (e) {
        langSelect.classList.remove('--active');
      });
    });
  },
  btnInit: function btnInit() {
    document.querySelectorAll('.btn').forEach(function (btn) {
      if (btn.classList.contains('--add-file')) {
        var input = btn.querySelector('input[type="file"]');
        btn.addEventListener('click', function () {
          input.click();
        });
      }
    });
  },
  menuInit: function menuInit() {
    var openMenuBtn = document.querySelector('.header .menu-btn');
    document.querySelectorAll('.menu').forEach(function (menu) {
      var closeMenuBtn = document.querySelector('.menu .menu-btn');
      openMenuBtn.addEventListener('click', function () {
        menu.classList.add('--active');
      });
      closeMenuBtn.addEventListener('click', function () {
        menu.classList.remove('--active');
      });
      document.addEventListener('click', function (e) {
        if (!e.composedPath().includes(menu) && !e.composedPath().includes(openMenuBtn)) {
          menu.classList.remove('--active');
        }
      });
    });
  },
  authFormInit: function authFormInit() {
    document.querySelectorAll('.auth-form').forEach(function (auth) {
      var authSection = auth.closest('.auth');
      var register = document.querySelector('.register');
      var tabBtns = auth.querySelectorAll('.auth-form__tabs .tab-btn');
      var tabs = authSection.querySelectorAll('.register-info');
      var ierNavLink = document.querySelector('.ier-nav a.--choosed');
      var registerLink = auth.querySelector('._register-link');
      registerLink.addEventListener('click', function () {
        if (authSection) authSection.classList.add('--hidden');
        if (register) register.classList.remove('--hidden');
      });
      tabBtns.forEach(function (tabBtn, i) {
        tabBtn.addEventListener('click', function () {
          tabBtns.forEach(function (el) {
            el.classList.remove('--choosed');
          });
          tabs.forEach(function (el) {
            el.classList.remove('--choosed');
          });
          tabBtn.classList.add('--choosed');
          if (tabs[i]) tabs[i].classList.add('--choosed');
          if (ierNavLink) ierNavLink.textContent = tabBtn.querySelector('span._pc').textContent;
        });
      });
    });
  },
  avaUploadInit: function avaUploadInit() {
    document.querySelectorAll('.ava-upload').forEach(function (avaUpload) {
      var input = avaUpload.querySelector('input[type="file"]');
      var imgBtn = avaUpload.querySelector('.ava-upload__img-btn');
      var cameraBtn = avaUpload.querySelector('.ava-upload__camera-btn');
      var img = avaUpload.querySelector('.ava-upload__image img');
      if (imgBtn) imgBtn.addEventListener('click', function (ev) {
        input.removeAttribute('capture');
        input.click();
      });
      if (cameraBtn) cameraBtn.addEventListener('click', function (ev) {
        input.setAttribute('capture', 'camera');
        input.click();
      });
      input.addEventListener('change', function (ev) {
        /**
         * @type {File}
         */
        var file = event.target.files[0];
        if (file) {
          var reader = new FileReader();
          reader.onload = function (ev) {
            img.src = ev.target.result;
            avaUpload.classList.add('--uploaded');
          };
          reader.readAsDataURL(file);
        }
      });
    });
  },
  dateSelectInit: function dateSelectInit() {
    document.querySelectorAll('.date-select').forEach(function (dateSelect) {
      var tabBtns = dateSelect.querySelectorAll('.tab-btn');
      var lists = dateSelect.querySelectorAll('.date-select__list');
      var input = dateSelect.querySelector('.form-input');
      var acceptBtn = dateSelect.querySelector('.date-select__accept-btn');
      var items = dateSelect.querySelectorAll('.date-select__item');
      var day = '31';
      var month = '01';
      var year = '1999';
      tabBtns.forEach(function (tabBtn, i) {
        tabBtn.addEventListener('click', function (ev) {
          tabBtns.forEach(function (btn) {
            btn.classList.remove('--choosed');
          });
          lists.forEach(function (list) {
            list.classList.remove('--choosed');
          });
          tabBtn.classList.add('--choosed');
          lists[i].classList.add('--choosed');
        });
      });
      input.addEventListener('click', function (ev) {
        dateSelect.classList.toggle('--opened');
      });
      acceptBtn.addEventListener('click', function (ev) {
        dateSelect.classList.remove('--opened');
        input.querySelector('input').value = "".concat(day, ".").concat(month, ".").concat(year);
      });
      document.addEventListener('click', function (ev) {
        if (!ev.composedPath().includes(dateSelect)) {
          dateSelect.classList.remove('--opened');
        }
      });
      items.forEach(function (item) {
        item.addEventListener('click', function (ev) {
          if (item.dataset.category === 'day') {
            day = item.dataset.value;
          } else if (item.dataset.category === 'month') {
            month = item.dataset.value;
          } else if (item.dataset.category === 'year') {
            year = item.dataset.value;
          }
          input.querySelector('input').value = "".concat(day, ".").concat(month, ".").concat(year);
        });
      });
    });
  },
  phoneSelectInit: function phoneSelectInit() {
    document.querySelectorAll('.phone-select').forEach(function (select) {
      var button = select.querySelector('.phone-select .form-input button');
      var buttonText = button.querySelector('span');
      var buttonInput = button.querySelector('input');
      var inputElem = select.querySelector('.phone-select .form-input input');
      var items = select.querySelectorAll('.phone-select__item');
      var dropdown = select.querySelector('.phone-select__dropdown');
      button.addEventListener('click', function () {
        select.classList.toggle('--opened');
      });
      inputElem.addEventListener('click', function () {
        select.classList.remove('--opened');
      });
      document.addEventListener('click', function (ev) {
        if (!ev.composedPath().includes(button) && !ev.composedPath().includes(dropdown)) {
          select.classList.remove('--opened');
        }
      });
      items.forEach(function (item) {
        item.addEventListener('click', function () {
          buttonText.textContent = item.textContent;
          buttonInput.value = item.textContent;
          select.classList.remove('--opened');
        });
      });
    });
  },
  formSelectInit: function formSelectInit() {
    document.querySelectorAll('.form-select').forEach(function (select) {
      var input = select.querySelector('.form-select .form-input');
      var items = select.querySelectorAll('.form-select__item');
      input.addEventListener('click', function () {
        select.classList.toggle('--opened');
      });
      document.addEventListener('click', function (ev) {
        if (!ev.composedPath().includes(select)) {
          select.classList.remove('--opened');
        }
      });
      items.forEach(function (item) {
        item.addEventListener('click', function (ev) {
          input.querySelector('input').value = item.querySelector('span').textContent;
          select.classList.remove('--opened');
        });
      });
    });
  },
  reviewsInit: function reviewsInit() {
    document.querySelectorAll('.reviews').forEach(function (reviews) {
      var slider = reviews.querySelector('.reviews__slider');
      var swiper = new Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 1000,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        },
        pagination: {
          el: reviews.querySelector('.reviews__pagination'),
          clickable: true
        }
      });
    });
  },
  accGenItemInit: function accGenItemInit() {
    document.querySelectorAll('.acc-gen-item').forEach(function (accGenItem) {
      var label = accGenItem.querySelector('.acc-gen-item__label');
      label.addEventListener('click', function (ev) {
        accGenItem.classList.toggle('--hidden');
      });
    });
  },
  clueBlockInit: function clueBlockInit() {
    document.querySelectorAll('.clue-block').forEach(function (clueBlock) {
      if (clueBlock.classList.contains('--allow-hide-740w')) {
        clueBlock.addEventListener('click', function (ev) {
          clueBlock.classList.toggle('--opened');
        });
      }
    });
  },
  formEditingInit: function formEditingInit() {
    document.querySelectorAll('.form-editing').forEach(function (formEditing) {
      var dataAction = formEditing.dataset.action;
      var dataMethod = formEditing.dataset.method;
      var input = formEditing.querySelector('textarea');
      var btn = formEditing.querySelector('button');
      formEditing.addEventListener('click', function (ev) {
        if (!ev.composedPath().includes(btn)) {
          input.focus();
          formEditing.classList.add('--edit');
          input.removeAttribute('readonly');
        }
      });
      document.addEventListener('click', function (ev) {
        if (!ev.composedPath().includes(formEditing)) {
          formEditing.classList.remove('--edit');
          input.setAttribute('readonly', 'readonly');
        }
      });
      btn.addEventListener('click', function (ev) {
        formEditing.classList.remove('--edit');
        input.setAttribute('readonly', 'readonly');
        fetch(dataAction, {
          method: dataMethod,
          body: input.value
        });
      });
    });
  },
  dragDropTableInit: function dragDropTableInit() {
    document.querySelectorAll('.drag-drop-table').forEach(function (table) {
      var rows = table.querySelectorAll('tr[draggable="true"]');
      var hiddenInput = table.querySelector('input[type="hidden"]');
      rows.forEach(function (row) {
        row.addEventListener('dragstart', function (ev) {
          ev.dataTransfer.setData('text/plain', ev.target.id);
          ev.target.classList.add('dragging');
        });
        row.addEventListener('dragover', function (ev) {
          ev.preventDefault();
          var draggingRow = document.querySelector('.dragging');
          var targetRow = ev.target.closest('tr');
          if (targetRow && targetRow !== draggingRow) {
            var tbody = table.querySelector('tbody');
            var _rows = Array.from(tbody.querySelectorAll('tr[draggable="true"]'));
            var draggingIndex = _rows.indexOf(draggingRow);
            var targetIndex = _rows.indexOf(targetRow);
            if (draggingIndex < targetIndex) {
              tbody.insertBefore(draggingRow, targetRow.nextSibling);
            } else {
              tbody.insertBefore(draggingRow, targetRow);
            }
          }
        });
        row.addEventListener('dragend', function (ev) {
          ev.target.classList.remove('dragging');
          var rows = table.querySelectorAll('tr[draggable="true"]');
          var orders = Array.from(rows).map(function (row) {
            return row.dataset.id;
          }).join(',');
          fetch("?order=".concat(orders), {
            method: table.dataset.method
          });
        });
      });
    });
  },
  diagramPieInit: function diagramPieInit() {
    document.querySelectorAll('.diagram-pie').forEach(function (diagram) {
      var segmentsDivs = diagram.querySelectorAll('.diagram-pie__segments div');
      var segmentStrokes = diagram.querySelector('.diagram-pie__segment-strokes');
      var legendStrokes = diagram.querySelector('.diagram-pie__legend-strokes');
      var segmentLabels = diagram.querySelector('.diagram-pie__segment-labels');
      var total = Array.from(segmentsDivs).reduce(function (acc, segment) {
        return acc + Number(segment.dataset.num);
      }, 0);
      Array.from(segmentsDivs).reduce(function (acc, segmentsDiv) {
        var dataNum = Number(segmentsDiv.dataset.num);
        var dataColor = segmentsDiv.dataset.color;
        var dataLabel = segmentsDiv.dataset.label;
        var segmentStrokesDiv = segmentStrokes.appendChild(document.createElement('div'));
        var legendStrokesDiv = legendStrokes.appendChild(document.createElement('div'));
        var segmentLabelsDiv = segmentLabels.appendChild(document.createElement('div'));
        var segmentLabelsDivSpan = segmentLabelsDiv.appendChild(document.createElement('span'));
        segmentLabelsDivSpan.textContent = dataLabel;
        var percent = dataNum / total * 100;
        segmentsDiv.style.background = "conic-gradient(".concat(dataColor, " ").concat(percent, "% 0, transparent 0 0)");
        segmentsDiv.style.transform = "rotate(".concat(360 * acc / 100, "deg)");
        segmentStrokesDiv.style.transform = "rotate(".concat(360 * acc / 100, "deg)");
        legendStrokesDiv.style.transform = "rotate(".concat(360 * (acc + percent / 2) / 100, "deg)");
        segmentLabelsDiv.style.transform = "rotate(".concat(360 * (acc + percent / 2) / 100, "deg)");
        segmentLabelsDivSpan.style.transform = "translate(-50%, -150%) rotate(-".concat(360 * (acc + percent / 2) / 100, "deg)");
        return acc + percent;
      }, 0);
    });
  },
  formRadioParentInit: function formRadioParentInit() {
    document.querySelectorAll('.form-radio-parent').forEach(function (formRadioLabel) {
      var radios = formRadioLabel.querySelectorAll('.form-radio-label');
      radios.forEach(function (radio) {
        console.log(radio);
        radio.addEventListener('click', function () {
          radios.forEach(function (r) {
            r.querySelector('input').checked = false;
          });
          radio.querySelector('input').checked = true;
        });
      });
    });
  },
  candidatesSectionInit: function candidatesSectionInit() {
    document.querySelectorAll('.candidates-section').forEach(function (candatesSection) {
      var candidateItems = candatesSection.querySelectorAll('.candidate-item');
      var candidatesTabs = candatesSection.querySelectorAll('.candidates-tab');
      candidateItems.forEach(function (candidateItem, index) {
        candidateItem.addEventListener('click', function () {
          candidateItems.forEach(function (item) {
            item.classList.remove('--choosed');
          });
          candidatesTabs.forEach(function (tab) {
            tab.classList.remove('--choosed');
          });
          candidateItem.classList.add('--choosed');
          if (candidatesTabs[index]) candidatesTabs[index].classList.add('--choosed');
        });
      });
    });
  },
  init: function init() {
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
};
Ui.init();
//# sourceMappingURL=main.js.map
