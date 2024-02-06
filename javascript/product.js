// Check if quiz is done
var quizDone = sessionStorage.getItem("quizdone");
console.log(quizDone);

// Event listener for the 'load' event
window.addEventListener("load", function () {
  checkifloggedin();

  // Function to check if logged in
  function checkifloggedin() {
    var name = sessionStorage.getItem("name");

    if (sessionStorage.getItem("checkiflogged") == "true") {
      document.getElementById("acc_name").textContent = "Account: " + name;
      getMemberTier();

      if (quizDone == "Yes") {
        window.alert(
          "You have done our quiz, your purchase will be discounted by 10%!"
        );
      } else {
        window.alert(
          "You have not done our quiz located at Free Reward, please do so to get a 10% discount on your purchase!"
        );
      }

      // Call getMemberTier inside the callback of the second then block
    } else {
      makeUserGuest();
    }
  }

  // Function to make user a guest
  function makeUserGuest() {
    console.log("Not Logged in, making user a guest");
    document.getElementById("acc_name").textContent = "Account: Guest";
    document.getElementById("acc_tier").textContent = "No Tier";
    window.alert("You are a guest user. Please login to make purchases!");
  }

  // Function to get member tier
  function getMemberTier() {
    let email = sessionStorage.getItem("email");

    fetch(
      `https://fedassignment2-62ed.restdb.io/rest/tiersystem?q={"email":"${email}"}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache",
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        if (response.length > 0) {
          console.log(response);

          var memberid = response[0]._id; // THIS GRABS THE ID
          sessionStorage.setItem("id", memberid);

          var membertier = response[0].tier; // THIS GRABS THE TIER
          sessionStorage.setItem("tier", membertier);
          // Displays tier and discounts
          if (membertier == "Bronze") {
            document.getElementById("acc_tier").textContent =
              "Tier: " + membertier + " (No Discount)";
          } else if (membertier == "Silver") {
            document.getElementById("acc_tier").textContent =
              "Tier: " + membertier + " ($5 Discount)";
          } else if (membertier == "Gold") {
            document.getElementById("acc_tier").textContent =
              "Tier: " + membertier + " ($10 Discount)";
          }

          var memberpurchased = response[0].totalpurchases; // THIS GRABS THEIR TOTAL PURCHASES
          sessionStorage.setItem("totalpurchases", memberpurchased);
        } else {
          console.log("No Tier as Guest is Not Logged In");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
});

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
  // Array of products
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
    price: 150.45,
  },

  {
    id: 4,
    name: "Klee Mini Figure",
    image: "../images/product4.webp",
    price: 85.3,
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
    price: 15.5,
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
  // Refreshs the cart
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

  // CALCULATE TOTAL PRICE BASED ON TIER AND QUIZ COMPLETION
  let tier = sessionStorage.getItem("tier");

  // Deduct tier-specific amounts
  switch (tier) {
    case "Gold":
      totalPrice -= 10;
      break;
    case "Silver":
      totalPrice -= 5;
      break;
  }

  // Apply 10% discount for quiz completion
  if (quizDone === "Yes") {
    totalPrice *= 0.9;
  }

  if (totalPrice < 0) {
    totalPrice = 0;
  }

  // Display total and quantity
  total.innerHTML = "Total: $" + totalPrice.toFixed(2);
  quantity.innerText = count;
  sessionStorage.setItem("totalprice", totalPrice);
}

// Allow changing quantity of items in cart
function changeQuantity(key, quantity) {
  if (quantity == 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
  }
  reloadCard();
}

/* CHECKOUT FUNCTION */
const APIKEY = "65c27ad7ef3f39e1405278d3";

document.getElementById("checkout-btn").addEventListener("click", function (e) {
  // Prevent default action of the button
  e.preventDefault();
  if (listCards.length == 0) {
    window.alert("Your cart is empty!");
    return;
  } else {
    let name = sessionStorage.getItem("name");

    let price = parseFloat(sessionStorage.getItem("totalprice"));
    let formattedPrice = price.toFixed(2);
    console.log(formattedPrice); 

    console.log(name);
    // Grab each item in the cart and send to database with name of customer
    listCards.forEach((item) => {

      let updateOrder = {
        name: name,
        productname: item.name,
        quantity: item.quantity,
        totalcost: formattedPrice,
      };

      let settings = {
        method: "POST", // POST THE DATA AKA SEND TO THE DATABASE
        headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify(updateOrder),
      };
      console.log(updateOrder);
      fetch("https://fedassignment2-62ed.restdb.io/rest/orders", settings)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    });
    window.alert("Order Send!"); // Make sure the user knows the order has been sent
    listCards = [];
    reloadCard();
    UpdateMember();
    document.getElementById("checkout-btn").innerText = "Total: $" + 0;
  }
});

// Update member tier and their total purchases
function UpdateMember() {
  let email = sessionStorage.getItem("email"); // GRABS NAME FROM SESSION STORAGE

  let totalpurchased = sessionStorage.getItem("totalpurchases"); // GRABS total purchases from getMemberID()
  totalpurchased = parseInt(totalpurchased) + 1; // INCREASES THE TOTAL PURCHASES BY 1
  console.log(totalpurchased); // LOG TO CHECK

  let id = sessionStorage.getItem("id"); // GRABS ID FROM getMemberID()

  let membertier = sessionStorage.getItem("tier"); // GRABS TIER FROM getMemberID()

  // Changes tier based on total purchased and current tier
  if (totalpurchased >= 10 && membertier == "Silver") {
    membertier = "Gold";
  } else if (totalpurchased >= 5 && membertier == "Bronze") {
    membertier = "Silver";
  }

  let updateMember = {
    email: email,
    tier: membertier,
    totalpurchases: totalpurchased,
  };

  // SETS THE TIER AND TOTAL PURCHASES TO SESSION STORAGE SO THAT IF USERS KEEP CHECKING OUT IT WILL KEEP UPDATING
  sessionStorage.setItem("tier", membertier); // SETS THE TIER TO SESSION STORAGE
  // Displays tier and discounts
  if (membertier == "Bronze") {
    document.getElementById("acc_tier").textContent =
      "Tier: " + membertier + " (No Discount)";
  } else if (membertier == "Silver") {
    document.getElementById("acc_tier").textContent =
      "Tier: " + membertier + " ($5 Discount)";
  } else if (membertier == "Gold") {
    document.getElementById("acc_tier").textContent =
      "Tier: " + membertier + " ($10 Discount)";
  }
  sessionStorage.setItem("totalpurchases", totalpurchased); // SETS THE TOTAL PURCHASES TO SESSION STORAGE

  console.log(id); // LOG TO CHECK
  console.log(updateMember); // LOG TO CHECK

  fetch(`https://fedassignment2-62ed.restdb.io/rest/tiersystem/${id}`, {
    // CHANGE TO YOUR URL
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": APIKEY,
      "Cache-Control": "no-cache",
    },
    body: JSON.stringify(updateMember),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log("Member updated successfully:", response);
    })
    .catch((error) => {
      console.error("Error updating member:", error);
      window.alert(
        "Error updating member. Please check the console for details."
      );
    });
}
