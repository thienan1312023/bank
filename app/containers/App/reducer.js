/*
 *
 * App reducer
 *
 */
import produce, { setAutoFreeze } from 'immer';
import {
  LOGGED_IN,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  ENQUEUE_SNACKBAR,
  CLOSE_SNACKBAR,
  REMOVE_SNACKBAR,
  TOGGLE_NAVIGATION_DESKTOP,
  TOGGLE_NAVIGATION_MOBILE,
  TOGGLE_MESSAGES,
  TOGGLE_NOTIFICATIONS,
  CHECK_NEW_MESSAGES,
  CHECK_NEW_MESSAGES_SUCCESS,
  CHECK_NEW_NOTIFICATIONS,
  CHECK_NEW_NOTIFICATIONS_SUCCESS,
} from './constants';

export const initialState = {
  isLogged: false,
  userId: '',
  token: '',
  messages: [],
  notifications: [],
  snackbars: [],
  error: '',
  isOpenNavigationMobile: false,
  isOpenNavigationDesktop: true,
  isOpenNotifications: false,
  isOpenMessages: false,
  isNewNotifications: false,
  isNewMessages: false,
};

setAutoFreeze(false);
/* eslint-disable default-case, no-param-reassign */
const appPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHECK_NEW_MESSAGES_SUCCESS:
        draft.isNewMessages = true;
        break;
      case CHECK_NEW_NOTIFICATIONS_SUCCESS:
        draft.isNewNotifications = true;
        break;
      case TOGGLE_NAVIGATION_DESKTOP:
        draft.isOpenNavigationDesktop = !draft.isOpenNavigationDesktop;
        break;
      case TOGGLE_NAVIGATION_MOBILE:
        draft.isOpenNavigationMobile = !draft.isOpenNavigationMobile;
        break;
      case TOGGLE_MESSAGES:
        draft.isOpenMessages = !draft.isOpenMessages;
        draft.isNewMessages = false;
        break;
      case TOGGLE_NOTIFICATIONS:
        draft.isOpenNotifications = !draft.isOpenNotifications;
        draft.isNewNotifications = false;
        break;
      case LOGGED_IN:
        draft.isLogged = true;
        draft.userId = action.userId;
        draft.token = action.token;
        break;
      case LOGOUT:
        draft.isLogged = true;
        draft.error = '';
        break;
      case LOGOUT_SUCCESS:
        draft.isLogged = false;
        draft.userId = '';
        draft.token = '';
        draft.error = '';
        draft.messages = [];
        draft.notifications = [];
        draft.snackbars = [];
        draft.isOpenNavigationMobile = false;
        draft.isOpenNavigationDesktop = true;
        draft.isOpenNotifications = false;
        draft.isOpenMessages = false;
        draft.isNewNotifications = false;
        draft.isNewMessages = false;
        break;
      case LOGOUT_ERROR:
        draft.isLogged = false;
        draft.userId = '';
        draft.token = '';
        draft.error = '';
        draft.messages = [];
        draft.notifications = [];
        draft.snackbars = [];
        draft.isOpenNavigationMobile = false;
        draft.isOpenNavigationDesktop = true;
        draft.isOpenNotifications = false;
        draft.isOpenMessages = false;
        draft.isNewNotifications = false;
        draft.isNewMessages = false;
        break;
      case ENQUEUE_SNACKBAR:
        draft.snackbars = [
          ...draft.snackbar,
          {
            key: action.key,
            ...action.snackbar,
          },
        ];
        break;
      case CLOSE_SNACKBAR:
        draft.snackbars = draft.snackbars.map(snackbar =>
          action.dismissAll || snackbar.key === action.key
            ? { ...snackbar, dismissed: true }
            : { ...snackbar },
        );
        break;
      case REMOVE_SNACKBAR:
        draft.snackbars = draft.snackbars.filter(
          snackbar => snackbar.key !== action.key,
        );
        break;
    }
  });

export default appPageReducer;