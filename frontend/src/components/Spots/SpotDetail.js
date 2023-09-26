import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as spotActions from "../../store/spots";
import * as reviewActions from "../../store/reviews";
import "./css/SpotDetail.css"
import Review from "../Reviews/Review";


function SpotDetail() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const currSpot = useSelector(state => state.spots[parseInt(id)]);
    const currSpotReviews = Object.values(useSelector(state => state.reviews));

    useEffect(() => {
        dispatch(spotActions.fetchSingleSpot(id))
        dispatch(reviewActions.fetchSpotReviews(id))
    }, [dispatch, id])


    const previewImg = currSpot?.SpotImages?.find(image => image.preview === true)

    return (
        <div className="spot-container">
            <div className="spot-header">
                <h1>{currSpot?.name}</h1>
                <h2>{currSpot?.city}, {currSpot?.state}</h2>
            </div>

            <div className="imgs-div">
                <div className="preview-img-div">
                    <img src={previewImg?.url} alt={currSpot?.name} className="preview-img"></img>
                </div>
                <div className="additional-imgs-div">
                    {currSpot?.SpotImages?.filter(image => image.preview === false).map((additionalImg) => {
                        return (
                                <img src={additionalImg && additionalImg.url} alt={currSpot && currSpot.name} key={additionalImg && additionalImg.id} className="additional-imgs"></img>
                                )
                    })}
                </div>
            </div>

            <div className="spot-info-container">
                <div className="spot-description">
                    <h2>{`Hosted by ${currSpot?.Owner ? currSpot.Owner.firstName : ""} ${currSpot?.Owner ? currSpot.Owner.lastName : ""}`}</h2>
                    <p>{currSpot?.description}</p>
                </div>
                <div className="spot-info-box">
                    <p><span style={{fontWeight:"500", fontSize:"20px", marginLeft:"20px"}}>${currSpot?.price} </span>night</p>
                    <p>
                        <i className="fa-solid fa-star" style={{color:"#000000"}}/>
                        {currSpot?.avgStarRating ? currSpot.avgStarRating.toFixed(1) : "New"} • {currSpot?.numReviews ? currSpot.numReviews === 1 ? `${currSpot.numReviews} review` : `${currSpot.numReviews} reviews` : "0 reviews"}
                        {console.log('current reviews:', currSpot?.numReviews)}
                    </p>
                    <button className="reserve-button" onClick={() => {alert("Feature Coming Soon...")}}>Reserve</button>
                </div>
            </div>

            <hr></hr>
                <Review/>
        </div>
    )
}

export default SpotDetail;
