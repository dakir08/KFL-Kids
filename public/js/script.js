$(document).ready(function() {
  // GENERATE QR CODE

  state = {
    playerData: []
  };

  if (
    (location.pathname === "/dashboard" || location.pathname === "/myteam") &&
    !localStorage.getItem("jwt")
  ) {
    location.href = "/auth";
  }

  // if (location.pathname === "/" && localStorage.getItem("jwt")) {
  //   location.href = "/dashboard";
  // }

  // if (location.pathname === "/auth" && localStorage.getItem("jwt")) {
  //   location.href = "/dashboard";
  // }
  if (location.pathname === "/" && localStorage.getItem("jwt")) {
    location.href = "/myteam";
  }

  if (location.pathname === "/auth" && localStorage.getItem("jwt")) {
    location.href = "/myteam";
  }

  //Get data from player

  let dataGetPlayer = {
    headers: {
      jwt: localStorage.jwt
    }
  };

  if (location.pathname === "/myteam") {
    $.ajax({
      type: "GET",
      beforeSend: function(req) {
        req.setRequestHeader("x-auth-token", localStorage.jwt);
      },
      url: "http://localhost:1702/api/players",
      success: function(data) {
        data.map(item => {
          $("#playerData").append(
            `<tr><td><img src=${
              item.img
            } style='width:70px;height:70px;'/></td><td>${
              item.playerName
            }</td><td>${item.team}</td><td>${item.rank}</td><td>${
              item.gamePlayed
            }</td><td>${item.totalScore}</td><td>${
              item.value
            }</td><td><button class='btn btn-default btn-sm btn-primary' onClick=addPlayer('${
              item._id
            }')>Add Player</button></td></tr>`
          );
          state.playerData.push(item);
        });
        pagination();
      }
    });
    const userAccount = parseJwt(localStorage.jwt).userAccount;
    const url = `http://localhost:1702/api/users/${userAccount}`;
    $.ajax({
      type: "GET",
      beforeSend: function(req) {
        req.setRequestHeader("x-auth-token", localStorage.jwt);
      },
      url,
      success: function(data) {
        const { players } = data;
        if (players.length === 0)
          $("#showPlayers").append(
            "<h2>You need to choose at least 1 player in your team!</h2>"
          );
        else {
          let i = 0;
          players.map(player => {
            i++;
            $("#showPlayers").append(`<div class="flip-card player${i}">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <img src='${player.img}' style='width:140px;height:140px;'/>
            </div>
            <div class="flip-card-back">
              <h4>${player.playerName}</h4>
              <font color="blue">
              <p>Team: ${player.team}</p>
              <p>Point: ${player.totalScore}</p>
              </font>
              <button class='btn btn-default btn-sm btn-primary' onClick=deletePlayer('${
                player._id
              }')>Delete Player</button>
            </div>
          </div>
        </div>`);
          });
        }
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
          location.href = "/myteam";
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
        location.href = "/myteam";
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

function pagination() {
  var req_num_row = 10;
  var $tr = jQuery("tbody tr");
  var total_num_row = $tr.length;
  var num_pages = 0;
  if (total_num_row % req_num_row == 0) {
    num_pages = total_num_row / req_num_row;
  }
  if (total_num_row % req_num_row >= 1) {
    num_pages = total_num_row / req_num_row;
    num_pages++;
    num_pages = Math.floor(num_pages++);
  }
  for (var i = 1; i <= num_pages; i++) {
    jQuery("#pagination").append("<a href='#' class='btn'>" + i + "</a>");
  }
  $tr.each(function(i) {
    jQuery(this).hide();
    if (i + 1 <= req_num_row) {
      $tr.eq(i).show();
    }
  });
  jQuery("#pagination a").click(function(e) {
    e.preventDefault();
    $tr.hide();
    var page = jQuery(this).text();
    var temp = page - 1;
    var start = temp * req_num_row;
    //alert(start);

    for (var i = 0; i < req_num_row; i++) {
      $tr.eq(start + i).show();
    }
  });
}

function deletePlayer(playerID) {
  let playerArray = [];
  playerArray.push(playerID);
  const userAccount = parseJwt(localStorage.jwt).userAccount;
  const data = {
    players: playerArray
  };
  const url = `http://localhost:1702/api/users/collection/${userAccount}`;

  const url2 = `http://localhost:1702/api/users/${userAccount}`;

  $.ajax({
    type: "DELETE",
    beforeSend: function(req) {
      req.setRequestHeader("x-auth-token", localStorage.jwt);
    },
    url,
    data,
    success: function(data) {
      myAlertTop({
        alertMessage: "Delete player <strong>success</strong> !",
        alertStatus: "success"
      });
    },
    error: function(err) {
      console.log(err.responseText);
      myAlertTop({
        alertMessage: err.responseText
      });
    }
  });
  setTimeout(() => {
    $.ajax({
      type: "GET",
      beforeSend: function(req) {
        req.setRequestHeader("x-auth-token", localStorage.jwt);
      },
      url: url2,
      success: function(data) {
        const { players } = data;
        console.log(players);
        let i = 0;
        $("#showPlayers").empty();
        players.map(player => {
          i++;
          $("#showPlayers").append(`<div class="flip-card player${i}">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img src='${player.img}' style='width:140px;height:140px;'/>
          </div>
          <div class="flip-card-back">
            <h4>${player.playerName}</h4>
            <font color="blue">
            <p>Team: ${player.team}</p>
            <p>Point: ${player.totalScore}</p>
            </font>
            <button class='btn btn-default btn-sm btn-primary' onClick=deletePlayer('${
              player._id
            }')>Delete Player</button>
          </div>
        </div>
      </div>`);
        });
      }
    });
  }, 1600);
}

function addPlayer(playerID) {
  let playerArray = [];
  playerArray.push(playerID);
  const userAccount = parseJwt(localStorage.jwt).userAccount;
  const data = {
    players: playerArray
  };
  const url = `http://localhost:1702/api/users/collection/${userAccount}`;

  const url2 = `http://localhost:1702/api/users/${userAccount}`;

  $.ajax({
    type: "PUT",
    beforeSend: function(req) {
      req.setRequestHeader("x-auth-token", localStorage.jwt);
    },
    url,
    data,
    success: function(data) {
      myAlertTop({
        alertMessage: "Add player <strong>success</strong> !",
        alertStatus: "success"
      });
    },
    error: function(err) {
      console.log(err.responseText);
      myAlertTop({
        alertMessage: err.responseText
      });
    }
  });
  setTimeout(() => {
    $.ajax({
      type: "GET",
      beforeSend: function(req) {
        req.setRequestHeader("x-auth-token", localStorage.jwt);
      },
      url: url2,
      success: function(data) {
        const { players } = data;
        console.log(players);
        let i = 0;
        $("#showPlayers").empty();
        players.map(player => {
          i++;
          $("#showPlayers").append(`<div class="flip-card player${i}">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img src='${player.img}' style='width:140px;height:140px;'/>
          </div>
          <div class="flip-card-back">
            <h4>${player.playerName}</h4>
            <font color="blue">
            <p>Team: ${player.team}</p>
            <p>Point: ${player.totalScore}</p>
            </font>
            <button class='btn btn-default btn-sm btn-primary' onClick=deletePlayer('${
              player._id
            }')>Delete Player</button>
          </div>
        </div>
      </div>`);
        });
      }
    });
  }, 1600);
}

//decode JWT
function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = decodeURIComponent(
    atob(base64Url)
      .split("")
      .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(base64);
}

//Alert top
function myAlertTop({ alertStatus, alertMessage }) {
  const removedClass =
    alertStatus === "success" ? "alert-danger" : "alert-success";
  const addedClass =
    alertStatus !== "success" ? "alert-danger" : "alert-success";

  $("#alert").removeClass(removedClass);
  $("#alert").addClass(addedClass);

  $("#alertMessage").html(alertMessage);
  $("#alert").show();
  setTimeout(function() {
    $("#alert").hide("slow");
  }, 2000);
}
