$(document).on("click", "#searchbtn", function (e) {
  e.preventDefault();

  if ($("#search").val() === "") {
    $.ajax({
      url: `http://localhost:3000/`,
      method: "get",
      success: function (data) {
        const sliceddata = data.slice(
          data.search(`<div class="row`),
          data.search("</section>")
        );
        $("#appendData").html("");
        if (sliceddata.length === 0) {
          $("#appendData").append(
            `<h1 class="table border p-5 text-center">No Data Found</h1>`
          );
          $("ul").css("display", "none");
        }
        $("#appendData").append(sliceddata);
      },
    });
    $("ul").css("display", "flex");
  } else {
    if ($("#appendData").find("h1").text() === "No Data Found") {
      alert("No Data in the database");
    } else {
      console.log("searching...");
      $.ajax({
        url: `http://localhost:3000/search?search=${$("#search").val()}`,
        method: "get",
        success: function (data) {
          // $('#appendData').html(data)
          console.log(data);
          console.log(data.length);
          if (data.length === 0) {
            $("#appendData").html("");
            $("#appendData").append(
              `<h1 class="table border p-5 text-center">No Data Found</h1>`
            );
            $("ul").css("display", "none");
          } else {
            $("#appendData").html("");
            for (let i = 0; i < data.length; i++) {
              htmlstring = `
          <div class="row mx-5 table border w-100" id="${data[i]._id}">
                              <div class="col-2" id="profileImage"><img src="${data[i].path}" id="userProfileImage" alt="Profile Image" /></div>
                              <div class="col-6" id="details">
                                  <div class="row">
                                      <div class="col-4 mt-4">
                                          <h4 id="namelabel">Name : </h4>
                                          <h4 id="emaillabel">Email : </h4>
                                          <h4 id="contactlabel">Contact no : </h4>
                                      </div>
                                      <div class="col-8 mt-4">
                                          <h4 id="Name">${data[i].username}</h4>
                                          <h4 id="Email">${data[i].email}</h4>
                                     <h4 id="Contact">${data[i].contact}</h4>
          
                                      </div>
                                  </div>
                              </div>
                              <div class="d-none">${data[i].filename}</div>
                              <div class="col-3 d-flex flex-column justify-content-center" id="buttons">
    
                                    <button class="btn btn-danger m-3 w-100 fs-4" id="delete">Delete</button>
                                    <button class="btn btn-primary m-3 w-100 fs-4" type="button" data-bs-toggle="offcanvas"
                                        data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
                                        id="edit">Edit</button>
                              </div>
                          </div>
          `;
              $("#appendData").append(htmlstring);
            }
            $("ul").css("display", "none");
          }
        },
        error: function (xhr, status, error) {
          console.log(status);
          console.log(error);
        },
      });
    }
  }
});
