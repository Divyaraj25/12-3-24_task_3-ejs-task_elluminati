$(document).on("click", "#edit", function (e) {
  e.preventDefault();

  console.log("taking data...");

  // get the id of the selected user
  const id = e.target.parentNode.parentNode.id;

  // get email, username, contact, and profileimage name from the selected user
  let email = $(`div[id=${id}]`).find("#Email").text().trim();
  let username = $(`div[id=${id}]`).find("#Name").text().trim();
  let contact = $(`div[id=${id}]`).find("#Contact").text().trim();
  let profileImage = $(`div[id=${id}]`).find("#userProfileImage").attr("src");

  // convert the profile image name to readable format
  let image = profileImage
    .slice(profileImage.search("-"), profileImage.length)
    .replaceAll("-", " ");

  // change the id of formdata to formdataforedit
  $("#formdata").attr("id", "formdataforedit");

  // reset the form
  $("#formdataforedit")[0].reset();

  // change the id of multibuttonforadd to multibuttonforedit
  if ($("#multibuttonforadd").attr("id") == "multibuttonforadd") {
    $("#multibuttonforadd").attr("id", "multibuttonforedit");
    $("#multibuttonforedit").text("Edit");
  } else {
    $("#multibutton").attr("id", "multibuttonforedit");
    $("#multibuttonforedit").text("Edit");
  }

  // set the id, username, email, contact, and image name of the selected user in the form
  $("#id").val(id);
  $("#username").val(username);
  $("#email").val(email);
  $("#contact").val(contact);
  $("#file").attr("required", false);
  $("#userdemoname")
    .css({
      display: "block",
      margin: "auto",
    })
    .text(`selected : ${image}`);
});

// form submition for edit
$(document).on("submit", "#formdataforedit", function (e) {
  e.preventDefault();

  console.log("editing data...");
  $.ajax({
    url: "http://localhost:3000/edituser",
    type: "PATCH",
    data: new FormData($("#formdataforedit")[0]),
    processData: false,
    contentType: false,
    success: function (data) {

      // edit the data in the table
      const id = $("#id").attr("value");
      $(`div[id=${id}]`).find("#Name").text(data.username);
      $(`div[id=${id}]`).find("#Email").text(data.email);
      $(`div[id=${id}]`).find("#Contact").text(data.contact);
      $(`div[id=${id}]`).find("#userProfileImage").attr("src", data.path);

      // trigger the close button
      $("#close").trigger("click");

      // alert the user
      setTimeout(function () {
        alert("User Edited Successfully");
      }, 500);
    },
    error: function (xhr, status, error) {
      // alert the user if email or contact already exists
      const { code, keyValue } = xhr.responseJSON;
      if (code == 11000) {
        if (keyValue.email) {
          alert(`${keyValue.email} Already Exists`);
        } else if (keyValue.contact) {
          alert(`${keyValue.contact} Already Exists`);
        }
      }
    },
  });
});
