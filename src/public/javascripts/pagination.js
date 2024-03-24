$(document).on("click", "#pageno", function (e) {
  e.preventDefault();
  let pageno = e.target.textContent.trim();
  // $("ul li").each(function () {
  //   $(this).removeClass("active");
  // });
  $("ul li button").removeClass("active");
  $(e.target).addClass("active");
  console.log(pageno);
  $.ajax({
    url: `http://localhost:3000/?page=${pageno}`,
    method: "get",
    success: function (data) {
      console.log(data);
      console.log(data.search('<section id="appendData">'));
      console.log(data.search("</section>"));
      console.log(
        data.slice(data.search(`<div class="row`), data.search("</section>"))
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
});
