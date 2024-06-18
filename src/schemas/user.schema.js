const UserVerifyStatus = {
  Unverified: 0, // chưa xác thực email, mặc định = 0
  Verified: 1, // đã xác thực email
  Banned: -1 // bị khóa
}

class User {
  constructor(user) {
    const date = new Date() //tạo này cho ngày created_at updated_at bằng nhau
    this._id = user._id || new ObjectId() // tự tạo id
    this.name = user.name || '' // nếu người dùng tạo mà k truyền ta sẽ để rỗng
    this.email = user.email
    this.password = user.password
    this.avatar = user.avatar || ''
    this.date_of_birth = user.date_of_birth || new Date()
    this.role = user.role || 0
    this.email_verify_token = user.email_verify_token || ''
    this.forgot_password_token = user.forgot_password_token || ''
    this.verify = user.verify || UserVerifyStatus.Unverified
    this.phone = user.phone || ''
    this.address = user.address || ''
  }
}
