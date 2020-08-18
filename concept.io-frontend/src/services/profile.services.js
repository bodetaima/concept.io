import req from "../utils/request";

class ProfileService {
    getProfiles() {
        return req.get("profiles");
    }

    createProfile(profile) {
        return req.post("profile/create", profile);
    }

    chooseProfile(profile, password = "") {
        if (password !== "") {
            profile.password = password;
        }
        return req.post("profile/choose", profile);
    }

    logout() {
        return req.post("profile/logout");
    }
}

export default new ProfileService();
