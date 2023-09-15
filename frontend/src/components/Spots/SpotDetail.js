import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as spotActions from "../../store/spots";


function SpotDetail() {
    const dispatch = useDispatch();
    const currSpot = useSelector(state => state.spots);
    const {id} = useParams();

    useEffect(() => {
        dispatch(spotActions.fetchSingleSpot(id))
    }, [id])

    const previewImg = currSpot && currSpot.SpotImages && currSpot.SpotImages.find(image => image.preview === true)
    const filteredAdditionalImgs = currSpot && currSpot.SpotImages && currSpot.SpotImages.filter((image => image.preview === false))
    const additionalImgs = filteredAdditionalImgs && filteredAdditionalImgs.map((additionalImg) => {
        return (
            <img src={additionalImg && additionalImg.url} alt={currSpot && currSpot.name} key={additionalImg && additionalImg.id}></img>
        )
    })

    const loadSpotDetails = currSpot && currSpot.Owner && (
        <>
        <div className="single-spot-info-header">
            <h1>{currSpot.name}</h1>
            <h2>{currSpot.city}, {currSpot.state}, {currSpot.city}</h2>
        </div>
        <div className="single-spot-images">
            <img src={previewImg && previewImg.url} alt={currSpot.name} className="preview-image"></img>
            {additionalImgs}
        </div>
        <div className="single-spot-description">
            <h2>{`Hosted by ${currSpot.Owner.firstName} ${currSpot.Owner.lastName}`}</h2>
            <p>{currSpot.description}</p>
        </div>
        <div className="single-spot-info">
            <p>${currSpot.price} night</p>
            <p>{currSpot.avgStarRating ? currSpot.avgStarRating : "New"}</p>
            <p>{currSpot.numReviews}</p>
            <button onClick={() => {alert("Feature Coming Soon...")}}>Reserve</button>

        </div>
        </>
    )


    return (
        <div className="single-spot-container">
            {loadSpotDetails}
        </div>
    )
}

export default SpotDetail;
