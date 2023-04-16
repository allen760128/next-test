import React from 'react';
import style from './index.module.css';
import Nav from '../../component/nav';
import { useAppSelector, useAppDispatch } from '../../slices/hooks';
import { decrement, increment } from '../../slices/couterSlice'
import { toggleswitch } from '../../slices/toggleSlice'

const About = () => {
    const dispatch = useAppDispatch()

    return (
        <div className={style.mainb}>
            <Nav></Nav>
            <button onClick={() => { dispatch(increment()) }}>+1</button>
            <button onClick={() => { dispatch(decrement()) }}>-1</button>
            <button onClick={() => { dispatch(toggleswitch()) }}>toggle</button>
        </div>
    )
}

export default About;