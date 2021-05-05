module.exports = Object.freeze({
  TOKEN_KEY: 'usertoken',
  USER_KEY: 'userkey',

  EncryptionKey_TOKEN_KEY: 'TOKEN_KEY_CgHsdtndVsD2021',
  EncryptionKey_USER_KEY: 'USER_TOKEN_KEY_CgHsdtndVsD2021',

  ROLE_CUSTOMER: 3,

  LOGIN_FAIL_MESSAGE: 'Sai số điện thoại hoặc mật khẩu',
  REGISTER_SUCCESSFULLY: 'Đăng ký thành công',
  PHONE_NUMBER_REGISTERED: 'Số điện thoại đã được sử dụng',
  PHONE_NUMBER_IS_NOT_REGISTERED: 'Số điện thoại chưa được đăng ký',
  RESET_PASSWORD_SUCCESSFULLY: 'Đổi mật khẩu thành công',

  OLD_PASSWORD_IS_NOT_CORRECT: 'Mật khẩu cũ không đúng',

  UPDATE_SUCCESSFULLY: 'Lưu thay đổi thành công',

  CREATE_ADDRESS_SUCCESSFULLY: 'Tạo địa chỉ thành công',
  DUPLICATE_ADDRESS: 'Địa chỉ này đã được đăng ký',

  CANCEL_REQUEST_SUCCESSFULLY: 'Huỷ yêu cầu thành công',

  // Đang tìm thợ
  STATUS_REQUEST_FINDING: 1,
  // Thợ đã nhận đồng thời có nút Bắt đầu sửa
  STATUS_REQUEST_HASTAKEN: 2,
  // Đang sửa: chuyển sang sau khi thợ ấn vào nút Bắt đầu sửa
  STATUS_REQUEST_FIXING: 3,
  // Đã sửa xong đồng thời khi ấn vào tạo hóa đơn
  STATUS_REQUEST_FIXED: 4,
  // Đã tạo xong hóa đơn
  STATUS_REQUEST_PAID: 5,
  STATUS_REQUEST_CANCELED: 6,
});
