import { createHmac, randomBytes } from "crypto";
import { axiosCrmClient } from ".";

function generateHash(input: string) {
    const salt = randomBytes(16).toString('hex'); // Generate a unique salt
    const hash = createHmac('sha256', salt)
        .update(input)
        .digest('hex'); // Create the hash

    return `$2y$10$${salt}${hash}`; // Combine salt and hash for your output format
}

const hash1 = generateHash('admin');


export const postLogin = async (data: any) => {
    try {
        const response = await axiosCrmClient.post("login", data, {
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json",
                "X-Auth-Token": hash1
            },
        });
        return response;
    } catch (err: any) {
        console.log(err);
    }
};

export const getOrders = async () => {
    try {
        const response = await axiosCrmClient.get("orders");
        return response?.data;
    } catch (err: any) {
        console.log(err);
    }
};

export const getOrderById = async (id: number) => {
    try {
        const response = await axiosCrmClient.get(`orders/${id}`);
        return response?.data;
    } catch (err: any) {
        console.log(err);
    }
};


export const postOrder = async (data: any) => {
    try {
        const response = await axiosCrmClient.post("orders", data);
        return response;
    } catch (err: any) {
        console.log(err);
    }
};

export const deleteOrder = async (id: any) => {
    try {
        const response = await axiosCrmClient.delete(`orders/${id}`);
        return response;
    } catch (err: any) {
        console.log(err);
        throw new Error(err);
    }
};


export const getCategories = async () => {
    try {
        const response = await axiosCrmClient.get("categories");
        return response?.data;
    } catch (err: any) {
        console.log(err);
    }
};

export const getSubscribers = async () => {
    try {
        const response = await axiosCrmClient.get("subscribers");
        return response?.data;
    } catch (err: any) {
        console.log(err);
    }
};
