
window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll('.tel'), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}"
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});
document.addEventListener('DOMContentLoaded', function () {
  ymaps.ready(init);

  function init() {
    var myMap = new ymaps.Map("map", {
      // Центр карты, указываем коордианты
      center: [55.804562, 49.316072],
      // Масштаб, тут все просто
      zoom: 14,
      // Отключаем все элементы управления
      controls: []
    });

    var myGeoObjects = [];

    // Наша метка, указываем коордианты
    myGeoObjects = new ymaps.Placemark([55.804562, 49.316072], {
      balloonContentBody: 'Premier',
    }, {
      iconLayout: 'default#image',
      // Путь до нашей картинки
      iconImageHref: 'img/map.svg',
      // Размер по ширине и высоте
      iconImageSize: [136, 136],
      // Смещение левого верхнего угла иконки относительно
      // её «ножки» (точки привязки).
      iconImageOffset: [-35, -35]
    });

    var clusterer = new ymaps.Clusterer({
      clusterDisableClickZoom: false,
      clusterOpenBalloonOnClick: false,
    });

    clusterer.add(myGeoObjects);
    myMap.geoObjects.add(clusterer);
    // Отлючаем возможность изменения масштаба
    myMap.behaviors.disable('scrollZoom');

  }
});
document.addEventListener('DOMContentLoaded', function () {
  const swiper1 = new Swiper('.swiper1', {
    slidesPerView: 8,
    spaceBetween: 11,
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      576: {
        spaceBetween: 10,
        slidesPerView: 4
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 4
      },
      992: {
        spaceBetween: 11,
        slidesPerView: 5
      },
      1200: {
        spaceBetween: 11,
        slidesPerView: 8
      }
    }
  });

});
document.addEventListener("DOMContentLoaded", () => {
  let menuBtn = document.querySelector('.menu-btn');
  let menu = document.querySelector('.menu');
  menuBtn.addEventListener('click', function () {
    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
  });
});
// Меню: переключение классов по клику
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.menu li a.go_to').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      document.querySelector('.menu-btn')?.classList.toggle('active');
      document.querySelector('.menu')?.classList.toggle('active');
    });
  });
});

// Скролл по якорям
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.go_to').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const targetSelector = link.getAttribute('href');
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Замена <img class="svg"> на inline SVG
document.addEventListener("DOMContentLoaded", () => {
  const svgImages = document.querySelectorAll('img.svg');

  svgImages.forEach(img => {
    const imgURL = img.getAttribute('src');

    fetch(imgURL)
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'image/svg+xml');
        let svg = xmlDoc.querySelector('svg');

        if (!svg) return;

        // Перенос ID
        if (img.id) {
          svg.setAttribute('id', img.id);
        }

        // Перенос классов
        const classes = img.getAttribute('class');
        if (classes) {
          svg.setAttribute('class', `${classes} replaced-svg`);
        }

        // Удаление некорректных xmlns
        svg.removeAttribute('xmlns:a');

        // Добавление viewBox, если его нет
        if (!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
          svg.setAttribute('viewBox', `0 0 ${svg.getAttribute('width')} ${svg.getAttribute('height')}`);
        }

        // Замена <img> на <svg>
        img.parentNode.replaceChild(svg, img);
      })
      .catch(error => {
        console.error(`Ошибка при загрузке SVG: ${imgURL}`, error);
      });
  });
});
