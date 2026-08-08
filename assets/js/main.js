const buyBtns = document.querySelectorAll('.js-buy-ticket')
const modal = document.querySelector('.js-modal')
const modalClose = document.querySelector('.js-modal-close')

//Hàm hiển thị modal mua vé
function showBuyTickets() {
    modal.classList.add('open')
}

//Hàm ẩn modal mua vé
function hideBuyTickets() {
    modal.classList.remove('open')
}   

//Lặp qua từng thẻ button và nghe hành vi click
for (const buyBtn of buyBtns) {
    buyBtn.addEventListener('click', showBuyTickets)  
}

//Nghe hành vi click vào button close
modalClose.addEventListener('click', hideBuyTickets)
