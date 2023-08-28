import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { nanoid } from 'nanoid';
import * as spotActions from "../../store/spots";
import LandingPage from './LandingPage';
import './css/SpotManagement.css';


const SpotManagement = () => {
    return (
        <>
        <div className='header-div'>
            <h1>Manage Your Spots</h1>
            <button className='create-spot-button'>Create a New Spot</button>
        </div>
        <LandingPage/>
        </>
    )
};


export default SpotManagement;
