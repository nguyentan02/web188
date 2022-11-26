//  Nguyễn Duy Tân 
//  các tài liệu tham khảo 
// --F8--
// --(Shopping Cart)--

function isExistedInCart(div__item, arrCart) {
    let myIndex = -1;
    arrCart.forEach((itemCard, index) => {
        if (div__item.id == itemCard.id) myIndex = index;
    });
    return myIndex;
}
let updateCart = []
function loadShopingCart() {
    const selectedItems = (evt) => {
        let id = evt.target;
        // console.log(id.parentElement.parentElement.children[2].children[2].textContent);
        getItem = document.getElementById(id)
        if (typeof Storage !== undefined) {
            let newItem = {
                id: id.parentElement.parentElement.id,
                name: id.parentElement.parentElement.children[1].textContent,
                price: id.parentElement.parentElement.children[2].children[2].textContent.slice(0, -2).split('.').join(''),
                quantity: 1,
                urlImg: id.parentElement.parentElement.children[0].currentSrc
            };
            if (JSON.parse(localStorage.getItem('cartItems')) === null) {
                updateCart.push(newItem);
                localStorage.setItem('cartItems', JSON.stringify(updateCart));
                // window.location.reload();
            } else {
                updateCart = JSON.parse(localStorage.getItem('cartItems'));
                if ((index = isExistedInCart(newItem, updateCart)) >= 0) {
                    updateCart[index].quantity++;
                } else {
                    updateCart.push(newItem);
                }
            }
            localStorage.setItem('cartItems', JSON.stringify(updateCart));
            // window.location.reload();
        } else {
            alert('Local storage is not working on your browser');
        }
    }

    const attchingEvent = evt => evt.addEventListener('click', selectedItems);
    const add2CartLinks = document.getElementsByClassName('span__icon_cart');
    let arrCartLinks = Array.from(add2CartLinks);
    arrCartLinks.forEach(attchingEvent);
}

// trang chu
function loadShopingCartHome() {
    const selectedItems = (evt) => {
        let id = evt.target;
        console.log(id.parentElement.parentElement.children[2].children[2].textContent);
        getItem = document.getElementById(id)
        if (typeof Storage !== undefined) {
            let newItem = {
                id: id.parentElement.parentElement.id,
                name: id.parentElement.parentElement.children[1].textContent,
                price: id.parentElement.parentElement.children[2].children[2].textContent.slice(0, -2).split('.').join(''),
                quantity: 1,
                urlImg: id.parentElement.parentElement.children[0].currentSrc
            };
            if (JSON.parse(localStorage.getItem('cartItems')) === null) {
                updateCart.push(newItem);
                localStorage.setItem('cartItems', JSON.stringify(updateCart));
                // window.location.reload();
            } else {
                updateCart = JSON.parse(localStorage.getItem('cartItems'));
                if ((index = isExistedInCart(newItem, updateCart)) >= 0) {
                    updateCart[index].quantity++;
                } else {
                    updateCart.push(newItem);
                }
            }
            localStorage.setItem('cartItems', JSON.stringify(updateCart));
            // window.location.reload();
        } else {
            alert('Local storage is not working on your browser');
        }
    }

    const attchingEvent = evt => evt.addEventListener('click', selectedItems);
    const add2CartLinks = document.getElementsByClassName('cart');
    let arrCartLinks = Array.from(add2CartLinks);
    arrCartLinks.forEach(attchingEvent);
}
const order = () => {
    let Cart = JSON.parse(localStorage.getItem('cartItems'), [])
    console.log(Cart)
    let btn_order = confirm('Bạn muốn đặt hàng?')
    alert('Đặt hàng thành công, Số tiền phải trả là: ' + formatCurrency(Math.floor(1.1 * total)))
    window.location.reload();

}

