$(document).ready(function () {
  $("#registerForm").on("submit", function (event) {
    let formData = $(this).serialize();
    registerFormSubmit(event, formData);
  });
});

let registerFormSubmit = (event, formData) => {
  console.log(formData);
  event.preventDefault();
  $.ajax({
    type: "POST",
    url: "php/register.php",
    data: formData,
    success: function (response) {
      console.log(response);
      var res = JSON.parse(response);
      alert(res.message);
      if (res.status === "success") {
        window.location.href = "login.html";
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
};
