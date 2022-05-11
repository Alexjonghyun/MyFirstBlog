import {useState} from "react";
import axios from "axios";

const WritePage = () => {
    const [text, setText] = useState('');
    const [text2, setText2] = useState('');
    const onChange = (e) => {
        setText(e.target.value);
    }
    const onChange2 = (e) => {
        setText2(e.target.value);
    }
    const onClick = () => {
        //백엔드로 보내주는 작업
        const data = {
            subject : text,
            content : text2,
            create_date : new Date(),
        }
        axios.post('/pybo/api/post/',data)
            .then((res)=> console.log(res))
            .catch(function(error){
                console.log(error);
            });
        window.location.replace('/');
    }
    console.log(sessionStorage.getItem("Authorized"));
    return ( (sessionStorage.getItem("Authorized")==="true")?
        <div>
            <h1>Write</h1>
            subject<input onChange={onChange}/>
            content<input onChange={onChange2}/>
            <button onClick={onClick}>post</button>
        </div>

        :

        <div>
            I'm sorry. But only John can write a new post.
        </div>
    );
};
export default WritePage;