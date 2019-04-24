$(document).ready(function() {

    function cleardataBase() {
        console.log('cleared all');
        $.get('/clearall');
    }

    function articleGenerator() {
        $.get('/scrape').catch(function(err) {
            console.log(err);
        });
        console.log('articleGenerator triggered');
    }

    function reloadPage() {
        location.reload();
    }

    $('.onion').on('click', function(event) {
        articleGenerator();
        setTimeout(reloadPage, 250); 
    });

    $('.clear').on('click', function(event) {
        cleardataBase();
        setTimeout(reloadPage, 250); 
    });

    $('#articles').on('click', '.article', function(event) {
        event.preventDefault();
        let id = $(this).attr('data-id');
        console.log('article id: ' + id);
        $.ajax({
            method: "GET",
            url: "/save/" + id
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
    // $.get('/articles').then(function(data) {
    //         data.forEach(article => {
    //             $('#savedArticles').append(`
    //             <div class="card rounded">
    //                 <div class="card-header">
    //                     <a href = '${article.link}'>${article.title}</a>
    //                 </div>
    //                 <div class="card-body">
    //                     <h5 class="card-title"></h5>
    //                 </div>
    //                 <p>${article.summary}</p>
    //             </div>
    //             <br>
    //             `);
    //         }); 
    //     }).catch(function(err) {
    //         console.log(err);
    //     });   
        
    //     $('#savedArticles').on('submit', '.submit', function(event) {
    //         event.preventDefault();
    //         $.post('/articles/:id').then(function(data) {
    //             alert(data);
    //         });
    //     });

 //NO CODE BELOW THIS LINE
});

