import React, { useEffect, useRef } from 'react';
import styles from "@/styles/componentStyles/OrdersPageContainer.module.scss"
import { cancel, datepicker_calendar } from '@/public/icons';
import { DatePicker, Divider, Form, FormProps, Select, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '@/app/(store)/(slices)/filterSlice';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/app/(api)/api';

interface OptionType {
    label: string;
    value: number;
}

const Filters = ({ open, setOpen }: any) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const orders = useSelector(
        (store: { orders: any }) => store.orders
    );

    const onFinish: FormProps<any>['onFinish'] = (values) => {
        const mapValuesToLabels = (valuesArray: number[], options: OptionType[]) => {
            return valuesArray.map((value) => options.find((option) => option.value === value)?.label).filter(Boolean);
        };
        const result = {
            date: values.date !== undefined ? values.date : '',
            category: values.category !== undefined ? values.category : '',
            platform: mapValuesToLabels(values.platform || [], buyerPlatformOptions),
            country: mapValuesToLabels(values.country || [], countryOptions),
            product: mapValuesToLabels(values.product || [], productNameOptions),
            status: values.status !== undefined ? values.status : '',
        };
        console.log(result)
        dispatch(setFilters(result))
    };

    const { data: categoryData } = useQuery(
        ["categoriesData"],
        async () => await getCategories(),
        {
            refetchOnWindowFocus: false,
        },
    );

    const buyerPlatformOptions: OptionType[] = orders
        ? [...new Set(orders?.map((order: any) => order.buyer_platform).filter(Boolean))].map((platform, index) => ({
            label: String(platform),
            value: index,
        }))
        : [];

    const countryOptions: OptionType[] = orders
        ? [...new Set(orders?.map((order: any) => order.country).filter(Boolean))].map((country, index) => ({
            label: String(country),
            value: index,
        }))
        : [];

    const productNameOptions: OptionType[] = orders
        ? [...new Set(orders?.map((order: any) => order.product_name).filter(Boolean))].map((product, index) => ({
            label: String(product),
            value: index,
        }))
        : [];

    // useEffect(() => {
    //     const handleClickOutside = (event: MouseEvent) => {
    //         if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
    //             setOpen(false); // Close the modal
    //         }
    //     };

    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, [setOpen]);

    // useEffect(() => {
    //         form.setFieldsValue({
    //             date: '',
    //             platform: [],
    //             product: [],
    //             category: [],
    //             country: [],
    //             status: [],
    //         })
    //         dispatch(setFilters({ category: "", country: "", platform: "", date: null, product: "", status: "" }))
    // }, [])

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
                    <div style={{ display: 'flex', gap: '28px' }}>
                        <div>
                            <div className={styles.filter_header} style={{ marginTop: '11px' }}>
                                <div className={styles.filter_name}>Tarix </div>
                                <div className={styles.clear_filter} onClick={() => form.setFieldsValue({ date: '' })}>Ləğv et</div>
                            </div>
                            <Form.Item
                                label=""
                                name="date"
                            // rules={[{ required: true, message: 'Zəhmət olmasa sifariş tarixini seçin' }]}
                            >
                                <DatePicker
                                    className={styles.filter_input}
                                    placeholder='Tarix seçin'
                                    suffixIcon={datepicker_calendar}
                                />
                            </Form.Item>
                        </div>
                        <div>
                            <div className={styles.filter_header}>
                                <div className={styles.filter_name}>Sifarişin çeşidi </div>
                                <div className={styles.clear_filter} onClick={() => form.setFieldsValue({ category: [] })}>Ləğv et</div>
                            </div>
                            <Form.Item
                                name="category"
                                label=""
                            // rules={[{ required: true, message: 'Zəhmət olmasa sifarişin kateqoriyasını seçin' }]}
                            >
                                <Select
                                    className={styles.filter_input}
                                    placeholder="Seçin"
                                    mode='multiple'
                                    // onChange={onChange}
                                    filterSort={(optionA, optionB) => {
                                        return (optionA?.label?.toString() ?? '').toLowerCase().localeCompare((optionB?.label?.toString() ?? '').toLowerCase())
                                    }
                                    }
                                    dropdownRender={(menu) => (
                                        <>
                                            {menu}
                                            <Divider style={{ margin: '8px 0' }} />
                                            <Space style={{ padding: '0 8px 4px' }}>
                                                <div className={styles.select_footer}>
                                                    <div
                                                        onClick={() => {
                                                            const allValues = categoryData?.data?.data?.map((option: any) => option.id);
                                                            form.setFieldsValue({ category: allValues });
                                                        }}
                                                        className={styles.select_all}>
                                                        Hamısını seç
                                                    </div>
                                                    <div
                                                        className={styles.clear}
                                                        onClick={() => form.setFieldsValue({ category: [] })}>
                                                        Təmizlə
                                                    </div>
                                                </div>
                                            </Space>
                                        </>
                                    )}
                                    allowClear
                                    options={categoryData?.data?.data?.map((item: any) => ({
                                        value: item?.id,
                                        label: item?.name,
                                    }))}
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '28px' }}>
                        <div>
                            <div className={styles.filter_header}>
                                <div className={styles.filter_name}>Platforma</div>
                                <div className={styles.clear_filter} onClick={() => form.setFieldsValue({ platform: [] })}>Ləğv et</div>
                            </div>
                            <Form.Item
                                name="platform"
                                label=""
                            // rules={[{ required: true, message: 'Zəhmət olmasa platformanı seçin' }]}
                            >
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
                                                            const allValues = buyerPlatformOptions;
                                                            form.setFieldsValue({ platform: allValues });
                                                        }}
                                                        className={styles.select_all}>
                                                        Hamısını seç
                                                    </div>
                                                    <div
                                                        className={styles.clear}
                                                        onClick={() => form.setFieldsValue({ platform: [] })}>
                                                        Təmizlə
                                                    </div>
                                                </div>
                                            </Space>
                                        </>
                                    )}
                                    allowClear
                                    options={buyerPlatformOptions}
                                />
                            </Form.Item>
                        </div>
                        <div>  <div className={styles.filter_header}>
                            <div className={styles.filter_name}>Ölkə</div>
                            <div className={styles.clear_filter} onClick={() => form.setFieldsValue({ country: [] })}>Ləğv et</div>
                        </div>
                            <Form.Item
                                name="country"
                                label=""
                            // rules={[{ required: true, message: 'Zəhmət olmasa ölkəni seçin' }]}
                            >
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
                                                            const allValues = countryOptions;
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
                                    options={countryOptions}
                                />
                            </Form.Item></div>
                    </div>
                    <div style={{ display: 'flex', gap: '28px' }}>
                        <div>
                            <div className={styles.filter_header}>
                                <div className={styles.filter_name}>Məhsul</div>
                                <div className={styles.clear_filter} onClick={() => form.setFieldsValue({ product: [] })}>Ləğv et</div>
                            </div>
                            <Form.Item
                                name="product"
                                label=""
                            // rules={[{ required: true, message: 'Zəhmət olmasa məhsulu seçin' }]}
                            >
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
                                                            const allValues = productNameOptions;
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
                                    options={productNameOptions}
                                />
                            </Form.Item>
                        </div>
                        <div>
                            <div className={styles.filter_header}>
                                <div className={styles.filter_name}>Status</div>
                                <div className={styles.clear_filter} onClick={() => form.setFieldsValue({ status: [] })}>Ləğv et</div>
                            </div>
                            <Form.Item
                                name="status"
                                label=""
                            // rules={[{ required: true, message: 'Zəhmət olmasa status seçin' }]}
                            >
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

                                                            form.setFieldsValue({ status: [0, 1] });
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
                                    options={[{ label: 'Gözlənilir', value: 0 },
                                    { label: 'Göndərildi', value: 1 }]}
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className={styles.buttons_container}>
                        <div
                            className={styles.clear_btn}
                            onClick={() => form.setFieldsValue({
                                date: '',
                                platform: [],
                                product: [],
                                category: [],
                                country: [],
                                status: [],
                            })}>
                            Təmizlə
                        </div>
                        <button type='submit' className={styles.apply_btn}
                            onClick={() => setOpen(false)}
                        >Tətbiq et</button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Filters