import React from 'react'
import ReactGA from 'react-ga4';

function initialGA() {
    ReactGA.initialize('G-2BLEQ6HW0K');
    ReactGA.send({ hitType: "pageview", page: '/homepage' });
};
const HomePage = () => {
    initialGA();
    return (
        <section className="section">
            <div className="container">
                <h1 className="title has-text-centered is-size-1 mb-6">
                    Welcome
                </h1>
                <h2>
                    TİKO Event Management System
                </h2>
            </div>
        </section>
    )
}

export default HomePage
