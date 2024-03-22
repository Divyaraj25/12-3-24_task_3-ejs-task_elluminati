$(document).on("click", "#edit", function (e) {
  e.preventDefault();
  console.log("taking data...");
  const id = e.target.parentNode.parentNode.id;
  console.log(id);
  console.log(`Button with value ${id} was clicked`);
  let email = $(`div[id=${id}]`).find("#Email").text().trim();
  let username = $(`div[id=${id}]`).find("#Name").text().trim();
  let contact = $(`div[id=${id}]`).find("#Contact").text().trim();
  let profileImage = $(`div[id=${id}]`).find("#userProfileImage").attr("src");
  console.log(profileImage);
  let image = profileImage
    .slice(profileImage.search("-"), profileImage.length)
    .replaceAll("-", " ");
  console.log(image);
  $("#formdata").attr("id", "formdataforedit");
  $("#formdataforedit")[0].reset();
  if ($("#multibuttonforadd").attr("id") == "multibuttonforadd") {
    $("#multibuttonforadd").attr("id", "multibuttonforedit");
    $("#multibuttonforedit").text("Edit");
  } else {
    $("#multibutton").attr("id", "multibuttonforedit");
    $("#multibuttonforedit").text("Edit");
  }
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
  $("#multibuttonforedit").attr('data-bs-dismiss', 'offcanvas');
  // $("#multibuttonforedit").attr('data-bs-target', '#offcanvasRight');
});

$(document).on("submit", "#formdataforedit", function (e) {
  e.preventDefault();
  console.log("editing...");
  console.log("editing data...");
  $.ajax({
    url: "http://localhost:3000/edituser",
    type: "PATCH",
    data: new FormData($("#formdataforedit")[0]),
    processData: false,
    contentType: false,
    success: function (data) {
      const id = $("#id").attr("value");
      $(`div[id=${id}]`).find("#Name").text(data.username);
      $(`div[id=${id}]`).find("#Email").text(data.email);
      $(`div[id=${id}]`).find("#Contact").text(data.contact);
      $(`div[id=${id}]`).find("#userProfileImage").attr("src", data.path);
      // $("#multibuttonforedit").attr("data-bs-dismiss", "offcanvas");
      // $("#multibuttonforedit").attr(" data-bs-dismiss", "offcanvas");
      // $("#multibuttonforedit").attr("id", "multibutton");
      // $("#formdataforedit").attr("id", "formdata");
      // $("#useredited").css({display:'flex', "justify-content": "space-between",});
      // $("#successclose").click(function (e) {
      //   e.preventDefault();
      //   $("#useredited").css({display:"none"});
      // });
      // $("#offcanvasRight").attr('aria-modal', 'false').removeClass('show').removeAtribute('role');
    },
    error: function (xhr, status, error) {
      console.log(status);
      console.log(error);
    },
  });
});
