import React from "react";
import { useEffect, useState} from "react";
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import{getGenres,postVideoGame,getPlatforms, getAllGames} from '../../redux/actions/index';
import style from './CreatedVideoGames.module.css'

        const validateForm = (input) => {
            let errors = {};
            if (!input.name) {
            errors.name = "A name is required";
            } else if (input.name.length < 3) {
            errors.name = "The name must have at least 3 characters";
            }
        
            if (!input.description) {
            errors.description = "A description is required";
            } else if (
            /[A-Za-z0-9.,;:!?()"'%-]+/.test(input.description) &&
            input.description.length < 20
            ) {
            errors.description = "Must have at least 20 characters";
            }
        
            if (!input.rating) {
            errors.rating = "A rating from 1 to 5 is required";
            } else if (input.rating < 1 || input.rating > 5) {
            errors.rating = "The rating must be between 1 and 5";
            }
            
            if (!input.released) { 
            errors.released = "Need release";
            } else if (
                /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/.test(input.released)) errors.released = "Must be a valid date";
            
            /*if (!input.image) {}
            else if (
            !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#()?&//=]*)/.test(input.image)) {
            errors.image = "The image must be a valid url";
            }*/
        
            return errors;
        };
        
        export default function CreateVideogame() {
            const dispatch = useDispatch();
            const videogames = useSelector((state) => state.videogames);
            const genres = useSelector((state) => state.genres);
            const platforms = useSelector((state) => state.platforms);
            const history = useHistory();
            const [errors, setErrors] = useState({});
            const [input, setInput] = useState({
                name: "",
                description: "",
                image: "",
                released: "",
                rating: "",
                genres: [],
                platforms: [],
            });
        
            useEffect(() => {
            dispatch(getGenres());
            dispatch(getAllGames());
            dispatch(getPlatforms());
            }, [dispatch]);
        
            const handleChange = (e) => {
            setInput({
                ...input,
                [e.target.name]: e.target.value,
            });
        
            setErrors(
                validateForm({
                ...input,
                [e.target.name]: e.target.value,
                })
            );
            };
        
            const handleSelectGenres = (e) => {
            if (Object.values(input.genres).includes(e.target.value)) {
                alert("The genre has already been selected");
            } else {
                setInput({
                ...input,
                genres: [...input.genres, e.target.value]
                ,
                }); 
            }
            };
        
            const handleSelectPlatform = (e) => {
            if (Object.values(input.platforms).includes(e.target.value)) {
                alert("The platform has already been selected");
            } else {
                setInput({
                ...input,
                platforms: [...input.platforms, e.target.value],
                });
            }
            };
        
            const handleDeleteGenres = (e) => {
            setInput({
                ...input,
                genres: input.genres.filter((genre) => genre !== e),
            });
            };
        
            const handleDeletePlatforms = (e) => {
            setInput({
                ...input,
                platforms: input.platforms.filter((platform) => platform !== e),
            });
            };
        
            const handleSubmitForm = (e) => {
            if (
                videogames.find(
                (videogame) => videogame.name.toLowerCase() === input.name.toLowerCase()
                )
            ) { e.preventDefault();
                return alert("Not create, the game already exists");
            } 
                e.preventDefault();
                if (input.platforms.length === 0) {
                return alert("Not Create, at least 1 platform is required");
                } else if (input.platforms.length > 4) {
                return alert("Not create, maximum 4 platform");
                }
                if (input.genres.length === 0) {
                return alert("Not create, at least 1 genre is required");
                } else if (input.genres.length > 4) {
                return alert("Not create, maximum 4 genres can be added");
                }
                else {
                dispatch(postVideoGame(input));
                alert("¡Successfully created videogame!");
                setInput({
                name: "",
                description: "",
                image: "",
                released: "",
                rating: "",
                genres: [],
                platforms: [],
                });
            
                history.push("/home");
                }
            };
        
            return (
            <div>
                <div className={style.containerForm}>
                <Link to="/home">
                    <button className={style.ButtonBack}>Volver</button>
                </Link>
                <div className={style.containerTitle}>
                    <h1>Create Videogame</h1>
                </div>
                <form
                    className={style.containerFormInside}
                    onSubmit={(e) => handleSubmitForm(e)}
                >
                    <div>
                    <h5 className={style.textForm}>Name:</h5>
                    <input
                        className={style.inputForm}
                        onChange={(e) => handleChange(e)}
                        type="text"
                        value={input.name}
                        name="name"
                        required={true}
                    ></input>
                    {errors.name && <p className={style.errorText}>{errors.name}</p>}
                    </div>
                    <div>
                    <h5 className={style.textForm}>Description:</h5>
                    <textarea
                        className={style.inputFormDescription}
                        onChange={(e) => handleChange(e)}
                        type="text"
                        value={input.description}
                        name="description"
                    ></textarea>
                    {errors.description && (
                        <p className={style.errorText}>{errors.description}</p>
                    )}
                    </div>
                    <div>
                    <h5 className={style.textForm}>Genres:</h5>
                    <select
                        className={style.selectForm}
                        onChange={(e) => handleSelectGenres(e)}
                    >
                        <option hidden>Select Genre</option>
                        {genres.map((e) => {
                        return (
                            <option key={e.id} value={e.name}>
                            {e.name}
                            </option>
                        );
                        })}
                    </select>
                    <div className={style.containerButtonFormX}>
                        {input.genres.map((e) => {
                        return (
                            <div key={e}>
                            <button
                                className={style.buttonFormX}
                                onClick={() => handleDeleteGenres(e)}
                            >
                                {e}
                            </button>
                            </div>
                        );
                        })}
                    </div>
                    </div>
                    {errors.genres && <p className={style.errorText}>{errors.genres}</p>}
                    <div>
                    <h5 className={style.textForm}>Platform:</h5>
                    <select
                        className={style.selectForm}
                        onChange={(e) => handleSelectPlatform(e)}
                    >
                        <option hidden>Select Platform</option>
                        {platforms.map((e) => {
                        return (
                            <option key={e.id} value={e.name}>
                            {e.name}
                            </option>
                        );
                        })}
                    </select>
                    </div>
                    <div className={style.containerButtonFormX}>
                    {input.platforms
                        ? input.platforms.map((e) => {
                            return (
                            <div key={e}>
                                <button
                                className={style.buttonFormX}
                                onClick={() => handleDeletePlatforms(e)}
                                >
                                {e}
                                </button>
                            </div>
                            );
                        })
                        : null}
                    </div>
                    {errors.platforms && (
                    <p className={style.errorText}>{errors.platforms}</p>
                    )}
                    <div>
                    <h5 className={style.textForm}>Release Date:</h5>
                    <input
                        className={style.inputForm}
                        type="date"
                        min='1980-03-01'
                        max='2023-01-03'
                        value={input.released}
                        name="released"
                        onChange={(e) => handleChange(e)}
                    ></input>
                    {errors.released && (
                        <p className={style.errorText}>{errors.released}</p>
                    )}
                    </div>
                    <div>
                    <h5 className={style.textForm}>Image:</h5>
                    <input
                        className={style.inputForm}
                        onChange={(e) => handleChange(e)}
                        type="text"
                        value={input.image}
                        name="image"
                    ></input>
                    <p className={style.errorText}>{errors.image}</p>
                    </div>
                    <div>
                    <h5 className={style.textForm}>Rating:</h5>
                    <input
                        className={style.inputForm}
                        onChange={(e) => handleChange(e)}
                        type="number"
                        step={0.1}
                        value={input.rating}
                        name="rating"
                    ></input>
                    {errors.rating && (
                        <p className={style.errorText}>{errors.rating}</p>
                    )}
                    </div>
                    <div>
                    <button
                        className={style.buttonCreate}
                        disabled={Object.entries(errors).length === 0 ? false : true}
                    >
                        Create Videogame
                    </button>
                    </div>
                </form>
                </div>
            </div>
            );
        } 