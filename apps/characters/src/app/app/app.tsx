import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import RootRoute from './routes/root-route';
import LoadingFallbackComponent from '../globals/components/Loading';

const RootEntryPoint = () => {
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
            <React.Suspense fallback={<LoadingFallbackComponent />}>
                <RootRoute />
            </React.Suspense>
        </QueryClientProvider>
    );
};

export default RootEntryPoint;
