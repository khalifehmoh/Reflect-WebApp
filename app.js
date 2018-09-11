

function getDataFromAPI(searchTerm, callback) {
  const key ='JkHqD0lI3xZJpJhwR4gtg';
  const GOODREADS_SEARCH_URL = 'https://www.goodreads.com/search/index.xml?key=' + key + '&q=' + searchTerm;
  const query = {
    q: "select * from xml where url=\""+GOODREADS_SEARCH_URL+"\"",
    format: "json"
  }
  $.get("http://query.yahooapis.com/v1/public/yql", query, callback);
}


function testResult(result){
  console.log(`https://www.goodreads.com/book/show/${result.id.content}`);
}

//render fun.
function renderResult(result){
  return `
    <div class="js-search_result">
      <a href="https://www.goodreads.com/book/show/${result.best_book.id.content}" target="_blank" ><img class="js-result_thumb" src="${result.best_book.image_url}"></a>
      <br><h3>${result.best_book.title}</h3>
      <h4><a href="https://www.goodreads.com/author/show/${result.best_book.author.id.content}" target="_blank" >${result.best_book.author.name}</a></h4>
      <hr>
    </div>
  `;
}

//callback fun.
function renderData(data){
  const books = data.query.results.GoodreadsResponse.search.results.work;
  const booksNumber = data.query.results.GoodreadsResponse.search.results;
  console.log(Array.isArray(books));
  console.log(books);
  //var objectSize = Object.keys(booksNumber).length;;
  //console.log(objectSize); //this will retrieve an array of the 20 book results that matches the query
  if (Array.isArray(books)) {
    var results = books.map(function(book){ //this will iterate over each book(object)
    return renderResult(book) //this will send the object or the book to render it (it's xml name is "work")
    });
  }
  else {
    var results = renderResult(books);
    $(".js-results").html(results)
  }
  $(".js-results").html(results)
}

/*function renderData(data){
  const results = data.results.map(function(item, index){
    console.log(results)
    //return renderResult(item)
  });
  $(".js-results").html(results)
}*/

//event listen
function handleFormSubmit() {
$('#js-search_form').submit(function(event){
	event.preventDefault();
	const query = $(this).find("#js-search_entry").val();
  $(this).find("#js-search_entry").val("");
  //var adjustedQuery = query.replace(/\s/g, '+');
  var adjustedQuery = encodeURIComponent(query)
  console.log(adjustedQuery);
  getDataFromAPI(adjustedQuery, renderData)
  })
}

$(function() {
  handleFormSubmit();
})

//result.id.videoId

/*function getID(index){
  var index = state.items[index];
  var ID = index.id.videoId;
  state.ID = ID
  //$(".js-results").append(results)

  function handleThumbClick() {
  $('.js-results').on('click', '.js-result_thumb', function(event) {
    var index = $(this).closest('div').index();
    state.index = index;
    getID(index);
  })
}
}*/




