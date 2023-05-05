import React, { useEffect, useState, useRef } from 'react';
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
    },

}

interface Val {
    MerchantID: string;
    TradeInfo: string;
    TradeSha: string;
    Version: string;
}

const About = ({ data }: Data) => {
    const [val, setVal] = useState<Val>({ MerchantID: '', TradeInfo: '', TradeSha: '', Version: '' });
    const dispatch = useAppDispatch();
    const router = useRouter();
    const ssref = useRef<any>();

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

    const handleSub = async () => {
        try {
            const res = await axios({
                url: 'https://ksmile.carartbon.com/api/tcloud/getTradeInfoTradeSha',
                method: 'get'
            })
            const resData = res.data;

            if (resData.data.Code === 200) {
                setVal(resData.data.payload)

            }

        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        // log()
    }, []);

    useEffect(() => {
        if (val.MerchantID !== '' && val.Version !== '' &&
            val.TradeInfo !== '' && val.TradeSha !== '') {
            ssref.current.click()
        }
    }, [val])

    return (
        <div className={style.mainb} style={{ width: '100%' }}>
            <Nav></Nav>
            <div style={{ width: '500px', margin: '0 auto', paddingTop: '5rem' }}>

                <p onClick={() => { router.push('about') }}>點我點我</p>
                <button style={{ marginTop: '5rem' }} onClick={handleLogout}>登出</button>
                <p>{data.title}</p>
            </div>
            <form method='post' action="https://ccore.newebpay.com/MPG/mpg_gateway"
                style={{ display: 'none' }}>

                <input type="hidden" name="MerchantID" value={val.MerchantID} /><br />
                <input type="hidden" name="Version" value={val.Version} /><br />

                <input type="hidden" name="TradeInfo" value={val.TradeInfo} /><br />

                <input type="hidden" name="TradeSha" value={val.TradeSha} /><br />
                <button ref={ssref}>送出</button>
            </form><br /><br /><br />
            <button onClick={handleSub}>送出</button>
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