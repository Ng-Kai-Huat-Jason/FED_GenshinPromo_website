/* CHECK IF LOGGED IN */
window.addEventListener("load", checkifloggedin);

var quizDone = sessionStorage.getItem("ifPlayed");

function checkifloggedin() {
  var name = sessionStorage.getItem("name");
  if (sessionStorage.getItem("checkiflogged") == "true") {
    document.getElementById("acc_name").textContent = "Account: " + name;
    if (quizDone == "true") {
      window.alert(
        "You have done our quiz , your purchase will be discounted by 10%!"
      );
    } else {
      window.alert(
        "You have not done our quiz located at Free Reward, please do so to get a 10% discount on your purchase!"
      );
    }
  } else {
    document.getElementById("acc_name").textContent = "Account: Guest";
    window.alert("You are a guest user. Please login to make purchases!");
  }
}

/* PRODUCT PAGE */
let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});
closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

let products = [
  {
    id: 1,
    name: "Slime Plush Set",
    image: "../images/product1.jpg",
    price: 99.99,
  },

  {
    id: 2,
    name: "Kaeya Mini Figure",
    image: "../images/product2.webp",
    price: 150,
  },

  {
    id: 3,
    name: "Ayaka Figurine",
    image: "../images/product3.webp",
    price: 34.5,
  },

  {
    id: 4,
    name: "Klee Mini Figure",
    image: "../images/product4.webp",
    price: 29.5,
  },

  {
    id: 5,
    name: "Hilichurl Figure",
    image: "../images/product5.webp",
    price: 29.4,
  },

  {
    id: 6,
    name: "Amber Doll Plush",
    image: "../images/product6.jpg",
    price: 12.35,
  },
];
let listCards = [];
function initApp() {
  products.forEach((value, key) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">$${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Cart</button>`;
    list.appendChild(newDiv);
  });
}
initApp();
function addToCard(key) {
  if (document.getElementById("acc_name").textContent == "Account: Guest") {
    window.alert("You are unable to add to cart as you are a guest user.");
  } else {
    if (listCards[key] == null) {
      // copy product form list to list card
      listCards[key] = JSON.parse(JSON.stringify(products[key]));
      listCards[key].quantity = 1;
    }
  }
  reloadCard();
}
function reloadCard() {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, key) => {
    totalPrice = totalPrice + value.price;
    count = count + value.quantity;
    if (value != null) {
      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>$${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${
        value.quantity - 1
      })">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${
        value.quantity + 1
      })">+</button>
                </div>`;
      listCard.appendChild(newDiv);
    }
  });

  if (quizDone == "true") {
    totalPrice = totalPrice * 0.9;
    total.innerHTML = "Total: $" + totalPrice.toLocaleString();
    quantity.innerText = count;
  } else {
    total.innerText = "Total: $" + totalPrice.toLocaleString();
    quantity.innerText = count;
  }
}

function changeQuantity(key, quantity) {
  if (quantity == 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
  }
  reloadCard();
}

/* SEND CART TO DATABASE */
const APIKEY = "659f75533ff19f5320c89e7b";

document.getElementById("checkout-btn").addEventListener("click", function (e) {
  // Prevent default action of the button
  e.preventDefault();

  // Grab each item in the cart and send to database
  listCards.forEach((item) => {
    let jsondata = {
      name: sessionStorage.getItem("name"),
      productname: item.name,
      quantity: item.quantity,
      totalcost: item.price,
    };

    let settings = {
      method: "POST", // POST THE DATA AKA SEND TO THE DATABASE
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify(jsondata),
    };
    console.log(jsondata);
    fetch("https://assignment2fed-f162.restdb.io/rest/orders", settings)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  });
  window.alert("Order Send!");
  listCards = [];
  document.getElementById("checkout-btn").innerText = 0;
});