import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

const LoginPage = () => {
    const [id, setId] = useState('');
    const [pw, setPW] = useState('');
    const [db , setDB] = useState([]);
    const onIDChange = (e) => {
        setId(e.target.value);
    }
    const onPWChange = (e) => {
        setPW(e.target.value);
    }
    const onClick = () => {
        if(id==="alex" && pw==="1234") {
            sessionStorage.setItem("authenticated", "true");
            sessionStorage.setItem("Authorized", "true");
            sessionStorage.setItem("name", "John(admin)")
            window.location.replace('/');
        }
        axios.get('/pybo/api/user/')
            .then(res => {
                const foundID = res.data.find(user => user.name === id);
                if(!foundID || foundID.password !== pw){
                    console.log("login failure");
                }else{
                    sessionStorage.setItem("id", foundID.id);
                    sessionStorage.setItem("name", foundID.name);
                    console.log(foundID.id)
                    sessionStorage.setItem("authenticated", "true");
                    sessionStorage.setItem("Authorized", "false");
                    console.log("login success");
                    window.location.href = '/';
                }

            }
            )
            .catch(err => console.log(err));
    }
    if(sessionStorage.getItem("authenticated")==="true"){
        return(
            <div>
                already logged in
                <div>
                    <button onClick={() => {
                        sessionStorage.setItem("authenticated", "false");
                        sessionStorage.setItem("Authorized", "false");
                        sessionStorage.setItem("name", "null")
                        window.location.href = '/';
                    }}>logout</button>
                </div>
            </div>

        );
    }
    return (
        <div>
            <div>
                ID : <input onChange={onIDChange} type='id' />
            </div>
            <div>
                PW : <input onChange={onPWChange} type='password' maxLength='4'/>
            </div>
            <button onClick={onClick}>login</button>
            <button onClick={()=> {window.location.replace('/register/')}}>register</button>
        </div>
    );
};

export default LoginPage;