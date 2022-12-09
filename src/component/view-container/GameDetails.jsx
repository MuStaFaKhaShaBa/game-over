import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGamesData } from '../home/Home';
import Loader from '../loader/Loader';
import './css/game-details.css'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.min.css'
import 'owl.carousel/dist/assets/owl.theme.default.min.css'
const options = {
    items: 1,
    autoplay: true,
    loop: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
};


const GameDetails = () => {
    const { id } = useParams();
    const [{ title = '', thumbnail = '', release_date = '', description = '', developer = '', publisher = '',
        screenshots = [], genre = '', game_url = '',
        minimum_system_requirements = {}, platform = '', pricing = 'free' }, setGame] = useState({});
    const [HideLoader, setHideLoader] = useState(false);

    useEffect(_ => {
        getGamesData('id', id, true).then(data => {
            setGame(data);
            setHideLoader(true);
            window.document.title = `Game ${data.title}`
        });
    }, [id]);

    return (
        <div>
            {
                <Loader hide={HideLoader} />
            }
            <div className='game container mt-5'>
                <div className='row gy-4 gy-md-0'>

                    <div className='col-md-4'>
                        <div className='left-side'>
                            <div className='img rounded-3 overflow-hidden'>
                                <img src={thumbnail} className='w-100' alt={title} />
                            </div>
                            <div className='d-flex justify-content-between px-2 py-3 gap-2'>
                                <span className={`badge text-uppercase text-white fs-7 p-2 px-3 d-flex-center`}>{pricing}</span>

                                <a href={game_url} target='_blanket' type='button' className='play-now btn btn-primary text-uppercase d-flex-center py-2 gap-2 text-white fw-bold'>
                                    play now
                                    <i className='fas fa-sign-out-alt' />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-8 text-muted'>
                        <div>
                            <h1 className='under-line text-white pb-2 mb-3'>
                                {title}
                            </h1>

                            <div className='desc'>
                                <p className='under-line fw-bold fs-3 pb-2 w-fit-contnet ms-2 d-flex align-items-center gap-3'><i className="fa-solid fa-eject"></i> About {title}</p>

                                <p className='lead ms-4'>{description}</p>
                            </div>

                            <div className='minimum-req'>
                                <p className='under-line fw-bold fs-3 pb-2 w-fit-content d-flex align-items-center gap-3 ms-2'>
                                    <i className="fa-solid fa-computer" />
                                    Minimum System Requirements
                                </p>

                                <div className='ps-2'>
                                    {
                                        Object.entries(minimum_system_requirements).length ? (
                                            <ul className="fa-ul fs-6 lead">
                                                {Object.entries(minimum_system_requirements).map(([key, val], index) =>
                                                (
                                                    <li key={index} className="d-flex my-2">
                                                        <span className="fa-li pt-2 pt-sm-0"><i className="fa-solid fa-laptop-medical"></i></span>
                                                        <p className='mb-0'><span className='fw-bold float-start me-2 text-capitalize'>{key}:</span>{val || 'Not Specifiy'}</p>
                                                    </li>
                                                )
                                                )}
                                            </ul>
                                        ) :
                                            (
                                                'No Requirements Provided'
                                            )
                                    }
                                </div>
                            </div>

                            <div className='screen-shots'>
                                <p className='under-line fw-bold fs-3 pb-2 w-fit-content d-flex align-items-center gap-3 ms-2'>
                                    <i className="fa-solid fa-camera-retro"></i>
                                    {title} Screenshots
                                </p>

                                {
                                    screenshots.length ? (
                                        <OwlCarousel {...options} className="mt-4 ms-md-0 ms-2 on-top" >
                                            {
                                                screenshots?.map(({ id, image }) => (
                                                    <div key={id} className='mx-4 rounded-3 overflow-hidden'><img src={image} alt={`${title} ScreenShoot ${id}`} /></div>
                                                ))
                                            }
                                        </OwlCarousel>) :
                                        (
                                            'No Screenshots Provided'
                                        )
                                }

                            </div>

                            <div className='additional-info'>
                                <p className='under-line fw-bold fs-3 pb-2 w-fit-content d-flex align-items-center gap-3 ms-2'>
                                    <i className="fa-solid fa-qrcode"></i>
                                    Additional Information
                                </p>

                                <ul className='row row-cols-2 row-cols-md-3 mt-3'>

                                    <li className='d-flex flex-column mb-4 p-0'>
                                        <span className='d-flex gap-2 align-items-center info-title fs-6'>
                                            <i className="fa-solid fa-signature" />
                                            Title :
                                        </span>
                                        <p className='mb-0 mt-1 ms-2 fw-bold text-secondFontColor'>{title}</p>
                                    </li>

                                    <li className='d-flex flex-column mb-4 p-0'>
                                        <span className='d-flex gap-2 align-items-center info-title fs-6'>
                                            <i className="fa-solid fa-code" />
                                            Developer :
                                        </span>
                                        <p className='mb-0 mt-1 ms-2 fw-bold text-secondFontColor'>{developer}</p>
                                    </li>

                                    <li className='d-flex flex-column mb-4 p-0'>
                                        <span className='d-flex gap-2 align-items-center info-title fs-6'>
                                            <i className="fa-brands fa-creative-commons-pd"></i>
                                            Publisher :
                                        </span>
                                        <p className='mb-0 mt-1 ms-2 fw-bold text-secondFontColor'>{publisher}</p>
                                    </li>

                                    <li className='d-flex flex-column mb-4 p-0'>
                                        <span className='d-flex gap-2 align-items-center info-title fs-6'>
                                            <i className="fa-solid fa-business-time"></i>
                                            Release Data :
                                        </span>
                                        <p className='mb-0 mt-1 ms-2 fw-bold text-secondFontColor'>{release_date}</p>
                                    </li>

                                    <li className='d-flex flex-column mb-4 p-0'>
                                        <span className='d-flex gap-2 align-items-center info-title fs-6'>
                                            <i className="fa-solid fa-circle-info"></i>
                                            Genre :
                                        </span>
                                        <p className='mb-0 mt-1 ms-2 fw-bold text-secondFontColor'>{genre}</p>
                                    </li>

                                    <li className='d-flex flex-column mb-4 p-0'>
                                        <span className='d-flex gap-2 align-items-center info-title fs-6'>
                                            <i className="fa-solid fa-house-signal"></i>
                                            Platform :
                                        </span>
                                        <p className='mb-0 mt-1 ms-2 fw-bold text-secondFontColor d-flex align-items-center gap-2'>
                                            {platform === 'windows' ?
                                                (<i className='fab fa-windows text-muted stretched-link' />)
                                                :
                                                (<i className='fas fa-window-maximize text-muted stretched-link' />)
                                            }
                                            {platform}
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameDetails;

