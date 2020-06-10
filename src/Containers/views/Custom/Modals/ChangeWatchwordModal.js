import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import {translate} from 'react-i18next'
var autoBind = require('react-autobind')

class ChangeWatchwordModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      typingMessage: '',
      typingWatchword: '',
      typingNewWatchword: ''
    }

    autoBind(this)
  }
  _verify () {
    if (this.state.typingWatchword.length < 5) {
      this.setState({typingMessage: this.props.t('profile_watchword_contition_least_character')})
      return false
    }
    if (this.state.typingNewWatchword.length < 5) {
      this.setState({typingMessage: this.props.t('profile_new_watchword_contition_least_character')})
      return false
    }

    return true
  }
  _update () {
    if (!this._verify()) { return }
    this.props.onUpdate(this.state.typingWatchword, this.state.typingNewWatchword)
    this.props.onClose()
  }
  close () {
    this.setState({typingMessage: ''})
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
                <InputGroupText><i className='icon-note' /></InputGroupText>
              </InputGroupAddon>
              <Input
                className='form-control-alternative'
                defaultValue={this.props.t('old_watchword_title')}
                id='input-old-watchword'
                placeholder={this.props.t('old_watchword_title')}
                type='text'
                value={this.state.typingWatchword}
                onChange={event => this.setState({typingWatchword: event.target.value})}
              />
            </InputGroup>
          </div>
          <div className='pl-lg-4 mb-4'>
            <InputGroup className='mb-3'>
              <InputGroupAddon addonType='prepend'>
                <InputGroupText><i className='icon-note' /></InputGroupText>
              </InputGroupAddon>
              <Input
                className='form-control-alternative'
                defaultValue={this.props.t('new_watchword_title')}
                id='input-new-watchword'
                placeholder={this.props.t('new_watchword_title')}
                type='text'
                value={this.state.typingNewWatchword}
                onChange={event => this.setState({typingNewWatchword: event.target.value})}
              />
            </InputGroup>
          </div>
          <h6 className='heading-small text-danger ml-4'>{this.state.typingMessage}</h6>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={this._update}>{this.props.updateBtnName}</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

ChangeWatchwordModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  show: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  updateBtnName: PropTypes.string
}

export default translate('translations')(ChangeWatchwordModal)
