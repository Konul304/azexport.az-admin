"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import {
//   admin_users,
//   admin_users_Fill,
//   collector,
//   document,
//   documentFill,
//   logo,
//   portfolio,
//   templates,
//   templatesFill,
// } from "@/public/images/index";
import logo from "../../public/images/logo.png"
import styles from "@/styles/componentStyles/Sidebar.module.scss";
import Image from "next/image";
import { home_icon, orders } from "@/public/icons";

const Sidebar = () => {
    const pathname = usePathname();
    const [selectedMenuItemId, setSelectedMenuItemId] = useState(pathname);
    console.log(pathname)
    useEffect(() => {
        setSelectedMenuItemId(pathname);
    }, [pathname]);

    return (
        <div className={styles.sidebar_container}>
            <div className={styles.logo}>
                <Image src={logo} width={133} height={43} alt="logo" />

            </div>
            <div className={styles.menu_items}>
                <Link href="/home">
                    <div
                        className={`${selectedMenuItemId === "/home"
                            ? `${styles.menu_item} ${styles.selected_menu_item}`
                            : `${styles.menu_item}`
                            }`}
                    >
                        <span>{home_icon}</span>{" "}
                        İdarəetmə paneli
                    </div>
                </Link>
                <Link href="/orders">
                    <div
                        className={` ${selectedMenuItemId === "/orders"
                            ? `${styles.menu_item} ${styles.selected_menu_item}`
                            : `${styles.menu_item}`
                            }`}
                    >
                        <span>{orders}</span>
                        Sifarişlər
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
