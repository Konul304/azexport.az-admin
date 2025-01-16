import axios from "axios";
import Cookies from "js-cookie";
// import store from "../(store)/store";

export const axiosCrmClient = axios.create({
    baseURL: "https://azexport.az-back.test/api/",
});

axiosCrmClient.interceptors.request.use(
    function (config: any) {
        const access_token = Cookies.get("azexport_token");
        config.headers.Authorization = `Bearer ${access_token}`;
        return config;
    },
    (err: any) => {
        console.log(err);
        return Promise.reject(err);
    },
);

axiosCrmClient.interceptors.response.use(
    function (config: any) {
        const access_token = Cookies.get("azexport_token");
        config.headers.Authorization = `Bearer ${access_token}`;
        return config;
    },
    async (err: any) => {
        console.log(err);
        // const access_token = Cookies.get("azexport_token");
        // const tokenRegEx =
        //   /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/;
        // if (err?.response?.status === 401) {
        //   store.dispatch(setSessionModalOpen(true));
        // } else if (!tokenRegEx.test(access_token as string)) {
        // Cookies.remove("azexport_token");
        // localStorage.clear();
        // sessionStorage.clear();
        // window.location.replace("/login");
        // }
        return Promise.reject(err);
    },
);
