import React,{useState, useEffect} from 'react';
import { getUser, getAllUsers } from './apiReqs/reqs';
import UserCard from './UserCard';
import { Link } from 'react-router-dom';

const Home = () =>{
    
    const [userData,setUserData] = useState({name:'',todo:'',done:''});
    const [allUsers,setAllUsers] = useState([])
    
   
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
            const allUsers = await getAllUsers();
            if(!allUsers.data.error) setAllUsers(allUsers.data.users)
            else {
                console.log('Error :',allUsers.data.msg)
                alert('Error Occured ! Check console for more details');
            }
        }
        setHome();
    },[])

    // console.log("USERSARR:",allUsers)

    return (
        
        <div className=" d-flex">
            <div className=" ml-5 my-3 w-50">
                <div className="todo ">
                <div className="card text-center"> 
                    <div className="card-header display-4">
                        {userData.name} 
                        <div className="text-right" style={{float:"right"}}>

                        <Link to="/change" className="btn btn-danger" >Edit</Link>
                        </div>

                    </div>
                    <div className="card-body">
                        <h5 className="card-title">TO DO : </h5>
                        <p className="card-text"> {userData.todo} </p>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title"> Completed enough : </h5>
                        <p className="card-text"> {userData.done===""?"Empty":userData.done} </p>
                    </div>
                    <div className="card-footer text-muted">
                        All the Best! There's very little time left.
                    </div>
                </div>
                </div>
            </div>
            <div className="m-3">
                {allUsers.filter((user)=>user._id!==userId).map((user,i)=><UserCard user={user} key={i} />)}        
           </div>
        </div>


    );

}

export default Home;