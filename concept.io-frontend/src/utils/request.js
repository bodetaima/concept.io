import { API_URL } from "@constants";
import Cookies from "../utils/cookies";

const _csrf = Cookies.getCookie("XSRF-TOKEN");

function f(path, options) {
    const _e = API_URL;
    return new Promise((resolve, reject) => {
        fetch(`${_e}${path}`, options)
            .then((res) => {
                if (res.status !== 200) {
                    throw new Error(res.statusText);
                }
                return resolve(res.json());
            })
            .catch((e) => reject(e));
    });
}

export default {
    get(path) {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        };
        return f(path, options);
    },
    post(path, data) {
        console.log(_csrf)
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "CSRF-Token": _csrf,
            },
            credentials: "include",
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        return f(path, options);
    },
};
