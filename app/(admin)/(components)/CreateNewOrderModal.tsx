import React from 'react';
import styles from "@/styles/componentStyles/CreateNewOrderModal.module.scss"
import { DatePicker, Divider, Form, FormProps, Input, Modal, Select, Space } from 'antd';
import { cancel, datepicker_calendar, email, whatsapp } from '@/public/icons';
import { getCategories, getSubscribers, postOrder } from '@/app/(api)/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

export interface CreateNewOrderModalProps {
    setOpenCreateNewOrderModal: (open: boolean) => void;
    openCreateNewOrderModal: boolean;
    action: string;
}

const CreateNewOrderModal = ({ openCreateNewOrderModal, setOpenCreateNewOrderModal, action }: CreateNewOrderModalProps) => {
    const client = useQueryClient();
    const [form] = Form.useForm();

    const { data: categoryData } = useQuery(
        ["categoriesData"],
        async () => await getCategories(),
        {
            refetchOnWindowFocus: false,
        },
    );

    const { data: subscribersData } = useQuery(
        ["subscribersData"],
        async () => await getSubscribers(),
        {
            refetchOnWindowFocus: false,
        },
    );

    const createOrderMutation = useMutation(postOrder, {
        onSuccess: () => {
            client.invalidateQueries(["ordersData"]);
            setOpenCreateNewOrderModal(false);
            form.resetFields();
        },
        onError: (error) => {
            console.error("Error creating order:", error);
        },
    });

    const handleFormSubmit = (values: any) => {
        const formattedDate = dayjs(values.date).format('YYYY-MM-DD HH:mm:ss');
        const newData = {
            ...values,
            date: formattedDate,
            status: 0,
        };

        createOrderMutation.mutate(newData);
    };


    return (
        <Modal
            open={openCreateNewOrderModal}
            width={983}
            height={951}
            footer={false}
            centered
            closeIcon={cancel}
            onCancel={() => setOpenCreateNewOrderModal(false)}>
            <div className={styles.create_order_container}>
                <div className={styles.title}>
                    {action === "create" ? "Yeni sifariş yarat" : "Sifarişə düzəliş et"}
                </div>
                <div className={styles.description}>
                    {action === "new" ? "Yeni sifariş yaratmaq üçün məlumatları doldurun" : "Məlumatları redaktə edin"}
                </div>
                <Form
                    layout='vertical'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    // initialValues={{ remember: true }}
                    onFinish={handleFormSubmit}
                    autoComplete="off"
                    form={form}
                >
                    <div className={styles.form_container}>
                        <Form.Item<any>
                            label="Sifarişçinin adı"
                            name="buyer_name"
                            rules={[{ required: true, message: 'Zəhmət olmasa ad daxil edin' }]}
                        >
                            <Input className={styles.input} />
                        </Form.Item>
                        <Form.Item<any>
                            label="Platforma"
                            name="buyer_platform"
                            rules={[{ required: true, message: 'Zəhmət olmasa platformanı daxil edin' }]}
                        >
                            <Input className={styles.input} />
                        </Form.Item>
                        <Form.Item
                            label="Sifarişin verildiyi sahibkar"
                            name="subscriber_id"
                            rules={[{ required: true, message: 'Zəhmət olmasa sahibkar seçin' }]}>
                            <Select
                                className={styles.input}
                                placeholder="Seçin"
                                // onChange={onChange}
                                // dropdownRender={(menu) => (
                                //     <>
                                //         {menu}
                                //         <Divider style={{ margin: '8px 0' }} />
                                //         <Space style={{ padding: '0 8px 4px' }}>
                                //             <div className={styles.select_footer}>
                                //                 <div
                                //                     onClick={() => {
                                //                         const allValues = [{ label: 'Aqropark MMC', value: 1 }, { label: 'Aqropark MMC', value: 2 }]; // Update with all option values
                                //                         form.setFieldsValue({ entrepreneur: allValues }); // Programmatically set all options selected
                                //                     }}
                                //                     className={styles.select_all}>
                                //                     Hamısını seç
                                //                 </div>
                                //                 <div
                                //                     className={styles.clear}
                                //                     onClick={() => form.setFieldsValue({ seller_company: [] })}>
                                //                     Təmizlə
                                //                 </div>
                                //             </div>
                                //         </Space>
                                //     </>
                                // )}
                                // mode='multiple'
                                allowClear
                                options={subscribersData?.data?.map((item: any) => ({
                                    value: item?.id,
                                    label: item?.company,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item<any>
                            label="Sifariş olunan məhsulun adı"
                            name="product_name"
                            rules={[{ required: true, message: 'Zəhmət olmasa məhsul adı daxil edin' }]}
                        >
                            <Input className={styles.input} />
                        </Form.Item>
                        <Form.Item
                            name="category_id"
                            label="Sifarişin kateqoriyası"
                            rules={[{ required: true, message: 'Zəhmət olmasa sifariş kateqoriyasını seçin' }]}>
                            <Select
                                className={styles.input}
                                placeholder="Seçin"
                                // mode='multiple'
                                // onChange={onChange}
                                // filterSort={(optionA, optionB) =>
                                //     (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                // }
                                // dropdownRender={(menu) => (
                                //     <>
                                //         {menu}
                                //         <Divider style={{ margin: '8px 0' }} />
                                //         <Space style={{ padding: '0 8px 4px' }}>
                                //             <div className={styles.select_footer}>
                                //                 <div
                                //                     onClick={() => {
                                //                         const allValues = [{ label: 'b', value: 1 }, { label: 'a', value: 2 }];
                                //                         form.setFieldsValue({ orderCategory: allValues });
                                //                     }}
                                //                     className={styles.select_all}>
                                //                     Hamısını seç
                                //                 </div>
                                //                 <div
                                //                     className={styles.clear}
                                //                     onClick={() => form.setFieldsValue({ orderCategory: [] })}>
                                //                     Təmizlə
                                //                 </div>
                                //             </div>
                                //         </Space>
                                //     </>
                                // )}
                                allowClear
                                options={categoryData?.data?.data?.map((item: any) => ({
                                    value: item?.id,
                                    label: item?.name,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Sifarişin tarixi"
                            name="date"
                            rules={[{ required: true, message: 'Zəhmət olmasa sifariş tarixini seçin' }]}
                        >
                            <DatePicker
                                placeholder='Tarix seçin'
                                className={styles.input}
                                suffixIcon={datepicker_calendar}
                            />
                        </Form.Item>
                        <Form.Item<any>
                            label="Sifarişin miqdarı"
                            name="amount"
                            rules={[{ required: true, message: 'Zəhmət olmasa sifariş miqdarını daxil edin' }]}
                        >
                            <Input className={styles.input} />
                        </Form.Item>
                        <Form.Item<any>
                            label="Ölkə"
                            name="country"
                            rules={[{ required: true, message: 'Zəhmət olmasa ölkəni daxil edin' }]}
                        >
                            <Input className={styles.input} />
                        </Form.Item>
                    </div>
                    <div className={styles.contact_header}>
                        Sifarişçinin əlaqə vasitələri
                    </div>
                    <div className={styles.form_container}>
                        <Form.Item<any>
                            label="E-mail"
                            name="buyer_email"
                            rules={[{ required: true, message: 'Zəhmət olmasa e-mail daxil edin' }]}
                        >
                            <Input type='email' className={styles.input} suffix={email} />
                        </Form.Item>
                        <Form.Item<any>
                            label="Whatsapp nömrəsi"
                            name="whatsapp_number"
                            rules={[{ required: true, message: 'Zəhmət olmasa nömrə daxil edin' }]}
                        >
                            <Input type='whatsapp' className={styles.input} suffix={whatsapp} />
                        </Form.Item>
                    </div>
                    <div className={styles.form_buttons}>
                        <button type='button' className={styles.cancel_btn} onClick={() => setOpenCreateNewOrderModal(false)}>Ləğv et</button>
                        <button className={styles.save_btn} type='submit'>Yadda saxla</button>
                    </div>
                </Form>
            </div>
        </Modal>
    )
}

export default CreateNewOrderModal