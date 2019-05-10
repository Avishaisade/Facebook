import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./MainRouter";

import './scss/styles.scss';


const App = () => (

    <BrowserRouter>
        <MainRouter />
    </BrowserRouter>
);

export default App;

