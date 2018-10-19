import { select, call, put, all, takeLatest } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import queryString from 'query-string';

import { uploadFile as uploadFileAPI } from 'api/file';
import { getProfile as getProfileAPI } from 'api/profile';
import { setData as setProfile } from 'redux/modules/profile';
import { getProfile } from 'selectors/channel';
import {
  joinChannel,
  leaveChannel,
  sendMessage as callSendMessage,
} from 'sockets/';

export const HANDLE_DID_MOUNT = `channel/HANDLE_DID_MOUNT`;
export const SEND_MESSAGE = `channel/SEND_MESSAGE`;
export const UPLOAD_IMAGE = `channel/UPLOAD_IMAGE`;

export const handleDidMount = createAction(HANDLE_DID_MOUNT);
export const sendMessage = createAction(SEND_MESSAGE, values => values);
export const uploadImage = createAction(UPLOAD_IMAGE, files => files);

export const sagas = {
  * handleDidMount () {
    try {
      const { success, error } = yield call(getProfileAPI);
      if (success) {
        const { body: users } = success;
        const { id, name: username } = users[Math.floor(Math.random()*10)];
        const { channelId } = queryString.parse(location.search);
        yield call(joinChannel, {
          id: channelId || 1,
          username,
        });
        yield call(window.addEventListener, 'beforeunload', () => {
          return leaveChannel({
            id: channelId || 1,
            username,
          });
        });
        const node = document.body;
        const target = document.querySelector('.dropzone');
        yield call(node.addEventListener, 'dragenter', () => {
          target.classList.add('showDropzone');
        });
        yield call(node.addEventListener, 'dragleave', (e) => {
          if (!node.contains(e.target) || target.contains(e.target)) {
            target.classList.remove('showDropzone');
          }
        });
        yield put(setProfile({
          id,
          username,
          channelId,
        }));
      } else {
        console.log(error);
      }
    } catch (e) {
      console.log(e);
    }
  },
  * sendMessage ({ payload }) {
    try {
      const { id, username, channelId } = yield select(getProfile);
      yield call(callSendMessage, {
        userId: id,
        username,
        text: payload.text,
        type: 'text',
        channelId,
      });
    } catch (e) {
      console.log(e);
    }
  },
  * uploadImage ({ payload }) {
    const { id, username, channelId } = yield select(getProfile);
    const { success, error } = yield call(uploadFileAPI, payload);
    if (success) {
      const { body: urls } = success;
      yield all(
        urls.map((url) => call(callSendMessage, {
          userId: id,
          username,
          text: url,
          type: 'image',
          channelId,
        }))
      );
    } else {
      console.log(error);
    }
  },
};

export const watchers = {
  * handleDidMount () {
    yield takeLatest(HANDLE_DID_MOUNT, sagas.handleDidMount);
  },
  * sendMessage () {
    yield takeLatest(SEND_MESSAGE, sagas.sendMessage);
  },
  * uploadImage () {
    yield takeLatest(UPLOAD_IMAGE, sagas.uploadImage);
  },
};
