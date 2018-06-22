$(document).ready(function() {
    $('.onion').on('click', function(event) {
        event.preventDefault();
    
        $.get('/scrape').then(function(data) {
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
                        <button data-link = '${article.link}' data-title = '${article.title}' data-id = '${data.indexOf(article)}' class="btn btn-primary article" >Save Article</button>
                    </div>
                </div>
               `);
            });
            console.log(data);
        }).catch(function(err) {
            console.log(err);
        });
    });

    $('#articles').on('click', '.article', function(event) {
        event.preventDefault();
        console.log('save working'); 
        const id = $(this).attr('data-id');
        
        console.log(id); 
        let articleData = {
            title: $(this).attr('data-title'),
            link: $(this).attr('data-link')
        };
        console.log(articleData);
        
        $.ajax({
            method: "GET",
            url: "/save",
            data: articleData
        }).then(function(data) {
            console.log('data shit ' + data[0]);
        }).catch(function(err) {
            console.log(err);
        });

        // $.get('/save', articleData).then(function(data) {
        //     // window.location.href = '/';
            
        //     console.log(articleData);

        // }).catch(function(err) {
        //     console.log(err);
        // });
    });


    $('.saved').on('click', function(event) {
        event.preventDefault();
    
        $.get('/savedArticles').then(function(data) {
            window.location.href = '/savedArticles';
            console.log(data);
        }).catch(function(err) {
            console.log(err);
        });
    });

 //NO CODE BELOW THIS LINE
});

