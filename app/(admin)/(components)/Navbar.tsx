"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "@/styles/componentStyles/Navbar.module.scss";
import { filters, profil_dropdown, search } from "@/public/icons";
import Cookies from "js-cookie";
import { Popover, Tooltip } from "antd";
import {
  setForcePageNum,
  setPaginationIndex,
} from "../../(store)/(slices)/paginationSlice";
import {
  setSearchValue,
} from "../../(store)/(slices)/searchSlice";
import { Pagination, SearchState } from "../../(store)/storeInterface";
import profile from "@/public/defaultPP.png"
import Filters from "./Filters";

const Navbar = ({ logoProp, roleProp }: any) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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
  const dispatch = useDispatch();
  const paginationIndex = useSelector(
    (store: { pagination: Pagination }) =>
      store.pagination.paginationState.pageIndex
  );
  const handleInputChange = (event: any) => {
    const value = event.target.value;
    dispatch(setSearchValue(value));
    if (paginationIndex !== 0) {
      dispatch(setPaginationIndex(0));
      dispatch(setForcePageNum(true));
    } else return;
  };
  const onInputChangeDebouncer = debounce(handleInputChange, 500);

  const signOut = () => {
    Cookies.remove("azexport_token");
    router.push("/login");
  };


  const popoverContent = (
    <div className={styles.drop_flex}>
      <div className={styles.dropdown_menu}
        onClick={() => signOut()}
      >
        <div
        >Çıxış</div>
      </div>

    </div>
  );

  return (
    <>
      <div
        className={
          styles.navbar_container
        }
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div className={styles.input_container}>
            <div className={styles.search_icon}>
              {search}
            </div>
            <input
              onChange={onInputChangeDebouncer}
              className={styles.input}
              type="text"
              placeholder="axtar"
            />
          </div>
          <Popover
            placement="bottomLeft"
            content={<Filters open={isFilterOpen} setOpen={setIsFilterOpen} />}
            arrow={false}
            trigger="click"
            open={isFilterOpen}
          >
            <div className={styles.filter_btn} onClick={() => setIsFilterOpen(prev => !prev)}>{filters}</div>
          </Popover>

        </div>
        <div>
          <div className={styles.profile_con}>
            <div className={styles.profile_con}>
              <Popover
                content={popoverContent}
                arrow={false}
                trigger="click"
                placement="bottomRight"
              >
                <div className={styles.popover_content}>
                  <div className={styles.profile_photo}>
                    {" "}
                    <Image
                      className={styles.photo}
                      src={profile}
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
                  <div className={styles.dropdown_icon}>
                    {profil_dropdown}
                  </div>
                </div>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
