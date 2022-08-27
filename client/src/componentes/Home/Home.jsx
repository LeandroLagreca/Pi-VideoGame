import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../redux/actions";
import { Link } from "react-router-dom";
import Filters from '../Filters/Filters';
import VideoGameCard from '../VideoGameCards/VideoGameCards'
import Pagination from '../Pagination/Pagination'
import SearchBar from '../SearchBar/SearchBar';
import style from './Home.module.css';
import Spinner from "../Loader/Loader";


export default function Home(){
    const dispatch = useDispatch();
    const allVideoGames = useSelector((state)=> state.videogames)
    const [currentPage, SetCurrentPage]= useState(1)
    const [GameXPage, ]= useState(15)
    const indexOfLastGame = currentPage*GameXPage;
    const indexOFirstGame = indexOfLastGame -GameXPage;
    const currentGames =allVideoGames.slice(indexOFirstGame, indexOfLastGame)
    const paginate= (pageNumber) => SetCurrentPage(pageNumber);

    useEffect(()=>{
        dispatch(getAllGames())
    },[dispatch])

    const changePage= (pageNumber)=>{
        SetCurrentPage(pageNumber)
    };

    return (
        <div className={style.homelogo}>
            {currentGames.length >0 ? (
                <div>
                    <div className={style.containerNav}>
                        <img
                        className={style.homelogo} alt=''></img>
                        <SearchBar setCurrentPage={SetCurrentPage}/>
                        <Link to= '/createvideogame'>
                            <button className={style.buttonCreate}>Create VideoGame</button>
                            </Link>
                            </div>
                            <Filters 
                            setCurrentPage={SetCurrentPage}/>
                            <Pagination GameXPage={GameXPage}
                            allVideoGames={allVideoGames.length}
                            paginate={paginate}
                            currentPage={currentPage}
                            changePage={changePage}/>
                            <div className={style.containerCard}>
                                {currentGames !== 'NotFound' ? (
                                    currentGames && currentGames.map((e)=>{
                                        return (
                                        <div key={e.name}>
                                            <div>
                                                <Link 
                                                className={style.linkHome}
                                                to={`videogame/${e.id}`}>
                                                    <VideoGameCard 
                                                    name={e.name}
                                                    image={e.image}
                                                    rating={e.rating}
                                                    createdInDb={e.createdInDb}
                                                    genres={e.genres} />
                                                    </Link>
                                                    </div>
                                                    </div>
                                    )
                                            
})
                                ): (
                                    'Not Found'
                                
            )}
            </div>
            </div>
            ):(
                <Spinner />
            )}
            </div>
    );
}
