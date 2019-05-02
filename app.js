(function($) {
  jQuery.fn.app = function(settings) {
    var config = {
      search: "dog",
      limit: 10,
      apiKey: "IQEA4udUrOUrtdhBTpOQm7KWIkwPr6fI",
      apiUrl: "https://api.giphy.com/v1/gifs/search"
    };

    if (settings) jQuery.extend(config, settings);

    this.each(function() {
      var el = $(this);

      var query = {
        api_key: config.apiKey,
        q: config.search,
        limit: config.limit,
        offset: 0,
        rating: "G",
        lang: "en"
      };

      var url = config.apiUrl + "?" + $.param(query);

      $.ajax({ url })
        .then(data => {
          console.log({ data });
          data.data.map(item => {
            el.append(
              $("<div>")
                .css({ width: 200, height: 200 })
                .addClass("m-3")
                .append(
                  $("<img>")
                    .attr("src", item.images["480w_still"].url)
                    .attr("alt", item.title)
                    .addClass("img-thumbnail img-fluid rounded")
                )
            ).addClass("d-flex flex-wrap");
          });
        })
        .catch(err => console.error(err));
    });

    return this;
  };
})(jQuery);
