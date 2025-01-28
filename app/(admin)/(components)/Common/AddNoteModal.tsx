import { cancel, editNote } from '@/public/icons';
import { Modal } from 'antd'
import React, { useState } from 'react'
import styles from "@/styles/componentStyles/AddNoteModal.module.scss"
import { patchNote } from '@/app/(api)/api';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export interface AddNoteModalProps {
    setOpenAddNoteModal: (open: boolean) => void;
    openAddNoteModal: boolean;
    selectedRow: any;
}

const AddNoteModal = ({ openAddNoteModal, setOpenAddNoteModal, selectedRow }: AddNoteModalProps) => {
    const client = useQueryClient();
    const [note, setNote] = useState<string>('')

    const addNote = async (row: any) => {
        const data = {
            note: note
        }
        try {
            const res = await patchNote(selectedRow?.id, data)
            client.invalidateQueries(["ordersData"]);
            setOpenAddNoteModal(false)
            toast("Qeyd uğurla yeniləndi")
        } catch (error: any) {
            console.log(error);
            toast("Xəta baş verdi")
        }
    }

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
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className={styles.title}>Qeyd yarat</div>
                        <div style={{ marginRight: '25px', cursor: 'pointer' }}>{editNote}</div>
                    </div>
                    <textarea
                        onChange={(e: any) => setNote(e?.target?.value)}
                        className={styles.note_textarea}
                        name="note" id=""
                        defaultValue={selectedRow?.note ? selectedRow?.note : ''}
                        placeholder='Qeydlərinizi əlavə edin...' />
                    <div
                        onClick={addNote}
                        className={styles.save_btn}>Yadda saxla</div>
                </div>
            </Modal >
        </>
    )
}

export default AddNoteModal