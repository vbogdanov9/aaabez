document.addEventListener("DOMContentLoaded", () => {
  function t(t) {
      t.style.display = "block";
      setTimeout( () => {
          t.classList.add("active"),
          n = !1
      }
      , 10)
  }
  !document.getElementById("development-mode");
  document.querySelectorAll(".tablinks").forEach(i => {
      i.addEventListener("click", function() {
          if (!n && !this.classList.contains("active")) {
              n = !0;
              const r = document.querySelector(".tablinks.active")
                , i = document.querySelector(".tabcontent.active")
                , u = this.getAttribute("data-target")
                , f = document.getElementById(u);
              i && i.id !== u ? (i.classList.remove("active"),
              setTimeout( () => {
                  i.style.display = "none",
                  t(f, this)
              }
              , 300)) : i ? n = !1 : t(f, this);
              r && r.classList.remove("active");
              this.classList.add("active")
          }
      })
  }
  );
  let n = !1;
  var i = new Swiper(".mySwiper",{
      direction: "horizontal",
      loop: !1,
      autoHeight: !0,
      slidesPerView: "auto",
      centeredSlides: !1,
      spaceBetween: 0,
      freeMode: !0,
      navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
      }
  })
}
)
