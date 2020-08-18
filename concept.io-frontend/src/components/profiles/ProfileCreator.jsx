import React, { useState } from "react";
import { Checkbox, Classes, FormGroup, InputGroup, Intent } from "@blueprintjs/core";
import styles from "./styles/creator.module.css";
import req from "@utils/request";

function ProfileCreator({ onNameInput, onEmailInput, onPrivateInput, onPasswordInput }) {
    const [isPrivate, setIsPrivate] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [duplicateEmail, setDuplicateEmail] = useState(false);
    const handlePrivate = () => {
        setIsPrivate(!isPrivate);
        onPrivateInput(!isPrivate);
    };

    const handleNameInput = (e) => {
        onNameInput(e.target.value);
    };

    const verifyEmailInput = (e) => {
        let value = e.target.value;
        const emailRegExp = new RegExp(/^[a-z][a-z0-9_]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gm);
        if (emailRegExp.test(value)) {
            setInvalidEmail(false);
            setTimeout(() => {
                req.get("profile/emailCheck?_q=" + value).then((res) => {
                    console.log(res.duplicate);
                    if (res.duplicate) {
                        setDuplicateEmail(true);
                        onEmailInput(value, false, true);
                    } else {
                        setDuplicateEmail(false);
                        onEmailInput(value, false, false);
                    }
                });
            }, 500);
        } else {
            setInvalidEmail(true);
        }
    };

    const handlePasswordInput = (e) => {
        onPasswordInput(e.target.value);
    };

    return (
        <div className={styles.creator + " " + Classes.DIALOG_BODY}>
            <FormGroup label="Full Name" labelFor="fullname" labelInfo="(required)">
                <InputGroup id="fullname" placeholder="Enter your name..." onChange={handleNameInput} />
            </FormGroup>
            <FormGroup
                label="Email"
                labelFor="email"
                intent={invalidEmail || duplicateEmail ? Intent.DANGER : Intent.NONE}
                helperText={
                    (invalidEmail && "Please input an valid Email") || (duplicateEmail && "Email is already taken.")
                }
                labelInfo="(required)"
            >
                <InputGroup
                    id="email"
                    placeholder="Enter your email..."
                    intent={invalidEmail || duplicateEmail ? Intent.DANGER : Intent.NONE}
                    onChange={verifyEmailInput}
                />
            </FormGroup>
            <Checkbox checked={isPrivate} label="Private" onChange={handlePrivate} />
            {isPrivate && (
                <FormGroup label="Password" labelFor="passwd" labelInfo="(required)">
                    <InputGroup
                        id="passwd"
                        type="password"
                        placeholder="Enter your password..."
                        onChange={handlePasswordInput}
                    />
                </FormGroup>
            )}
        </div>
    );
}

export default ProfileCreator;
