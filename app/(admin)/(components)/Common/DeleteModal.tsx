import { Modal } from 'antd'
import React from 'react'
import styles from "@/styles/componentStyles/DeleteModal.module.scss"
import { cancel } from '@/public/icons';
import { deleteOrder } from '@/app/(api)/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export interface DeleteModalProps {
    setOpenDeleteModal: (open: boolean) => void;
    openDeleteModal: boolean;
    selectedRow: any;
}

const DeleteModal = ({ openDeleteModal, setOpenDeleteModal, selectedRow }: DeleteModalProps) => {
    const client = useQueryClient();

    const deleteSelected = async () => {
        try {
            await deleteOrder(selectedRow?.id);
            toast('Sifariş uğurla silindi');
            setOpenDeleteModal(false)
        } catch (error: any) {
            console.log(error);
            toast('Xəta baş verdi');
            setOpenDeleteModal(false)
        }
    }

    const deleteMutation = useMutation({
        mutationFn: deleteSelected,
        onSuccess: () => {
            client.invalidateQueries(["ordersData"]);
        },
    });

    const handleDelete = () => {
        deleteMutation.mutate();
    };
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
                        <button className={styles.cancel_btn} onClick={() => setOpenDeleteModal(false)}>Ləğv et</button>
                        <button className={styles.delete_btn} onClick={handleDelete}>Sil</button>
                    </div>
                </div>
            </Modal >
        </>
    )
}

export default DeleteModal