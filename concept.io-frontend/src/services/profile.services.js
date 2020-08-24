import req from '../utils/request';

class ProfileService {
  getProfiles = () => req.get('profiles');

  createProfile = (profile) => req.post('profile/create', profile);

  chooseProfile = (profile, password = '') => {
    const profileClone = { ...profile };
    if (password !== '') {
      profileClone.password = password;
    }
    return req.post('profile/choose', profileClone);
  };

  logout = () => req.post('profile/logout');
}

export default new ProfileService();
