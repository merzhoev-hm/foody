function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
  // Slider 1
  /*
// const slides = document.querySelectorAll('.offer__slide');
// const sliderPrev = document.querySelector('.offer__slider-prev');
// const sliderNext = document.querySelector('.offer__slider-next');
// const current = document.querySelector('#current');
// const total = document.querySelector('#total');
 

// function showSlides(i = 0) {
//   slides.forEach(element => {
//     element.classList.remove("show", "fade");
//   });

//   slides[i].classList.add("show", "fade");
// }

// function currentZero(curr) {
//   if (curr < 10) {
//     return `0${curr}`
//   }
//   return curr
// }

// showSlides()

// sliderNext.addEventListener('click', () => {
//   if (+current.textContent === slides.length) {
//     current.textContent = currentZero(1)
//     showSlides(+current.textContent - 1)
//   }else{
//     current.textContent = currentZero(+current.textContent + 1)
//     showSlides(+current.textContent - 1)
//   }
// })

// sliderPrev.addEventListener('click', () => {
//   if (+current.textContent === 1) {
//     current.textContent = currentZero(slides.length)
//     showSlides(+current.textContent - 1)
//   }else{
//     current.textContent = currentZero(+current.textContent - 1)
//     showSlides(+current.textContent - 1)
//   }
// })
*/
  //Slider 1.1
  /*
const slides = document.querySelectorAll(".offer__slide"),
  prev = document.querySelector(".offer__slider-prev"),
  next = document.querySelector(".offer__slider-next"),
  total = document.querySelector("#total"),
  current = document.querySelector("#current");

let slideIndex = 1;

showSlides(slideIndex);

if (slides.length < 10) {
  total.textContent = `0${slides.length}`;
} else {
  total.textContent = slides.length;
}

function showSlides(n) {
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  slides.forEach((item) => (item.style.display = "none"));

  slides[slideIndex - 1].style.display = "block"; // Как ваша самостоятельная работа - переписать на использование классов show/hide

  if (slides.length < 10) {
    current.textContent = `0${slideIndex}`;
  } else {
    current.textContent = slideIndex;
  }
}

function plusSlides(n) {
  showSlides((slideIndex += n));
}

prev.addEventListener("click", function () {
  plusSlides(-1);
});

next.addEventListener("click", function () {
  plusSlides(1);
});
*/
  //Slider 2

  const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    prev = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    total = document.querySelector(totalCounter),
    current = document.querySelector(currentCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  function slideZero() {
    if (slides.length < 10) {
      total.textContent = `0${slides.length}`;
      current.textContent = `0${slideIndex}`;
    } else {
      total.textContent = slides.length;
      current.textContent = slideIndex;
    }
  }

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";

  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = "relative";

  const indicators = document.createElement("ol"),
    dots = [];

  indicators.classList.add("carousel-indicators");
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.classList.add("dot");

    if (i == 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
  }

  function dotSlide() {
    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  }

  function deleteNotdigits(str) {
    return +str.replace(/\D/g, "");
  }

  next.addEventListener("click", () => {
    if (offset == deleteNotdigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += deleteNotdigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
      slideZero();
    } else {
      slideIndex++;
      slideZero();
    }

    //
    dotSlide();
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = deleteNotdigits(width) * (slides.length - 1);
    } else {
      offset -= deleteNotdigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
      slideZero();
    } else {
      slideIndex--;
      slideZero();
    }
    //
    dotSlide();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");

      slideIndex = slideTo;
      offset = +width.slice(0, width.length - 2) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      slideZero();
      //
      dotSlide();
    });
  });
}

export default slider;
