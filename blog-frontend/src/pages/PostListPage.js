import {Link} from 'react-router-dom';
import axios from "axios";
import postListing from "../postListing";
import {useEffect, useState} from "react";
import PostListing from "../postListing";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const linking = () => {
    window.location.href = '/login/'
}
const onlogoutClick = () => {
    sessionStorage.setItem("authenticated", "false");
    sessionStorage.setItem("Authorized", "false");
    sessionStorage.setItem("name", "null")
    window.location.reload();
}
const Writing = () => {
    window.location.href = '/write/';
}

const PostListPage = () => {
    const [finaldata, setData] = useState([]);

    useEffect(()=>{
        axios.get("/pybo/api/post/")
            .then((res) => { setData(
                res.data.map( (p) =>
                    <div>
                        <Link to={'/'+p.id} key={p.id} >Title : {p.subject} (Written in {p.create_date.substring(0,19)} )</Link>
                    </div>
                )
            ); })
            .catch(err => console.log(err));
    }
    ,[]);



    return (
        <div>
            <div>
                <button onClick={linking}>Login</button>
                <button onClick={onlogoutClick}>logout</button>
                <button onClick={Writing}>Write</button>
                <button onClick={()=>{window.location.href='/register/'}}>Register</button>
            </div>
            <div>
                {finaldata}
            </div>
        </div>
    );
};

export default PostListPage;