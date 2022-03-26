import React from 'react'
import '../styles/card.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { CardList } from '../components/CardList';
import { AddFig } from '../components/AddFig';

export default function AppRouter() {

    return (
        <div>

            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<CardList />}/>
                    <Route path="/Add" element={<AddFig />}/>

                    <Route path="/*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </div>
    )
}
