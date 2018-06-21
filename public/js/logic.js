$(document).ready(function() {
    $('.onion').on('click', function(event) {
        event.preventDefault();
    
        $.get('/scrape', function() {
        })
        .then(function(data) {
            // window.location.href = '/';
            data.forEach(article => {
               $('#articles').append(`
               <div class="card">
                    <div class="card-header">
                        Article
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><a href = '${article.link}'>${article.title}</a></h5>
                        <p class="card-text">click the button to save</p>
                        <button id = 'Article${data.indexOf(article)}' class="btn btn-primary">Save Article</button>
                    </div>
                </div>
               `);
            });
            console.log(data);
        }).catch(function(err) {
            console.log(err);
        });
    });

 //NO CODE BELOW THIS LINE
});

