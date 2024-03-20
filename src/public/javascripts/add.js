console.log("hello from add.js");
function called() {
  // Get all the buttons
  let buttons = document.querySelectorAll("#edit");

  // Get all the delete buttons
  let deletebtns = document.querySelectorAll("#delete");
  // console.log("buttons counted", buttons.length);
  // console.log("buttons counted", deletebtns.length);
  deletebtns.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const buttonValue = this.parentNode.parentNode.id;
      console.log(`Button with value ${buttonValue} was clicked`);
      $.ajax({
        url: "/deleteuser",
        method: "delete",
        data: {
          id: buttonValue,
        },
        success: function () {
          // $("#appendData").find(`div[id=${buttonValue}]`).html('').attr("style", "display:none");
          $("#appendData").find(`div[id=${buttonValue}]`).remove();
          // console.log($("#appendData").children().length);
          if ($("#appendData").children().length === 0) {
            $("#appendData").html(
              '<h1 class="table border p-5 text-center">No Data Found</h1>'
            );
          }
          // $(`#div[id=${buttonValue}]`).remove();
        },
      });
      // $("#delete").attr('id',buttonValue)
    });
  });

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // e.preventDefault();
      const buttonValue = this.parentNode.parentNode.id;
      console.log(`Button with value ${buttonValue} was clicked`);
      let email = $(`div[id=${buttonValue}]`).find("#Email").text().trim();
      let username = $(`div[id=${buttonValue}]`).find("#Name").text().trim();
      let contact = $(`div[id=${buttonValue}]`).find("#Contact").text().trim();
      let profileImage = $(`div[id=${buttonValue}]`)
        .find("#userProfileImage")
        .attr("src");
      console.log(profileImage);
      let image = profileImage
        .slice(profileImage.search("-"), profileImage.length)
        .replaceAll("-", " ");
      console.log(image);
      // console.log(profileImage)
      // $("#formdata").attr({
      //   method: "PATCH",
      // });
      $("#formdata").attr("id", "formdataforedit");
      if ($("#multibuttonforadd").attr("id") == "multibuttonforadd") {
        $("#multibuttonforadd").attr("id", "multibuttonforedit");
        $("#multibuttonforedit").val("Edit");
      } else {
        $("#multibutton").attr("id", "multibuttonforedit");
        $("#multibuttonforedit").val("Edit");
      }
      $("#id").val(buttonValue);
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
      // $("#userdemoparent").css({
      //   "background-image": `url(${profileImage})`,
      //   "background-size": "cover",
      //   "background-repeat": "no-repeat",
      //   "background-position": "center",
      //   "background-attachment": "fixed",
      //   height: "50px",
      //   width: "50px",
      //   margin: "auto",
      //   display: "block",
      // });
    });
  });
}

