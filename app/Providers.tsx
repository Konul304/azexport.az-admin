"use client";

import { PropsWithChildren } from "react";
// import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
// import { toast } from "react-toastify";
import store from "@/app/(store)/store";

// const queryClient = new QueryClient();

// const queryClient = new QueryClient({
//     queryCache: new QueryCache({
//         onError: (error: any) => {
//             toast(`Xəta baş verdi`);
//             console.log(error?.message);
//         },
//     }),
// });

const ProvidersWrapper = ({ children }: PropsWithChildren) => {
    return (
        <Provider store={store}>
            {/* <QueryClientProvider client={queryClient} contextSharing={true}> */}
            {children}
            {/* </QueryClientProvider> */}
        </Provider>
    );
};

export default ProvidersWrapper;
