import React, { useEffect, useRef } from 'react';
import styles from "@/styles/componentStyles/OrdersPageContainer.module.scss"
import { cancel, datepicker_calendar } from '@/public/icons';
import { DatePicker, Divider, Form, FormProps, Select, Space } from 'antd';
import { FieldNamesType } from 'antd/es/cascader';

const Filters = ({ setOpen }: any) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [form] = Form.useForm();
    const onFinish: FormProps<FieldNamesType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setOpen(false); // Close the modal
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setOpen]);

    return (
        <div ref={modalRef} className={styles.filters_container}>
            <div className={styles.header}>
                <div>Filter</div>
                <div style={{ cursor: 'pointer', marginRight: '5px' }} onClick={() => setOpen(false)}>{cancel}</div>
            </div>
            <div className={styles.filters}>
                <Form
                    layout='vertical'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    // initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                >
                    <div className={styles.filter_header} style={{ marginTop: '11px' }}>
                        <div className={styles.filter_name}>Tarix </div>
                        <div className={styles.clear_filter} onClick={() => form.setFieldsValue({ startDate: '' })}>Ləğv et</div>
                    </div>
                    <Form.Item
                        label=""
                        name="startDate"
                        rules={[{ required: true, message: 'Zəhmət olmasa sifariş tarixini seçin' }]}
                    >
                        <DatePicker
                            className={styles.filter_input}
                            placeholder='Tarix seçin'
                            suffixIcon={datepicker_calendar}
                        />
                    </Form.Item>
                    <div className={styles.filter_header}>
                        <div className={styles.filter_name}>Şirkət</div>
                        <div className={styles.clear_filter} onClick={() => form.setFieldsValue({ company: [] })}>Ləğv et</div>
                    </div>
                    <Form.Item
                        name="company"
                        label=""
                        rules={[{ required: true, message: 'Zəhmət olmasa şirkəti seçin' }]}>
                        <Select
                            className={styles.filter_input}
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
                                                    form.setFieldsValue({ company: allValues });
                                                }}
                                                className={styles.select_all}>
                                                Hamısını seç
                                            </div>
                                            <div
                                                className={styles.clear}
                                                onClick={() => form.setFieldsValue({ company: [] })}>
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
                    <div className={styles.filter_header}>
                        <div className={styles.filter_name}>Məhsul</div>
                        <div className={styles.clear_filter} onClick={() => form.setFieldsValue({ product: [] })}>Ləğv et</div>
                    </div>
                    <Form.Item
                        name="product"
                        label=""
                        rules={[{ required: true, message: 'Zəhmət olmasa məhsulu seçin' }]}>
                        <Select
                            className={styles.filter_input}
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
                                                    form.setFieldsValue({ product: allValues });
                                                }}
                                                className={styles.select_all}>
                                                Hamısını seç
                                            </div>
                                            <div
                                                className={styles.clear}
                                                onClick={() => form.setFieldsValue({ product: [] })}>
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
                    <div className={styles.filter_header}>
                        <div className={styles.filter_name}>Məhsul çeşidi</div>
                        <div className={styles.clear_filter} onClick={() => form.setFieldsValue({ productCategory: [] })}>Ləğv et</div>
                    </div>
                    <Form.Item
                        name="productCategory"
                        label=""
                        rules={[{ required: true, message: 'Zəhmət olmasa məhsul kateqoriyasını seçin' }]}>
                        <Select
                            className={styles.filter_input}
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
                                                    form.setFieldsValue({ productCategory: allValues });
                                                }}
                                                className={styles.select_all}>
                                                Hamısını seç
                                            </div>
                                            <div
                                                className={styles.clear}
                                                onClick={() => form.setFieldsValue({ productCategory: [] })}>
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
                    <div className={styles.filter_header}>
                        <div className={styles.filter_name}>Ölkə</div>
                        <div className={styles.clear_filter} onClick={() => form.setFieldsValue({ country: [] })}>Ləğv et</div>
                    </div>
                    <Form.Item
                        name="country"
                        label=""
                        rules={[{ required: true, message: 'Zəhmət olmasa ölkəni seçin' }]}>
                        <Select
                            className={styles.filter_input}
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
                                                    form.setFieldsValue({ country: allValues });
                                                }}
                                                className={styles.select_all}>
                                                Hamısını seç
                                            </div>
                                            <div
                                                className={styles.clear}
                                                onClick={() => form.setFieldsValue({ country: [] })}>
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
                    <div className={styles.filter_header}>
                        <div className={styles.filter_name}>Status</div>
                        <div className={styles.clear_filter} onClick={() => form.setFieldsValue({ status: [] })}>Ləğv et</div>
                    </div>
                    <Form.Item
                        name="status"
                        label=""
                        rules={[{ required: true, message: 'Zəhmət olmasa ölkəni seçin' }]}>
                        <Select
                            className={styles.filter_input}
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
                                                    form.setFieldsValue({ status: allValues });
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
                            options={[{ label: 'b', value: 1 }, { label: 'a', value: 2 }]}
                        />
                    </Form.Item>
                    <div className={styles.filter_header}>
                        <div className={styles.filter_name}>Miqdar</div>
                        <div className={styles.clear_filter} onClick={() => form.setFieldsValue({ amount: [] })}>Ləğv et</div>
                    </div>
                    <Form.Item
                        name="amount"
                        label=""
                        rules={[{ required: true, message: 'Zəhmət olmasa miqdarı seçin' }]}>
                        <Select
                            className={styles.filter_input}
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
                                                    form.setFieldsValue({ amount: allValues });
                                                }}
                                                className={styles.select_all}>
                                                Hamısını seç
                                            </div>
                                            <div
                                                className={styles.clear}
                                                onClick={() => form.setFieldsValue({ amount: [] })}>
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
                    <div className={styles.buttons_container}>
                        <div
                            className={styles.clear_btn}
                            onClick={() => form.setFieldsValue({
                                startDate: '',
                                company: [],
                                product: [],
                                productCategory: [],
                                country: [],
                                status: [],
                                amount: [],
                            })}>
                            Təmizlə
                        </div>
                        <button type='submit' className={styles.apply_btn}>Tətbiq et</button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Filters