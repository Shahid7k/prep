import React,{useState, useEffect} from 'react';
import {getUser, change} from './apiReqs/reqs'
import { Redirect } from 'react-router-dom';

const Change = () => {

    const [userData,setUserData] = useState({name:'',todo:'',done:''});

    const [redirect, setRedirect] =useState(false);

    const localItem = localStorage.getItem('prepToken');
    const userId =JSON.parse(localItem).user._id;

    useEffect(()=>{
        async function setHome(){
            const user = await getUser(userId);
            console.log("USER RESP:",user.data)
            if(!user.data.error) setUserData(user.data.user[0])
            else {
                console.log('Error :',user.data.msg)
                alert('Error Occured ! Check console for more details');
            }
        }
        setHome();
    },[])


    const handleChange = e => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
      };
    


    const handleSubmit = async e => {
        e.preventDefault();
        const data = await change( userId, userData.todo , userData.done );
        console.log(data);
        if (data.error) {
            console.log("Errors : ",data.msg);
            alert("Error occured. Check the console for more details")
        } else {
            setRedirect(true);
        }
    };


    if(redirect) return <Redirect to="/home" />


    return (
        <div className="container">
            <div className="card text-center">
                    
                    <div className="card-header display-4">
                        {userData.name} 
                        <div className="text-right" style={{float:"right"}}>

                        </div>

                    </div>
                    <div className="card-body w-75 container">
                        <h5 className="card-title">TO DO : </h5>
                        <input type="text" className="form-control" name="todo" onChange={handleChange} value={userData.todo} />
                    </div>
                    <div className="card-body w-75 container">
                        <h5 className="card-title"> Completed enough : </h5>
                        <input type="text" className="form-control" name="done" onChange={handleChange} value={userData.done} />
                    </div>
                    <div className="card-footer text-muted">
                       <button className="btn btn-info" onClick={handleSubmit}>
                           Submit
                       </button>
                    </div>
                </div>
        </div>    
    );
}

export default Change;