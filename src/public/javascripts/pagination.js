$(document).on("click", "#pageno", function (e) {
  e.preventDefault();

  // get the value of the button
  let pageno = e.target.textContent.trim();

  // change the active class
  $("ul li button").removeClass("active");
  $(e.target).addClass("active");

  $.ajax({
    url: `http://localhost:3000/?page=${pageno}`,
    method: "get",
    success: function (data) {

      // data gives the html string because we are rendering index page
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
});
