$(document).ready(function(){

    $(document).on('click','#submit-comment',function(){
        let comment = $(this).prev().val();
        let artid = $(this).attr('artid');
        console.log('jeb')
        $.post('/api/comments', {
            comment: comment,
            artid: artid
        }).then(data => {
            console.log(data);
            $(this).prev().prev().empty()
            $(this).prev().val('')
            getComments($(this).prev().prev(), artid)
        })
    })

    function getComments(that, id){
        console.log(id)
        $.get(`/api/comments/${id}`, data => {
            if(!data){
                console.log(`No comments for ${id}`)
                return;
            }
            console.log(data)
            data.forEach(e => {
                console.log(e)
                let html = $('<div>')
                html.text(e.comment)
                    .attr('class','ind-comment')
                that.append(html)
            })
        })
    }

    $.get('http://localhost:8080/api/articles', data => {
        $('#page-load').attr('src','')
        data.forEach(e => {
            let div = $('<div>');
            let a = $('<a>');
            let h6 = $('<h6>');
            let p = $('<p>');
            let commentCont = $('<div>');
            let h5 = $('<h5>');
            let comments = $('<div>');
            let input = $('<input>');
            let button = $('<button>')

            button.text('SUBMIT COMMENT')
                .attr('id','submit-comment')
                .attr('artid',e._id)
            input.attr('type','text')
                .attr('placeholder','Enter your comment here')
                .attr('id','comment')
                .attr('id','comment-form')
            h5.text('Comments')
            comments.attr('id','comments')
            commentCont.attr('id','comment-cont').append(h5,comments,input,button)

            a.text(e.title).attr('href',e.link);
            h6.text(e.author);
            p.text(e.desc);
            div.append(a,h6,p,commentCont).attr('id','story-cont')

            $('#content-container').append(div)

            getComments(comments, e._id)
        });
    })

})