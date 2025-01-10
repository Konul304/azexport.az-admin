import { Modal } from 'antd'
import React from 'react'
import styles from "@/styles/componentStyles/DeleteModal.module.scss"
import { cancel } from '@/public/icons';

export interface DeleteModalProps {
    setOpenDeleteModal: (open: boolean) => void;
    openDeleteModal: boolean;
}

const DeleteModal = ({ openDeleteModal, setOpenDeleteModal }: DeleteModalProps) => {

    return (
        <>
            <Modal
                width={310}
                height={171}
                open={openDeleteModal}
                closeIcon={cancel}
                footer={false}
                centered
                onCancel={() => setOpenDeleteModal(false)}>
                <div className={styles.delete_modal_container}>
                    <div className={styles.title}>Silmək istədiyinə əminsən?</div>
                    <div className={styles.description}>Bu elementi silmək istədiyinizə əminsiniz? Bu əməliyyat
                        geri qaytarıla bilməz</div>
                    <div className={styles.buttons}>
                        <button className={styles.cancel_btn}>Ləğv et</button>
                        <button className={styles.delete_btn}>Sil</button>
                    </div>
                </div>
            </Modal >
        </>
    )
}

export default DeleteModal