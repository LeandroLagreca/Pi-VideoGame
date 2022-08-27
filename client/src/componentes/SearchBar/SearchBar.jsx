import React from "react"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SearchVideoGame } from "../../redux/actions";
import style from './SearchBar.module.css';
import Spinner from '../Loader/Loader';

export default function SearchBar({setCurrentPage}){
    const dispatch = useDispatch();
    const[gameName, SetGameName]= useState('');
    const[spinner, setSpinner] =useState(false);

    const handleInputChange =(e)=>{
        e.preventDefault();
        SetGameName(e.target.value)
    };

    const handleSubmit =(e) =>{
        if(!gameName) return alert('enter game name');
        e.preventDefault();
        setSpinner(true);
        dispatch(SearchVideoGame(gameName))
        setCurrentPage(1)
        setTimeout(()=>{
            setSpinner(false)
        }, 4000);
        SetGameName('');
    };

    const handleKeyPress=(e)=>{
        if(e.key ==='Enter'){
            handleSubmit(e)
        }
    }

    return (
        <div>
            { spinner ? <Spinner /> :
            <div className={style.conatinerSearch}>
                <input
                onKeyPress={handleKeyPress}
                className={style.input}
                onChange={(e)=> handleInputChange(e)}
                value={gameName}
                type='text'
                placeholder="Search VideoGame"></input>
                <button 
                className={style.buttonSearch}
                onClick={(e)=> handleSubmit(e)}
                type='submit'>Search</button>
                </div>
}  
        </div>
    ) 
}