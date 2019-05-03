(function($) {
  jQuery.fn.app = function(settings) {
    var config = {
      topics: [],
      search: "dog",
      limit: 10,
      apiKey: "IQEA4udUrOUrtdhBTpOQm7KWIkwPr6fI",
      apiUrl: "https://api.giphy.com/v1/gifs/search"
    };

    if (settings) jQuery.extend(config, settings);

    this.each(function() {
      var el = $(this).addClass("app container");
      var buttons = $("<div>").addClass("buttons");
      var tabs = $("<div>").addClass("tabs");
      var form = $("<form>")
        .addClass("form-inline")
        .append(
          $("<div>")
            .addClass("form-group mx-sm-3 mb-2")
            .append(
              $("<input>")
                .addClass("form-control")
                .attr({ type: "text", name: "newTopic" })
            ),
          $("<button>")
            .addClass("btn btn-primary mb-2")
            .attr("type", "submit")
            .text("Add")
        );

      el.append(
        $("<div>")
          .addClass("row")
          .append(
            $("<div>")
              .addClass("col")
              .append(buttons)
          ),
        $("<div>")
          .addClass("row")
          .append(
            $("<div>")
              .addClass("col-8")
              .append(tabs),
            $("<div>")
              .addClass("col-4")
              .append(form)
          )
      );

      buttons
        .append(
          $("<div>")
            .addClass("d-flex justify-content-center p-3")
            .append(
              config.topics.map(topic =>
                $("<button>")
                  .addClass("btn btn-primary mr-3")
                  .text(topic)
              )
            )
        )
        .on("click", ".btn", function(e) {
          console.log("click: ", $(this).text());

          var url =
            config.apiUrl +
            "?" +
            $.param({
              api_key: config.apiKey,
              q: config.search,
              limit: config.limit,
              offset: 0,
              rating: "G",
              lang: "en"
            });

          console.log(url);

          // $.ajax({ url })
          //   .then(data => {
          //     console.log({ data });
          //     data.data.map(item => {
          //       el.append(
          //         $("<div>")
          //           .css({ width: 200, height: 200 })
          //           .addClass("m-3")
          //           .append(
          //             $("<img>")
          //               .attr("src", item.images["480w_still"].url)
          //               .attr("alt", item.title)
          //               .addClass("img-thumbnail img-fluid rounded")
          //           )
          //       ).addClass("d-flex flex-wrap");
          //     });
          //   })
          //   .catch(err => console.error(err));
        });

      tabs.addClass("w-100 h-100 border").append(
        config.topics.map(topic =>
          $("<div>")
            .addClass("tab")
            .attr("id", topic)
        )
      );

      form.on("submit", function(e) {
        e.preventDefault();

        var newTopic = $(this)
          .serializeArray()
          .filter(i => i.name === "newTopic")
          .reduce((a, c) => a + c.value, "")
          .trim();

        console.log({ newTopic }, $(this).serializeArray());

        $(this)
          .trigger("reset")
          .focus();
      });
    });

    return this;
  };
})(jQuery);
