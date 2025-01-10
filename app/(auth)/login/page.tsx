"use client";

import { useRef, useState } from "react";
// import { Spin } from "antd";
// import Cookies from "js-cookie";
// import jwt_decode from "jwt-decode";
import { useRouter } from "next/navigation";
// import { postLogin } from "@/app/(api)/api";
// import { logo } from "@/public/images/index";
import styles from "@/styles/componentStyles/LoginPage.module.scss";
// import CustomCheckbox from "@/utils/CustomCheckbox";

const LoginPage = () => {
    const router = useRouter();
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    //   const formSubmit = async (event: any) => {
    //     event?.preventDefault();
    //     const formData = JSON.stringify({
    //       username: userName,
    //       password: password,
    //     });

    //     try {
    //       setIsLoading(true);
    //       const res = await postLogin(formData);
    //       Cookies.set("crm_token", res?.data?.token, { expires: 0.5 });
    //       const token: any = res?.data?.token;
    //       const tokenRegEx =
    //         /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/;
    //       if (tokenRegEx.test(token)) {
    //         const decoded: any = jwt_decode(token);
    //         Cookies.set("role", decoded?.role, { expires: 1 });
    //         localStorage.setItem("name", decoded?.FirstName);
    //         localStorage.setItem("surname", decoded?.LastName);
    //         localStorage.setItem("userID", decoded?.UserId);
    //         localStorage.setItem("BIurl", decoded?.PowerBIUrl);
    //         if (decoded?.role === "Admin") router.replace("/collectors");
    //         if (decoded?.role === "User") router.replace("/user-portfolios");
    //       }
    //     } catch (error: any) {
    //       setIsLoading(false);
    //       console.log(error);
    //       if (error?.response?.status === 400) {
    //         setErrorMessage(true);
    //       }
    //     }
    //   };

    //   const handleInputChange = () => {
    //     const inputValue = passwordInputRef.current?.value.trim();

    //     if (inputValue === "") {
    //       setErrorMessage(true);
    //     } else {
    //       setErrorMessage(false);
    //     }
    //   };

    return (
        <>
            <div className={styles.login_page}>
                <div className={styles.login_container}>
                    {/* <div>{logo}</div> */}
                    <form
                    //   onSubmit={formSubmit}
                    >
                        <div className={styles.login_box}>
                            <span>Daxil ol</span>
                            <div className={styles.login_inputs_group}>
                                <div className={styles.login_input}>
                                    <label htmlFor="">İstifadəçi adı</label>
                                    <input
                                        type="text"
                                        name="username"
                                        required
                                        onChange={(e) => setUserName(e.target?.value)}
                                    />
                                </div>
                                <div className={styles.login_input}>
                                    <label htmlFor="">Parol</label>
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        ref={passwordInputRef}
                                    // onChange={(e) => {
                                    //   setPassword(e.target?.value);
                                    //   handleInputChange();
                                    // }}
                                    />
                                </div>
                                {errorMessage && (
                                    <p className={styles.error_message}>
                                        İstifadəçi adı və ya şifrə yanlışdır
                                    </p>
                                )}
                                <div
                                    className={styles.login_checkbox}
                                    onClick={() => setIsChecked(!isChecked)}
                                >
                                    {/* <CustomCheckbox
                    bordercolor="#2E3C7F"
                    fillcolor="rgba(46, 60, 127, 1)"
                    backgroundcolor="#EAEBF2"
                    checked={isChecked}
                  /> */}
                                    <input type="checkbox" />
                                    <div>Sistemdə qal</div>
                                </div>
                            </div>
                            <button className={styles.login_btn} type="submit">
                                <div>
                                Daxil ol
                                </div>
                                {/* <div className={styles.loader}>
                  {isLoading ? <Spin size="small" /> : "Daxil ol"}
                </div> */}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
