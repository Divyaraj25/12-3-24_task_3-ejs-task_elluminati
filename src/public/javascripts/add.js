$(document).on("click", "#adduserbtn", function (e) {
  e.preventDefault();
  $("#userdemoname").css({
    display: "none",
  });
  if ($("#formdata").attr("id") == "formdata") {
    $("#formdata")[0].reset();
  }
  if ($("#formdataforedit").attr("id") == "formdataforedit") {
    $("#formdataforedit")[0].reset();
    $("#formdataforedit").attr({
      id: "formdata",
    });
  }
  if ($("#multibuttonforedit").attr("id") == "multibuttonforedit") {
    $("#multibuttonforedit").attr({ id: "multibutton" });
  } else {
    document.getElementById("multibutton").textContent = "Register";
  }
  document.getElementById("multibutton").textContent = "Register";
  $("#successMsg").css({
    display: "flex",
    "justify-content": "space-between",
  });
  $("#multibutton").attr("data-bs-dismiss", "offcanvas");

  // document.getElementById("successMsg").textContent = "User Adding.....";
});
$(document).on("submit", "#formdata", function (e) {
  e.preventDefault();
  console.log("adding to database...");
  // console.log(
  //   JSON.stringify(
  //     Object.fromEntries(new FormData(document.getElementById("formdata")))
  //   )
  // );
  $.ajax({
    url: "http://localhost:3000/adduser",
    method: "POST",
    processData: false,
    contentType: false,
    // contentType:'multipart/form-data',
    data: new FormData(document.getElementById("formdata")),
    success: function (data) {
      let appendedData = `
              <div class="row mx-5 table border w-100" id="${data.user._id}">
                          <div class="col-2" id="profileImage"><img src="${data.user.path}" id="userProfileImage" alt="Profile Image" /></div>
                          <div class="col-6" id="details">
                              <div class="row">
                                  <div class="col-4 mt-4">
                                      <h4 id="namelabel">Name : </h4>
                                      <h4 id="emaillabel">Email : </h4>
                                      <h4 id="contactlabel">Contact no : </h4>
                                  </div>
                                  <div class="col-8 mt-4">
                                      <h4 id="Name">${data.user.username}</h4>
                                      <h4 id="Email">${data.user.email}</h4>
                                 <h4 id="Contact">${data.user.contact}</h4>
      
                                  </div>
                              </div>
                          </div>
                          <div class="d-none">${data.filename}</div>
                          <div class="col-3 d-flex flex-column justify-content-center" id="buttons">

                                <button class="btn btn-danger m-3 w-100 fs-4" id="delete">Delete</button>
                                <button class="btn btn-primary m-3 w-100 fs-4" type="button" data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
                                    id="edit">Edit</button>
                          </div>
                      </div>
              `;
      if ($("#appendData").find("h1").text() === "No Data Found") {
        $("#appendData").html("");
      }
      $("#id").val(data.user._id);
      $("#appendData").append(appendedData);
      $("#formdata")[0].reset();
      // $("#multibutton").attr("data-bs-dismiss", "offcanvas");
      // document.getElementById(
      //   "successMsg"
      // ).innerHTML = `USER ADDED SUCCESSFULLY <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" id="successclose"></button>`;
      // $("#successclose").click(function (e) {
      //   e.preventDefault();
      //   $("#successMsg").css({
      //     display: "none",
      //   });
      // });
      // $("#multibutton").append(
      //   `<div class="modal-dialog modal-lg">${data.username} added successfully</div>`
      // );
    },
    error: function (xhr, status, error) {
      $("#multibutton").attr("data-bs-dismiss", "");
      console.log(error); //conflict
      console.log(status); //error
      console.log(xhr); // readystate:4 ....
      console.log(xhr.status); // 409
      console.log(xhr.statusText); // conflict
      console.log(xhr.responseText); // error actual text
      console.log(xhr.responseJSON); // error actual json
      const { e, email, contact } = xhr.responseJSON;
      if (e.code == 11000) {
        if (e.keyValue.email) {
          alert(`${email} Already Exists`);
        } else if (e.keyValue.contact) {
          alert(`${contact} Already Exists`);
        }
      }
      // if (status == 400) {
      //   if(e==`MongoServerError: E11000 duplicate key error collection: task.users index: email_1 dup key: { email: ${email} }`){
      //     alert(`${email} Already Exists`);
      //   }else if(e==`MongoServerError: E11000 duplicate key error collection: task.users index: contact_1 dup key: { contact: ${contact} }`){
      //     alert(`${contact} Already Exists`);
      //   }
      // $("#erroraddinguser").css({
      //   display: "flex",
      //   "justify-content": "space-between",
      // });
      // $("#userexistclose").click(function (e) {
      //   e.preventDefault();
      //   $("#erroraddinguser").css({
      //     display: "none",
      //   });
      // });
      // } else {
      //   alert("Something went wrong");
      //   console.log(e);
      // }
    },
  });
});
