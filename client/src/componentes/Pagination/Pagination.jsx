import style from './Pagination.module.css';


export default function Pagination({GameXPage, allVideoGames, currentPage, paginate,changePage}){
    const pageNumber=[]
    for (let i = 1; i <= Math.ceil(allVideoGames / GameXPage); i++) {
        pageNumber.push(i);
    }
    return (
        <div>
            <div className={style.paginationContainer}>
                
                {pageNumber.map((e) => (
                    <div key ={e}>
                        <p className={currentPage === e ? style.active : style.paginationClick}onClick={()=> paginate(e)}>{e}</p>
                        </div>
                ))}
                
        </div>
        </div>
    )
}