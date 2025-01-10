import { cancel } from '@/public/icons';
import { Modal } from 'antd'
import React from 'react'
import styles from "@/styles/componentStyles/AddNoteModal.module.scss"

export interface AddNoteModalProps {
    setOpenAddNoteModal: (open: boolean) => void;
    openAddNoteModal: boolean;
}

const AddNoteModal = ({ openAddNoteModal, setOpenAddNoteModal }: AddNoteModalProps) => {
    return (
        <>
            <Modal
                width={387}
                height={222}
                open={openAddNoteModal}
                closeIcon={cancel}
                footer={false}
                centered
                onCancel={() => setOpenAddNoteModal(false)}>
                <div className={styles.add_note_modal_container}>
                    <div className={styles.title}>Qeyd yeri</div>
                    <textarea className={styles.note_textarea} name="note" id="" placeholder='Qeydlərinizi əlavə edin...'/>
                    <div className={styles.save_btn}>Yadda saxla</div>
                </div>
            </Modal >
        </>
    )
}

export default AddNoteModal