import React, {useEffect, useState} from "react";
import {createProfile, getProfiles, handleCloseProfileCreator, handleOpenProfileCreator} from "@store/actions";
import {connect} from "react-redux";
import {Button, Card, Classes, Dialog, Intent, Spinner, Text} from "@blueprintjs/core";
import ProfileList from "@components/profiles/ProfileList";
import ProfileCreator from "@components/profiles/ProfileCreator";
import styles from "./styles/profile-selector.module.css";

function ProfileSelector({
                             getProfiles,
                             createProfile,
                             createProfilePending,
                             profiles,
                             getProfilesError,
                             chooseProfilePending,
                             getProfilesPending,
                             handleOpenProfileCreator,
                             handleCloseProfileCreator,
                             profileCreatorState,
                         }) {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [duplicateEmail, setDuplicateEmail] = useState(false);
    const [isPrivate, setIsPrivate] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        getProfiles();
    }, []);

    const isEmpty = (o) => {
        for (let key in o) {
            if (Object.prototype.hasOwnProperty.call(o, key)) {
                return false;
            }
        }
        return true;
    };

    const handleNameInput = (fullname) => {
        setFullname(fullname);
    };

    const handleEmailInput = (email, invalidEmail, duplicateEmail) => {
        setEmail(email);
        setInvalidEmail(invalidEmail);
        setDuplicateEmail(duplicateEmail);
    };

    const handlePrivateInput = (isPrivate) => {
        setIsPrivate(isPrivate);
    };

    const handlePasswordInput = (password) => {
        setPassword(password);
    };

    const handleOpen = () => handleOpenProfileCreator();
    const handleClose = () => handleCloseProfileCreator();

    const handleCreateProfile = async () => {
        if (fullname !== "" && email !== "" && !invalidEmail && !duplicateEmail) {
            const profile = {
                fullname: fullname,
                email: email,
            };

            if (isPrivate && password !== "") {
                profile.private = true;
                profile.password = password;
            } else {
                profile.private = false;
            }

            await createProfile(profile);
            setFullname("");
            setEmail("");
            setIsPrivate(false);
            setPassword("");
        }
    };

    const profileCards = profiles.map((profile) => (
        <ProfileList key={profile.id} pending={chooseProfilePending} profile={profile}/>
    ));

    return (
        <>
            <div className={styles.card}>
                {getProfilesPending ? (
                    <Spinner/>
                ) : (
                    <Card>
                        {getProfilesError && (
                            <Text>
                                <span style={{color: "red"}}>Error fetching data!</span>
                            </Text>
                        )}
                        {!isEmpty(profiles) ? <div className={styles.innerCard}>{profileCards}</div> : null}
                        {!getProfilesError && (
                            <>
                                <Button
                                    loading={createProfilePending}
                                    icon="add"
                                    text="Create new profile"
                                    large
                                    minimal={true}
                                    onClick={handleOpen}
                                />
                                <Dialog onClose={handleClose} title="Create new profile" isOpen={profileCreatorState}>
                                    <ProfileCreator
                                        onNameInput={handleNameInput}
                                        onEmailInput={handleEmailInput}
                                        onPrivateInput={handlePrivateInput}
                                        onPasswordInput={handlePasswordInput}
                                    />
                                    <div className={Classes.DIALOG_FOOTER}>
                                        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                                            <Button intent={Intent.PRIMARY} onClick={handleCreateProfile}>
                                                Create
                                            </Button>
                                        </div>
                                    </div>
                                </Dialog>
                            </>
                        )}
                    </Card>
                )}
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        getProfilesPending: state.auth.getProfilesPending,
        chooseProfilePending: state.auth.chooseProfilePending,
        createProfilePending: state.auth.createProfilePending,
        getProfilesError: state.auth.getProfilesError,
        profiles: state.auth.profiles,
        profileCreatorState: state.app.profileCreatorState,
    };
};
const mapDispatchToProps = (dispatch) => ({
    getProfiles: () => dispatch(getProfiles()),
    createProfile: (profile) => dispatch(createProfile(profile)),
    handleOpenProfileCreator: () => dispatch(handleOpenProfileCreator()),
    handleCloseProfileCreator: () => dispatch(handleCloseProfileCreator()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSelector);
