import {useParams} from "react-router-dom";
import axios from "axios";
import {useState} from "react";

const UpdatingPage = () => {
    const [text, setText] = useState('');
    const [text2, setText2] = useState('');
    const onChange = (e) => {
        setText(e.target.value);
    }
    const onChange2 = (e) => {
        setText2(e.target.value);
    }
    const param = useParams();
    const id = param.postId;
    const onClick = () =>{
        axios.patch("/pybo/api/post/"+id+"/", {
            subject : text,
            content : text2,
            create_date : new Date()
        })
            .then((res)=> console.log(res))
            .catch(err => console.log(err));
        window.location.href = '/';
    }

    return (sessionStorage.getItem("Authorized")==="true")?
        <div>
            <h1>Write</h1>
            subject<input onChange={onChange}/>
            content<input onChange={onChange2}/>
            <button onClick={onClick}>post</button>

        </div>

        :

        <div>
            You can't
        </div>;
}

export default UpdatingPage;