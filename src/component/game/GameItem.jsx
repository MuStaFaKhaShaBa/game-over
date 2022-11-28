import React from 'react';
import { Link } from 'react-router-dom';
import './css/game.min.css'

const GameItem = ({ id, thumbnail, title, short_description, pricing = 'free', genre, platform }) => {
    return (
        <div>
            <Link className='game' to={`/games/game-details/${id}`} title={`Available On ${platform}`}>
                <div className="card border-0 bg-secondary shadow-sm-simi-light">

                    <img src={thumbnail} className="card-img-top" alt={title} />

                    <div className="card-body text-muted">
                        <div className='d-flex-center justify-content-between'>
                            <h3 className='fs-4 card-title text-truncate text-light m-0 pe-3' title={title}>{title}</h3>

                            <span className='badge bg-primary text-uppercase text-white fs-7 p-2'>{pricing}</span>
                        </div>

                        <p className="card-text fs-5 text-secondFontColor text-truncate mb-0 mt-3" title={short_description}>
                            {short_description}
                        </p>

                    </div>

                    <div className='card-footer d-flex-center justify-content-between border-borderColor text-muted py-3'>
                        <i className='fas fa-plus-square' />
                        <div className='d-flex-center gap-3'>
                            <span className='gener rounded-pill bg-muted text-dark fw-bold p-1 px-3 fs-8'>{genre}</span>

                            {/windows/i.test(platform) ?
                                (<i className='fab fa-windows text-muted stretched-link' />)
                                :
                                (<i className='fas fa-window-maximize text-muted stretched-link' />)
                            }
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default GameItem;
