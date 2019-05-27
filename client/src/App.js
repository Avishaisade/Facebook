import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./MainRouter";

import './scss/styles.scss';


const App = () => (
    document.title = "Facebook",
    (function () {
        var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = 'https://static.xx.fbcdn.net/rsrc.php/yo/r/iRmz9lCMBD2.ico';
        document.getElementsByTagName('head')[0].appendChild(link);
    })(),
    <BrowserRouter>
        <MainRouter />
    </BrowserRouter>
);

export default App;

