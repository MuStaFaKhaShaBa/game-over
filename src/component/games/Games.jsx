import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GameItem from '../game/GameItem';
import { getGamesData } from '../home/Home';
import Loader from '../loader/Loader';

const Games = () => {
    const { filter = null, type = null } = useParams();
    const [GamesData, setGamesData] = useState([]);
    const [DisplayGames, setDisplayGames] = useState([]);
    const [HideLoader, setHideLoader] = useState(false);

    useEffect(_ => {
        setHideLoader(false);
        window.document.title = filter ? `${filter} > ${type}` : 'All';
        // if params is empty get all Games
        getGamesData(filter, type).then(data => {
            setGamesData(data);
            setDisplayGames(data.slice(0, 20));
            setHideLoader(true);
        })
    }, [filter, type]);

    const setMoreGames = _ => {
        setHideLoader(false);
        setDisplayGames(GamesData.slice(0, DisplayGames.length + 20))
        // to delay hide
        setTimeout(() => {
            setHideLoader(true);
        }, 500);
    }

    return (
        <div className='games-container container py-5 position-relative min-height-navLESS'>
            {<Loader hide={HideLoader} />}

            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-5'>
                {
                    DisplayGames.map(game => <GameItem key={game.id} {...game} />)
                }
            </div>

            <button type='button'
                className='btn btn-outline-primary py-2 px-3 d-flex align-items-center gap-2 mx-auto mt-5'
                onClick={_ => DisplayGames.length !== GamesData.length && setMoreGames()}
            >
                {
                    DisplayGames.length === GamesData.length ?
                        'No More'
                        :
                        (<> More Games <span className='fs-4'>&gt;</span></>)
                }
            </button>
        </div>
    );
}

export default Games;
