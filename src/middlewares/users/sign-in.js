import {
  setAlertMessage,
  setUserData,
  buttonActivitySwitch,
} from '../../redux/actions/creators/sign-in-data';
import postRequest from '../../helpers/fetch-utils/post-response';
import getRequest from '../../helpers/fetch-utils/getWithToken-response';
import { getCookie } from '../../helpers/cookies-utils';
import { putSettings } from '../usersSettings/settings';
import { putProgress } from '../usersStatistic/statistics';

import serverSynchronization from '../serverSynchronization';
import API_URLS from '../../constants/APIUrls';
import { USER_ID, TOKEN } from '../../constants/cookiesNames';

const isFirsInit = async () => {
  const url = API_URLS.USER_SETTINGS(getCookie(USER_ID));
  const rawResponseSetiings = await getRequest(url, getCookie(TOKEN));

  return !rawResponseSetiings.ok;
};

export default (login, password) => {
  return async (dispatch) => {
    try {
      dispatch(buttonActivitySwitch());
      const url = API_URLS.SIGN_IN;
      const body = JSON.stringify({ email: login, password });
      const rawResponse = await postRequest(url, body);
      const { token, userId } = await rawResponse.json();

      dispatch(setUserData({ token, userId }));
      if (await isFirsInit()) {
        dispatch((disp) => disp(putSettings()));
        dispatch(putProgress);
      }
      dispatch(serverSynchronization);
      dispatch(buttonActivitySwitch());
    } catch (error) {
      dispatch(setAlertMessage('invalid data entered'));
      dispatch(buttonActivitySwitch());
    }
  };
};
