import React, {useEffect} from "react";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import "./SpotsLandingPage.css";


const SpotsLandingPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const allSpots = useSelector(state => Object.values(state.spots));

    useEffect(() => {
        dispatch(sessionActions.fetchAllSpots())
    }, [dispatch]);

    const HandleSpotClick = (spotId) => {
        history.push(`/spots/${spotId}`)
    };


    const spot = allSpots.map(spot => (
        <div key={spot.id} className="spots" onClick={() => HandleSpotClick(spot.id)} >
            <img src={spot.previewImage} alt={spot.name}></img>
            <div className="spot-info-div">
                <div>
                    <p>{spot.city}, {spot.state}</p>
                        <p><span style={{fontWeight:"bold"}}>${spot.price}</span> night</p>
                </div>
                <div>
                    <p><i className="fa-solid fa-star" style={{color: "#000000"}}></i>{spot.avgRating}</p>
                </div>
            </div>
        </div>
    ))





    return (
        <div className={allSpots.length > 0 ? 'all-spots-container' : 'no-spots-container'}>
           {spot}
        </div>

    )
}

export default SpotsLandingPage;
