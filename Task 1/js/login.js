$(document).ready(function () {
  if (localStorage.getItem("rememberMe") === "true") {
    $("#username").val(localStorage.getItem("username"));
    $("#password").val(localStorage.getItem("password"));
    $("#form-checkbox").prop("checked", true);
  }

  $("#loginForm").on("submit", function (event) {
    event.preventDefault();

    var formData = $(this).serialize();
    var rememberMe = $("#form-checkbox").is(":checked");

    loginUser(formData, rememberMe);
  });
});

function loginUser(formData, rememberMe) {
  console.log(formData);
  $.ajax({
    type: "POST",
    url: "php/login.php",
    dataType: "json",
    data: formData,
    success: function (response) {
      console.log(response);

      var res;
      try {
        res = JSON.parse(response);
      } catch (error) {
        console.error("Failed:", error);
        return;
      }

      if (res.status === "success") {
        localStorage.setItem("email", res.email);
        if (rememberMe) {
          localStorage.setItem("session_token", res.token);
          localStorage.setItem("rememberMe", true);
          localStorage.setItem("username", $("#username").val());
          localStorage.setItem("password", $("#password").val());
        } else {
          sessionStorage.setItem("session_token", res.token);
          localStorage.removeItem("rememberMe");
          localStorage.removeItem("username");
          localStorage.removeItem("password");
        }
        window.location.href = "profile.html";
      } else {
        alert(res.message);
      }
    },
    error: function (xhr, status, error) {
      console.error("AJAX Error:", status, error);
      console.error("Response Text:", xhr.responseText);
      alert(
        "An error occurred while processing your request. Please try again."
      );
    },
  });
}
