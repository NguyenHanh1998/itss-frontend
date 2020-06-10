export default {
  'PROJECT_STATUS': [
    'analysing',
    'ready',
    'wait_for_rendering',
    'processing',
    'failed',
    'completed'
  ],
  'ROLE': {
    'USER': 'user',
    'OPR': 'operator',
    'ADMIN': 'admin'
  },
  'STATUSES_LABEL': {
    'analysing': 'status_analysing',
    'ready': 'status_ready',
    'wait_for_rendering': 'status_wait_for_rendering',
    'processing': 'status_processing',
    'failed': 'status_failed',
    'completed': 'status_completed'
  },
  'SIDEBAR': {
    'DASHBOARD': 1,
    'PROJECTS': 2,
    'RESULTS': 3,
    'USER_MANAGEMENT': 4,
    'PAYMENT': 5,
    'CONFIGURATION': 6
  },
  'TOKEN_TYPE': {
    'ETH': 'eth',
    'ERC20': 'erc20',
    'ERC721': 'erc721'
  },
  SEND_HISTORY_STATUS: {
    created: 'created',        // vua tao transaction
    received: 'received',      // chuyen thanh cong cho recipient
    deposited: 'deposited',    // chuyen thanh cong vao escrow
    refunded: 'refunded',      // hoan tien thanh cong tu escrow ve sender
    failed: 'failed'           // chuyen khong thanh cong
  },
  SHORT_MESSAGE_CHAR_NUM: 15,
  REQUIRED_PASSWORD_LENGTH: 10,
  REQUIRED_WATCHWORD_LENGTH: 5,
  REQUIRED_USERNAME_LENGTH: 2,
  MAXIMUM_USERNAME_LENGTH: 50
}
