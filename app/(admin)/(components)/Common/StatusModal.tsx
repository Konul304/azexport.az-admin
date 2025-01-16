"use client";

import { Modal } from "antd";
import { successIcon, errorIcon, warningIcon } from "@/public/icons";
import styles from "@/styles/componentStyles/StatusModal.module.scss";
import { StatusModalProps } from "../../../interfaces";

const StatusModal = ({
    open,
    setOpen,
    statusAction,
    warningMsg,
}: StatusModalProps) => {

    const showHeaderIcon = () => {
        switch (statusAction) {
            case "order-add-success":
            case "order-update-success":
            case "order-delete-success":
                return successIcon;
            case "error":
                return errorIcon;
            case "warning":
                return warningIcon;
            default:
                break;
        }
    };

    const showHeaderText = () => {
        switch (statusAction) {
            case "order-add-success":
            case "order-update-success":
            case "order-delete-success":
                return "Məlumat";
            case "sameFileWarning - excel":
            case "warning - newMail":
                return "Məlumat";
            case "error":
                return "Texniki xəta baş verdi";
            case "warning":
                return "Əməliyyat icra edilmədi";
            default:
                break;
        }
    };

    const showContentText = () => {
        switch (statusAction) {
            case "order-add-success":
                return "Yeni kollektor uğurla əlavə edildi";
            case "order-update-success":
                return "Kollektor istifadəçi məlumatları yeniləndi";
            case "order-delete-success":
                return "Uğurla silindi";
            case "warning":
                return "Zəhmət olmasa müvafiq xanaları  doldurun";
            case "error":
                return "Yenidən cəhd edin";
            default:
                break;
        }
    };

    const changeButtonStyle = (action: string) => {
        switch (action) {
            case "warning":
                return styles.warningCancel;
            case "order-add-success":
            case "order-delete-success":
            case "order-update-success":
                return styles.successCancel;
            default:
                return styles.errorCancel;
        }
    };

    return (
        <>
            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
                closable={false}
                centered
                width="fit-content"
            >
                <div className={styles.status_modal_container}>
                    <div className={styles.icon}>{showHeaderIcon()}</div>
                    <div className={styles.header_text}>{showHeaderText()}</div>
                    <div className={styles.message}>
                        {warningMsg}
                        {showContentText()}
                    </div>
                    <button
                        type="button"
                        className={`${changeButtonStyle(statusAction)}`}
                        onClick={() => setOpen(false)}
                    >
                        Bağla
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default StatusModal;
