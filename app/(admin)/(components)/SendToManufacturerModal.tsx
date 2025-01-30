import { cancel, search } from '@/public/icons';
import { Divider, Form, FormProps, Modal, Select, Space, TreeSelect } from 'antd'
import React from 'react'
import styles from "@/styles/componentStyles/SendToManufacturer.module.scss"

export interface SendModalProps {
    setOpenSendModal: (open: boolean) => void;
    openSendModal: boolean;
    selectedIds: any;
}

const SendToManufacturerModal = ({ openSendModal, setOpenSendModal, selectedIds }: SendModalProps) => {
    const [form] = Form.useForm();

    const treeData = [
        {
            title: <strong>Ali express</strong>,
            value: "ali_express",
            selectable: false,
            children: [
                {
                    title: (
                        <div style={{ color: "#64748B" }}>
                            <div>
                                <div>Sifariş platforması: Ali express</div>
                            </div>
                            <div>Sifarişçinin adı: Ali Huseyn</div>
                            <div>Əlaqə telefonu: +2020 8788 677 56</div>
                        </div>
                    ),
                    value: "details",
                    selectable: false,
                },
            ],
        },
        {
            title: <strong>Ali express2</strong>,
            value: "ali_express2",
            selectable: false,
            children: [
                {
                    title: (
                        <div style={{ color: "#64748B" }}>
                            <div>
                                <div>Sifariş platforması: Ali express</div>
                            </div>
                            <div>Sifarişçinin adı: Ali Huseyn</div>
                            <div>Əlaqə telefonu: +2020 8788 677 56</div>
                        </div>
                    ),
                    value: "details2",
                    selectable: false,
                },
            ],
        },
        {
            title: <strong>Ali express3</strong>,
            value: "ali_express3",
            selectable: false,
            children: [
                {
                    title: (
                        <div style={{ color: "#64748B" }}>
                            <div>
                                <div>Sifariş platforması: Ali express</div>
                            </div>
                            <div>Sifarişçinin adı: Ali Huseyn</div>
                            <div>Əlaqə telefonu: +2020 8788 677 56</div>
                        </div>
                    ),
                    value: "details3",
                    selectable: false,
                },
            ],
        },
    ];

    const onFinish: FormProps<any>['onFinish'] = (values) => {
        console.log(values)
    }

    return (
        <>
            <Modal
                width={1005}
                height={171}
                open={openSendModal}
                closeIcon={cancel}
                footer={false}
                centered
                onCancel={() => setOpenSendModal(false)}>
                <div className={styles.modal_container}>
                    <div className={styles.title}>İxrac sifarişi</div>
                    <div className={styles.description}>İxrac sifarişi üçün qeydlərinizi yazın.</div>
                    <Form layout='vertical'
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        onFinish={onFinish}
                        autoComplete="off"
                        form={form}>
                        <div className={styles.inputs_flex}>
                            <Form.Item
                                name="contact"
                                label=""
                            // rules={[{ required: true, message: 'Zəhmət olmasa status seçin' }]}
                            >
                                <div className={styles.label}>Əlaqə vasitələri</div>
                                <Select
                                    className={styles.input}
                                    placeholder="Seçin"
                                    mode='multiple'
                                    // onChange={onChange}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    dropdownRender={(menu) => (
                                        <>
                                            {menu}
                                            <Divider style={{ margin: '8px 0' }} />
                                            <Space style={{ padding: '0 8px 4px' }}>
                                                <div className={styles.select_footer}>
                                                    <div
                                                        onClick={() => {
                                                            form.setFieldsValue({ status: [0, 1, 2] });
                                                        }}
                                                        className={styles.select_all}>
                                                        Hamısını seç
                                                    </div>
                                                    <div
                                                        className={styles.clear}
                                                        onClick={() => form.setFieldsValue({ status: [] })}>
                                                        Təmizlə
                                                    </div>
                                                </div>
                                            </Space>
                                        </>
                                    )}
                                    allowClear
                                    options={[
                                        { label: 'SMS', value: 0 },
                                        { label: 'Email', value: 1 },
                                        { label: 'Whatsapp', value: 2 }]}
                                />
                            </Form.Item>
                            <div >
                                <div className={styles.label}>Platformalar</div>
                                <TreeSelect
                                    className={styles.input}
                                    showSearch
                                    placeholder="Search..."
                                    treeIcon
                                    suffixIcon={search}
                                    treeData={treeData}
                                />
                            </div>
                        </div>
                    </Form>
                </div>
            </Modal >
        </>
    )
}

export default SendToManufacturerModal