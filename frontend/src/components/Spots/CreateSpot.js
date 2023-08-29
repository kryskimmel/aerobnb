import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
// import {useHistory} from 'react-router-dom';
import * as spotActions from "../../store/spots";
import './css/CreateSpot.css';

const CreateSpot = () => {
    const dispatch = useDispatch();
    // const sessionUser = useSelector((state) => state.session.user);
    // const history = useHistory();

    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [previewImg, setPreviewImg] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');
    const [image5, setImage5] = useState('');
    const [images, setImages] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false)


    useEffect(() => {
        const errors = {};
        if (!country.length) errors.country = 'Country is required';
        if (!address.length) errors.address = 'Address is required';
        if (!city.length) errors.city = 'City is required';
        if (!state.length) errors.state = 'State is required';
        if (!lat.length) errors.lat = 'Latitude is required';
        if (!lng.length) errors.lng = 'Longitude is required';
        if (!description.length) errors.description = 'Description is required';
        if (description.length < 30) errors.description = "Description needs a minimum of 30 characters";
        if (!name.length) errors.name = "Name is required";
        if (!price) errors.price = "Price is required";
        if (!previewImg.length) errors.previewImg = "Preview Image is required";
        if (!previewImg.includes('.png') && !previewImg.includes('.jpg') && !previewImg.includes('.jpeg')) errors.previewImg = 'Image URL must end in .png, .jpg, or .jpeg';
        if (image2 && !image2.includes('.png') && !image2.includes('.jpg') && !image2.includes('.jpeg')) errors.image2 = 'Image URL must end in .png, .jpg, or .jpeg';
        if (image3 && !image3.includes('.png') && !image3.includes('.jpg') && !image3.includes('.jpeg')) errors.image3 = 'Image URL must end in .png, .jpg, or .jpeg';
        if (image4 && !image4.includes('.png') && !image4.includes('.jpg') && !image4.includes('.jpeg')) errors.image4 = 'Image URL must end in .png, .jpg, or .jpeg';
        if (image5 && !image5.includes('.png') && !image5.includes('.jpg') && !image5.includes('.jpeg')) errors.image5 = 'Image URL must end in .png, .jpg, or .jpeg';
        setValidationErrors(errors);


        const additionalImages = [];
        if (image2 || image3 || image4 || image5) {
            additionalImages.push(image2 || image3 || image4 || image5);
            setImages(additionalImages);
        }
      }, [country, address, city, state, lat, lng, description, name, price, previewImg, image2, image3, image4, image5]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setHasSubmitted(true);


        const formData = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        };

        const previewImgData = {
            previewImg
        };

        const additionalImgsData = {
            images
        };

        //testing:
        console.log(formData, ':formData');
        console.log(previewImg, ':previewImg');
        console.log(additionalImgsData, ':additionalImgsData');


        // Reset the form state.
        setCountry('');
        setAddress('');
        setCity('');
        setState('');
        setLat('');
        setLng('');
        setDescription('');
        setName('');
        setPrice('');
        setPreviewImg('');
        setImage2('');
        setImage3('');
        setImage4('');
        setImage5('');
        setHasSubmitted(false);

        // const dispatchFormData = (formData, previewImgData, additionalImgsData) => {
        //     if (formData && previewImgData && additionalImgsData) {
        //         return dispatch(spotActions.addSpot(formData)).then(() => {dispatch(spotActions.addPreviewImage(previewImgData))}).then(() => {dispatch(spotActions.addImages(additionalImgsData))});
        //     }
        //     else {
        //         return dispatch(spotActions.addSpot(formData)).then(() => {dispatch(spotActions.addPreviewImage(previewImgData))});
        //     }
        // };

        setErrors({});
        return dispatch(
          spotActions.addSpot(formData, previewImgData, additionalImgsData))
        // ).catch(async (res) => {
        //   const data = await res.json();
        //   if (data && data.errors) {
        //     setErrors(data.errors);
        //   }
        // });
    };

      const buttonClassName = "enabled-button" + ((country && address && city && state && lat &&  lng && description && name && price && previewImg) ? "" : " disabled-button");

    return (
        <div className="form-container-div">
            <form onSubmit={handleSubmit}>
                <div className='form-contents'>
                    <div className="location-info-section">
                        <h1>Create a New Spot</h1>
                        <h2>Where's your place located?</h2>
                        <h4>Guests will only get your exact address once they booked a reservation.</h4>

                        <div className="errors-div">
                            {hasSubmitted && validationErrors.country && `* ${validationErrors.country}`}
                        </div>
                        <label htmlFor='country'>Country</label>
                        <input
                            type="text"
                            name="country"
                            id="country"
                            placeholder='Country'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            // required
                            />

                        <div className="errors-div">
                            {hasSubmitted && validationErrors.address && `* ${validationErrors.address}`}
                        </div>
                        <label htmlFor='address'>Street Address</label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            placeholder='Address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            // required
                            />

                        <div className="errors-div">
                            {hasSubmitted && validationErrors.city && `* ${validationErrors.city}`}
                        </div>
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            name="city"
                            id="city"
                            placeholder='City'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            // required
                            />

                        <div className="errors-div">
                            {hasSubmitted && validationErrors.state && `* ${validationErrors.state}`}
                        </div>
                        <label htmlFor="state">State</label>
                        <input
                            type="text"
                            name="state"
                            id="state"
                            placeholder='STATE'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            // required
                            />

                        <div className="errors-div">
                            {hasSubmitted && validationErrors.lat && `* ${validationErrors.lat}`}
                        </div>
                        <label htmlFor="latitude">Latitude</label>
                        <input
                            type="text"
                            name="latitude"
                            id="latitude"
                            placeholder='Latitude'
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                            // required
                            />

                        <div className="errors-div">
                            {hasSubmitted && validationErrors.lng && `* ${validationErrors.lng}`}
                        </div>
                        <label htmlFor="longitude">Longitude</label>
                        <input
                            type="text"
                            name="longitude"
                            id="longitude"
                            placeholder='Longitude'
                            value={lng}
                            onChange={(e) => setLng(e.target.value)}
                            // required
                            />
                    </div>
                    <hr></hr>
                    <div className='description-div'>
                        <h2>Describe your place to guests</h2>
                        <h4>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</h4>
                        <textarea
                            name='description'
                            placeholder='Please write at least 30 characters.'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            // required
                            ></textarea>
                        <div className="errors-div">
                            {hasSubmitted && validationErrors.description && `* ${validationErrors.description}`}
                        </div>
                    </div>

                    <hr></hr>
                    <div className='name-div'>
                        <h2>Create a title for your spot</h2>
                        <h4>Catch guests' attention with a spot title that highlights what makes your place special.</h4>
                        <input
                            type='text'
                            name='name'
                            placeholder='Name of your spot'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            // required
                        />
                    </div>
                    <div className="errors-div">
                            {hasSubmitted && validationErrors.name && `* ${validationErrors.name}`}
                    </div>

                    <hr></hr>
                    <div className='price-div'>
                        <h2>Set a base price for your spot</h2>
                        <h4>Competitive pricing can help your listing stand out and rank higher in search results.</h4>
                        <input
                            type='number'
                            name='price'
                            placeholder='Price per night (USD)'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            // required
                        />
                    </div>
                    <div className="errors-div">
                            {hasSubmitted && validationErrors.price && `* ${validationErrors.price}`}
                    </div>

                    <hr></hr>
                    <div className='photos-div'>
                        <h2>Liven up your spot with photos</h2>
                        <h4>Submit a link to at least one photo to publish your spot.</h4>
                        <input
                            type='text'
                            name='previewImg'
                            placeholder='Preview Image URL'
                            value={previewImg}
                            onChange={(e) => setPreviewImg(e.target.value)}
                            // required
                        />
                        <div className="errors-div">
                            {hasSubmitted && validationErrors.previewImg && `* ${validationErrors.previewImg}`}
                        </div>

                        <input
                            type='text'
                            name='image'
                            placeholder='Image URL'
                            value={image2}
                            onChange={(e) => setImage2(e.target.value)}
                        />
                        <div className="errors-div">
                            {hasSubmitted && validationErrors.image2 && `* ${validationErrors.image2}`}
                        </div>

                        <input
                            type='text'
                            name='image'
                            placeholder='Image URL'
                            value={image3}
                            onChange={(e) => setImage3(e.target.value)}
                        />
                        <div className="errors-div">
                            {hasSubmitted && validationErrors.image3 && `* ${validationErrors.image3}`}
                        </div>

                        <input
                            type='text'
                            name='image'
                            placeholder='Image URL'
                            value={image4}
                            onChange={(e) => setImage4(e.target.value)}
                        />
                        <div className="errors-div">
                            {hasSubmitted && validationErrors.image4 && `* ${validationErrors.image4}`}
                        </div>

                        <input
                            type='text'
                            name='image'
                            placeholder='Image URL'
                            value={image5}
                            onChange={(e) => setImage5(e.target.value)}
                        />
                    </div>
                    <div className="errors-div">
                            {hasSubmitted && validationErrors.image5 && `* ${validationErrors.image5}`}
                    </div>

                    <hr></hr>
                    <div className='submit-button-div'>
                        <button className={buttonClassName} type='submit'>Create Spot</button>
                    </div>
                </div>
            </form>
        </div>
    )
};


export default CreateSpot;
