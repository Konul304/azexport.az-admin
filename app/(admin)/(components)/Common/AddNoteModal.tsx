import { cancel, editNote } from '@/public/icons';
import { Modal } from 'antd'
import React, { useState } from 'react'
import styles from "@/styles/componentStyles/AddNoteModal.module.scss"
import { addCategory, patchNote } from '@/app/(api)/api';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export interface AddNoteModalProps {
    setOpenAddNoteModal: (open: boolean) => void;
    openAddNoteModal: boolean;
    selectedRow?: any;
}

const AddNoteModal = ({ openAddNoteModal, setOpenAddNoteModal, selectedRow }: AddNoteModalProps) => {
    const client = useQueryClient();
    const [note, setNote] = useState<string>('')

    const postCategory = async () => {
        console.log("category" + " " + note)
        const data = {
            name: note
        }
        try {
            const res = await addCategory(data)
            client.invalidateQueries(["categoriesData"]);
            setOpenAddNoteModal(false)
            toast("Kateqoriya uğurla yaradıldı")
        } catch (error: any) {
            console.log(error);
            toast("Xəta baş verdi")
        }
    }

    const addNote = async () => {
        console.log("note" + " " + note)
        const data = {
            note: note
        }
        try {
            const res = await patchNote(selectedRow?.id, data)
            client.invalidateQueries(["filtered-orders"]);
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
                        <div className={styles.title}>{!selectedRow ? "Kateqoriya yarat" : "Qeyd yarat"}</div>
                        <div style={{ marginRight: '25px', cursor: 'pointer' }}>{editNote}</div>
                    </div>
                    <textarea
                        onChange={(e: any) => setNote(e?.target?.value)}
                        className={styles.note_textarea}
                        name="note" id=""
                        defaultValue={selectedRow?.note ? selectedRow?.note : ''}
                        placeholder={!selectedRow ? "Kateqoriya əlavə edin..." : "Qeydlərinizi əlavə edin..."} />
                    <div
                        onClick={selectedRow ? addNote : postCategory}
                        className={styles.save_btn}>Yadda saxla</div>
                </div>
            </Modal >
        </>
    )
}

export default AddNoteModal