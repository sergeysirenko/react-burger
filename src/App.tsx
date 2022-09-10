import React, { Suspense } from "react";
import {Routes, Route} from "react-router-dom";
import './scss/app.scss';
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import PreLoader from "./components/PreLoader";
import NotFound from "./pages/NotFound";

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */"./pages/Cart"));
const FullBurger = React.lazy(() => import(/* webpackChunkName: "FullBurger" */"./pages/FullBurger"));

function App() {
    return (
        <Routes>
            <Route path='/' element={<MainLayout />}>
                <Route path="" element={<Home />} />
                <Route path="cart" element={
                    <Suspense fallback={<PreLoader />}>
                        <Cart />
                    </Suspense>
                } />
                <Route path="burger/:id" element={
                    <Suspense fallback={<PreLoader />}>
                        <FullBurger />
                    </Suspense>
                } />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
