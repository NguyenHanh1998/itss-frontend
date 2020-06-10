import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import {translate} from 'react-i18next'
import Constants from '../Constants'
var autoBind = require('react-autobind')

class ChangeUsernameModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      typingMessage: '',
      typingUsername: this.props.currentName
    }

    autoBind(this)
  }
  _verify () {
    if (this.state.typingUsername.length < Constants.REQUIRED_USERNAME_LENGTH || this.state.typingUsername.length > Constants.MAXIMUM_USERNAME_LENGTH) {
      this.setState({typingMessage: this.props.t('profile_username_contition_least_character')})
      return false
    }

    return true
  }
  _update () {
    if (!this._verify()) { return }
    this.props.onUpdate(this.state.typingUsername.trim())
    this.props.onClose()
  }
  close () {
    this.setState({typingMessage: '', typingUsername: this.props.currentName})
    this.props.onClose()
  }
  render () {
    return (
      <Modal isOpen={this.props.show} toggle={() => this.close()} centered style={{maxWidth: 475}}>
        <ModalHeader toggle={() => this.close()} className='b-b-0'>{this.props.title}</ModalHeader>
        <ModalBody>
          <h4 className='heading-small text-muted'>{this.props.content}</h4>
          <div className='pl-lg-4 mb-4'>
            <InputGroup className='mb-3'>
              <InputGroupAddon addonType='prepend'>
                <InputGroupText><i className='icon-user' /></InputGroupText>
              </InputGroupAddon>
              <Input
                className='form-control-alternative'
                id='input-new-username'
                placeholder={this.props.t('new_username_title')}
                type='text'
                value={this.state.typingUsername}
                onChange={event => this.setState({typingUsername: event.target.value})}
              />
            </InputGroup>
          </div>
          <h6 className='heading-small text-danger ml-4'>{this.state.typingMessage}</h6>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={this._update}>{this.props.updateBtnName}</Button>
          <Button color='primary' onClick={() => this.close()}>{this.props.cancelBtnName}</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

ChangeUsernameModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  show: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  updateBtnName: PropTypes.string,
  currentName: PropTypes.string
}

export default translate('translations')(ChangeUsernameModal)
