import React, {useState} from "react";
import {connect} from "react-redux";
import {Button, Card, Divider, Elevation, FormGroup, InputGroup, Intent, Text} from "@blueprintjs/core";
import {chooseProfile} from "../../store/actions";

function ProfileList({pending, profile, chooseProfile, chooseProfileError}) {
    const [password, setPassword] = useState("");
    const [invalidInput, setInvalidInput] = useState(false);

    const handleInput = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmitPrivateProfile = (profile, password) => {
        if (profile.private && password !== "") {
            chooseProfile(profile, password);
        } else {
            setInvalidInput(true);
        }
    };

    const handleSubmitOpenProfile = (profile) => {
        chooseProfile(profile);
    }

    return (
        <Card interactive={true} elevation={Elevation.TWO} style={{margin: 10}} key={profile.id}>
            <Text ellipsize={true}>
                <strong>{profile.fullname}</strong>
                {profile.private && <span> (private)</span>}
            </Text>
            <Text ellipsize={true}>{profile.email}</Text>
            <Divider/>
            {profile.private && (
                <>
                    <FormGroup
                        intent={chooseProfileError || invalidInput ? Intent.DANGER : Intent.NONE}
                        helperText={chooseProfileError && "Password not match" || invalidInput && "Please input password"}
                    >
                        <InputGroup
                            intent={chooseProfileError || invalidInput ? Intent.DANGER : Intent.NONE}
                            type="password"
                            placeholder="Enter password..."
                            onChange={handleInput}
                        />
                    </FormGroup>
                    <Button onClick={() => handleSubmitPrivateProfile(profile, password)} loading={pending}
                            text="Select"/>
                </>
            )}
            {!profile.private &&
            <Button loading={pending} text="Select" onClick={() => handleSubmitOpenProfile(profile)}/>}
        </Card>
    );
}

const mapStateToProps = (state) => {
    return {
        chooseProfileError: state.auth.chooseProfileError,
    };
};

const mapDispatchToProps = (dispatch) => ({
    chooseProfile: (profile, password) => dispatch(chooseProfile(profile, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileList);
