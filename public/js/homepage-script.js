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
            getComments($(this), artid)
        })
    })

    function getComments(that, id){
        $.get(`/api/comments/${id}`, data => {
            data.forEach(e => )
        })
    }

    $.get('http://localhost:8080/api/articles', data => {
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

            button.text('Submit Comment').attr('id','submit-comment').attr('artid',e._id)
            input.attr('type','text').attr('placeholder','Enter your comment here').attr('id','comment')
            h5.text('Comments')
            comments.attr('id','comments')
            commentCont.attr('id','comment-cont').append(h5,comments,input,button)

            a.text(e.title).attr('href',e.link);
            h6.text(e.author);
            p.text(e.desc);
            div.append(a,h6,p,commentCont).attr('id','story-cont')

            $('#content-container').append(div)

            $.get(`/api/comments/${e._id}`, data => {
                data.forEach(e => {

                })
            })
        });
    })

})