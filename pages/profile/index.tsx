import React, { useEffect } from 'react';
import style from './index.module.scss';
import Nav from '../../component/nav';
import { useAppSelector, useAppDispatch } from '../../slices/hooks';
import { decrement, increment } from '../../slices/couterSlice';
import { toggleswitch } from '../../slices/toggleSlice';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { GetStaticProps } from 'next';
import axios from 'axios';

interface Data {
    data: {
        category: string;
        title: string
    }
}

const About = ({ data }: Data) => {

    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleLogout = () => {
        Cookies.remove('jwt');
        router.push('/about')
    }

    const log = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: 'https://fakestoreapi.com/products/1',

            })
            const data = res.data;
            console.log(data);
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        // log()
    }, []);

    return (
        <div className={style.mainb} style={{ width: '100%' }}>
            <Nav></Nav>
            <div style={{ width: '500px', margin: '0 auto', paddingTop: '5rem' }}>

                <p onClick={() => { router.push('about') }}>點我點我</p>
                <button style={{ marginTop: '5rem' }} onClick={handleLogout}>登出</button>
                <p>{data.title}</p>
            </div>

        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch('https://fakestoreapi.com/products/1');
    const data = await res.json();

    return {
        props: {
            data
        }
    }
}

export default About;