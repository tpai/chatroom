import { compose } from 'redux';
import { connect } from 'react-redux';

import Channel from 'components/elements/Channel';
import withLifecycle from 'components/hoc/withLifecycle';
import {
  handleDidMount,
  sendMessage,
  uploadImage,
} from 'sagas/channel';
import {
  getProfile,
  getUsers,
  getMessages,
} from 'selectors/channel';

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return { dispatch };
}

function mergeProps (state, { dispatch }, ownProps) {
  return {
    ...ownProps,

    profile: getProfile(state),
    users: getUsers(state),
    messages: getMessages(state),

    handleDidMount: () => dispatch(handleDidMount()),
    sendMessage: (values) => dispatch(sendMessage(values)),
    uploadImage: (files) => dispatch(uploadImage(files)),
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps, mergeProps),
  withLifecycle(),
)(Channel);
