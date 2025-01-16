import { cancel } from '@/public/icons';
import { Modal } from 'antd';
import React from 'react'
import styles from "@/styles/componentStyles/AddNoteModal.module.scss"


export interface ViewNotesModalProps {
    setOpenViewNotesModal: (open: boolean) => void;
    openViewNotesModal: boolean;
}

const ViewNotesModal = ({ openViewNotesModal, setOpenViewNotesModal }: ViewNotesModalProps) => {
    return (
        <>
            <Modal
                width={386}
                height={213}
                open={openViewNotesModal}
                closable={false}
                footer={false}
                centered
                onCancel={() => setOpenViewNotesModal(false)}>
                <div className={styles.view_notes_modal_container}>
                    <div className={styles.modal_header}>
                        <div className={styles.title}>Qeydlərə bax</div>
                        <div className={styles.delete}>Sil</div>
                    </div>
                    <div className={styles.dashed_line}></div>
                    <div className={styles.notes_container}>
                        <div className={styles.row}>
                            <input className='custom-checkbox' type='checkbox' />
                            <div className={styles.note}>“Atena” Sifarışlərin ləğvi</div>
                        </div>
                        <div className={styles.row}>
                            <input className='custom-checkbox' type='checkbox' />
                            <div className={styles.note}>“Atena” Sifarışlərin ləğvi</div>
                        </div>
                        <div className={styles.row}>
                            <input className='custom-checkbox' type='checkbox' />
                            <div className={styles.note}>“Atena” Sifarışlərin ləğvi</div>
                        </div>
                    </div>
                </div>
            </Modal >
        </>
    )
}

export default ViewNotesModal;