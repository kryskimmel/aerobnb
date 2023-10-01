import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import * as spotActions from "../../store/spots";
import './css/CreateSpot.css'



function CreateSpot () {
    const dispatch = useDispatch();
    const history = useHistory();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [previewImg, setPreviewImg] = useState('');
    // const [optImg1, setOptImg1] = useState('')
    // const [optImg2, setOptImg2] = useState('')
    // const [optImg3, setOptImg3] = useState('')
    // const [optImg4, setOptImg4] = useState('')
    const [valErrors, setValErrors] = useState({});
    const [canSubmit, setCanSubmit] = useState(true);
    const [disableSubmit, setDisableSubmit] = useState(false);


    useEffect(() => {
        const errors = {};
        if (!address) errors.address = "Street address is required"
        if (address.trim().length === 0) errors.address = "Street address is required"

        if (!city) errors.city = "City is required"
        if (city.trim().length === 0) errors.city = "City is required"

        if (!state) errors.state = "State is required"
        if (state.trim().length === 0) errors.state = "State is required"

        if (!country) errors.country = "Country is required"
        if (country.trim().length === 0) errors.country = "Country is required"

        if (!lat) errors.lat = "Latitude is required"
        if (lat.trim().length === 0) errors.lat = "Latitude is required"
        if (typeof lat !== "number" && !lat.includes('.')) errors.lat = "Latitude is not valid"
        const latIntPart = Math.floor(lat);
        const latDecPart = lat - latIntPart;
        if (latDecPart === 0) errors.lat = "Latitude is not valid"
        if (!/^[0-9]*\.?[0-9]*$/.test(lat)) errors.lat = "Latitude is not valid"


        if (!lng) errors.lng = "Longitude is required"
        if (lng.trim().length === 0) errors.lng = "Longitude is required"
        if (typeof lng !== "number" && !lng.includes('.')) errors.lng = "Longitude is not valid"
        const lngIntPart = Math.floor(lng);
        const lngDecPart = lng - lngIntPart;
        if (lngDecPart === 0) errors.lng = "Longitude is not valid"
        if (!/^[0-9]*\.?[0-9]*$/.test(lng)) errors.lng = "Longitude is not valid"




        if (!description) errors.description = "Description needs a minimum of 30 characters"
        if (description && description.length < 30) errors.description = "Description needs a minimum of 30 characters"
        if (description.trim().length === 0) errors.description = "Description needs a minimum of 30 characters"

        if (!name) errors.name = "Name is required"
        if (name.trim().length === 0) errors.name = "Name is required"

        if (!price) errors.price = "Price is required"
        if (price.trim().length === 0) errors.price = "Price is required"

        if (!previewImg) errors.previewImg = "Preview image is required"
        if (previewImg.trim().length === 0) errors.previewImg = "Preview image is required"
        const validExt = [".png", ".jpg", ".jpeg"];
        const previewImgExt = previewImg.substring(previewImg.lastIndexOf("."));
        if (!validExt.includes(previewImgExt)) errors.previewImg = "Image URL must end in .png, .jpg, or .jpeg"

        // const optImg1Ext = optImg1.substring(optImg1.lastIndexOf("."));
        // const optImg2Ext = optImg2.substring(optImg2.lastIndexOf("."));
        // const optImg3Ext = optImg3.substring(optImg3.lastIndexOf("."));
        // const optImg4Ext = optImg4.substring(optImg4.lastIndexOf("."));
        // if (!validExt.includes(optImg1Ext)) errors.optImg1 = "Image URL must end in .png, .jpg, or .jpeg"
        // if (!validExt.includes(optImg2Ext)) errors.optImg2 = "Image URL must end in .png, .jpg, or .jpeg"
        // if (!validExt.includes(optImg3Ext)) errors.optImg3 = "Image URL must end in .png, .jpg, or .jpeg"
        // if (!validExt.includes(optImg4Ext)) errors.optImg4 = "Image URL must end in .png, .jpg, or .jpeg"

        setValErrors(errors);
    }, [address,
        city,
        state,
        country,
        lat,
        lng,
        description,
        name,
        price,
        previewImg,
        // optImg1,
        // optImg2,
        // optImg3,
        // optImg4
    ]);

    useEffect(() => {
        if (canSubmit && !Object.values(valErrors).length) setDisableSubmit(false);
        if (!canSubmit && Object.values(valErrors).length) setDisableSubmit(true);
        if (!canSubmit && !Object.values(valErrors).length) setDisableSubmit(false);
    }, [valErrors, canSubmit])


    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (Object.values(valErrors).length) {
            setCanSubmit(false);
            setDisableSubmit(true);
        }
        else {
            setCanSubmit(true);
            const newSpot = {
                address,
                city,
                state,
                country,
                lat: parseFloat(lat),
                lng: parseFloat(lng),
                name,
                description,
                price: parseInt(price)
            };


            const previewImage =
                {
                    url: previewImg,
                    preview: true
                }


            dispatch(spotActions.addSpot(newSpot, previewImage));
            history.push('/')
        }
    };



    return (
        <div className="create-spot-component-div">
            <h1>Create a New Spot</h1>
            <form onSubmit={handleFormSubmit}>
                <div className="spot-location-div">
                    <h2>Where's your place located?</h2>
                    <p>Guests will only get your exact address once they booked a reservation.</p>
                        <label>Country</label>
                        <div className="errors-div">{!canSubmit && valErrors.country && `* ${valErrors.country}`}</div>
                        <input
                        type="text"
                        placeholder="Country"
                        name="country"
                        value={country}
                        onChange={(e) => {setCountry(e.target.value)}}
                        />
                        <label>Street Address</label>
                        <div className="errors-div">{!canSubmit && valErrors.address && `* ${valErrors.address}`}</div>
                        <input
                        type="text"
                        placeholder="Address"
                        name="address"
                        value={address}
                        onChange={(e) => {setAddress(e.target.value)}}
                        />
                        <label>City</label>
                        <div className="errors-div">{!canSubmit && valErrors.city && `* ${valErrors.city}`}</div>
                        <input
                        type="text"
                        placeholder="City"
                        name="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        />
                        <label>State</label>
                        <div className="errors-div">{!canSubmit && valErrors.state && `* ${valErrors.state}`}</div>
                        <input
                        type="text"
                        placeholder="STATE"
                        name="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        />
                        <label>Latitude</label>
                        <div className="errors-div">{!canSubmit && valErrors.lat && `* ${valErrors.lat}`}</div>
                        <input
                        type="text"
                        placeholder="Latitude"
                        name="latitude"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        />
                        <label>Longitude</label>
                        <div className="errors-div">{!canSubmit && valErrors.lng && `* ${valErrors.lng}`}</div>
                        <input
                        type="text"
                        placeholder="Longitude"
                        name="longitude"
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                        />
                </div>

                <hr></hr>

                <div className="spot-description-div">
                    <h2>Describe your place to guests</h2>
                    <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                        <textarea
                        placeholder="Please write at least 30 characters"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                         <div className="errors-div">{!canSubmit && valErrors.description && `* ${valErrors.description}`}</div>
                </div>

                <hr></hr>

                <div className="spot-title-div">
                    <h2>Create a title for your spot</h2>
                    <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                        <input
                        type="text"
                        placeholder="Name of your spot"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        ></input>
                         <div className="errors-div">{!canSubmit && valErrors.name && `* ${valErrors.name}`}</div>
                </div>

                <hr></hr>

                <div className="spot-price-div">
                    <h2>Set a base price for your spot</h2>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                        <input
                        type="number"
                        placeholder="Price per night (USD)"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        ></input>
                         <div className="errors-div">{!canSubmit && valErrors.price && `* ${valErrors.price}`}</div>
                </div>

                <hr></hr>

                <div className="spot-images-div">
                    <h2>Liven up your spot with photos</h2>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                        <input
                        type="text"
                        placeholder="Preview Image URL"
                        name="preview-img"
                        value={previewImg}
                        onChange={(e) => {setPreviewImg(e.target.value)}}
                        ></input>
                         <div className="errors-div">{!canSubmit && valErrors.previewImg && `* ${valErrors.previewImg}`}</div>
                        <input
                        type="text"
                        placeholder="Image URL"
                        name="opt-img-1"
                        ></input>
                        <input
                        type="text"
                        placeholder="Image URL"
                        name="opt-img-2"
                        ></input>
                        <input
                        type="text"
                        placeholder="Image URL"
                        name="opt-img-3"
                        ></input>
                        <input
                        type="text"
                        placeholder="Image URL"
                        name="opt-img-4"
                        ></input>
                </div>

                <hr></hr>

                <div className="submit-button-div">
                    <button type="submit" className="submit-button" disabled={disableSubmit}>Create Spot</button>
                </div>
            </form>
        </div>
    )
}

export default CreateSpot;
