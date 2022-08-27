import { useEffect, React, useState } from "react";
import {Link, useParams} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { GetDetails, getGenres } from "../../redux/actions";
import style from "./VideoGameDetails.module.css";
import Spinner from '../Loader/Loader';


export default function VideoGameDetail(){
    const dispatch = useDispatch();
    const videoGame= useSelector((state)=> state.videogameDetail);
    const {id} = useParams();
    const[spinner, setSpinner] = useState(false);


    useEffect(()=>{
        setSpinner(true)
        dispatch(GetDetails(id));
        setTimeout(()=>{
            setSpinner(false)
        },1000)
    },[dispatch, id]); 


    useEffect(()=>{
        dispatch(getGenres())
    }, [dispatch])
        
    return (
        <div>
            {
                spinner ? <Spinner/> :
            (
            <div className={style.containerBgDetail}>
            <div className={style.containerDetail}>
                <div className={style.imgDetail}>
                <img
                    
                    src={videoGame.image}
                    alt="Img"
                />
                </div>
                <div className={style.containerTitle}>
                <h2 className={style.detailTitle}>{videoGame.name}</h2>
                </div>
                <div className={style.containerDescription}>
                <div className={style.descriptiontext}>
                    Description:
                    {videoGame.description && (
                    <p>{videoGame.description.replace(/<\/?[^>]+(>|$)/g, "")}</p>
                    )}
                </div>
                </div>
                <div className={style.containerGpr}>
                <p className={style.dateText}>
                    Year released: {videoGame.released}
                </p>
                
                <p> Rating: {videoGame.rating} </p>
                <p className={style.platformsText}>
                    Platforms:{" "}
                    {videoGame.platforms &&
                    videoGame.platforms.map((e, i) => {
                        return i === videoGame.platforms.length - 1 ? e : e + " - ";
                    })}
                </p>
                <p>
                    Genres: {
                        videoGame.createdInDb ?
                        videoGame.genres?.map((e)=> e.name).join(' - ')
                        : videoGame.genres?.join(' - ')
                    }
                </p>
                <Link to="/home">
                    <button className={style.btnBack}>Back</button>
                </Link>
                </div>
            </div>
            </div>
            )
                    }
        </div>  
        
            )};