import React from "react";
import { useState } from "react";
import {useDispatch} from 'react-redux';
import {FilterByGenre,orderByRating,FilterByCreated,orderByName, getAllGames} from '../../redux/actions/index';
import style from './Filter.module.css';
import Spinner from "../Loader/Loader";

export default function Filter({setCurrentPage}){ // se le pasa la pagina de inicio
    const dispatch = useDispatch();
    const [/*order*/, setOrder]= useState('');
    const[spinner, setSpinner]= useState(false);



    const handleFilterGenre = (e) =>{
        dispatch(FilterByGenre(e.target.value))
        setCurrentPage(1)
        setOrder("")
    }
    const handleFilterCreated = (e) => { 
        dispatch(FilterByCreated(e.target.value))
        setCurrentPage(1)
    }
    const handleOrderAscDesc = (e) => {
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
    }
    const handleOrderRating =(e)=>{
        dispatch(orderByRating(e.target.value))
        setOrder(e.target.value)
        setCurrentPage(1)
    }
    const handleClick =(e)=> {
        setSpinner(true)
        e.preventDefault();
        dispatch(getAllGames());
        setTimeout(()=>{
            setSpinner(false)
        }, 5000)
        setCurrentPage(1)
        setOrder('')
    }

    return (
        <div>
            {
                spinner ? <Spinner/> :
                <div className={style.filtersContainer}>
                    <div> 
                        <select className={style.selectFilter} onChange={e=>handleOrderAscDesc(e)}>
                            <option hidden> Sort by name </option>
                            <option value ='asc'> A-Z </option>
                            <option value='des'> Z-A</option>
                            </select>
                            </div>
                            <div className={style.filtersContainer}>
                    <div> 
                        <select className={style.selectFilter} onChange={e=>handleFilterCreated(e)}>
                            <option hidden> Origin </option>
                            <option value ='All'> Everybody  </option>
                            <option value='Created'> Created </option>
                            <option value='Existing'> Existing </option>
                            </select>
                            </div>
                            <select className={style.selectFilter} onChange={e=>handleFilterGenre(e)}>
                            <option hidden> Genres </option>
                            <option value ='All'> Everybody  </option>
                            <option value='Action'> Action </option>
                            <option value='Indie'> Indie </option>
                            <option value ='Adventure'> Adventure  </option>
                            <option value='RPG'> RPG </option>
                            <option value='Strategy'> Strategy </option>
                            <option value ='Shooter'> Shooter  </option>
                            <option value='Casual'> Casual </option>
                            <option value='Simulation'> Simulation </option>
                            <option value ='Racing'> Racing  </option>
                            <option value='Arcade'> Arcade </option>
                            <option value='Puzzle'> Puzzle </option>
                            <option value ='Platformer'> Platformer </option>
                            <option value='Sports'> Sports </option>
                            <option value='Massively Multiplayer'>Massively Multiplayer </option>
                            <option value='Fighting'> Fighting </option>
                            <option value ='Family'> Family </option>
                            <option value='Educational'> Educational </option>
                            <option value='Board Games'>Board Games</option>
                            <option value ='Card'>Card</option>
                            </select>
                            </div>
                            <div>
                                <select className={style.selectFilter} onChange={e => handleOrderRating(e)}>
                                    <option hidden>Rating</option>
                                    <option value='min'>Min</option>
                                    <option value='max'>Max</option>
                                    </select>
                                    </div>
                                    <div>
                                        <button className={style.buttonReset} onClick={e => handleClick(e)}>Clean filter</button>
                                    </div>
                                    </div>
}
        </div>
    );
}