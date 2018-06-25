$(document).ready(function() {
    $('.onion').on('click', function(event) {
        event.preventDefault();
    
        $.get('/scrape').then(function(data) {
            // window.location.href = '/';
            data.forEach(article => {
               $('#articles').append(`
               <div class="card rounded">
                    <div class="card-header">
                        <a href = '${article.link}'>${article.title}</a>
                    </div>
                    <div class="card-body">
                        <p class="card-text">click the button to save</p>
                        <button data-link = '${article.link}' data-title = '${article.title}' data-id = '${data.indexOf(article)}' class="btn btn-info article" >Save Article</button>
                    </div>
                </div>
                <br>
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
            method: "POST",
            url: "/save",
            data: articleData
        }).then(function(data) {
            console.log('data ' + data);
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
        window.location.href = '/savedArticles';
    });
    $.get('/articles').then(function(data) {
            data.forEach(article => {
                $('#savedArticles').append(`
                <div class="card rounded">
                    <div class="card-header">
                        <a href = '${article.link}'>${article.title}</a>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"></h5>
                    </div>

                    <form>
                        <div class="form-group">
                            <label for="comments">Save your comments below</label>
                            <textarea class="form-control" id="comments" rows="3"></textarea>
                        </div>
                        <button type="submit" class = 'submit btn btn-info' >Save</button>
                    </form>
                </div>
                <br>
                `);
            }); 
        }).catch(function(err) {
            console.log(err);
        });   
        
        $('#savedArticles').on('submit', '.submit', function(event) {
            event.preventDefault();
            $.post('/articles/:id').then(function(data) {
                alert(data);
            });
        });

 //NO CODE BELOW THIS LINE
});

