"use client";
import React, { useEffect, useRef, useState } from 'react';
import styles from "@/styles/componentStyles/OrdersPageContainer.module.scss";
import { calendar, cancel, email, paperClip, phone, platform_icon, user_icon } from '@/public/icons';

export interface PlatformInfoModalProps {
    setOpenRowId: (open: any) => void;
    infoData: {
        platform: string;
        name: string;
        no: string | number;
        date: string;
        phoneNumber: string;
        email: string;
    };
    position?: { top: number; left: number };
}

const PlatformInfoModal = ({ setOpenRowId, infoData, position }: PlatformInfoModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [modalStyle, setModalStyle] = useState({ top: 0, left: 0 });


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
                    <div className={styles.titles}>
                        <div>Sifariş platforması:</div>
                        <div>Sifarişçinin adı:</div>
                        <div>Sifariş NO:</div>
                        <div>Sifarişin tarixi:</div>
                        <div>Əlaqə telefonu:</div>
                        <div>Mail ünvanı:</div>
                    </div>
                    <div className={styles.descriptions}>
                        <div className={styles.description}>
                            <div className={styles.desc_icon}>{platform_icon}</div>
                            <div className={styles.desc_text}>{infoData?.platform}</div>
                        </div>
                        <div className={styles.description}>
                            <div className={styles.desc_icon}>{user_icon}</div>
                            <div className={styles.desc_text}>{infoData?.name}</div>
                        </div>
                        <div className={styles.description}>
                            <div className={styles.desc_icon}>{paperClip}</div>
                            <div className={styles.desc_text}>{infoData?.no}</div>
                        </div>
                        <div className={styles.description}>
                            <div className={styles.desc_icon}>{calendar}</div>
                            <div className={styles.desc_text}>{infoData?.date}</div>
                        </div>
                        <div className={styles.description}>
                            <div className={styles.desc_icon}>{phone}</div>
                            <div className={styles.desc_text}>{infoData?.phoneNumber}</div>
                        </div>
                        <div className={styles.description}>
                            <div className={styles.desc_icon}>{email}</div>
                            <div className={styles.desc_text}>{infoData?.email}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlatformInfoModal