"use server";

import { ExternalSecretProps } from "@/app/(external)/access/page";
import userApi from "@/services/api/modules/user-api";
import axios from "axios";

interface ExternalUser {
    username: string;
    password: string;
    expiredDate: string;
}

export const addMemberToSystem = async (secret: ExternalSecretProps): Promise<ExternalUser | undefined> => {
    try {
        let serverURL = (process.env.NEXT_PUBLIC_SERVER_URL ?? '') + '/api/auth/secret-check';
        const { encryptedData, iv, secretKey } = secret
        const result = await axios.get(`${serverURL}?encryptedData=${encryptedData}&iv=${iv}&secretKey=${secretKey}`)
        const { username, password, expiredDate } = result.data
        
        return {
            username,
            password,
            expiredDate
        }
    } catch (err) {
        console.log('err: ', err)
    }
}

