$(document).on("click", "#adduserbtn", function (e) {
  e.preventDefault();

  // image name hidden in add form
  $("#userdemoname").css({
    display: "none",
  });

  // if formdata has id of formdata then reset the form
  if ($("#formdata").attr("id") == "formdata") {
    $("#formdata")[0].reset();
  }

  // if formdata has id formdataforedit then reset the form then change the id to formdata
  if ($("#formdataforedit").attr("id") == "formdataforedit") {
    $("#formdataforedit")[0].reset();
    $("#formdataforedit").attr({
      id: "formdata",
    });
  }

  // if multibutton has id multibuttonforedit then change the id to multibutton
  if ($("#multibuttonforedit").attr("id") == "multibuttonforedit") {
    $("#multibuttonforedit").attr({ id: "multibutton" });
  } else {
    document.getElementById("multibutton").textContent = "Register";
  }

  // change the text of multibutton to register
  document.getElementById("multibutton").textContent = "Register";
});

// form submition for add
$(document).on("submit", "#formdata", function (e) {
  e.preventDefault();
  console.log("adding to database...");
  $.ajax({
    url: "http://localhost:3000/adduser",
    method: "POST",
    processData: false,
    contentType: false,
    // contentType:'multipart/form-data',
    data: new FormData(document.getElementById("formdata")),
    success: function (data) {
      // append the data to the table
      let appendedData = `
              <div class="row mx-5 table border" id="${data.user._id}">
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

      // check if table is empty or not
      if ($("#appendData").find("h1").text() === "No Data Found") {
        $("#appendData").html("");
      }

      // set the id of the hidden div to the id of the user
      $("#id").val(data.user._id);

      // if count is not divisible by 5 then append the data to the table else append the data to the next page table and go to the next page
      if ((data.count - 1) % 5 == 0) {

        // remove active from previous li buttons
        $("ul li button").removeClass("active");

        // append li button to ul
        $("ul")
          .append(`<li class="page-item"><button class="page-link active" id="pageno">
        ${(data.count - 1 + 5) / 5}
    </button></li>`);

        // append data to next page table
        $("#appendData").append(appendedData);

        // trigger button automatically when added data to new page
        $("ul").find("li:last-child button").trigger("click");
      } else {
        $("#appendData").append(appendedData);
      }

      $("#formdata")[0].reset(); // reset the form
      $("#close").trigger("click"); // close the modal

      // if count is greater than 5 and the last button is active then trigger the last button
      if (
        $("ul").find("li:first-child button").hasClass("active") &&
        data.count > 5
      ) {
        $("ul").find("li:last-child button").trigger("click");
      }

      // show alert
      setTimeout(() => {
        alert("Registered Successfully");
      }, 500);
    },
    error: function (xhr, status, error, e) {

      // for validation of file format and for email and contact already exists
      if (error === "Internal Server Error" || status === 500) {
        alert("Only jpg, png, jpeg are allowed");
      } else {
        const { e, email, contact } = xhr.responseJSON;
        if (e.code == 11000) {
          // $("#multibutton").attr("data-bs-dismiss", "");
          if (e.keyValue.email) {
            alert(`${email} Already Exists`);
          } else if (e.keyValue.contact) {
            alert(`${contact} Already Exists`);
          }
        }
      }
    },
  });
});
