$(document).ready(function(){

    $.get('http://localhost:8080/api/articles', data => {
        data.forEach(e => {
            let div = $('<div>');
            let a = $('<a>');
            let h6 = $('<h6>');
            let p = $('<p>');

            a.text(e.title).attr('href',e.link);
            h6.text(e.author);
            p.text(e.desc);
            div.append(a,h6,p)

            $('#content-container').append(div)
        });
    })

})