//lấy từ bài csdl
enum UserVerifyStatus {
  Unverified, // chưa xác thực email, mặc định = 0
  Verified, // đã xác thực email
  Banned // bị khóa
}
//đặt interface vì theo chuẩn ts thôi, chứ làm thực tế thì khác
interface UserType {
  _id?: number
  name: string
  email: string
  passwordHash: string
  avatar: string // optional
  date_of_birth: Date
  role: number
  email_verify_token: string // jwt hoặc '' nếu đã xác thực email
  forgot_password_token: string // jwt hoặc '' nếu đã xác thực email
  verify: UserVerifyStatus

  phone: string // optional
  address: string // optional
}

export default class User {
  _id?: number
  name: string
  email: string
  passwordHash: string
  avatar: string // optional
  date_of_birth: Date
  role: number
  email_verify_token: string // jwt hoặc '' nếu đã xác thực email
  forgot_password_token: string // jwt hoặc '' nếu đã xác thực email
  verify: UserVerifyStatus

  phone: string // optional
  address: string // optional
  constructor(user: UserType) {
    const date = new Date() //tạo này cho ngày created_at updated_at bằng nhau
    this._id = user._id // tự tạo id
    this.name = user.name || '' // nếu người dùng tạo mà k truyền ta sẽ để rỗng
    this.email = user.email
    this.passwordHash = user.passwordHash
    this.avatar = user.avatar || ''
    this.date_of_birth = user.date_of_birth || new Date()
    this.role = user.role || 2
    this.email_verify_token = user.email_verify_token || ''
    this.forgot_password_token = user.forgot_password_token || ''
    this.verify = user.verify || UserVerifyStatus.Unverified

    this.phone = user.phone || ''
    this.address = user.address || ''
  }
}
