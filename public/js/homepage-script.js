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

                let html = `<div class='ind-comment'>
                                <div class='comment-text'>${e.comment}</div>
                                <div class='rmcont'>
                                    <i class='remove fas fa-trash-alt' id='${e._id}'></i>
                                </div>
                            </div>`
                that.append(html)
            })
        })
    }

    $.get('http://localhost:8080/api/articles', data => {
        $('#page-load').attr('src','')
        $('body').css('background-color','rgb(242, 242, 242);')
        let i = 0;
        data.forEach(e => {
            i++;

            let html = `<div id='story-cont'>
                            <a href='${e.link}'>${e.title}</a>
                            <h6>${e.author}</h6>
                            <p>${e.desc}</p>
                            <div id='comment-cont'>
                                <div id='comments-${i}'></div>
                                <input id='comment' class='comment-form' type='text' placeholder='Enter Your Comment Here'>
                                <button id='submit-comment' artid='${e._id}'>SUBMIT COMMENT</button>
                            </div>
                        </div>`

            $('#content-container').append(html)

            getComments($(`#comments-${i}`), e._id)
        });
    })

})