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
        sessionStorage.setItem("tempTitle", title);
        sessionStorage.setItem("tempContent", content);
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
                            <div>
                                {c.owner_name} : {c.content}
                                <button style={{
                                    backgroundColor : "darkgray",
                                    borderRadius: "28px",
                                    border : "3px solid red",
                                    display : "inline-block",
                                    cursor:"pointer",
                                    color:"#ffffff",
                                    fontFamily:"Arial",
                                    fontSize:"17px",
                                    padding:"10px 14px",
                                    textDecoration:"none",
                                    textShadow:"0px 1px 0px #2f6627",
                                }} onClick={() => {
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
                            <div style = {{fontSize: "14px", color: "#9CA3AF"}}>
                                {c.create_date}
                            </div>
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
            <div style={{width:"90%", color:"blue"}}>
                <h1>Title : {title}</h1>
            </div>
            <button style={{
                backgroundColor : "red",
                borderRadius: "28px",
                border : "3px solid #18ab29",
                display : "inline-block",
                cursor:"pointer",
                color:"#ffffff",
                fontFamily:"Arial",
                fontSize:"17px",
                padding:"20px 31px",
                textDecoration:"none",
                textShadow:"0px 1px 0px #2f6627",
            }} onClick={onDeleteClick}>delete</button>
            <button style={{
                backgroundColor : "#44c767",
                borderRadius: "28px",
                border : "3px solid red",
                display : "inline-block",
                cursor:"pointer",
                color:"#ffffff",
                fontFamily:"Arial",
                fontSize:"17px",
                padding:"20px 31px",
                textDecoration:"none",
                textShadow:"0px 1px 0px #2f6627",
            }}onClick={onUpdateClick}>update</button>
            <div style={{
                borderTop: "11px dotted #000",
                borderRight: "10px dotted #000",
                borderBottom: "10px groove #000",
                borderLeft: '10px solid #000',
            }}>content : {content}</div>
            <div style={{fontSize: "14px", color: "#9CA3AF"}}>posted at : {creat_date}</div>
            {comments}
            <div>
                Comment : <input value={newcomment} onChange={(e)=>{setNewComment(e.target.value);}}/>
                <button style ={{
                    boxShadow: "3px 4px 0px 0px #899599",
                    background:"linear-gradient(to bottom, #ededed 5%, #bab1ba 100%)",
                    backgroundColor:"#ededed",
                    borderRadius:'15px',
                    border:'1px solid #d6bcd6',
                    display:'inline-block',
                    cursor:'pointer',
                    color:'#3a8a9e',
                    fontFamily:'Arial',
                    fontSize:'17px',
                    padding:'9px 25px',
                    textDecoration:'none',
                    textShadow:'0px 1px 0px #e1e2ed'
                }}
                    onClick={onCommentClick}>insert</button>

            </div>
        </div>
    );
};

export default ReadPage;