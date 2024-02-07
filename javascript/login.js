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
  const APIKEY = "65c359a4c34784f7ca1877d9"; // IMPORTANT CHANGE THIS TO YOUR OWN KEY

  document
    .getElementById("register-btn")
    .addEventListener("click", function (e) {
      // Prevent default action of the button
      e.preventDefault();

      let Name = document.getElementById("create_name").value;
      let Email = document.getElementById("create_email").value;
      let Password = document.getElementById("create_password").value;

      // GRAB ALL THE DATA FROM THE FORM and COMBINE INTO A JSON PACKAGE
      let createAccData = {
        name: Name,
        email: Email,
        password: Password,
      };

      //CHECK FOR EMPTY FIELDS
      if (Name == "" || Email == "" || Password == "" || !Email.includes("@")) {
        window.alert("Please fill in all fields! (Email must contain @)");
        return false;
      }

      createAcc(); // CALL THE FUNCTION TO CREATE ACCOUNT

      function createAcc() {
        fetch(
          `https://genshinpromodb-33a4.restdb.io/rest/accounts?q={"email":"${Email}"}`,
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
                body: JSON.stringify(createAccData),
                beforeSend: function () {
                  // CLEAR FORM AFTER SUBMIT
                  document.getElementById("create_name").value = "";
                  document.getElementById("create_email").value = " ";
                  document.getElementById("create_password").value = " ";
                  window.confirm("Account created successfully!");
                },
              };
              fetch(
                "https://genshinpromodb-33a4.restdb.io/rest/accounts",
                settings
              )
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                  createtier();
                  createQuiz(); // CALL THE FUNCTION TO CREATE TIER (NEW USERS SET TIER TO BRONZE BY DEFAULT)
                  window.alert("Account created successfully!");
                });
            }
          });
      }

      // Create a tier for the user in the tiersystem database
      function createtier() {
        let createAccTier = {
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
          body: JSON.stringify(createAccTier),
        };
        fetch("https://genshinpromodb-33a4.restdb.io/rest/tiersystem", settings)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });
      }

      function createQuiz() {
        let createAccQuiz = {
          email: Email,
          quizdone: "No",
        };
        let settings = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify(createAccQuiz),
        };
        fetch("https://genshinpromodb-33a4.restdb.io/rest/quiz", settings)
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
      `https://genshinpromodb-33a4.restdb.io/rest/accounts?q={"email":"${Email}","password":"${Password}"}`,
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

          // Creates a global id variable to track account id
          sessionStorage.setItem("id", response[0]._id);
          console.log(sessionStorage.getItem("id"));

          // Creates a global name variable to track account name
          sessionStorage.setItem("name", response[0].name);
          console.log(sessionStorage.getItem("name"));

          //Creates a global email variable to track account email
          sessionStorage.setItem("email", response[0].email);

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
