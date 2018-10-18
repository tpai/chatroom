import { all } from 'redux-saga/effects';

import { watchers as channel } from 'sagas/channel';
import { runWatchers } from 'utils/redux-saga-helpers';

export default function* rootSaga() {
  yield all([
    ...runWatchers(channel),
  ]);
}
