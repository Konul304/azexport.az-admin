"use client";

import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
// import { toast } from "react-toastify";
import store from "@/app/(store)/store";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error: any) => {
            // alert(`Xəta baş verdi`);
            console.log(error?.message);
        },
    }),
});

const ProvidersWrapper = ({ children }: PropsWithChildren) => {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </Provider>
    );
};

export default ProvidersWrapper;
