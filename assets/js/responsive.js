var header = document.getElementById("header");
var mobileMenu = document.getElementById("mobile-menu");
var headerHeight = header.clientHeight;

//  Mở / Đóng Mobile Menu
mobileMenu.onclick = function () {
  var isClosed = header.clientHeight === headerHeight;
  if (isClosed) {
    header.style.height = "auto";
    header.classList.add("is-open");
  } else {
    header.style.height = null;
    header.classList.remove("is-open");

    var subnav = document.querySelector("#nav .subnav");
    if (subnav) subnav.style.display = "none";
  }
};

// Xử lý khi bấm vào các mục Menu
var menuItems = document.querySelectorAll("#nav li a");

for (var i = 0; i < menuItems.length; i++) {
  var menuItem = menuItems[i];

  menuItem.onclick = function (event) {
    var isParentMenu =
      this.nextElementSibling &&
      this.nextElementSibling.classList.contains("subnav");

    if (isParentMenu) {
      event.preventDefault();
      var subnav = this.nextElementSibling;
      if (subnav.style.display === "block") {
        subnav.style.display = "none";
      } else {
        subnav.style.display = "block";
      }
    } else {
      header.style.height = null;
      header.classList.remove("is-open");

      var subnav = document.querySelector("#nav .subnav");
      if (subnav) subnav.style.display = "none";

      var parentLi = this.parentElement;
      if (parentLi && parentLi.parentElement.id === "nav") {
        document.querySelectorAll("#nav > li").forEach(function (li) {
          li.classList.remove("active");
        });
        parentLi.classList.add("active");
      }
    }
  };
}

//  Tự động reset khi resize
window.onresize = function () {
  if (window.innerWidth >= 740) {
    header.style.height = "";
    header.classList.remove("is-open");
    var subnav = document.querySelector("#nav .subnav");
    if (subnav) subnav.style.display = "";
  }
};

//  Cuộn trang tự động đổi Active
window.onscroll = function () {
  var scrollPosition = window.scrollY + 150;
  var isAtBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;

  var sections = [
    { id: "slider", nav: document.querySelector("#nav > li:first-child") },
    {
      id: "band",
      nav: document.querySelector('#nav a[href="#band"]')?.parentElement,
    },
    {
      id: "tour",
      nav: document.querySelector('#nav a[href="#tour"]')?.parentElement,
    },
    {
      id: "contact",
      nav: document.querySelector('#nav a[href="#contact"]')?.parentElement,
    },
  ];

  if (isAtBottom) {
    document.querySelectorAll("#nav > li").forEach(function (li) {
      li.classList.remove("active");
    });
    var contactNav = document.querySelector(
      '#nav a[href="#contact"]',
    )?.parentElement;
    if (contactNav) contactNav.classList.add("active");
    return;
  }

  sections.forEach(function (section) {
    var el = document.getElementById(section.id);
    if (el) {
      var top = el.offsetTop;
      var height = el.offsetHeight;

      if (scrollPosition >= top && scrollPosition < top + height) {
        document.querySelectorAll("#nav > li").forEach(function (li) {
          li.classList.remove("active");
        });
        if (section.nav) {
          section.nav.classList.add("active");
        }
      }
    }
  });
};

// Kích hoạt scroll một lần lúc mới load trang để gán chữ HOME ngay từ đầu
window.dispatchEvent(new Event("scroll"));
