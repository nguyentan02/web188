
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
function showCart() {
    if (localStorage.cartItems == undefined) {
        alert('Your cart is emty. Please go back homepage to order items.');
        location.href = "sanpham.html";
    } else {
        let customerCart = JSON.parse(localStorage.getItem('cartItems'));
        // console.log(customerCart);
        const tblHead = document.getElementsByTagName('thead')[0];
        const tblBody = document.getElementsByTagName('tbody')[0];
        const tblHFoot = document.getElementsByTagName('tfoot')[0];
        let headColumns = bodyRows = footColumns = '';
        headColumns += '<tr><th>No</th><th>Item Id</th><th>Item Name</th> <th>Quantity</th><th> Item Price</th><th>Delete</th></tr >';
        tblHead.innerHTML = headColumns;
        vat = total = amountPaid = 0;
        no = 0;
        if (customerCart[0] === null) {
            bodyRows += '<tr><td colspan="5">No items found</td></tr>'
        } else {
            customerCart.forEach(div__item => {
                total += Number(div__item.quantity) * Number(div__item.price.replace(/[^0-9]/g, ""));
                bodyRows += '<tr><td>' + ++no + '</td><td>' + div__item.id + '</td><td>' + div__item.name
                    + '</td><td>' + div__item.quantity + '</td><td>' + formatCurrency(
                        div__item.price.replace(/[^0-9]/g, "")) + '</td><td><a href= "#" onclick = "deleteCart(this)"> Delete</a></td></tr >';
            });
        }
        tblBody.innerHTML = bodyRows;
        footColumns += '<tr><td colspan = "4">Total:</td> <td>' + formatCurrency(total) +
            '</td><td rowspan = "3"></td></tr>';
        footColumns += '<tr><td colspan = "4">VAT (10%):</td> <td>' + formatCurrency(Math.floor(total * 0.1)) +
            '</td></tr>';
        footColumns += '<tr><td colspan = "4">Amount paid:</td> <td>' + formatCurrency(Math.floor(1.1 * total)) +
            '</td></tr>';
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