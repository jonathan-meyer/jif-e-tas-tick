if (!String.prototype.quote) {
  String.prototype.quote = function() {
    return JSON.stringify(this); // since IE8
  };
}

(function($) {
  jQuery.fn.app = function(settings) {
    var config = {
      topics: [],
      limit: 10,
      apiKey: "IQEA4udUrOUrtdhBTpOQm7KWIkwPr6fI",
      apiUrl: "https://api.giphy.com/v1/gifs/search"
    };

    if (settings) jQuery.extend(config, settings);

    function createButton(topic) {
      return $("<button>")
        .addClass("btn btn-primary mr-3 topic-button")
        .data("topic", topic)
        .text(topic);
    }

    function createTab(topic) {
      return $("<div>")
        .addClass("tab")
        .attr("data-topic", topic)
        .hide();
    }

    this.each(function() {
      var el = $(this).addClass("app container");
      var buttons = $("<div>").addClass("buttons");
      var tabs = $("<div>").addClass("tabs");
      var form = $("<form>").append(
        $("<div>")
          .addClass("form-group")
          .append(
            $("<label>").text("Add a new Make or Model"),
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
        .addClass("d-flex justify-content-center p-3")
        .append(config.topics.map(createButton))
        .on("click", ".topic-button", function(e) {
          var topic = $(this).data("topic");
          var tabEl = $("div[data-topic=" + topic.quote() + "]");

          var url =
            config.apiUrl +
            "?" +
            $.param({
              api_key: config.apiKey,
              limit: config.limit,
              offset: 0,
              rating: "G",
              lang: "en",
              q: topic
            });

          $(".tab").hide();
          tabEl.show();

          if (tabEl.children().length == 0) {
            $.ajax({ url })
              .then(data => {
                console.log({ data });

                tabEl.addClass("clearfix").append(
                  data.data.map(item =>
                    $("<figure>")
                      .css({ width: 200, height: 200 })
                      .addClass("m-1 p-2 float-left figure overflow-hidden")
                      .append(
                        $("<figcaption>")
                          .addClass("figure-caption text-center font-weight-bold")
                          .text("Rating: " + item.rating.toUpperCase()),
                        $("<img>")
                          .addClass("figure-img img-fluid rounded")
                          .attr("src", item.images["480w_still"].url)
                          .attr("alt", item.title)
                      )
                  )
                );
              })
              .catch(err => console.error(err));
          }
        });

      tabs.addClass("h-100 w-100").append(config.topics.map(createTab));

      form.on("submit", function(e) {
        e.preventDefault();

        var newTopic = $(this)
          .serializeArray()
          .filter(i => i.name === "newTopic")
          .reduce((a, c) => a + c.value, "")
          .trim();

        if (newTopic.length > 0) {
          console.log({ newTopic });

          $(".buttons").append(createButton(newTopic));
          $(".tabs").append(createTab(newTopic));

          $(this)
            .trigger("reset")
            .focus();
        }
      });
    });

    return this;
  };
})(jQuery);
