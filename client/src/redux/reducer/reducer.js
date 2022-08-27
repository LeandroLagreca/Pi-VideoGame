
import { Get_All_Games,
    Order_By_Name,
    Order_By_Rating,
    search_By_Name,
    get_Details,
    Post_VideoGame,
    filter_By_Created,
    filter_By_Genre,
    Get_Genres,
    Get_Platforms} from '../actions/index'


const initialState = {
    videogames: [],
    videogameDetail: [],
    genres: [],
    platforms: [],
    AllVideogames: [],
}


const rootReducer= (state = initialState, action)=>{
    switch(action.type){
        case Get_All_Games:{
            return {
                ...state,
                videogames: action.payload,
                AllVideogames:action.payload
            }
        }
            
        case filter_By_Genre: {
            const allVideogames = state.AllVideogames;
            const statusFilter = action.payload === "All"
                ? allVideogames
                : allVideogames.filter((e) =>
                    !!e.createdInDb
                    ? e.genres.some((g) => g.name === action.payload)
                    : e.genres.some((g) => g === action.payload)
                );
            if(statusFilter.length === 0) {
                alert("The genre does not belong to any videogame");
                return {
                ...state,
                videogames: state.AllVideogames,
                };
            } else {
            return {
            ...state,
            videogames: statusFilter,
            };
        }
        };
        case filter_By_Created: {
            const allVideogamesCreated = state.AllVideogames;
            const filterCreated =action.payload === "Created"
                ? allVideogamesCreated.filter((e) => e.createdInDb)
                : allVideogamesCreated.filter((e) => !e.createdInDb);
            
                if(filterCreated.length === 0) {
                alert("No games created");
                return {
                ...state,
                videogames: allVideogamesCreated,
                }
            } else {
                return {
                ...state,
                videogames:
                    action.payload === "All" ? state.AllVideogames : filterCreated,
                };
            }
        };
        case Order_By_Name: {
            const sorted =
            action.payload === "asc"
                ? state.videogames.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                    if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
                    return 0;
                })
                : state.videogames.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                    if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
                    return 0;
                });
            return {
            ...state,
            videogames: sorted.map((e) => e),
            };
        };
        case search_By_Name: {
            const searchValid = action.payload;
            if (Array.isArray(searchValid)) {
            return {
                ...state,
                videogames: action.payload,
            };
            } else {
            return {
                ...state,
                AllVideogames: alert('not found')
            };
            }
        };
        case Order_By_Rating: {
            const sortedByRating =
            action.payload === "min"
                ? state.videogames.sort(function (a, b) {
                    if (a.rating > b.rating) return 1;
                    if (b.rating > a.rating) return -1;
                    return 0;
                })
                : state.videogames.sort(function (a, b) {
                    if (a.rating > b.rating) return -1;
                    if (b.rating > a.rating) return 1;
                    return 0;
                });
            return {
            ...state,
            videogames: sortedByRating.map((e) => e),
            };
        };
        case Post_VideoGame: {
            return {
            ...state,
            };
        }
        case Get_Genres: {
            return {
            ...state,
            genres: action.payload,
            };
        }
        case get_Details: {
            return {
            ...state,
            videogameDetail: action.payload,
            };
        }
        case Get_Platforms: {
            return {
            ...state,
            platforms: action.payload
            }
        }
        default:
            return state;
        }
        
};

export default rootReducer;