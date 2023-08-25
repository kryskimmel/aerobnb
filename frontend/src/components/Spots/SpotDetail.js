import React, {useEffect} from "react";
import * as sessionActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./SpotDetail.css";


const SpotDetailPage = () => {
    const {id} = useParams()

    const dispatch = useDispatch();
    const selectedSpot = useSelector(state => Object.values(state.spots));

    for (let spot of selectedSpot) {
        if (spot.id === parseInt(id)) console.log('match:', spot.id)
    }



    useEffect(() => {
        dispatch(sessionActions.fetchSpotById())
    }, [dispatch]);


    return (
    //    {oneSpot}
    <></>
    )
};


export default SpotDetailPage;
