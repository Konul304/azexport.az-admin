"use client";
import React, { useEffect, useRef } from 'react';
import styles from "@/styles/componentStyles/OrdersPageContainer.module.scss";
import { calendar, cancel, email, paperClip, phone, user_icon } from '@/public/icons';

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
}

const PlatformInfoModal = ({ setOpenRowId, infoData }: PlatformInfoModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

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
            <div ref={modalRef} className={styles.platform_info_container}>
                <div className={styles.dropdown_header}>
                    <div>Sifarişçi məlumatları</div>
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
                            <div className={styles.desc_icon}>{user_icon}</div>
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