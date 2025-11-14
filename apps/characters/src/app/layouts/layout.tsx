import React from 'react';
import ContentInstruct from '../features/list-claims/components/ContentInstruct';
import { Route, Routes } from 'react-router-dom';
import InnerLayout from './InnerLayout';
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import ClaimsDetailPageWrapper from '../features/detail-claims/components/ClaimsDetailPageWrapper';

const Layout = () => {

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                gcTime: 1000 * 60 * 60 * 24
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>

            <React.Suspense fallback={<p>Loading...</p>}>
                <Routes>
                    <Route path="/" element={<InnerLayout />}>
                        <Route
                            path="abc"
                            element={
                                <>
                                    <ContentInstruct />
                                </>
                            }
                        />

                        <Route path='/detail-claims/:id' element={<ClaimsDetailPageWrapper/>}/>
                    </Route>
                </Routes>
            </React.Suspense>
        </QueryClientProvider>
    );
};

export default Layout;
