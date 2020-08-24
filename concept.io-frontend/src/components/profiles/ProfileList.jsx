import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Button, Card, Divider, Elevation, FormGroup, InputGroup, Intent, Text,
} from '@blueprintjs/core';
import PropTypes from 'prop-types';
import { chooseProfile } from '../../store/actions';

function ProfileList({
  pending, profile, chooseProfileHandler, chooseProfileError,
}) {
  const [password, setPassword] = useState('');
  const [invalidInput, setInvalidInput] = useState(false);

  const handleInput = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmitPrivateProfile = (profileInput, passwordInput) => {
    if (profile.private && password !== '') {
      chooseProfileHandler(profileInput, passwordInput);
    } else {
      setInvalidInput(true);
    }
  };

  const handleSubmitOpenProfile = (profileInput) => {
    chooseProfileHandler(profileInput);
  };

  const { fullname, email } = profile;
  const privateProfile = profile.private;

  return (
    <Card interactive elevation={Elevation.TWO} style={{ margin: 10 }} key={profile.id}>
      <Text ellipsize>
        <strong>{fullname}</strong>
        {privateProfile && <span> (private)</span>}
      </Text>
      <Text ellipsize>{email}</Text>
      <Divider />
      {privateProfile && (
        <>
          <FormGroup
            intent={chooseProfileError || invalidInput ? Intent.DANGER : Intent.NONE}
            helperText={(chooseProfileError && 'Password not match') || (invalidInput && 'Please input password')}
          >
            <InputGroup
              intent={chooseProfileError || invalidInput ? Intent.DANGER : Intent.NONE}
              type="password"
              placeholder="Enter password..."
              onChange={handleInput}
            />
          </FormGroup>
          <Button onClick={() => handleSubmitPrivateProfile(profile, password)} loading={pending} text="Select" />
        </>
      )}
      {!profile.private && <Button loading={pending} text="Select" onClick={() => handleSubmitOpenProfile(profile)} />}
    </Card>
  );
}

const mapStateToProps = (state) => ({
  chooseProfileError: state.auth.chooseProfileError,
});

const mapDispatchToProps = (dispatch) => ({
  chooseProfileHandler: (profile, password) => dispatch(chooseProfile(profile, password)),
});

ProfileList.defaultProps = {
  chooseProfileHandler: PropTypes.func,
  chooseProfileError: PropTypes.objectOf(PropTypes.object),
  pending: PropTypes.bool,
  profile: PropTypes.objectOf(PropTypes.object),
};

ProfileList.propTypes = {
  chooseProfileHandler: PropTypes.func,
  chooseProfileError: PropTypes.objectOf(PropTypes.object),
  pending: PropTypes.bool,
  profile: PropTypes.objectOf(PropTypes.object),
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileList);
