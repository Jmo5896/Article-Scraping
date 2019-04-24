$(document).ready(function() {
    let articleData = [];
    console.log(articleData);

    function cleardataBase() {
        console.log('cleared all');
        $.get('/clearall').then(function(err, result) {
            if (err) {
                console.log(err);
            }
        });
    }

    function articleGenerator() {
        $.get('/scrape').then(function(data) {
            data.forEach(article => {
                
                // if (!articleData.includes(article.title, 0)) {
                    $('#articles').append(`
                        <div class="card rounded">
                            <div class="card-header">
                                <a href = '${article.link}'>${article.title}</a>
                            </div>
                            <div class="card-body">
                                <p>${article.summary}</p>
                                <br>
                                <p class="card-text">click the button to save</p>
                                <button data-link = '${article.link}' data-title = '${article.title}' data-summary = '${article.summary}' data-id = '${data.indexOf(article)}' class="btn btn-info article" >Save Article</button>
                            </div>
                        </div>
                        <br>
                    `);
                // } 
            });
        }).then(function(data) {
            // cleardataBase();
        }).catch(function(err) {
            console.log(err);
        });
    }

    function saveArticles() {
        
       
    }

    $('.onion').on('click', function(event) {
        event.preventDefault();
        articleGenerator();
        // setTimeout(cleardataBase, 5000);
    });

    $('#articles').on('click', '.article', function(event) {
        event.preventDefault();
        const id = $(this).attr('data-id');
        let articleData = {
            title: $(this).attr('data-title'),
            link: $(this).attr('data-link'),
            summary: $(this).attr('data-summary')
        }
        $.ajax({
            method: "POST",
            url: "/save",
            data: articleData
        }).then(function(data) {
            console.log(data);
            alert('Article Saved!!!'); 
        }).catch(function(err) {
            console.log(err);
        }); 
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
                    <p>${article.summary}</p>
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

