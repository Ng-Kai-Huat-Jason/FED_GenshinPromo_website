/* To allow transition */
const logcontainer = document.getElementById("logcontainer");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  console.log("Register button clicked");
  logcontainer.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  console.log("Login button clicked");
  logcontainer.classList.remove("active");
});

/* SEND SIGN UP FUNCTION*/
document.addEventListener("DOMContentLoaded", function () {
  const APIKEY = "659f75533ff19f5320c89e7b"; // IMPORTANT CHANGE THIS TO YOUR OWN KEY

  document
    .getElementById("register-btn")
    .addEventListener("click", function (e) {
      // Prevent default action of the button
      e.preventDefault();

      let Name = document.getElementById("create_name").value;
      let Email = document.getElementById("create_email").value;
      let Password = document.getElementById("create_password").value;

      // GRAB ALL THE DATA FROM THE FORM and COMBINE INTO A JSON PACKAGE
      let jsondata = {
        name: Name,
        email: Email,
        password: Password,
        quizdone: "No",
      };

      //CHECK FOR EMPTY FIELDS
      if (Name == "" || Email == "" || Password == "" || !Email.includes("@")) {
        window.alert("Please fill in all fields! (Email must contain @)");
        return false;
      }

      createAcc(); // CALL THE FUNCTION TO CREATE ACCOUNT

      function createAcc() {
        fetch(
          `https://assignment2fed-f162.restdb.io/rest/accounts?q={"email":"${Email}"}`,
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
            console.log(response);
            if (response.length > 0) {
              // CHECKS FOR UNIQUE EMAIL
              window.alert("Email already exists!");
              return false;
            } else {
              // IF EMAIL IS UNIQUE, CREATE ACCOUNT
              //CREATE OUR AJAX SETTINGS
              let settings = {
                method: "POST", // POST THE DATA AKA SEND TO THE DATABASE
                headers: {
                  "Content-Type": "application/json",
                  "x-apikey": APIKEY,
                  "Cache-Control": "no-cache",
                },
                body: JSON.stringify(jsondata),
                beforeSend: function () {
                  // CLEAR FORM AFTER SUBMIT
                  document.getElementById("create_name").value = "";
                  document.getElementById("create_email").value = " ";
                  document.getElementById("create_password").value = " ";
                  window.confirm("Account created successfully!");
                },
              };
              fetch(
                "https://assignment2fed-f162.restdb.io/rest/accounts",
                settings
              )
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                  createtier(); // CALL THE FUNCTION TO CREATE TIER (NEW USERS SET TIER TO BRONZE BY DEFAULT)
                  window.alert("Account created successfully!");
                });
            }
          });
      }

      // Create a tier for the user in the tiersystem database
      function createtier() {
        let jsondata = {
          email: Email,
          tier: "Bronze",
          totalpurchases: 0,
        };
        let settings = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify(jsondata),
        };
        fetch("https://assignment2fed-f162.restdb.io/rest/tiersystem", settings)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });
      }
    });

  /* LOGIN FUNCTION */
  document.getElementById("login-btn").addEventListener("click", function (e) {
    var checkiflogged = false;
    // Prevent default action of the button
    e.preventDefault();

    let Email = document.getElementById("login_email").value;
    let Password = document.getElementById("login_password").value;

    // Uses input to check if email and password matches
    // if so then it will log in and grab their details
    fetch(
      `https://assignment2fed-f162.restdb.io/rest/accounts?q={"email":"${Email}","password":"${Password}"}`,
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
        console.log(response);
        if (response.length > 0) {
          console.log(response);
          // Creates a global id variable to track account id
          sessionStorage.setItem("id", response[0]._id);

          // Creates a global name variable to track account name
          sessionStorage.setItem("name", response[0].name);

          //Create a global password variable to track account password
          sessionStorage.setItem("password", response[0].password);

          //Creates a global email variable to track account email
          sessionStorage.setItem("email", response[0].email);

          //Create a global quizdone variable to track if user has done the quiz
          console.log(response[0].quizdone);
          sessionStorage.setItem("quizdone", response[0].quizdone);

          // Creates a global checkiflogged variable to track if user is logged in
          checkiflogged = true;
          sessionStorage.setItem("checkiflogged", checkiflogged);

          

          window.alert("Login successful!");
          window.location.href = "index.html"; // Sends them to homepage
        } else {
          // If email and password do not match alert the user
          window.alert("Invalid email or password!");
        }
      });
  });
});

