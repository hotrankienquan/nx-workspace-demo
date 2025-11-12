import React from "react"
import ContentInstruct from "../components/ContentInstruct"
import { Route, Routes } from "react-router-dom"
import InnerLayout from "./InnerLayout";
const Layout = () => {
    return (
        <React.Suspense fallback={<p>Loading...</p>}>
            <Routes>
                <Route path="/" element={<InnerLayout />}>
                    <Route path="abc" element={<>
                            <ContentInstruct />
                        </>}/>
                </Route>
            </Routes>
        </React.Suspense>
    )
};


export default Layout