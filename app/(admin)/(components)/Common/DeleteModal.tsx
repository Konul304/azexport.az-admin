import { Modal } from 'antd'
import React, { useState } from 'react'
import styles from "@/styles/componentStyles/DeleteModal.module.scss"
import { cancel } from '@/public/icons';
import { deleteOrder } from '@/app/(api)/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import StatusModal from './StatusModal';

export interface DeleteModalProps {
    setOpenDeleteModal: (open: boolean) => void;
    openDeleteModal: boolean;
    selectedRow: any;
}

const DeleteModal = ({ openDeleteModal, setOpenDeleteModal, selectedRow }: DeleteModalProps) => {
    const client = useQueryClient();
    const [openStatusModal, setOpenStatusModal] = useState<boolean>(false);
    const [statusAction, setStatusAction] = useState<string>("");

    const deleteSelected = async () => {
        try {
            await deleteOrder(selectedRow?.id);
            setStatusAction("order-delete-success");
            setOpenStatusModal(true);
        } catch (error: any) {
            console.log(error);
            setStatusAction("error");
            setOpenStatusModal(true);
            // setOpenDeleteModal(false)
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
        // setOpenDeleteModal(false)
    };
    console.log(statusAction)
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
                {openStatusModal && <StatusModal
                    open={openStatusModal}
                    setOpen={setOpenStatusModal}
                    statusAction={statusAction}
                />}
            </Modal >
        </>
    )
}

export default DeleteModal