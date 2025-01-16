"use client";
import { useState } from "react";
import { Form, FormProps, Input, Spin } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import styles from "@/styles/componentStyles/LoginPage.module.scss";
import { postLogin } from "@/app/(api)/api";
import { FieldNamesType } from "antd/es/cascader";

const LoginPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onFinish: FormProps<FieldNamesType>['onFinish'] = async (values) => {
        const formData = JSON.stringify(values);
        try {
            setIsLoading(true);
            const res = await postLogin(formData);
            if (res?.data?.token) {
                Cookies.set("azexport_token", res?.data?.token, { expires: 0.5 });
                router.push("/home")
            }

        } catch (error: any) {
            setIsLoading(false);
            console.log(error);
        }
    };

    return (
        <>
            <div className={styles.login_page}>
                <div className={styles.login_container}>
                    <Form
                        layout='vertical'
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        // initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <div className={styles.login_box}>
                            <div className={styles.title}>Daxil ol</div>
                            <div className={styles.login_inputs_group}>

                                <Form.Item<any>
                                    label="Sifarişçinin adı"
                                    name="email"
                                    rules={[{ required: true, message: 'Zəhmət olmasa email daxil edin' }]}
                                >
                                    <Input type="email" className={styles.input} />
                                </Form.Item>
                                <Form.Item<any>
                                    label="Parol"
                                    name="password"
                                    rules={[{ required: true, message: 'Zəhmət olmasa parol daxil edin' }]}
                                >
                                    <Input.Password className={styles.input} />
                                </Form.Item>
                            </div>
                            <button className={styles.login_btn} type="submit">
                                <div className={styles.loader}>
                                    {isLoading ?
                                        <Spin size="small" />
                                        :
                                        "Daxil ol"}
                                </div>
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
