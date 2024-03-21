$(document).on("click", "#delete", function (e) {
  e.preventDefault();
  console.log("deleting...");
  const id = e.target.parentNode.parentNode.id;
  console.log(`Button with value ${id} was clicked`);
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
    },
  });
});
