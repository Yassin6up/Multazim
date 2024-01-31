import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./states/dataSlice";

export default configureStore({
    reducer : {
        adhan  : dataSlice
    }
})