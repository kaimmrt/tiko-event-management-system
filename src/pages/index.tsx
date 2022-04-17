import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '../components/sections/Header';
import SignIn from './SignIn';
import SignUp from './SignUp';
import HomePage from './HomePage';
import Dashboard from './Dashboard';
import AddVisitor from './AddVisitor';
import Visitors from './Visitors';
import PrivateRoute from '../components/auth/PrivateRoute';
import PublicRoute from '../components/auth/PublicRoute';

const index = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={
                    <PublicRoute>
                        <HomePage />
                    </PublicRoute>}
                />
                <Route path="/signup" element={
                    <PublicRoute>
                        <SignUp />
                    </PublicRoute>}
                />
                <Route path="/signin" element={
                    <PublicRoute>
                        <SignIn />
                    </PublicRoute>}
                />
                <Route path="/dashboard" element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>}
                />
                <Route path="/add_visitor" element={
                    <PrivateRoute>
                        <AddVisitor />
                    </PrivateRoute>}
                />
                <Route path="/visitors" element={
                    <PrivateRoute>
                        <Visitors />
                    </PrivateRoute>}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default index
