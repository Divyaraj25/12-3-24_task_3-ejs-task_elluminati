$(document).on("click", "#delete", function (e) {
  e.preventDefault();

  console.log("deleting...");
  const id = e.target.parentNode.parentNode.id; // getting id of that user
  console.log(`Button with value ${id} was clicked`);

  // before deleting the user ask for confirmation
  if (confirm("Are you sure to delete this user?")) {
    console.log("deleting and checking search...");

    // if search value is present then delete with respect to search
    if($("#search").val().length > 0){
      console.log('searching... and deleting...');
      $.ajax({
        url: "http://localhost:3000/deleteuser",
        method:"delete",
        data:{
          id
        },
        success:function(count){

          // remove that user from the table
          $(`div[id=${id}]`).remove();
          alert("Deleted Successfully");

          // if data not found then display list number and active the first list number
          if($("#appendData").children("div").length === 0){
            alert('No data in the database');
            $("#search").val(''); // empty the search value
            $("ul").css("display", "flex");
            $("ul").children("li:first-child").find("button").trigger("click");
          }

          // remove the last list when data is deleted
          if (count % 5 == 0) {
            $("ul").find("li:last").remove();
          }
        }
      })
    }else{
      console.log("deleting...");
      $.ajax({
        url: "http://localhost:3000/deleteuser",
        method: "delete",
        data: {
          id,
        },
        success: function (count) {

          // on success remove that user from the table
          $(`div[id=${id}]`).remove();
          if ($("#appendData").children("div").length === 0) {
            if (count == 0) {
              $("#appendData").html(
                '<h1 class="table border p-5 text-center">No Data Found</h1>'
              );
            }
          } else if ($("#appendData").children("div").length < 5) {
            const activepage = document
              .querySelector("ul li button.active")
              .innerText.trim();
            $.ajax({
              url: `http://localhost:3000/?page=${activepage}`,
              method: "get",
              success: function (data) {
                console.log(data);
                console.log(data.search('<section id="appendData">'));
                console.log(data.search("</section>"));
                console.log(
                  data.slice(
                    data.search(`<div class="row`),
                    data.search("</section>")
                  )
                );
                const sliceddata = data.slice(
                  data.search(`<div class="row`),
                  data.search("</section>")
                );
                $("#appendData").html("");
                $("#appendData").append(sliceddata);
              },
              error: function (xhr, status, error) {
                console.log(status);
                console.log(error);
              },
            });
          }
  
          // console.log($("#appendData").children("div").length);
          // const activepage = e.target.parentNode.parentNode.parentNode.siblings[0];
          // console.log(activepage);
          if (count % 5 == 0) {
            $("ul").find("li:last-child").remove();
            $("ul").children("li:last-child").find("button").trigger("click");
          }

          // alert on delete success
          setTimeout(() => {
            alert("Deleted Successfully");
          }, 500);
        },
      });
    }
  }
});
