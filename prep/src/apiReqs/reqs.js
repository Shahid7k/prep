import axios from 'axios';

const URL = "http://localhost:8080"

export const getAllUsers = async (  ) => {
    try {
        const users = await axios.get(`${URL}/allusers`);
        console.log('USERS REQ:',users) 
        return {data:users.data}
    } catch (error) {
        
    }

   
}

export const getUser = async ( userId ) => {
    try {
        const user = await axios.get(`${URL}/user/${userId}`);
        console.log('USER REQ:',user) 
        return {data:user.data}
    } catch (error) {
        
    }

}

export const change = async (userId, todo, done) => {
    try {
        const user = await axios.put(`${URL}/change/${userId}`,{todo, done});
        console.log('USER REQ:',user) 
        return {data:user.data}
        
    } catch (error) {
        
    }

}

export const signIn = async (name, password) => {
    try {
        const user = await axios.post(`${URL}/signin`,{name,password});
        console.log('USER REQ:',user) 
        return {data:user.data}
    } catch (error) {
        
    }

}

