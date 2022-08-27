import React from "react";
import style from './VideoGameCard.module.css';
export default function VideoGameCard ({name, genres, platforms, createdInDb, rating, image}){
    return(
        <div className={style.Cardcontainer}>
        <h2 className={style.titleCard}>{name}</h2>
        <img className={style.imgCard} src= {image} alt={name}></img>
        <p className={style.genreCard}>
            {!!createdInDb
            ? genres.map((e,i)=>{
                return i === genres.length -1? e.name : e.name + " - "
            }) :
            genres.map((e,i)=>{
                return i === genres.length -1? e : e + " - "
            })
            
            }
        
        </p>
        <p className={style.ratingCard}>Rating: {rating}</p>
        </div>
    ) 
};