import React from 'react';


const UserCard = ({user}) =>{
    const { name, todo, done } = user;

    
    return (
        <div className="card" style={{ maxWidth:"50rem"}} >
            <div className="card-body">
                <h5 className="card-title"> {name} </h5>
                <h6 className="card-subtitle mb-2 text-muted">TO DO:</h6>
                <p className="card-text">{todo}</p>
                <h6 className="card-subtitle mb-2 text-muted">Completed :</h6>
                <p className="card-text">{done}</p>
            </div>
        </div>

    );
    
}

export default UserCard