import React, { Component } from 'react'
import { connect } from 'react-redux'
import {translate} from 'react-i18next'
import Alert from 'react-s-alert'
import {
  Button,
  Card,
  CardBody,
  Col,
  Row,
  Form,
  Table
} from 'reactstrap'
import ProfileActions from '../../../Redux/ProfileRedux'
import UserActions from '../../../Redux/UserRedux'
import ChangePasswordModal from '../Custom/Modals/ChangePasswordModal'
import ChangeWatchwordModal from '../Custom/Modals/ChangeWatchwordModal'
import ChangeUsernameModal from '../Custom/Modals/ChangeUsernameModal'
var Web3 = require('web3')
var autoBind = require('react-autobind')

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showChangeMainAddressModal: false,
      showChangeUsernameModal: false,
      showChangePasswordModal: false,
      showChangeWatchwordModal: false,
      addressList: []
    }

    autoBind(this)
  }
  componentDidMount () {
    this.props.getUser()
  }
  UNSAFE_componentWillReceiveProps (props) {
    // console.log('[componentWillReceiveProps] Profile::', props.data, props.error, props.changeUsernameData, props.addAddressData, props.updateMainAddressData, props.changePasswordData, props.changeWatchwordData)
    if (props.error) {
      Alert.error(this.props.t(props.error), {
        position: 'top-right',
        effect: 'bouncyflip',
        offset: 30
      })
    }

    if (!props.fetching && this.props.fetching && (props.changeUsernameData || props.updateMainAddressData || props.changePasswordData || props.changeWatchwordData)) {
      Alert.info(this.props.t('request_response_saved'), {
        position: 'top-right',
        effect: 'bouncyflip',
        offset: 30
      })
    }

    if (props.user.address_list) {
      this.setState({addressList: props.user.address_list})
    }
  }
  async _changeMainAddress () {
    var web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545')
    var accounts = await web3.eth.getAccounts()
    var message = null

    if (accounts.length) {
      this.props.changeMainAddress({
        address: accounts[0]
      })
    } else {
      message = this.props.t('register_require_use_metamask')
    }

    if (message) {
      Alert.warning(message, {
        position: 'bottom-right',
        effect: 'bouncyflip'
      })
    }
  }

  /* Username modal function */
  _changeUsername (username) {
    this.props.changeUsername({
      username: username
    })
  }
  _toggleChangeUsernameModal (e) {
    this.setState({
      showChangeUsernameModal: !this.state.showChangeUsernameModal
    })

    if (e) { e.preventDefault() }
  }

  /* Password Modal Function */
  _changePassword (password, newPassword) {
    this.props.changePassword({
      password: password,
      new_password: newPassword
    })
  }
  _toggleChangePasswordModal (e) {
    this.setState({
      showChangePasswordModal: !this.state.showChangePasswordModal
    })

    if (e) { e.preventDefault() }
  }

  /* Watchword Modal Function */
  _changeWatchword (watchword, newWatchword) {
    this.props.changeWatchword({
      watchword: watchword,
      new_watchword: newWatchword
    })
  }
  _toggleChangeWatchwordModal (e) {
    this.setState({
      showChangeWatchwordModal: !this.state.showChangeWatchwordModal
    })

    if (e) { e.preventDefault() }
  }

  render_address_list () {
    const items = this.state.addressList.map((item, index) => {
      return (
        <tr key={index}>
          <td className='heading-small text-muted'>{item}</td>
        </tr>
      )
    })

    return (
      <Table hover>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }

  render () {
    var addressListUI = this.render_address_list()
    return (
      <Card >
        <CardBody>
          <Form>
            {/* Username */}
            <div className='pl-lg-5 pr-lg-5'>
              <Row className='mb-4'>
                <Col xs={4}><div className='heading-small mb-4 float-left'>{this.props.t('profile_title_username')}</div></Col>
                <Col xs={6}>
                  <div className='heading-small text-muted mb-4 float-left'>{this.props.user.username}</div>
                </Col>
                <Col className='text-right'>
                  <Button className='font-xl col-lg-10' color='danger' onClick={this._toggleChangeUsernameModal.bind(this)}>{this.props.t('profile_button_change')}</Button>
                </Col>
                <ChangeUsernameModal style={{width: 400}}
                  show={this.state.showChangeUsernameModal}
                  onUpdate={this._changeUsername.bind(this)}
                  onClose={this._toggleChangeUsernameModal.bind(this)}
                  title={this.props.t('profile_change_username_title_modal')}
                  content={''}
                  updateBtnName={this.props.t('profile_update_btn_modal')}
                  cancelBtnName={this.props.t('cancel')}
                  currentName={this.props.user.username}
                  />
              </Row>

              {/* Email */}
              <Row className='mb-4'>
                <Col xs={4}><div className='heading-small mb-4 float-left'>{this.props.t('profile_title_email')}</div></Col>
                <Col xs={6}>
                  <div className='heading-small text-muted mb-4 float-left'>{this.props.user.email}</div>
                </Col>
                <Col className='text-right' />
              </Row>

              {/* Main Address */}
              <Row className='mb-4'>
                <Col xs={4}><div className='heading-small mb-4 float-left'>{this.props.t('profile_title_main_address')}</div></Col>
                <Col xs={6}>
                  <div className='heading-small text-muted mb-4 float-left'>{this.props.user.main_address}</div>
                </Col>
                <Col className='text-right'>
                  <Button className='font-xl col-lg-10' color='danger' onClick={this._changeMainAddress.bind(this)}>{this.props.t('profile_button_change')}</Button>
                </Col>
              </Row>

              <Row className='mb-4'>
                <Col xs={4}><div className='heading-small mb-4 float-left'>{this.props.t('profile_title_address_registered')}</div></Col>
                <Col xs={6}>
                  <div className='heading-small text-muted mb-4 float-left' />
                </Col>
              </Row>
              <Row className='mb-4'>
                <Col xs={4} />
                <Col xs={6}>
                  {addressListUI}
                </Col>
              </Row>

              {/* Password */}
              <Row className='mb-4'>
                <Col xs={4}><div className='heading-small mb-4 float-left'>{this.props.t('profile_title_password')}</div></Col>
                <Col xs={6}>
                  <div className='heading-small text-muted mb-4 float-left'>{this.props.t('profile_password_default')}</div>
                </Col>
                <Col className='text-right'>
                  <Button className='font-xl col-lg-10' color='danger' onClick={this._toggleChangePasswordModal.bind(this)}>{this.props.t('profile_button_change')}</Button>
                </Col>
                <ChangePasswordModal
                  show={this.state.showChangePasswordModal}
                  onUpdate={this._changePassword.bind(this)}
                  onClose={this._toggleChangePasswordModal.bind(this)}
                  title={this.props.t('profile_change_password_title_modal')}
                  content={''}
                  updateBtnName={this.props.t('profile_update_btn_modal')}
                  />
              </Row>

              {/* Watchword */}
              <Row className='mb-4'>
                <Col xs={4}><div className='heading-small mb-4 float-left'>{this.props.t('profile_title_watchword')}</div></Col>
                <Col xs={6}>
                  <div className='heading-small text-muted mb-4 float-left'>{this.props.t('profile_watchword_default')}</div>
                </Col>
                <Col className='text-right'>
                  <Button className='font-xl col-lg-10' color='danger' onClick={this._toggleChangeWatchwordModal.bind(this)}>{this.props.t('profile_button_change')}</Button>
                </Col>
                <ChangeWatchwordModal
                  show={this.state.showChangeWatchwordModal}
                  onUpdate={this._changeWatchword.bind(this)}
                  onClose={this._toggleChangeWatchwordModal.bind(this)}
                  title={this.props.t('profile_change_watchword_title_modal')}
                  content={''}
                  updateBtnName={this.props.t('profile_update_btn_modal')}
                  />
              </Row>
            </div>
          </Form>
        </CardBody>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.data,
    changeUsernameData: state.profile.changeUsernameData,
    updateMainAddressData: state.profile.updateMainAddressData,
    changePasswordData: state.profile.changePasswordData,
    changeWatchwordData: state.profile.changeWatchwordData,
    fetching: state.profile.fetching,
    error: state.profile.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (params) => dispatch(UserActions.userRequest(params)),
    changeUsername: (params) => dispatch(ProfileActions.profileUpdateUsernameRequest(params)),
    changeMainAddress: (params) => dispatch(ProfileActions.profileUpdateMainAddressRequest(params)),
    changeWatchword: (params) => dispatch(ProfileActions.profileChangeWatchwordRequest(params)),
    changePassword: (params) => dispatch(ProfileActions.profileChangePasswordRequest(params))
  }
}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(Profile))
