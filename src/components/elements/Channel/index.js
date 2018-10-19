import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import Dropzone from 'react-dropzone';
import cx from 'classnames';

import * as styles from './styles.scss';
import validation from './validation';

class Channel extends PureComponent {
  static propTypes = {
    profile: PropTypes.object,
    users: PropTypes.arrayOf(PropTypes.string),
    messages: PropTypes.arrayOf(PropTypes.object),
    sendMessage: PropTypes.func,
    uploadImage: PropTypes.func,
  }
  static defaultProps = {
    profile: {
      username: '',
      channelId: null,
    },
    users: [],
    messages: [],
    sendMessage: () => {},
    uploadImage: () => {},
  }
  constructor (props) {
    super(props);
    this.content = React.createRef();
  }
  onSubmit = async (values) => {
    this.props.sendMessage(values);
  }
  onDrop = (files) => {
    this.props.uploadImage(files);
  }
  renderMessage = (type, text) => {
    switch (type) {
    case 'image': return (<a href={text} target="_blank" rel="noopener noreferrer"><img src={text} /></a>);
    default:      return text;
    }
  }
  componentDidUpdate () {
    setTimeout(() => {
      this.content.current.scrollTop = this.content.current.scrollHeight;
    }, 250);
  }
  render() {
    const {
      profile,
      users,
      messages,
    } = this.props;
    return (
      <div>
        <div className={styles['top']}>
          <div className={styles['container']}>
            <div className={styles['chatbox']}>
              <div className={styles['header']}>
                Channel#{profile.channelId} ({users.length})
              </div>
              <Dropzone
                accept="image/jpeg, image/png"
                className={cx('dropzone', styles['dropzone'])}
                style={{ position: 'absolute' }}
                onDrop={this.onDrop}
              >
                {({ isDragActive }) => {
                  return (
                    <div
                      className={cx(styles['drop-file'], {
                        [styles['active-drop']]: isDragActive,
                      })}
                    >
                      Drop File To Upload
                    </div>
                  );
                }}
              </Dropzone>
              <div ref={this.content} className={styles['content']}>
                <div className={styles['dialogs']}>
                  {messages.map(({ userId, username, type, text }, key) => (
                    profile.id === userId ?
                      <div key={`msg${key}`} className={styles['float-right-dialog']}>
                        <div className={styles['text']}>
                          {this.renderMessage(type, text)}
                        </div>
                        <div className={styles['avatar']}><img src={`http://i.pravatar.cc/150?img=${userId}`} alt={username} /></div>
                      </div> :
                      <div key={`msg${key}`} className={styles['float-left-dialog']}>
                        <div className={styles['avatar']}><img src={`http://i.pravatar.cc/150?img=${userId}`} alt={username} /></div>
                        <div className={styles['text']}>
                          {this.renderMessage(type, text)}
                        </div>
                      </div>
                  ))}
                </div>
              </div>
              <div>
                <Form
                  onSubmit={this.onSubmit}
                  validate={validation}
                  render={({ handleSubmit, form }) => (
                    <form onSubmit={(event) => handleSubmit(event).then(form.reset)}>
                      <Field name="text">
                        {({ input }) => (
                          <input {...input} type="text" placeholder="Say something..." className={styles['input']} />
                        )}
                      </Field>
                    </form>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Channel;
