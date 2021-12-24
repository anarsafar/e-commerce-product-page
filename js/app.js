const minus = document.querySelector(".minus");
const plus = document.querySelector(".plus");
const displayCount = document.querySelector(".count");
const addCartBtn = document.querySelector("#add-to-cart");
const cart = document.querySelector(".card");
const cartInfo = document.querySelector("#card-info");
const displayCheckOut = document.querySelector(".checkout");
const emptyMsg = document.querySelector(".empty-msg");
const checkOutBtn = document.querySelector(".checkout-btn");
const cardCount = document.querySelector(".card-count");

let count = 0;
let checkOut = [];

plus.addEventListener("click", () => {
    count++;
    displayCount.innerHTML = count;
});

minus.addEventListener("click", () => {
    if (count === 0) return;
    count--;
    displayCount.innerHTML = count;
});

addCartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (count === 0) return;
    checkOut.push({ count: count, itemID: uuidv4() });
    displayCheckOut.innerHTML += `
    <div class="item flex-vertical">
        <div class="item-img">
            <img src="./images/image-product-1-thumbnail.jpg" alt="" />
        </div>
        <div class="item-info" id="item-info">
            Fall Limited Edition Sneaker $125.00 x
            <span class="item-count">${count}</span>
            <span class="total">$${precise(count)}</span>
        </div>
        <div class="delete-item">
            <img src="./images/icon-delete.svg" alt="" 
                data-id="${checkOut[checkOut.length - 1].itemID}" />
        </div>
    </div>`;
    count = 0;
    displayCount.innerHTML = count;
    checkItems();
    const deleteItem = document.querySelectorAll(".delete-item");
    deleteItem.forEach((delBtn) =>
        delBtn.addEventListener("click", (e) => {
            const dataID = e.target.getAttribute("data-id");
            checkOut = checkOut.filter((item) => item.itemID != dataID);
            const parent = e.target.parentElement.parentElement
            parent.style.display = "none"
            checkItems();
        })
    );
});

const precise = (count) => (Number.parseFloat(count) * 125).toPrecision(5)

cart.addEventListener("click", () => {
    cartInfo.classList.toggle("hide");
});

//hide cart clicking outside a div
document.addEventListener("mouseup", (e) => {
    if (!cartInfo.contains(e.target) && !cartInfo.classList.contains("hide")) {
        cartInfo.classList.add("hide");
    }
});

function checkItems() {
    if (checkOut.length !== 0) {
        let sum = 0;
        checkOut.forEach((item) => (sum += item.count));
        cardCount.innerHTML = sum;
        cardCount.classList.remove("hide");
        emptyMsg.classList.add("hide");
        checkOutBtn.classList.remove("hide");
    } else {
        cardCount.classList.add("hide");
        emptyMsg.classList.remove("hide");
        checkOutBtn.classList.add("hide");
    }
}

//generate random id for list items
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const thumbnails = document.querySelectorAll('.product-item');
const mainImg = document.querySelector('.main-img');
const mainImgSecond = document.querySelector('.main-img-second');

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', (e) => {
        const src = e.target.src;
        mainImg.src = `${src.substring(0, src.length - 14)}.jpg`;
        mainImgSecond.src = `${src.substring(0, src.length - 14)}.jpg`;
        thumbnails.forEach(th => {
            let thumb = th.children[0].src;

            if (`${thumb.substring(0, thumb.length - 14)}.jpg` == mainImg.src) {
                th.children[0].classList.add('active-img');
                th.classList.add('active-img-div')

            } else {
                th.children[0].classList.remove('active-img');
                th.classList.remove('active-img-div')
            }
        })
    })
})

const openModal = document.querySelector(".open-modal");
const modal = document.querySelector('.my-modal');
const close = document.querySelector('.close-btn');

openModal.addEventListener('click', () => {
    modal.classList.add('open');
})

close.addEventListener('click', () => {
    modal.classList.remove('open');
})

const previusBtn = document.querySelector('.previus-product');
const nextBtn = document.querySelector('.next-product');

nextBtn.onclick = () => {
    let currentProduct = parseInt(mainImgSecond.src.charAt(mainImg.src.length - 5));
    let nextProduct = null;
    if (++currentProduct > 4) {
        nextProduct = 1;
    } else {
        nextProduct = currentProduct++
    }

    testThumbnails(nextProduct)
}

previusBtn.onclick = () => {
    let currentProduct = parseInt(mainImgSecond.src.charAt(mainImg.src.length - 5));
    let nextProduct = null;
    if (--currentProduct === 0) {
        nextProduct = 4
    } else {
        nextProduct = currentProduct--
    }
    testThumbnails(nextProduct)
}

const testThumbnails = (nextProduct) => {
    thumbnails.forEach(th => {
        if (th.classList.contains('active-img-div')) {
            th.classList.remove('active-img-div');
            th.children[0].classList.remove('active-img');
        } else if (th.children[0].src.charAt(th.children[0].src.length - 15) == nextProduct) {
            th.classList.add('active-img-div');
            th.children[0].classList.add('active-img');
        }
    })
    mainImgSecond.src = `./images/image-product-${nextProduct}.jpg`;
    mainImg.src = `./images/image-product-${nextProduct}.jpg`;
}

const menu = document.querySelector("#menu-btn");
const mobileMenu = document.querySelector("nav");
const linkContainer = document.querySelector('.link-container');

function toggle() {
    document.querySelector('.bottom-line').classList.toggle('open')
    document.querySelector('.top-line').classList.toggle('open');
    document.querySelector('.middle-line').classList.toggle('open')
    mobileMenu.classList.toggle("open");
    linkContainer.classList.toggle('open')
    document.body.classList.toggle("no-scroll");
}

window.onclick = (e) => {
    if (e.target == mobileMenu) {
        toggle()
    } else if (e.target == modal) {
        modal.classList.remove('open');
    }
}

menu.addEventListener("click", toggle);