(()=>{$(document).ready((function(){var a=e();console.log(a),a?(r(),$("#profileForm").on("submit",(function(e){n(e,a)})),$("#logoutBtn").on("click",(function(){s()}))):o()}));var e=function(){return localStorage.getItem("session_token")||sessionStorage.getItem("session_token")},o=function(){console.log("Login first"),window.location.href="login.html"},r=function(){var e=localStorage.getItem("email");e&&($("#email").val(e),a(e))},a=function(e){$.ajax({type:"GET",url:"".concat("https://fond-generally-stag.ngrok-free.app/Task%201/php","/profile.php"),data:{email:e},dataType:"json",headers:{"ngrok-skip-browser-warning":"69420"},success:function(e){var o;console.log(e),"success"===e.status?(o=e.profile,$("#name").val(o.name||""),$("#phone").val(o.phone||""),$("#dob").val(o.dob||""),$("#age").val(o.age||""),$("#address").val(o.address||""),$("#country").val(o.country||""),$("#state").val(o.state||""),$(".span-name").text(o.name||"Avatar"),$(".span-email").text(o.email||"avatar@gmail.com")):console.error("Error:",e.message)},error:function(e,o,r){console.error("AJAX Error:",o,r),console.error("Response Text:",e.responseText),alert("An error occurred while fetching your profile data. Please try again.")}})},n=function(e,o){e.preventDefault(),console.log("Form submitted"),$("#email").prop("disabled",!1);var r=$("#profileForm").serialize()+"&token="+o;$("#email").prop("disabled",!0),console.log(r),$.ajax({type:"POST",url:"".concat("https://fond-generally-stag.ngrok-free.app/Task%201/php","/profile.php"),data:r,dataType:"json",headers:{"ngrok-skip-browser-warning":"69420"},success:function(e){console.log(e);try{alert(e.message)}catch(e){console.error("Error parsing JSON response:",e),alert("An error occurred. Please try again.")}},error:function(e,o,r){console.error("AJAX Error:",o,r),console.error("Response Text:",e.responseText),alert("An error occurred while processing your request. Please try again.")}})},s=function(){localStorage.removeItem("session_token"),localStorage.removeItem("email"),sessionStorage.removeItem("session_token"),o()}})();