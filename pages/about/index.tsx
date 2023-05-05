import React, { FormEvent, useState, useEffect } from 'react';
import style from './index.module.scss';
import Nav from '../../component/nav';
import { useAppSelector, useAppDispatch } from '../../slices/hooks';
import { decrement, increment } from '../../slices/couterSlice';
import { toggleswitch } from '../../slices/toggleSlice';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import axios from 'axios';
import Cookies from 'js-cookie'

interface About {
    data: {
        category: string
    }
}

interface Val {
    account: string;
    password: string;
}

const About = ({ data }: About) => {

    const [val, setVal] = useState<Val>({ account: 'mor_2314', password: '83r5^_' });
    const dispatch = useAppDispatch()
    const router = useRouter()


    const user = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: 'https://fakestoreapi.com/users/1'
            })
            const data = res.data;
            console.log(data);
            router.push('profile')
        } catch (e) {
            console.log(e);
        }
    }

    const login = async () => {
        try {
            const res = await axios({
                method: 'post',
                // url: 'https://fakestoreapi.com/auth/login',
                url: 'http://18.180.112.254/api/backstage/no-auth/login',
                data: {
                    // username: val.account,
                    account: val.account,
                    password: val.password
                }
            })
            const data = res.data;
            // console.log(data.payload)
            // Cookies.set('jwt', data.token)
            if (data.payload !== undefined) {
                Cookies.set('jwt', data.payload)
                user()

            }


        } catch (e) {
            console.log(e)
        }
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        login()
    }
    // const a: any = JSON.stringify(Cookies.get('jwt'))
    // console.log(JSON.parse(a))

    useEffect(() => {
        const cookie = Cookies.get('jwt');
        if (cookie === 'undefined') {
            Cookies.remove('jwt')
        }
    }, []);

    return (
        <div className={style.mainc} style={{ width: '100%' }}>
            <Nav></Nav>
            <div className={style.dd} style={{ width: '500px', margin: '0 auto', paddingTop: '5rem' }}>
                <button onClick={() => { dispatch(increment()) }}>+1</button>
                <button onClick={() => { dispatch(decrement()) }}>-1</button>
                <button onClick={() => { dispatch(toggleswitch()) }}>toggle</button>
                <p onClick={() => { router.push('profile') }}>點我點我</p>
            </div>
            <form action="" onSubmit={(handleSubmit)}
                style={{ width: '500px', margin: '0 auto', paddingTop: '5rem' }}>
                <div>
                    <label htmlFor="">帳號</label>
                    <input type="text"
                        value={val.account}
                        onChange={(e) => { setVal({ ...val, account: e.target.value }) }} />
                </div>
                <div style={{ paddingBottom: '1rem' }}>
                    <label htmlFor="">密碼</label>
                    <input type="text"
                        value={val.password}
                        onChange={(e) => { setVal({ ...val, password: e.target.value }) }} />
                </div>
                <button>submit</button>
            </form>

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