$(document).ready(function () {
  called();
  $(document).on("click", "#multibuttonforedit", function (e) {
    e.preventDefault();
    console.log("editing...");
    try {
      console.log("editing data...");
      // const editform = new FormData($("#formdataforedit")[0])
      // const editform = new FormData();
      // editform.append("username", $("#username").val());
      // editform.append("email", $("#email").val());
      // editform.append("contact", $("#contact").val());
      // editform.append("id", $("#id").val());
      // editform.append("file");
      // editform.append("file", $("#file")[0].files[0]);
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
          $("#multibuttonforedit").attr("id", "multibutton");
          $("#formdataforedit").attr("id", "formdata");

          called();
        },
        error: function (xhr, status, error) {
          console.log(status);
          console.log(error);
        },
      });
      // -      const id = $("#id").attr("value");
      // -      const xhr = new XMLHttpRequest();
      // -      xhr.open("PATCH", `http://localhost:3000/edituser`);
      // -      xhr.onload = function () {
      // -        if (xhr.status === 200) {
      // -          const data = JSON.parse(xhr.responseText);
      // -          $(`div[id=${id}]`).find("#Name").text(data.username);
      // -          $(`div[id=${id}]`).find("#Email").text(data.email);
      // -          $(`div[id=${id}]`).find("#Contact").text(data.contact);
      // -          $(`div[id=${id}]`).find("#userProfileImage").attr("src", data.path);
      // -          $("#multibuttonforedit").attr("id", "multibutton");
      // -          $("#formdataforedit").attr("id", "formdata");
      // -        } else {
      // -          console.log(xhr.status);
      // -          console.log(xhr.responseText);
      // -        }
      // -      };
      // -      const editedformdata = new FormData($("#formdataforedit")[0]);
      // -      // editedformdata.append("username", $("#username").val());
      // -      // editedformdata.append("email", $("#email").val());
      // -      // editedformdata.append("contact", $("#contact").val());
      // -      // editedformdata.append(
      // -      //   "file",
      // -      //   document.getElementById("file").files[0]
      // -      // );
      // -      xhr.send(editedformdata);

      // -          const editedformdata = new FormData();
      // -          editedformdata.append("username", $("#username").val());
      // -          editedformdata.append("email", $("#email").val());
      // -          editedformdata.append("contact", $("#contact").val());
      // -          editedformdata.append("file", $("#file")[0].files[0]);
      // -          console.log(JSON.stringify(Object.fromEntries(editedformdata)));
      // -          $.ajax({
      // -            url: "http://localhost:3000/edituser?id=" + buttonValue,
      // -            type: "PATCH",
      // -            processData: false,
      // -            // contentType: false,
      // -            // contentType: "application/json",
      // -            contentType: "multipart/form-data",
      // -            data: editedformdata,
      // -            success: function (data) {
      // -              $(`div[id=${buttonValue}]`).find("#Name").text(data.username);
      // -              $(`div[id=${buttonValue}]`).find("#Email").text(data.email);
      // -              $(`div[id=${buttonValue}]`).find("#Contact").text(data.contact);
      // -              $(`div[id=${buttonValue}]`)
      // -                .find("#userProfileImage")
      // -                .attr("src", data.path);
      // -            },
      // -            error: function (data) {
      // -              console.log(data);
      // -            },
      // -          });

      // -          const fet = async function () {
      // -            const formData = new FormData(document.getElementById("formdataforedit"));
      // -            console.log(JSON.stringify(Object.fromEntries(formData)));
      // -            const data2 = await fetch(
      // -              "http://localhost:3000/edituser?id=" + buttonValue,
      // -              {
      // -                method: "PATCH",
      // -                body: JSON.stringify(Object.fromEntries(formData)),
      // -              }
      // -            );
      // -            const data = await data2.json();
      // -            console.log(data);
      // -          };
      // -          fet();
    } catch (error) {
      console.log(error);
    }
  });

  // Add event listener to each button

  $("#adduserbtn").on("click", function (e) {
    e.preventDefault();
    $("#userdemoname").css({
      display: "none",
    });
    if ($("#formdataforedit").attr("id") == "formdataforedit") {
      $("#formdataforedit").attr({
        id: "formdata",
      });
      $("#formdata")[0].reset();
    }
    if ($("#multibuttonforedit").attr("id") == "multibuttonforedit") {
      $("#multibuttonforedit").attr({ value: "Register", id: "multibutton" });
    } else {
      $("#multibutton").attr("value", "Register");
    }
  });
  $(document).on("click", "#multibutton", function (e) {
    e.preventDefault();

    console.log("adding to database...");
    try {
      // const xhr = new XMLHttpRequest();
      // const formData = new FormData(document.getElementById("formdataforadd"));
      // xhr.open("POST", "http://localhost:3000/adduser", true);
      // xhr.onload = function () {
      //   if (xhr.status === 200) {
      //     const data = JSON.parse(xhr.responseText);
      //     console.log(data);
      //     let appendedData = `
      //     <div class="row mx-5 table border w-100">
      //       <div class="col-2" id="profileImage"><img src="${data.user.path}" id="userProfileImage" alt="" />
      //       </div>
      //       <div class="col-6" id="details">
      //         <div class="row">
      //           <div class="col-4 mt-4">
      //             <h4 id="namelabel">Name : </h4>
      //             <h4 id="emaillabel">Email : </h4>
      //             <h4 id="contactlabel">Contact no : </h4>
      //           </div>
      //           <div class="col-8 mt-4">
      //             <h4 id="Name">${data.user.username}</h4>
      //             <h4 id="Email">${data.user.email}</h4>
      //             <h4 id="Contact">${data.user.contact}</h4>
      //           </div>
      //         </div>
      //       </div>
      //       <div class="col-3 d-flex flex-column justify-content-center" id="buttons">
      //         <button class="btn btn-danger m-3 w-100 fs-4" id="delete">Delete</button>
      //         <button class="btn btn-primary m-3 w-100 fs-4" type="button" data-bs-toggle="offcanvas"
      //           data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
      //           id="edit">Edit</button>
      //       </div>
      //     </div>
      //     `;
      //     if (
      //       $("#appendData").html() ===
      //       "<h1 class='table border p-5 text-center'>No Data Found</h1>"
      //     ) {
      //       $("#appendData").html("");
      //     }
      //     $("#appendData").append(appendedData);
      //   } else {
      //     console.log(xhr.status);
      //     console.log(xhr.responseText);
      //   }
      // };
      // xhr.send(formData);
      // history.replaceState(null, "", window.location.pathname);
      // <<<<<<<<<<<<<<  ✨ Codeium Command 🌟 >>>>>>>>>>>>>>>>
      $.ajax({
        url: "http://localhost:3000/adduser",
        method: "POST",
        processData: false,
        contentType: false,
        // contentType:'multipart/form-data',
        data: new FormData(document.getElementById("formdata")),
        success: function (data) {
          // let appendedData = `
          // -      const fet = async function () {
          // -        const formData = new FormData(
          // -          document.getElementById("formdataforadd")
          // -        );
          // -        const data2 = await fetch("http://localhost:3000/adduser", {
          // -          method: "POST",
          // -          body: formData,
          // -        });
          // -        const data = await data2.json();
          // -        console.log(data);
          // -        // console.log(data.data);
          // -        // $("#Name").html(data.username);
          // -        // $("#Email").html(data.email);
          // -        // $("#Contact").html(data.contact);
          // -        // $("#userProfileImage").attr("src", data.path);
          // -        // console.log(data);
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
          if (
            $("#appendData").find("h1").text() === "No Data Found"
            // `<h1 class="table border p-5 text-center">No Data Found</h1>`
          ) {
            $("#appendData").html("");
          }
          $("#id").val(data.user._id);
          $("#appendData").append(appendedData);
          $("#formdata")[0].reset();
          // btns(document.querySelectorAll("#edit"))

          // setTimeout(called(), 1000);
          called();
        },
        error: function (xhr) {
          console.log(xhr.status);
          console.log(xhr.responseText);
        },
      });
      // -        if (
      // -          $("#appendData").html() ===
      // -          "<h1 class='table border p-5 text-center'>No Data Found</h1>"
      // -        ) {
      // -          $("#appendData").html("");
      // -        }
      // -        $("#appendData").append(appendedData);
      // -        // let append = document.getElementById("appendData");
      // -        // append.innerHTML.append = appendedData;
      // -        // let append = $("#appendData").html();
      // -        // append.append(appendedData);
      // -      };
      // -      fet();
      // <<<<<<<  c8378f68-7bd9-4739-b295-abdb4e4d7fd5  >>>>>>>
      // history.replaceState(null, "", window.location.pathname);
      // $("$username").val("");
      // $("$email").val("");
      // $("$contact").val("");
      // $("$file").val("");
    } catch (error) {}
    (function () {
      document.querySelectorAll("#edit");
      console.log("edit button");
    })();
    (function () {
      document.querySelectorAll("#delete");
      console.log("delete button");
    })();
  });

  // $("#edit").on("click", function (e) {
  //   e.preventDefault();
  //   console.log("editing...");
  //   console.log(event.target.nodeName);
  // });

  // $("#edit").on("click", function (e) {
  //   e.preventDefault();

  //   $("#formdata").attr("action", "http://localhost:3000/edituser");
  //   $("#multibutton").val("Edit");

  //   const id = document.getElementById("id").value;
  //   const pageno = document.getElementById("page").value;
  //   console.log("editing...");
  //   try {
  //     let formdata = new FormData(document.getElementById("editform"));
  //     console.log(formdata);
  //     let data = async function () {
  //       const fet = await fetch(
  //         `http://localhost:3000/edituser?page=${pageno}&id=${id}`,
  //         {
  //           method: "post",
  //           body: formdata,
  //         }
  //       );
  //       const data = await fet.json();
  //       $("username").attr("value", data.user.username);
  //       $("email").attr("value", data.user.email);
  //       $("contact").attr("value", data.user.contact);
  //       $("file").attr("value", data.user.path);
  //       $("formdata").on("submit", function (e) {
  //         e.preventDefault();
  //         console.log("editing...");
  //         try {
  //           let formdata = new FormData(document.getElementById("formdata"));
  //           console.log(formdata);
  //           let data = async function () {
  //             const fet = await fetch(
  //               `http://localhost:3000/edituser?page=${pageno}&id=${id}`,
  //               {
  //                 method: "patch",
  //                 body: formdata,
  //               }
  //             );
  //             const data = await fet.json();
  //             console.log(data);
  //           };
  //         } catch (error) {}
  //       });
  //     };
  //     data();
  //   } catch (error) {}
  // });

  // $("#deleteform").on("submit", function (e) {
  //   e.preventDefault();

  //   console.log("deleting...");
  //   try {
  //     let formdata = new FormData(document.getElementById("deleteform"));
  //     console.log(formdata);
  //     let data = async function () {
  //       const fet = await fetch("http://localhost:3000/deleteuser", {
  //         method: "Delete",
  //         body: formdata,
  //       });
  //       const data = await fet.json();
  //       console.log(data);
  //     };
  //     data()
  //   } catch (error) {}
  // });

  // $(document).ready(function (e) {
  //   // document.querySelectorAll("#delete").on("click", function (e) {
  //   // $("#delete").on("click", function (e) {
  //   $("#delete").on("click", function (e) {
  //     e.preventDefault();

  //     console.log("deleting...");
  //     try {
  //       // delete user using fetch
  //       let email = $("#delete")
  //         .parent()
  //         .siblings("#details")
  //         .find("#Email")
  //         .text();
  //       console.log(email);
  //       const emailjson = {
  //         email: email.toString().trim(),
  //       };
  //       const fet = async function () {
  //         // const formData = new FormData();
  //         // formData.append("email", email);
  //         // console.log(JSON.stringify(email))
  //         console.log(emailjson);
  //         $.ajax({
  //           url: "http://localhost:3000/deleteuser",
  //           type: "DELETE",
  //           contentType: "application/json",
  //           processData: false,
  //           data: JSON.stringify(emailjson),
  //           success: function (data) {
  //             console.log(data);
  //           },
  //           error: function (data) {
  //             console.log(data);
  //           },
  //         });
  //       };
  //       fet();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   });
  // });
});
