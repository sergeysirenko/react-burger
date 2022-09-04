import React from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchOneBurger, selectBurger, selectBurgersData} from "../redux/slices/burgerSlice";

const FullBurger = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status } = useSelector(selectBurgersData);

    React.useEffect(() => {
        dispatch(fetchOneBurger(id));
    }, [])

    React.useEffect(() => {
        if (status === 'error') {
            alert('Error with getting this burger')
            navigate('/');
        }
    }, [status])

    const oneBurger = useSelector(selectBurger);

    if(!Object.entries(oneBurger).length) {
        return (
            <div className='container' style={{ textAlign: "center" }}>
                <h4 style={{ fontSize: 30, marginTop: 20 }}>...Loading</h4>
            </div>
        )
    }

    return (
        <div className='container' style={{ textAlign: "center" }}>
            <div>
                <img style={{ maxWidth: 400 }} src={oneBurger.imageUrl} alt={oneBurger.title} />
                <h2>{oneBurger.title}</h2>
                <h4 style={{ fontSize: 30, marginTop: 20 }}>$ {oneBurger.price}</h4>
            </div>
        </div>
    );
};

export default FullBurger;