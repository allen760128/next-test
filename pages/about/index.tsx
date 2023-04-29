import React from 'react';
import style from './index.module.css';
import Nav from '../../component/nav';
import { useAppSelector, useAppDispatch } from '../../slices/hooks';
import { decrement, increment } from '../../slices/couterSlice'
import { toggleswitch } from '../../slices/toggleSlice'
import { useRouter } from 'next/router'

const About = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    return (
        <div className={style.mainb} style={{ width: '100%' }}>
            <Nav></Nav>
            <div style={{ width: '500px', margin: '0 auto', paddingTop: '5rem' }}>
                <button onClick={() => { dispatch(increment()) }}>+1</button>
                <button onClick={() => { dispatch(decrement()) }}>-1</button>
                <button onClick={() => { dispatch(toggleswitch()) }}>toggle</button>
                <p onClick={() => { router.push('profile') }}>點我點我</p>
            </div>

        </div>
    )
}

export default About;