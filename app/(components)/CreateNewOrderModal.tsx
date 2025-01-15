import React from 'react';
import styles from "@/styles/componentStyles/CreateNewOrderModal.module.scss"
import { DatePicker, Divider, Form, FormProps, Input, Modal, Select, Space } from 'antd';
import { FieldNamesType } from 'antd/es/cascader';
import { datepicker_calendar, email, whatsapp } from '@/public/icons';

export interface CreateNewOrderModalProps {
    setOpenCreateNewOrderModal: (open: boolean) => void;
    openCreateNewOrderModal: boolean;
    action: string;
}



const CreateNewOrderModal = ({ openCreateNewOrderModal, setOpenCreateNewOrderModal, action }: CreateNewOrderModalProps) => {

    const [form] = Form.useForm();
    const onFinish: FormProps<FieldNamesType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };
    return (
        <Modal
            open={openCreateNewOrderModal}
            width={983}
            height={951}
            closable={false}
            footer={false}
            centered
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
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                >
                    <div className={styles.form_container}>
                        <Form.Item<any>
                            label="Sifarişçinin adı"
                            name="name"
                            rules={[{ required: true, message: 'Zəhmət olmasa ad daxil edin' }]}
                        >
                            <Input className={styles.input} />
                        </Form.Item>
                        <Form.Item<any>
                            label="Platforma"
                            name="platform"
                            rules={[{ required: true, message: 'Zəhmət olmasa platformanı daxil edin' }]}
                        >
                            <Input className={styles.input} />
                        </Form.Item>
                        <Form.Item
                            name="entrepreneur"
                            label="Sifarişin verildiyi sahibkar"
                            rules={[{ required: true, message: 'Zəhmət olmasa sahibkar seçin' }]}>
                            <Select
                                className={styles.input}
                                placeholder="Seçin"
                                // onChange={onChange}
                                dropdownRender={(menu) => (
                                    <>
                                        {menu}
                                        <Divider style={{ margin: '8px 0' }} />
                                        <Space style={{ padding: '0 8px 4px' }}>
                                            <div className={styles.select_footer}>
                                                <div
                                                    onClick={() => {
                                                        const allValues = [{ label: 'Aqropark MMC', value: 1 }, { label: 'Aqropark MMC', value: 2 }]; // Update with all option values
                                                        form.setFieldsValue({ entrepreneur: allValues }); // Programmatically set all options selected
                                                    }}
                                                    className={styles.select_all}>
                                                    Hamısını seç
                                                </div>
                                                <div
                                                    className={styles.clear}
                                                    onClick={() => form.setFieldsValue({ entrepreneur: [] })}>
                                                    Təmizlə
                                                </div>
                                            </div>
                                        </Space>
                                    </>
                                )}
                                mode='multiple'
                                allowClear
                                options={[{ label: 'Aqropark MMC', value: 1 }, { label: 'Aqropark MMC', value: 2 }]}
                            />
                        </Form.Item>
                        <Form.Item<any>
                            label="Sifariş olunan məhsulun adı"
                            name="productName"
                            rules={[{ required: true, message: 'Zəhmət olmasa məhsul adı daxil edin' }]}
                        >
                            <Input className={styles.input} />
                        </Form.Item>
                        <Form.Item
                            name="orderCategory"
                            label="Sifarişin kateqoriyası"
                            rules={[{ required: true, message: 'Zəhmət olmasa sifariş kateqoriyasını seçin' }]}>
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
                                                        const allValues = [{ label: 'b', value: 1 }, { label: 'a', value: 2 }];
                                                        form.setFieldsValue({ orderCategory: allValues });
                                                    }}
                                                    className={styles.select_all}>
                                                    Hamısını seç
                                                </div>
                                                <div
                                                    className={styles.clear}
                                                    onClick={() => form.setFieldsValue({ orderCategory: [] })}>
                                                    Təmizlə
                                                </div>
                                            </div>
                                        </Space>
                                    </>
                                )}
                                allowClear
                                options={[{ label: 'b', value: 1 }, { label: 'a', value: 2 }]}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Sifarişin tarixi"
                            name="orderDate"
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
                            name="orderAmount"
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
                            name="email"
                            rules={[{ required: true, message: 'Zəhmət olmasa e-mail daxil edin' }]}
                        >
                            <Input type='email' className={styles.input} suffix={email} />
                        </Form.Item>
                        <Form.Item<any>
                            label="Whatsapp nömrəsi"
                            name="whatsapp"
                            rules={[{ required: true, message: 'Zəhmət olmasa nömrə daxil edin' }]}
                        >
                            <Input type='whatsapp' className={styles.input} suffix={whatsapp} />
                        </Form.Item>
                    </div>
                    <div className={styles.form_buttons}>
                        <button className={styles.cancel_btn}>Ləğv et</button>
                        <button className={styles.save_btn} type='submit'>Yadda saxla</button>
                    </div>
                </Form>
            </div>
        </Modal>
    )
}

export default CreateNewOrderModal