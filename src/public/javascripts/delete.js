$(document).on("click", "#delete", function (e) {
  e.preventDefault();
  console.log("deleting...");
  const id = e.target.parentNode.parentNode.id;
  console.log(`Button with value ${id} was clicked`);
  if(confirm('Are you sure to delete this user?')){
    console.log("deleting...");
    $.ajax({
      url: "/deleteuser",
      method: "delete",
      data: {
        id: id,
      },
      success: function () {
        $(`div[id=${id}]`).remove();
        if ($("#appendData").children().length === 0) {
          $("#appendData").html(
            '<h1 class="table border p-5 text-center">No Data Found</h1>'
          );
        }
        // $("#userdeleted").css({ display: "flex" ,"justify-content": "space-between",});
        // $("#userdeleteclose").click(function (e) { 
        //   e.preventDefault();
        //   $("#userdeleted").css({ display: "none" });
        // });
      },
    });
  }
});