function showCart() {
    if (localStorage.cartItems == undefined) {
        alert('Giỏ hàng đang trống .Trở về trang sản phẩm');
        location.href = "sanpham.html";
    } else {
        let customerCart = JSON.parse(localStorage.getItem('cartItems'));
        // console.log(customerCart);
        const tblHead = document.getElementsByTagName('thead')[0];
        const tblBody = document.getElementsByTagName('tbody')[0];
        const tblHFoot = document.getElementsByTagName('tfoot')[0];
        let headColumns = bodyRows = footColumns = '';
        headColumns += '<tr><th>STT</th><th>ID</th><th>Tên Sản phẩm</th> <th>Số lượng</th><th>Giá</th><th>Delete</th></tr >';
        tblHead.innerHTML = headColumns;
        vat = total = amountPaid = 0;
        no = 0;
        if (customerCart[0] === null) {
            bodyRows += '<tr><td colspan="5">No items found</td></tr>'
        } else {
            customerCart.forEach(div__item => {
                bodyRows += '<tr><td>' + ++no + '</td><td>' + div__item.id + '</td><td>' + div__item.name
                    + '</td><td>' + div__item.quantity + '</td><td>' + formatCurrency(
                        div__item.price.replace(/[^0-9]/g, "")) + '</td><td><a href= "#" onclick = "deleteCart(this)"> Delete</a></td></tr >';
                total += Number(div__item.quantity) * Number(div__item.price.replace(/[^0-9]/g, ""));
            });
        }
        tblBody.innerHTML = bodyRows;
        footColumns += '<tr><td colspan = "4">Tổng:</td> <td>' + formatCurrency(total) +
            '</td><td rowspan = "3"><a href= "#" onclick ="btn_order()">Đặt hàng</a></td></tr>';
        footColumns += '<tr><td colspan = "4">VAT (10%):</td> <td>' + formatCurrency(Math.floor(total * 0.1))
        footColumns += '<tr><td colspan = "4">Amount paid:</td> <td>' + formatCurrency(Math.floor(1.1 * total)) +
            '</td></tr>'
        tblHFoot.innerHTML = footColumns;
    }
}
function deleteCart(evt) {
    let custommerCart = JSON.parse(localStorage.getItem('cartItems'));
    // console.log();
    let id = evt.parentElement.parentElement.children[1].textContent;
    let find;
    custommerCart.findIndex((element, index) => {
        if (element.id == id) {
            find = index;
        }
    });
    if (find !== undefined) {
        if (custommerCart[find].quantity > 1) {
            custommerCart[find].quantity--
        } else {
            custommerCart = custommerCart.filter(item => {
                return item.id !== id
            })
        }
    }

    localStorage.setItem('cartItems', JSON.stringify(custommerCart))
    window.location.reload()
};

const formatPercentage = (value, locale = "en-US") => {
    return new Intl.NumberFormat(locale, {
        style: "percent",
        minimumFractionDigits: 0,
        maximumFractionDigits: 1
    }).format(value);
};
const formatCurrency = (amount, locale = "vi-VN") => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(amount);
};

const checkItem = (arr) => {
    let temp = -1
    arr.forEach(item => {
        if (item.quantity > 0) temp = 1
    })
    return temp
}
const btn_order = () => {
    let Cart = JSON.parse(localStorage.getItem('cartItems'), [])

    if (checkItem(Cart) !== -1) {
        let selection = confirm('Đặt Hàng?')
        if (selection) {
            totalbill = formatCurrency(Math.floor(1.1 * total))
            alert('Đặt hàng thành công, Số tiền phải trả là: ' + totalbill)
            Cart = Cart.filter(item => {
                return item.quantity < 0
            })
            localStorage.setItem('cartItems', JSON.stringify(Cart))
            window.location.reload()
        }
    } else {
        alert('Bạn chưa có sản phẩm trong giỏ hàng!')
        location.href = "sanpham.html"
    }
}



// xem thêm trang tin tức 
let check = 0;
function click__more() {
    let hidden = document.getElementsByClassName('td__module-wrap')
    if (check === 0) {
        for (i = 0; i < hidden.length; i++) {
            hidden[i].style.display = 'block';

        }
        document.getElementsByClassName('td__load--more-click')[0].innerText = "Ẩn"
        check = 1;
    } else {
        for (i = 0; i < hidden.length; i++) {
            hidden[i].style.display = 'none';
        }
        document.getElementsByClassName('td__load--more-click')[0].innerText = "Xem thêm"
        check = 0;
    }
}


// reponsive menu nav mobile
var header = document.getElementById('header__nav');
// mobile--menu renposive
var mobileMenu = document.getElementById('nav__menu');
var headerHeight = header.clientHeight;
mobileMenu.onclick = function () {
    var isClosed = header.clientHeight === headerHeight;
    if (isClosed) {
        header.style.height = 'auto'
    } else {
        header.style.height = '60px'
    }
}


//  button to top 

let mybutton = document.getElementById("myBtn");
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}