import React,{useState} from 'react';
import { signIn } from './apiReqs/reqs';
import { Redirect } from 'react-router-dom';


const SignIn = () =>{
    
    const [formData,setFormData] = useState({name:'',password:''})
    const [redirect, setRedirect] =useState(false);


    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    


    const handleSubmit = async e => {
        e.preventDefault();
        const data = await signIn( formData.name, formData.password );
        console.log(data);
        if (data.error) {
            console.log("Errors : ",data.msg);
            alert("Error occured. Check the console for more details")
        } else {
            console.log("data",data)
            const {token, user} = data.data
            localStorage.setItem("prepToken",JSON.stringify({token,user}))
            setRedirect(true);
        }
    };

    const { name, password } = formData;

    if(redirect) return <Redirect to="/home" />


    return (
        
        <div className="container">
            <form className='w-50'>
                <div className="form-group">
                    <label htmlFor="exampleInputName1">Name</label>
                    <input className="form-control" type="text"  id="exampleInputName1" aria-describedby="NameHelp" name="name" onChange={handleChange} value={name}  />
                    </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input className="form-control" type="password"  id="exampleInputPassword1" name="password" onChange={handleChange} value={password} />
                    <small id="NameHelp" className="form-text text-muted">Password : your name (is small letters)</small>
                </div>
                
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
        
    );

}

export default SignIn;