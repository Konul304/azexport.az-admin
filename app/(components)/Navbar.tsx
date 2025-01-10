"use client";

import React, { useLayoutEffect, useState } from "react";
// import { useQuery } from "react-query";
// import { useDispatch, useSelector } from "react-redux";
// import { Tooltip, Popover } from "antd";
// import Cookies from "js-cookie";
// import { debounce } from "lodash";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
// import {
//   search,
//   dropdown,
//   logout,
//   logo,
//   authentication_icon,
//   logo_light,
// } from "@/public/images/index";
import styles from "@/styles/componentStyles/Navbar.module.scss";
import { search } from "@/public/icons";
// import { getUserPhoto } from "../(api)/api";
// import {
//   setForcePageNum,
//   setPaginationIndex,
// } from "../(store)/(slices)/paginationSlice";
// import {
//   setSearchPlaceHolder,
//   setSearchValue,
// } from "../(store)/(slices)/searchSlice";
// import { Pagination, SearchState } from "../(store)/storeInterface";
// import PowerBIDashboard from "../(user)/(components)/PowerBIDashboard";
// import noImage from "../../public/images/no pp.svg";
// import { NavbarProps } from "../interfaces";
// import AuthHistoryModal from "./AuthHistoryModal";

const Navbar = ({ logoProp, roleProp }: any) => {
  const isAdmin = roleProp === "Admin" ? true : false;

  const name =
    typeof window !== "undefined" ? window.localStorage.getItem("name") : false;
  const surname =
    typeof window !== "undefined"
      ? window.localStorage.getItem("surname")
      : false;
  const email =
    typeof window !== "undefined"
      ? window.localStorage.getItem("email")
      : false;
  const userID =
    typeof window !== "undefined"
      ? window.localStorage.getItem("userID")
      : false;
  const powerBIUrl =
    typeof window !== "undefined"
      ? window.localStorage.getItem("BIurl")
      : false;

  const router = useRouter();
  //   const dispatch = useDispatch();
  //   const pathname = usePathname();
  //   const paginationIndex = useSelector(
  //     (store: { pagination: Pagination }) =>
  //       store.pagination.paginationState.pageIndex
  //   );
  //   const searchPlaceHolder = useSelector(
  //     (store: { search: SearchState }) => store.search.searchPlaceHolder
  //   );
  //   const [openModal, setOpenModal] = useState<boolean>(false);
  //   const [openAuthModal, setAuthOpenModal] = useState<boolean>(false);
  //   const [openPopover, setOpenPopover] = useState<boolean>(false);
  //   const handleInputChange = (event: any) => {
  //     const value = event.target.value;
  //     dispatch(setSearchValue(value));
  //     if (paginationIndex !== 0) {
  //       dispatch(setPaginationIndex(0));
  //       dispatch(setForcePageNum(true));
  //     } else return;
  //   };
  //   const onInputChangeDebouncer = debounce(handleInputChange, 500);

  //   const signOut = () => {
  //     Cookies.remove("crm_token");
  //     Cookies.remove("role");
  //     Cookies.remove("elaveNomre");
  //     Cookies.remove("powerBIUrl");
  //     localStorage.clear();
  //     sessionStorage.clear();
  //     router.push("/login");
  //   };

  //   useLayoutEffect(() => {
  //     switch (pathname) {
  //       case "/collectors":
  //         dispatch(setSearchPlaceHolder("Axtarış"));
  //         break;
  //       case "/portfolios":
  //         dispatch(setSearchPlaceHolder("Finkoda görə axtarış"));
  //         break;
  //       case "/admin-users":
  //         dispatch(setSearchPlaceHolder("Axtarış"));
  //         break;
  //       case "/result-templates":
  //         dispatch(setSearchPlaceHolder("Axtarış"));
  //         break;
  //       default:
  //         break;
  //     }
  //   }, [pathname]);

  const popoverContent = (
    <div className={styles.drop_flex}>
      <div className={styles.dropdown_menu}
      //   onClick={() => signOut()}
      >
        <div>
          {/* {logout} */}
        </div>
        <div
        // onClick={() => setOpenPopover(false)}
        >Təhlükəsiz çıxış</div>
      </div>
      <div
        className={styles.dropdown_menu}
      // onClick={() => {
      //   setAuthOpenModal(true);
      //   setOpenPopover(false);
      // }}
      >
        <div>
          {/* {authentication_icon} */}
        </div>
        <div>Autentikasiya tarixçəsi</div>
      </div>
    </div>
  );

  //   const getProfilPhoto = async (userID: any) => {
  //     try {
  //       const response = await getUserPhoto(userID);
  //       return response;
  //     } catch (err: any) {
  //       throw new Error(err);
  //     }
  //   };

  //   const handleOpenPopover = (newOpen: boolean) => {
  //     setOpenPopover(newOpen);
  //   };

  //   const { data, isLoading, isError } = useQuery(
  //     ["profilPhoto"],
  //     async () => await getProfilPhoto(userID),
  //     {
  //       refetchOnWindowFocus: false,
  //       refetchOnMount: false,
  //     }
  //   );

  return (
    <>
      <div
        className={
          styles.navbar_container
        }
      >

        <div className={styles.input_container}>
          <div className={styles.search_icon}>
            {search}
          </div>
          <input
            //   onChange={onInputChangeDebouncer}
            className={styles.input}
            type="text"
            placeholder="axtar"
          />
        </div>
        <div className={styles.navbar_right_side}>
          <div>
            <div className={styles.role_profile_con}>

              {/* <div className={styles.profile_con}>
                <div className={styles.profile_con}>
                  <Popover
                    content={popoverContent}
                    arrow={false}
                    trigger="click"
                    placement="bottomRight"
                    open={openPopover}
                    onOpenChange={handleOpenPopover}
                  >
                    <div className={styles.popover_content}>
                      <div className={styles.profile_photo}>
                        {" "}
                        <Image
                          className={styles.photo}
                          src={
                            data?.imageType
                              ? `data:${data?.imageType};base64, ${data?.imageBase64}`
                              : noImage
                          }
                          alt="Picture"
                          width="48"
                          height="48"
                          // intrinsicsize="50 x 50"
                        />
                      </div>
                      <div className={styles.profile_name}>
                        <Tooltip color="white" title={email}>
                          <div
                            className={
                              !isAdmin
                                ? `${styles.fullname_user}`
                                : `${styles.fullname}`
                            }
                          >
                            {name} {surname}
                          </div>
                          <div
                            className={
                              !isAdmin
                                ? `${styles.email_user}`
                                : `${styles.email}`
                            }
                          >
                            {email}
                          </div>
                        </Tooltip>
                      </div>
                      <button type="button" className={styles.dropdown_icon}>
                        {dropdown}
                      </button>
                    </div>
                  </Popover>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* <PowerBIDashboard isOpen={openModal} setIsOpen={setOpenModal} />
      {openAuthModal && (
        <AuthHistoryModal isOpen={openAuthModal} setIsOpen={setAuthOpenModal} />
      )} */}
    </>
  );
};

export default Navbar;
