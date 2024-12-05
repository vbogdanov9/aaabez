document.addEventListener("DOMContentLoaded", () => {
  var t = new Swiper(".mySwiper1",{
      loop: !0,
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: !0,
      watchSlidesProgress: !0
  })
    , y = new Swiper(".mySwiper2",{
      loop: !0,
      spaceBetween: 10,
      navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
      },
      thumbs: {
          swiper: t
      }
  })
    , i = new Swiper(".mySwiper3",{
      loop: !0,
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: !0,
      watchSlidesProgress: !0
  })
    , p = new Swiper(".mySwiper4",{
      loop: !0,
      spaceBetween: 10,
      navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
      },
      thumbs: {
          swiper: i
      }
  })
    , r = new Swiper(".mySwiper5",{
      loop: !0,
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: !0,
      watchSlidesProgress: !0
  })
    , w = new Swiper(".mySwiper6",{
      loop: !0,
      spaceBetween: 10,
      navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
      },
      thumbs: {
          swiper: r
      }
  })
    , u = new Swiper(".mySwiper7",{
      loop: !0,
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: !0,
      watchSlidesProgress: !0
  })
    , b = new Swiper(".mySwiper8",{
      loop: !0,
      spaceBetween: 10,
      navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
      },
      thumbs: {
          swiper: u
      }
  })
    , f = new Swiper(".mySwiper9",{
      loop: !0,
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: !0,
      watchSlidesProgress: !0
  })
    , k = new Swiper(".mySwiper10",{
      loop: !0,
      spaceBetween: 10,
      navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
      },
      thumbs: {
          swiper: f
      }
  })
    , e = new Swiper(".mySwiper11",{
      loop: !0,
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: !0,
      watchSlidesProgress: !0
  })
    , d = new Swiper(".mySwiper12",{
      loop: !0,
      spaceBetween: 10,
      navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
      },
      thumbs: {
          swiper: e
      }
  })
    , o = new Swiper(".mySwiper13",{
      loop: !0,
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: !0,
      watchSlidesProgress: !0
  })
    , g = new Swiper(".mySwiper14",{
      loop: !0,
      spaceBetween: 10,
      navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
      },
      thumbs: {
          swiper: o
      }
  })
    , s = new Swiper(".mySwiper15",{
      loop: !0,
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: !0,
      watchSlidesProgress: !0
  })
    , nt = new Swiper(".mySwiper16",{
      loop: !0,
      spaceBetween: 10,
      navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
      },
      thumbs: {
          swiper: s
      }
  })
    , h = new Swiper(".mySwiper17",{
      loop: !0,
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: !0,
      watchSlidesProgress: !0
  })
    , tt = new Swiper(".mySwiper18",{
      loop: !0,
      spaceBetween: 10,
      navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
      },
      thumbs: {
          swiper: h
      }
  })
    , c = new Swiper(".mySwiper19",{
      loop: !0,
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: !0,
      watchSlidesProgress: !0
  })
    , it = new Swiper(".mySwiper20",{
      loop: !0,
      spaceBetween: 10,
      navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
      },
      thumbs: {
          swiper: c
      }
  });
  const l = document.querySelectorAll(".assortment .items .item")
    , a = document.querySelectorAll(".assortment .close")
    , v = document.querySelectorAll(".assortment .items .yellow-button");
  let n = null;
  l.forEach(t => {
      t.addEventListener("click", i => {
          if (!i.target.classList.contains("close")) {
              n && n.classList.remove("show");
              const r = t.querySelector(".cart");
              r.classList.add("show");
              n = r
          }
      }
      )
  }
  );
  a.forEach(t => {
      t.addEventListener("click", i => {
          i.stopPropagation();
          const r = t.closest(".cart");
          r.classList.remove("show");
          n === r && (n = null)
      }
      )
  }
  );
  v.forEach(t => {
      t.addEventListener("click", i => {
          i.stopPropagation();
          const r = t.closest(".cart");
          r.classList.remove("show");
          n === r && (n = null)
      }
      )
  }
  );
  document.addEventListener("click", n => {
      const t = n.target.closest(".item");
      t || (document.querySelectorAll(".item-and-min-card .min-card").forEach(n => {
          n.nextElementSibling.classList.remove("show")
      }
      ),
      document.querySelector("body").classList.remove("no-scroll"),
      document.querySelector(".overlay").classList.remove("show"))
  }
  )
}
)
