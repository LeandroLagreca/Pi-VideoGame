import axios from 'axios';

export const Get_All_Games='Get_All_Games';
export const Order_By_Name = 'Order_By_Name';
export const Get_Genres='Get_Genres';
export const Get_Platforms='Get_Platforms';
export const filter_By_Created='Filter_By_Created';
export const filter_By_Genre='Filter_By_Genre';
export const Order_By_Rating='Order_By_Rating';
export const search_By_Name='Search_By_Name';
export const get_Details ='Get_Details';
export const Post_VideoGame='Post_VideoGame';


export function getAllGames(){
    return async function(dispatch){
        const response = await axios.get('http://localhost:3001/videogames');
        return dispatch({
            type: Get_All_Games,
            payload: response.data
        })
    }
};

export function getGenres(){
    return async function(dispatch){
        const response = await axios.get('http://localhost:3001/genres');
        
        return dispatch({
            type: Get_Genres,
            payload: response.data
        })
    }
};

export function getPlatforms(){
    return async function(dispatch){
        const response = await axios.get('http://localhost:3001/platforms');
        return dispatch({
            type: Get_Platforms,
            payload: response.data
        })
    }
};

export function FilterByCreated(payload){
    return {
        type: filter_By_Created,
        payload
    }
};

export function FilterByGenre(payload){
    return {
        type: filter_By_Genre,
        payload
    }
};

export function orderByRating(payload){
        return{
            type: Order_By_Rating,
            payload
    }
};

export function SearchVideoGame(name){
    return async function(dispatch){
        try {
        const response = await axios.get('http://localhost:3001/videogames?name=' + name)
        return dispatch({
            type: search_By_Name,
            payload: response.data
        })
    } catch (error) {
        console.log(error)
    }
    }
};

export function GetDetails(id){
    return async function(dispatch){
        try{
            const response = await axios.get(`http://localhost:3001/videogame/${id}`);
        
        return dispatch({
            type: get_Details,
            payload: response.data
        })
    }
    catch(error){
        console.log(error)
    }
    }
};

export function postVideoGame(payload){
    return async function(){
        try{
            const response = await axios.post('http://localhost:3001/videogames', payload);
            
            return response
        }catch(error){
            console.log(error.response.data)
        }
    }
}
export function orderByName(payload){
    return{
        type: Order_By_Name,
        payload
    }
};