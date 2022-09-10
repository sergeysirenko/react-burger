import React from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {fetchOneBurger} from "../redux/burger/asyncActions";
import {selectBurger, selectBurgersData} from "../redux/burger/selectors";
import {useAppDispatch} from "../redux/hooks";
import { PreLoader } from '../components';

const FullBurger: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { status } = useSelector(selectBurgersData);

    React.useEffect(() => {
        if (id) dispatch(fetchOneBurger(id));
    }, [])

    React.useEffect(() => {
        if (status === 'error') {
            alert('Error with getting this burger')
            navigate('/');
        }
    }, [status])

    const oneBurger = useSelector(selectBurger);

    if(oneBurger === null) {
        return <PreLoader/>
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