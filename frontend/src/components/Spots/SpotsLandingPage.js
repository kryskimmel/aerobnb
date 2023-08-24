import React, {useEffect} from "react";
import * as sessionActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import "./SpotsLandingPage.css";



const SpotsLandingPage = () => {

    const dispatch = useDispatch();
    const allSpots = useSelector(state => Object.values(state.spots));

    console.log(allSpots)

    useEffect(() => {
        dispatch(sessionActions.fetchAllSpots())
    }, [dispatch]);



    return (
        <div class={allSpots.length > 0 ? 'all-spots-container' : 'no-spots-container'}>
             {allSpots.map(spot => (
                <div key={spot.id} class="spots" id={`spot-${spot.id}`}>
                    <img src={spot.previewImage} alt={spot.name}></img>
                    <div>
                        <p>{spot.city}, {spot.state}</p>
                        <p><span style={{fontWeight:"bold"}}>${spot.price}</span> night</p>
                    </div>
                </div>
            ))}
        </div>

    )
}

export default SpotsLandingPage;
