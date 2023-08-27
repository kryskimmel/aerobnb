import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as sessionActions from "../../store/session";
import * as spotActions from "../../store/spots";
import './css/CreateSpot.css';

const CreateSpot = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory();

    const [country, setCountry] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [description, setDescription] = useState();
    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [previewImg, setPreviewImg] = useState();
    const [images, setImages] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});

    // if (sessionUser) {
    //     useHistory.push()
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        return dispatch(spotActions.addSpot({ country, address, city, state, lat, lng, title, price, previewImg, images })).catch(
          async (res) => {
            const data = await res.json();
            if (data && data.errors) setValidationErrors(data.errors);
          }
        );
      };



    return (
        <div className="form-container-div">
            <form onSubmit={handleSubmit}>
                <div className='form-contents'>
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
                            name="address"
                            placeholder='Address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
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
                    <div className='description-div'>
                        <h2>Describe your place to guests</h2>
                        <caption>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</caption>
                        <textarea
                            name='description'
                            placeholder='Please write at least 30 characters.'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                    </div>
                    <hr></hr>
                    <div className='title-div'>
                        <h2>Create a title for your spot</h2>
                        <caption>Catch guests' attention with a spot title that highlights what makes your place special.</caption>
                        <input
                            type='text'
                            name='title'
                            placeholder='Name of your spot'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <hr></hr>
                    <div className='price-div'>
                        <h2>Set a base price for your spot</h2>
                        <caption>Competitive pricing can help your listing stand out and rank higher in search results.</caption>
                        <input
                            type='number'
                            name='price'
                            placeholder='Price per night (USD)'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <hr></hr>
                    <div className='photos-div'>
                        <h2>Liven up your spot with photos</h2>
                        <caption>Submit a link to at least one photo to publish your spot.</caption>
                        <input
                            type='text'
                            name='previewImg'
                            placeholder='Preview Image URL'
                            value={previewImg}
                            onChange={(e) => setPreviewImg(e.target.value)}
                            required
                        />
                        <input
                            type='text'
                            name='image'
                            placeholder='Image URL'
                            value={images}
                            onChange={(e) => setImages(e.target.value)}
                        />
                        <input
                            type='text'
                            name='image'
                            placeholder='Image URL'
                            value={images}
                            onChange={(e) => setImages(e.target.value)}
                        />
                        <input
                            type='text'
                            name='image'
                            placeholder='Image URL'
                            value={images}
                            onChange={(e) => setImages(e.target.value)}
                        />
                        <input
                            type='text'
                            name='image'
                            placeholder='Image URL'
                            value={images}
                            onChange={(e) => setImages(e.target.value)}
                        />
                    </div>
                    <hr></hr>
                    <div className='submit-button-div'>
                        <button type='submit'>Create Spot</button>
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
