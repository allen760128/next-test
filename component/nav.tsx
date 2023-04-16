import style from './nav.module.scss';
import { useAppSelector, useAppDispatch } from '../slices/hooks';
import { toggleswitch } from '../slices/toggleSlice'

const Nav = () => {
    const count = useAppSelector(state => state.counter.value)
    const toggle = useAppSelector(state => state.toggle.toggle)
    console.log(toggle)
    const dispatch = useAppDispatch()
    return (

        <div className={style.nav}>
            <p>{count}</p>
            <p>{`${toggle}`}</p>
            <div className={style.right} onClick={() => { dispatch(toggleswitch()) }}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}

export default Nav;