import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Button, Card, Classes, Dialog, Intent, Spinner, Text,
} from '@blueprintjs/core';
import PropTypes from 'prop-types';
import {
  createProfile, getProfiles, handleCloseProfileCreator, handleOpenProfileCreator,
} from '../../store/actions';
import ProfileList from '../../components/profiles/ProfileList';
import ProfileCreator from '../../components/profiles/ProfileCreator';
import styles from './styles/profile-selector.module.css';

function ProfileSelector({
  fetchProfiles,
  createNewProfile,
  createProfilePending,
  profiles,
  getProfilesError,
  chooseProfilePending,
  getProfilesPending,
  handleOpenCreator,
  handleCloseCreator,
  profileCreatorState,
}) {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [duplicateEmail, setDuplicateEmail] = useState(false);
  const [isPrivate, setIsPrivate] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetchProfiles();
  }, []);

  const isEmpty = (o) => {
    const keys = Object.keys(o);
    const values = Object.values(o);
    for (let i = 0; i <= keys.length; i += 1) {
      if (Object.prototype.hasOwnProperty.call(values, i)) {
        return false;
      }
    }
    return true;
  };

  const handleNameInput = (newFullname) => {
    setFullname(newFullname);
  };

  const handleEmailInput = (newEmail, isInvalidEmail, isDuplicateEmail) => {
    setEmail(newEmail);
    setInvalidEmail(isInvalidEmail);
    setDuplicateEmail(isDuplicateEmail);
  };

  const handlePrivateInput = (privateState) => {
    setIsPrivate(privateState);
  };

  const handlePasswordInput = (newPassword) => {
    setPassword(newPassword);
  };

  const handleOpen = () => handleOpenCreator();
  const handleClose = () => handleCloseCreator();

  const handleCreateProfile = async () => {
    if (fullname !== '' && email !== '' && !invalidEmail && !duplicateEmail) {
      const profile = {
        fullname,
        email,
      };

      if (isPrivate && password !== '') {
        profile.private = true;
        profile.password = password;
      } else {
        profile.private = false;
      }

      await createNewProfile(profile);
      setFullname('');
      setEmail('');
      setIsPrivate(false);
      setPassword('');
    }
  };

  const profileCards = profiles.map((profile) => (
    <ProfileList key={profile.id} pending={chooseProfilePending} profile={profile} />
  ));

  return (
    <>
      <div className={styles.card}>
        {getProfilesPending ? (
          <Spinner />
        ) : (
          <Card>
            {getProfilesError && (
              <Text>
                <span style={{ color: 'red' }}>Error fetching data!</span>
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
                  minimal
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

const mapStateToProps = (state) => ({
  getProfilesPending: state.auth.getProfilesPending,
  chooseProfilePending: state.auth.chooseProfilePending,
  createProfilePending: state.auth.createProfilePending,
  getProfilesError: state.auth.getProfilesError,
  profiles: state.auth.profiles,
  profileCreatorState: state.app.profileCreatorState,
});
const mapDispatchToProps = (dispatch) => ({
  fetchProfiles: () => dispatch(getProfiles()),
  createNewProfile: (profile) => dispatch(createProfile(profile)),
  handleOpenCreator: () => dispatch(handleOpenProfileCreator()),
  handleCloseCreator: () => dispatch(handleCloseProfileCreator()),
});

ProfileSelector.defaultProps = {
  fetchProfiles: PropTypes.func,
  createNewProfile: PropTypes.func,
  createProfilePending: PropTypes.bool,
  profiles: PropTypes.objectOf(PropTypes.object),
  getProfilesError: PropTypes.objectOf(PropTypes.object),
  chooseProfilePending: PropTypes.bool,
  getProfilesPending: PropTypes.bool,
  handleOpenCreator: PropTypes.func,
  handleCloseCreator: PropTypes.func,
  profileCreatorState: PropTypes.bool,
};

ProfileSelector.propTypes = {
  fetchProfiles: PropTypes.func,
  createNewProfile: PropTypes.func,
  createProfilePending: PropTypes.bool,
  profiles: PropTypes.objectOf(PropTypes.object),
  getProfilesError: PropTypes.objectOf(PropTypes.object),
  chooseProfilePending: PropTypes.bool,
  getProfilesPending: PropTypes.bool,
  handleOpenCreator: PropTypes.func,
  handleCloseCreator: PropTypes.func,
  profileCreatorState: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSelector);
