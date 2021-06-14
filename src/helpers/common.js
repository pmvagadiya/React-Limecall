export const setLoginLocalStorage = res => {
  localStorage.setItem('api_key', res.data.data.api_key)
  localStorage.setItem('access_token', res.data.data.access_token)
  localStorage.setItem('quick_setup', res.data.data.onboarding_step)
  localStorage.setItem('access_token', res.data.data.access_token)
  localStorage.setItem('first_name', res.data.data.first_name)
  localStorage.setItem(
    'full_name',
    res.data.data.first_name + res.data.data.last_name
  )
  localStorage.setItem('last_name', res.data.data.last_name)
  localStorage.setItem('email', res.data.data.email)
  localStorage.setItem('id', res.data.data.id)
  localStorage.setItem(
    'admin_verification_status',
    res.data.data.admin_verification_status
  )
}

export const getAudioFileName = (string = '') => {
  const splitBySlash = string.split('/')
  const fileName = splitBySlash[splitBySlash.length - 1]
  return fileName
}
