import privateClient from "../client/private.client.js"
import publicClient from "../client/public.client.js"

const userEndpoint ={
    signin: "user/signin",
    signup: "user/signup",
    getInfo: "user/info",
    passwordUpdate: "user/password-update"
}

const userApi = {
    signin: async ({ userName, password }) => {
        try {
            const response = await publicClient.post(userEndpoint.signin, 
                {userName, password});
                return {response}
        } catch (error) {
            return {error}
        }
    },
    signup: async ({ userName, password, confirmPassword, displayName }) => {
        try {
            const response = await publicClient.post(userEndpoint.signup,
                { userName, password, confirmPassword, displayName });

                return {response}
        } catch (error) {
            return {error}
        }
    },
    getInfo: async () => {
        try {
            const response = await privateClient.get(userEndpoint.getInfo);

                return {response}
        } catch (error) {
            return {error}
        }
    },
    passwordUpdate: async ({ password, newPassword, confirmPassword }) => {
        try {
            const response = await publicClient.put(
                userEndpoint.passwordUpdate,
                { password, newPassword, confirmPassword,  }
            );

                return {response}
        } catch (error) {
            return {error}
        }
    }
    
}

export default userApi;