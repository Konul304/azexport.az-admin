"use client";
import React, { useEffect, useRef, useState } from 'react';
import styles from "@/styles/componentStyles/OrdersPageContainer.module.scss";
import { calendar, cancel, email, paperClip, phone, platform_icon, user_icon } from '@/public/icons';
import { getOrderById } from '@/app/(api)/api';
import { useQuery } from '@tanstack/react-query';

export interface PlatformInfoModalProps {
    setOpenRowId: (open: any) => void;
    infoData: any
    position?: { top: number; left: number };
}

const PlatformInfoModal = ({ setOpenRowId, infoData, position }: PlatformInfoModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [modalStyle, setModalStyle] = useState({ top: 0, left: 0 });

    const { data, isLoading, isFetching, refetch } = useQuery(
        ["orderByIdData"],
        async () => await getOrderById(infoData?.id),
        {
            refetchOnWindowFocus: false,
        },
    );
    console.log(data?.data)

    useEffect(() => {
        // Adjust modal position dynamically
        if (position && modalRef.current) {
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;
            const modalRect = modalRef.current.getBoundingClientRect();

            const adjustedTop =
                position.top + modalRect.height > viewportHeight
                    ? viewportHeight - modalRect.height - 10 // Ensure it's within bounds
                    : position.top;
            const adjustedLeft =
                position.left + modalRect.width > viewportWidth
                    ? viewportWidth - modalRect.width - 10 // Ensure it's within bounds
                    : position.left;

            setModalStyle({ top: adjustedTop, left: adjustedLeft });
        }
    }, [position]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setOpenRowId(null); // Close the modal
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setOpenRowId]);

    return (
        <>
            <div style={{
                position: "absolute", // Ensure modal uses absolute positioning
                top: modalStyle.top,
                left: modalStyle.left,
                zIndex: 1000,
            }} ref={modalRef} className={styles.platform_info_container}>
                <div className={styles.dropdown_header}>
                    <div style={{ color: '#2400FF' }}>Sifarişçi məlumatları</div>
                    <div onClick={() => {
                        setOpenRowId(null);
                    }}>{cancel}</div>
                </div>
                <div className={styles.dashed_line}></div>
                <div className={styles.info_content}>
                    <div>
                        <div className={styles.popup_item}>
                            <div className={styles.title}>Sifariş platforması:</div>
                            <div className={styles.description}>
                                <div className={styles.desc_icon}>{platform_icon}</div>
                                <div className={styles.desc_text}>{data?.data?.buyer_platform}</div>
                            </div>
                        </div>
                        <div className={styles.popup_item}>
                            <div className={styles.title}>Sifarişçinin adı:</div>
                            <div className={styles.description}>
                                <div className={styles.desc_icon}>{user_icon}</div>
                                <div className={styles.desc_text}>{data?.data?.product_name}</div>
                            </div>
                        </div>
                        <div className={styles.popup_item}>
                            <div className={styles.title}>Sifariş NO:</div>
                            <div className={styles.description}>
                                <div className={styles.desc_icon}>{paperClip}</div>
                                <div className={styles.desc_text}>{data?.data?.id}</div>
                            </div>
                        </div>
                        <div className={styles.popup_item}>
                            <div className={styles.title}>Sifarişin tarixi:</div>
                            <div className={styles.description}>
                                <div className={styles.desc_icon}>{calendar}</div>
                                <div className={styles.desc_text}>{data?.data?.date}</div>
                            </div>
                        </div>
                        <div className={styles.popup_item}>
                            <div className={styles.title}>Əlaqə telefonu:</div>
                            <div className={styles.description}>
                                <div className={styles.desc_icon}>{phone}</div>
                                <div className={styles.desc_text}>{data?.data?.whatsapp_number}</div>
                            </div>
                        </div>
                        <div className={styles.popup_item}>
                            <div className={styles.title}>Mail ünvanı:</div>
                            <div className={styles.description}>
                                <div className={styles.desc_icon}>{email}</div>
                                <div className={styles.desc_text}>{data?.data?.buyer_email}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlatformInfoModal