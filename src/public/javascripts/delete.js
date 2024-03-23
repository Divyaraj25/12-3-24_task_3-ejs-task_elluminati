$(document).on("click", "#delete", function (e) {
  e.preventDefault();
  console.log("deleting...");
  const id = e.target.parentNode.parentNode.id;
  console.log(`Button with value ${id} was clicked`);
  if (confirm("Are you sure to delete this user?")) {
    console.log("deleting...");
    $.ajax({
      url: "/deleteuser",
      method: "delete",
      data: {
        id: id,
      },
      success: function (count) {
        $(`div[id=${id}]`).remove();
        if(count===0){
          if ($("#appendData").find("div").length === 0) {
            $("#appendData").html(
              '<h1 class="table border p-5 text-center">No Data Found</h1>'
            );
          }
        }
        if(count%10==0){
          $("ul").find("li:last").remove()
          $("ul").find("#pageno:last").trigger("click")
          // $("ul").remove(`<li class="page-item"><button class="page-link" id="pageno">${(count+10)/10}</button></li>`)
        }
        setTimeout(() => {
          alert("Deleted Successfully");
        },500)
      },
    });
  }
});
