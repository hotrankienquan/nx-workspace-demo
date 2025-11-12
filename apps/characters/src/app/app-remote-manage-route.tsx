import {Route, Routes } from "react-router-dom"

import React from "react"


const AppRemoteManageRoute = () => {
    return (<>
        <React.Suspense fallback={<p>Loading...</p>}>

                {/* <nav>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                </nav> */}
                <Routes>
                    <Route path="/" element={<h2>Remote module2 home</h2>} />
                    <Route path="/about" element={<h2>Remote About Page</h2>} />
                </Routes>
        </React.Suspense>
    </>)
}

export default AppRemoteManageRoute