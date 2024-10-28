
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// export interface NavigateState {
//   origin: {} | null
//   destination: {} | null
//   travelTimeInfo: string | null
// }

const initialState = {
  origin : null,
  destination : null,
  travelTimeInfo : null,
  isRideOptions : false,
  isInitialValue : "",
  isPaymentView: false,
  isLogIn: false,
  payment: null,
  vehicle:null,
  isVish:false,
  isDriver:false

}

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
   setOrigin: (state, action) => {
    state.origin = action.payload
   },
   setDestination: (state, action) => {
    state.destination = action.payload
   },
   setTravelTimeInfo: (state, action) => {
    state.travelTimeInfo = action.payload
   },
   setIsRideOptions: (state, action) => {
    state.isRideOptions = action.payload
   },
   setInitialValue: (state, action) => {
    state.isInitialValue = action.payload
   },
   setPaymentView: (state, action) => {
    state.isPaymentView = action.payload
   },
   setLogIn: (state, action) => {
    state.isLogIn = action.payload
   },
   setPayment: (state, action) => {
    state.payment = action.payload
   },
   setVehicle: (state, action) => {
    state.vehicle = action.payload
   },
   setVish: (state, action) => {
    state.isVish = action.payload
   },
   setDriver: (state, action) => {
    state.isDriver = action.payload
   }
}})

// Action creators are generated for each case reducer function
export const { setOrigin, setDestination, setTravelTimeInfo, setIsRideOptions, setInitialValue, 
  setDriver, setPaymentView, setLogIn, setPayment, setVehicle, setVish } = navSlice.actions

//selectors
export const selectOrigin = (state: { nav: { origin: any } }) => state.nav.origin
export const selectDestination = (state: { nav: { destination: any } }) => state.nav.destination
export const selectTravelTimeInfo = (state: { nav: { travelTimeInfo: any } }) => state.nav.travelTimeInfo
export const selectIsRideOptions = (state: { nav: { isRideOptions: any } }) => state.nav.isRideOptions
export const selectInitialValue = (state: { nav: { isInitialValue: any } }) => state.nav.isInitialValue
export const selectPaymentView = (state: { nav: { isPaymentView: any } }) => state.nav.isPaymentView
export const selectLogIn = (state: { nav: { isLogIn: any } }) => state.nav.isLogIn
export const selectPayment = (state: { nav: { payment: any } }) => state.nav.payment
export const selectVehicle = (state: { nav: { vehicle: any } }) => state.nav.vehicle
export const selectVish = (state: { nav: { isVish: any } }) => state.nav.isVish
export const selectDriver = (state: { nav: { isDriver: any } }) => state.nav.isDriver
export default navSlice.reducer