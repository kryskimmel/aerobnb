import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as spotActions from "../../store/spots";
import OpenModalButton from "../Modals/OpenModalButton";
import useModal from "../../context/OpenModalContext";
import DeleteSpotModal from "../Modals/DeleteSpotModal";
import "./css/SpotManagement.css";



function SpotManagement() {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots));
    const history = useHistory();
    const {setOnModalContent} = useModal();

    const createButtonCN = !spots.length ? "show-create" : "hide-create";

    useEffect(() => {
        dispatch(spotActions.fetchCurrUserSpots());
    }, [dispatch]);


    return (
        <>
            <h1 style={{marginLeft:'10px',marginBottom:'30px'}}>Manage Your Spots</h1>
            <div className="mgmt-spots-container">
                <button className={createButtonCN} onClick={() => {history.push("/spots/new")}}>Create a New Spot</button>
                {spots && spots.map((spot) => {
                    return (
                        <div key={spot?.id} className="mgmt-spots">
                            <div className="spot-card">
                                <img src={spot?.previewImage} alt={spot?.name} title={spot?.name} onClick={()=>{history.push(`/spots/${spot?.id}`)}}></img>
                                <div className="spot-info" onClick={()=>{history.push(`/spots/${spot?.id}`)}}>
                                    <p>{spot?.city}, {spot?.state}</p>
                                    <p><span>${spot?.price.toFixed(2)}</span> night</p>
                                    <p className="rating-info"><i className="fa-solid fa-star" style={{color: "#000000"}}></i><span>{spot?.avgRating ? spot.avgRating.toFixed(1) : "New"}</span></p>
                                </div>
                                <div className="show-mgmt">
                                <button onClick={() => {history.push(`/spots/${spot?.id}/edit`)}}>Update</button>
                                <OpenModalButton
                                    buttonText="Delete"
                                    onButtonClick={() => {setOnModalContent(<DeleteSpotModal spotId={spot.id}/>)}}
                                    modalComponent={<DeleteSpotModal />}
                                />
                            </div>
                            </div>

                        </div>
                    );
                })}
            </div>
        </>
    )
}


export default SpotManagement;
