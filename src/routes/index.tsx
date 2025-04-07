import {Routes as Switch, Route, Navigate } from "react-router-dom"
import {Products, Cart} from '../pages'
import React from "react"

export const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/products" element={<Products/>}/>
            <Route path="cart" element={<Cart/>}/>
            <Route path="*" element={<Navigate to="/products"/>}/>
        </Switch>
    )
}