import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GameItem from '../game/GameItem';
import './css/home.min.css'

export const getGamesData = async (type, value, details = false) => {
    const { data } = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/${details ? 'game' : 'games'}`,
        {
            headers: {
                'X-RapidAPI-Key':
                    'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            },
            params: {
                [type]: value
            }
        });
    // if we specify number of games to display otherwise get all
    return data;
}

const Home = () => {

    const [Games, setGames] = useState([]);

    useEffect(() => {
        getGamesData('sort-by', 'popularity').then(data => setGames(data.slice(0, 3)));
        window.document.title = 'Home';
    }, []);

    return (
        <header className='text-white'>
            <div className='aa d-flex-center flex-column text-center'>
                <h1 className='fs-7-lg'>Find & track the best <span className='text-primary'>free-to-play</span> games!</h1>
                <p className='text-muted fs-4 mt-2'>
                    Track what you've played and search for what to play next! Plus get free premium loot!
                </p>

                <Link to='games/all' className='btn btn-outline-secondFontColor py-2 px-3' type='button'>
                    Browse Games
                </Link>
            </div>

            <div className='border-top border-3 border-dark bg-secondary'>
                <div className='container py-5'>
                    <h2 className='d-flex align-items-center gap-2'>
                        <i className='fas fa-robot mr-2' />
                        Personalized Recommendations
                    </h2>
                    <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 mt-5 gx-0 gx-md-5 gy-5 gy-lg-0'>
                        {
                            Games.map(game => <GameItem key={game.id} {...game} />)
                        }
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Home;
