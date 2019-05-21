$(document).ready(function() {
  if (location.pathname === "/dashboard" && !localStorage.getItem("jwt")) {
    location.href = "/auth";
  }

  if (location.pathname === "/" && localStorage.getItem("jwt")) {
    location.href = "/dashboard";
  }

  if (location.pathname === "/auth" && localStorage.getItem("jwt")) {
    location.href = "/dashboard";
  }

  //Get data from player

  let dataGetPlayer = {
    headers: {
      jwt: localStorage.jwt
    }
  };

  if (location.pathname === "/dashboard") {
    $.ajax({
      type: "GET",
      beforeSend: function(req) {
        req.setRequestHeader("x-auth-token", localStorage.jwt);
      },
      url: "http://localhost:1702/api/players",
      success: function(data) {
        data.map(item => $("#data").append(`<li>${item.playerName}</li>`));
      }
    });
  }

  //Set header

  $("#loginStatus").hide();
  // validate before do ajax
  $("#register").click(function() {
    let input = {
      userAccount: $("#registerAccount").val(),
      password: $("#registerPassword").val(),
      email: $("#email").val(),
      userName: $("#userName").val(),
      teamName: $("#teamName").val(),
      DOB: $("#DOB").val()
    };
    if ($("#registerPassword").val() !== $("#confirmPassword").val())
      authStatus(
        "registerStatus",
        "alert-success",
        "alert-danger",
        "Password confirmation and Password must match."
      );
    else {
      $.post("http://localhost:1702/api/users", input, function(data) {
        authStatus(
          "registerStatus",
          "alert-danger",
          "alert-success",
          "Register success, please wait few second...."
        );
        localStorage.jwt = data.token;
        setTimeout(() => {
          location.href = "/dashboard";
        }, 2000);
      }).fail(function(err) {
        authStatus(
          "registerStatus",
          "alert-success",
          "alert-danger",
          err.responseText
        );
      });
    }
  });
  //Register
  //login
  $("#login").click(function() {
    let userAccount = $("#userAccount").val();
    let password = $("#password").val();
    let input = {
      userAccount: userAccount,
      password: password
    };
    //Do something
    $.post("http://localhost:1702/api/login", input, function(data) {
      authStatus(
        "loginStatus",
        "alert-danger",
        "alert-success",
        "Login success, please wait few second...."
      );
      localStorage.jwt = data.token;
      // localStorage.setItem("jwt", data.token);
      setTimeout(() => {
        location.href = "/dashboard";
      }, 1500);
    }).fail(function(err) {
      // console.log(err.responseText);
      authStatus(
        "loginStatus",
        "alert-success",
        "alert-danger",
        err.responseText
      );
    });
  });
});

function authStatus(id, removeStatus, addStatus, text) {
  return $("#" + id)
    .show()
    .removeClass(removeStatus)
    .addClass(addStatus)
    .text(text);
}
