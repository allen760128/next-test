import React from 'react';
import style from './index.module.scss';
import Nav from '../../component/nav';
import { useAppSelector, useAppDispatch } from '../../slices/hooks';
import { decrement, increment } from '../../slices/couterSlice';
import { toggleswitch } from '../../slices/toggleSlice';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const About = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleLogout = () => {
        Cookies.remove('jwt');
        router.push('/about')
    }

    return (
        <div className={style.mainb} style={{ width: '100%' }}>
            <Nav></Nav>
            <div style={{ width: '500px', margin: '0 auto', paddingTop: '5rem' }}>

                <p onClick={() => { router.push('about') }}>點我點我</p>
                <button style={{ marginTop: '5rem' }} onClick={handleLogout}>登出</button>
            </div>

        </div>
    )
}

export default About;