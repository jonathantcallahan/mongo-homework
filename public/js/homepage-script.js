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

    $(document).on('click','.remove', function(){
        var id = $(this).attr('id');
        console.log(id)
        $.ajax({
            url:`/api/comments/${id}`,
            method: 'DELETE',
            success: result => {
                console.log(result)
            }
        })
        location.reload()
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
                let cont = $('<div>')
                let html = $('<div>');
                let i = $('<i>')
                let ic = $('<div>')
                i.attr('class','remove fas fa-trash-alt')
                    .attr('id',e._id)
                ic.append(i).attr('class','rmcont')
                html.text(e.comment)
                    .attr('class','comment-text')
                cont.append(html, ic)
                    .attr('class','ind-comment')
                that.append(cont)
            })
        })
    }

    $.get('http://localhost:8080/api/articles', data => {
        $('#page-load').attr('src','')
        $('body').css('background-color','rgb(242, 242, 242);')
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