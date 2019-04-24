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
        $.get('/scrape').then(function() {
            location.reload();
        }).catch(function(err) {
            console.log(err);
        });
        console.log('articleGenerator triggered');
        $.ajax({
            type: 'GET',
            url: "/scrape" 
        }).done(function() {
            alert('scrape complete!');
            location.reload();
        });
    }

    function saveArticles() {
        
       
    }

    $('.onion').on('click', articleGenerator);

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

