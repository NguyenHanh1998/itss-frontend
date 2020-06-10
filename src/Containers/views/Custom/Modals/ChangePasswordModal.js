import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import {translate} from 'react-i18next'
import Utils from '../Utils'
import Constants from '../Constants'
var autoBind = require('react-autobind')

class ChangePasswordModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      typingMessage: '',
      typingPassword: '',
      typingNewPassword: '',
      typingConfirmNewPassword: ''
    }

    autoBind(this)
  }
  _verify () {
    if (this.state.typingPassword.length < Constants.REQUIRED_PASSWORD_LENGTH) {
      this.setState({typingMessage: this.props.t('profile_password_contition_least_character')})
      return false
    }
    if (this.state.typingNewPassword.length < Constants.REQUIRED_WATCHWORD_LENGTH) {
      this.setState({typingMessage: this.props.t('profile_new_password_contition_least_character')})
      return false
    }
    if (this.state.typingNewPassword.localeCompare(this.state.typingConfirmNewPassword) !== 0) {
      this.setState({typingMessage: this.props.t('profile_new_password_contition_match')})
      return false
    }

    if (!Utils.validatePassword(this.state.typingNewPassword)) {
      this.setState({typingMessage: this.props.t('register_password_is_invalid')})
      return false
    }

    return true
  }
  _changePassword () {
    if (!this._verify()) { return }
    this.props.onUpdate(this.state.typingPassword, this.state.typingNewPassword)
    this.props.onClose()
  }
  close () {
    this.setState({typingMessage: '', typingUsername: this.props.currentName})
    this.props.onClose()
  }
  render () {
    return (
      <Modal isOpen={this.props.show} toggle={() => this.close()} centered>
        <ModalHeader toggle={() => this.close()} className='b-b-0'>{this.props.title}</ModalHeader>
        <ModalBody>
          <h4 className='heading-small text-muted'>{this.props.content}</h4>
          <div className='pl-lg-4 mb-4'>
            <InputGroup className='mb-3'>
              <InputGroupAddon addonType='prepend'>
                <InputGroupText><i className='icon-lock' /></InputGroupText>
              </InputGroupAddon>
              <Input
                className='form-control-alternative'
                defaultValue={this.props.t('old_password_title')}
                id='input-old-password'
                placeholder={this.props.t('old_password_title')}
                type='password'
                value={this.state.typingPassword}
                onChange={event => this.setState({typingPassword: event.target.value})}
              />
            </InputGroup>
          </div>
          <div className='pl-lg-4 mb-4'>
            <InputGroup className='mb-3'>
              <InputGroupAddon addonType='prepend'>
                <InputGroupText><i className='icon-lock' /></InputGroupText>
              </InputGroupAddon>
              <Input
                className='form-control-alternative'
                defaultValue={this.props.t('new_password_title')}
                id='input-new-password'
                placeholder={this.props.t('new_password_title')}
                type='password'
                value={this.state.typingNewPassword}
                onChange={event => this.setState({typingNewPassword: event.target.value})}
              />
            </InputGroup>
          </div>
          <div className='pl-lg-4 mb-4'>
            <InputGroup className='mb-3'>
              <InputGroupAddon addonType='prepend'>
                <InputGroupText><i className='icon-lock' /></InputGroupText>
              </InputGroupAddon>
              <Input
                className='form-control-alternative'
                defaultValue={this.props.t('confirm_new_password_title')}
                id='input-confirm-new-password'
                placeholder={this.props.t('confirm_new_password_title')}
                type='password'
                value={this.state.typingConfirmNewPassword}
                onChange={event => this.setState({typingConfirmNewPassword: event.target.value})}
              />
            </InputGroup>
          </div>
          <h6 className='heading-small text-danger ml-4'>{this.state.typingMessage}</h6>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={this._changePassword}>{this.props.updateBtnName}</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

ChangePasswordModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  show: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  updateBtnName: PropTypes.string
}

export default translate('translations')(ChangePasswordModal)
