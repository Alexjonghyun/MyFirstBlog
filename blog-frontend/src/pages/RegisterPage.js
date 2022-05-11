import {useState} from "react";
import axios from "axios";

const RegisterPage = () => {
    const [id, setID] = useState();
    const [pw, setPW] = useState();

    const idChange = (e)=>{
        setID(e.target.value);

    }
    const pwChange = (e) => {
        setPW(e.target.value);
    }
    const onClick = () => {
        axios.post(
            '/pybo/api/user/',
            {
                name : id,
                password : pw,
                create_date : new Date()
            }
        ).then((res)=> console.log(res))
            .catch(function(error){
                console.log(error);
            });
        window.location.replace('/');
    }

    return(
    <div>
        You can register in 5 seconds!
        <div>
            id<input onChange={idChange} />
            pw<input onChange={pwChange} type="password" />
            <button onClick={onClick}>register</button>
        </div>
    </div>
    );
};

export default RegisterPage;