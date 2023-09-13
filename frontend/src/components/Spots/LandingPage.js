import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as spotActions from "../../store/spots";
import './css/LandingPage.css';


function LandingPage() {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots));
    const history = useHistory();

    useEffect(() => {
        dispatch(spotActions.fetchSpots());
    }, [dispatch]);

    const loadSpots = spots && spots.map((spot) => {
        return (
            <div key={spot && spot.id} className="spot-card" onClick={()=>{history.push(`/spots/${spot.id}`)}}>
                <img src={spot && spot.previewImage} alt={spot && spot.name} title={spot && spot.name}></img>
                <div className="spot-info" key={spot && `spot-info-${spot.id}`}>
                    <p>{spot && spot.city}, {spot && spot.state}</p>
                    <p><span>${spot && spot.price}</span> night</p>
                    <p className="rating-info"><i className="fa-solid fa-star" style={{color: "#000000"}}></i><span>{spot && spot.avgRating ? spot.avgRating.toFixed(1) : "New"}</span></p>
                </div>
            </div>
        );
    });

    return (
        <div className="spots-container">
            {loadSpots}
        </div>
    )
}
export default LandingPage;
