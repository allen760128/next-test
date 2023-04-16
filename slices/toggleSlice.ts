import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface ToggleState {
    toggle: boolean
}

// Define the initial state using that type
const initialState: ToggleState = {
    toggle: false
}

export const toggleSlice = createSlice({
    name: 'toggle',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        toggleswitch: state => {
            state.toggle = !state.toggle
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload
        // }
    }
})

export const { toggleswitch } = toggleSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.toggle.toggle

export default toggleSlice.reducer