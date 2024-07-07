const { default: API_axiosInstance } = require("@/external/axios/api_axios_instance");



export async function addOrganization(values, successCB, errorCB) {

    try {

        const form = new FormData();

        console.log(values);
        for (const [key, value] of Object.entries(values)) {
            form.append(key, value);
        }
        console.log(form.getAll());

        let addOrganization = await API_axiosInstance.post("/auth/organization/sign_up", form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        let response = addOrganization.data;
        console.log(response);
        if (response.status) {
            successCB()
        } else {
            errorCB(response.msg ?? "Something went wrong")
        }
    } catch (e) {
        console.log(e);
        errorCB("Something went wrong")
    }
}