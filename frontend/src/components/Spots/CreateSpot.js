import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as spotActions from "../../store/spots";

const CreateSpot = () => {
    const [country, setCountry] = useState();
    const [streetAddress, setStreetAddress] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();


    return (
        <div className="form-container-div">
            <form className="form-div">
                <div>
                    <div className="location-info-section">
                        <h1>Create a New Spot</h1>
                        <h2>Where's your place located?</h2>
                        <caption>Guests will only get your exact address once they booked a reservation.</caption>
                        <label>Country</label>
                        <input
                            type="text"
                            name="country"
                            placeholder='Country'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                            />
                        <label>Street Address</label>
                        <input
                            type="text"
                            name="street-address"
                            placeholder='Address'
                            value={streetAddress}
                            onChange={(e) => setStreetAddress(e.target.value)}
                            required
                            />
                        <label>City</label>
                        <input
                            type="text"
                            name="city"
                            placeholder='City'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            />
                        <label>State</label>
                        <input
                            type="text"
                            name="state"
                            placeholder='STATE'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                            />
                        <label>Latitude</label>
                        <input
                            type="text"
                            name="latitude"
                            placeholder='Latitude'
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                            required
                            />
                        <label>Longitude</label>
                        <input
                            type="text"
                            name="longitude"
                            placeholder='Longitude'
                            value={lng}
                            onChange={(e) => setLng(e.target.value)}
                            required
                            />
                    </div>
                    <hr></hr>
                    <div>
                        <h2>Describe your place to guests</h2>
                        <caption>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</caption>
                        <textarea placeholder='Please write at least 30 characters.'></textarea>
                    </div>

                </div>
            </form>
        </div>
    )
};


export default CreateSpot;

  {/* <div className="errors-div">
            {errors.credential && <p>The provided credentials were invalid.</p>}
        </div> */}
