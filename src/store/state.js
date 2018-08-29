import {getUserInfo, getIsLogin} from 'js/cache'

const state = {
  userData: getUserInfo(),
  isLogin: getIsLogin()
}

export default state
