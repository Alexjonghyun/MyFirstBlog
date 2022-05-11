import axios from "axios";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

const ReadPage = () => {
    const [id, setID] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [creat_date, setDate] = useState('');
    const [comments, setComments] = useState([]);
    const [newcomment, setNewComment] = useState('');


    const params = useParams();
    const onDeleteClick = () => {
        if(sessionStorage.getItem("Authorized")!=="true") {
            console.log("외부인이 지우려고함!");
            console.log("어림도 없지.");
        }else {
            axios.delete("/pybo/api/post/" + params.postId + "/?format=api",
                {data: {id: params.postId}}
            ).then(() => {
                window.location.href = '/'
            }).catch(err => console.log(err));
        }
    }

    const onUpdateClick = () => {
        window.location.href = '/update/'+id;
    }

    useEffect(() => {

        axios.get("/pybo/api/post/"+params.postId)
        .then((res) => {
            setID(res.data.id);
            setTitle(res.data.subject);
            console.log(res.data.id);
            setContent(res.data.content);
            setDate(res.data.create_date);
        })
        .catch(err => console.log(err));

        axios.get("/pybo/api/comment/")
            .then( res => {
                setComments(
                    res.data.filter(c=>{ return (c.post == params.postId) })
                        .map( c => {
                        return(
                        <div>
                            {c.owner_name} : {c.content}
                            <button onClick={() => {
                                if(sessionStorage.getItem("id")!=c.owner && sessionStorage.getItem("Authorized")!=="true") {
                                    return;
                                }
                                window.location.reload();
                                axios.delete('pybo/api/comment/'+c.id)
                                    .then(res => console.log(res))
                                    .catch(err => console.log(err));
                                window.location.reload();
                            }}>delete</button>
                        </div>
                        );

                    })
                )
            })
            .catch(err => console.log(err));
        },
        [newcomment]);

    const onCommentClick = () => {
        if(sessionStorage.getItem("authenticated")!=="true"){
            window.location.replace('/login/')
        }else{
            axios.post("/pybo/api/comment/",
                {
                    post : params.postId,
                    owner : sessionStorage.getItem("id"),
                    owner_name : sessionStorage.getItem("name"),
                    content : newcomment,
                    create_date : new Date(),
                }
                )
                .then((res) => {
                    console.log(res);
                    setNewComment('');
                })
                .catch(err=>console.log(err));
        }

    }

    return (
        <div>
            <h1>Title : {title}</h1>
            <button onClick={onDeleteClick}>delete</button>
            <button onClick={onUpdateClick}>update</button>
            <div>content : {content}</div>
            <div>posted at : {creat_date}</div>
            {comments}
            <div>
                Comment : <input value={newcomment} onChange={(e)=>{setNewComment(e.target.value);}}/>
                <button onClick={onCommentClick}>insert</button>
            </div>
        </div>
    );
};

export default ReadPage;