$(document).on("click", "#delete", function (e) {
  e.preventDefault();
  console.log("deleting...");
  const id = e.target.parentNode.parentNode.id; // getting id of that user
  console.log(`Button with value ${id} was clicked`);

  // before deleting the user ask for confirmation
  if (confirm("Are you sure to delete this user?")) {
    console.log("deleting and checking search...");
    if($("#search").val().length > 0){
      console.log('searching... and deleting...');
      $.ajax({
        url: "http://localhost:3000/deleteuser",
        method:"delete",
        data:{
          id
        },
        success:function(count){
          $(`div[id=${id}]`).remove();
          alert("Deleted Successfully");
          if($("#appendData").children("div").length === 0){
            alert('No data in the database');
            $("#search").val('');
            $("ul").css("display", "flex");
            // $("ul").children('li button.contains("active")').removeClass("active");

            $("ul").children("li:first-child").find("button").trigger("click");
// -            $("ul").children("li:first button").trigger("click");

            // $("ul").find('li:first button').addClass("active");
            // $("ul").find('#pageno').addClass("active");
          }
          if (count % 5 == 0) {
            $("ul").find("li:last").remove();
          }
          // setTimeout(() => {
          //   alert("Deleted Successfully");
          // }, 500);
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
        // on success remove that user from the table
        success: function (count) {
          $(`div[id=${id}]`).remove();
          if ($("#appendData").children("div").length === 0) {
            if (count == 0) {
              $("#appendData").html(
                '<h1 class="table border p-5 text-center">No Data Found</h1>'
              );
              // }else if($("#search").val().length > 0){
              //   alert("No Data in the database");
              //   $('#search').val('');
              //   $('ul').css("display", "flex");
              //   $('ul').children("li:first button").trigger("click");
            }
            // $('ul').remove()
            // }else if($("#appendData").children("div").length < 5){
            // $("ul").find(`li:contains(${activepage})`).trigger("click");
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
            $("ul").find("li:last").remove();
            $("ul").find("li:last-child button").trigger("click");
          }
          setTimeout(() => {
            alert("Deleted Successfully");
          }, 500);
        },
      });
    }
  }
});
