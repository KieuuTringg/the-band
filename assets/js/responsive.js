var header = document.getElementById('header');
var mobileMenu = document.getElementById('mobile-menu');
var headerHeight = header.clientHeight;

//  Mở / Đóng Mobile Menu (Nút 3 gạch)
mobileMenu.onclick = function () {
    var isClosed = header.clientHeight === headerHeight;
    if (isClosed) {
        header.style.height = 'auto';
    } else {
        header.style.height = null;

        var subnav = document.querySelector('#nav .subnav');
        if (subnav) subnav.style.display = 'none';
    }
};

//  Xử lý khi bấm vào các item trong Menu
var menuItems = document.querySelectorAll('#nav li a');

for (var i = 0; i < menuItems.length; i++) {
    var menuItem = menuItems[i];

    menuItem.onclick = function (event) {
        var isParentMenu = this.nextElementSibling && this.nextElementSibling.classList.contains('subnav');
        var isMobile = window.innerWidth < 740;

        if (isParentMenu) {
            // Nếu bấm vào nút "MORE"
            event.preventDefault(); // Không chuyển trang
            var subnav = this.nextElementSibling;
            if (subnav.style.display === 'block') {
                subnav.style.display = 'none';
            } else {
                subnav.style.display = 'block';
            }
        } else {
            header.style.height = null; 

            // Ẩn subnav
            var subnav = document.querySelector('#nav .subnav');
            if (subnav) subnav.style.display = 'none';

            var parentLi = this.parentElement;
            if (parentLi && parentLi.parentElement.id === 'nav' && !isParentMenu) {
                var currentActive = document.querySelector('#nav > li.active');
                if (currentActive) {
                    currentActive.classList.remove('active');
                }
                parentLi.classList.add('active');
            }
        }
    };
}

// Tự động reset style khi đổi kích thước màn hình (Resize)
window.onresize = function () {
    if (window.innerWidth >= 740) {
        header.style.height = '';
        var subnav = document.querySelector('#nav .subnav');
        if (subnav) subnav.style.display = '';
    }
};

// Cuộn trang tự động đổi Active (Scrollspy)
window.onscroll = function () {
    var scrollPosition = window.scrollY + 150;

    var sections = [
        { id: 'slider', nav: document.querySelector('#nav > li:first-child') },
        { id: 'band', nav: document.querySelector('#nav a[href="#band"]')?.parentElement },
        { id: 'tour', nav: document.querySelector('#nav a[href="#tour"]')?.parentElement },
        { id: 'contact', nav: document.querySelector('#nav a[href="#contact"]')?.parentElement }
    ];

    sections.forEach(function (section) {
        var el = document.getElementById(section.id);
        if (el) {
            var top = el.offsetTop;
            var height = el.offsetHeight;

            if (scrollPosition >= top && scrollPosition < top + height) {
                document.querySelectorAll('#nav > li').forEach(function (li) {
                    if (!li.querySelector('.subnav')) {
                        li.classList.remove('active');
                    }
                });
                if (section.nav) {
                    section.nav.classList.add('active');
                }
            }
        }
    });
};