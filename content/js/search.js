
  window.data = {
    {% for page in site.pages %}
        "{{ page.url | slugify }}": {
    "title": "{{ page.title | xml_escape }}",
        "url": "{{ page.url | xml_escape }}",
        "path": "{{ page.url | xml_escape }}"
      },
      {% endfor %}
  {% for product in site.products %}
        "{{ product.slug }}": {
    "title": "{{ product.title | xml_escape }}",
          "url": "{{ product.url | xml_escape }}",
          "categories": "{{ product.categories }}",
          "brands": "{{ product.brands }}",
          "path": "{{ product.url | xml_escape }}"
        }
        {% unless forloop.last %}, {% endunless %}
  {% endfor %}
  };

  $(document).ready(function(){
   var searchIndex = lunr(function () {
      this.ref("id");
      this.field("title", { boost: 10 });
      this.field("categories");
      this.field("brands");
      for (var key in window.data) {
        this.add({
          "id": key,
          "title": data[key].title,
          "categories": data[key].categories,
          "brands": data[key].brands
        });
      }
    });
    
    function getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      console.log('query', query)
      if(query !== ''){
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split("=");
          if (pair[0] === variable) {
            return decodeURIComponent(pair[1].replace(/\+/g, "%20"));
          }
        }
      }
    }

    var searchTerm = getQueryVariable("q");
    // creation of searchIndex from earlier example
    var results = searchIndex.search(searchTerm);
    var resultData = results.map(function (match) {
      return data[match.ref];
    });
    console.log(searchTerm)
    console.log('result', resultData);

    // resultData from previous example
    resultsString = "";   

    resultData.forEach(function (r) {
      resultsString += "<li class='my-4'>";
      resultsString += "<a class='result' href='" + r.url + "'><h3>" + r.title + "</h3></a>";
      resultsString += "</li>"
    });

    console.log('results string', resultsString);
    if(resultsString == '') {
      document.querySelector("#no-results").innerHTML = 'This search returned no results, please try again';
    }
    else {
      document.querySelector(".results-showing").innerHTML = "Showing results for <strong id='search-term'>" + searchTerm + "</strong>";
    }
    
    document.querySelector("#search-results").innerHTML = resultsString;
  })