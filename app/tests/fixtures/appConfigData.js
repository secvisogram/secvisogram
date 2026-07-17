export function getLoginEnabledConfig() {
  return {
    loginAvailable: true,
    loginUrl: '/oauth2/sign_in?rd=http%3A%2F%2Flocalhost%3A8080',
    logoutUrl: '/oauth2/sign_out?rd=http%3A%2F%2Flocalhost%3A8080',
    userInfoUrl: '/oauth2/userinfo',
    validatorUrl: '',
  }
}
