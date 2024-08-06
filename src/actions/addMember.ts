"use server";

import { ExternalSecretProps } from "@/app/(external)/access/page";
import userApi from "@/services/api/modules/user-api";
import axios from "axios";

export const addMemberToSystem = async (secret: ExternalSecretProps) => {
    try {
        const { encryptedData, iv, secretKey } = secret;
        let serverURL = (process.env.NEXT_PUBLIC_SERVER_URL ?? '') + '/api/auth/secret-check';
        serverURL += `?encryptedData=${encryptedData}&iv=${iv}&secretKey=${secretKey}`;
        const result = await axios.get(serverURL)
        const { username, password, email } = result.data

        const registedUserInfo = {
            username,
            password,
            email,
        }

        const auth = await userApi.register(registedUserInfo)
        
        return auth
    } catch (err) {
        console.error(err)
    }
}

