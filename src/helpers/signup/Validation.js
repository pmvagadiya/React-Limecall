export const validatePassword = password => {
  if (!/^(?=.*[A-Z])/.test(password)) {
    return 'At least one upper case'
  } else if (!/(?=.*?[a-z])/.test(password)) {
    return 'At least one lower case English letter'
  } else if (!/(?=.{8,})/.test(password)) {
    return 'At least one digit'
  } else if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
    return 'At least one special character'
  } else if (!/.{8,}/.test(password)) {
    return 'Minimum eight in length'
  } else {
    return false
  }
}

export const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}
