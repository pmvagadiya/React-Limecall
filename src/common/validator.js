const inputValidator = {
  checkIfNotEmpty: checkstring => {
    if (checkstring) return true
    return false
  },
  checkIfLettersOnly: checkstring => {
    if (typeof checkstring !== 'undefined') {
      if (!checkstring.match(/^[a-zA-Z\s]+$/)) {
        return false
      }
    }
    return true
  },
  checkIfEmailFormat: checkstring => {
    if (typeof checkstring !== 'undefined') {
      let lastAtPos = checkstring.lastIndexOf('@')
      let lastDotPos = checkstring.lastIndexOf('.')

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          checkstring.indexOf('@@') === -1 &&
          lastDotPos > 2 &&
          checkstring.length - lastDotPos > 2
        )
      ) {
        return false
      }
    }
    return true
  },
  checkIfEqual: (checkString, checkSecondString) => {
    if (checkString !== checkSecondString) {
      //alert('not equal')

      return false
    }
    return true
  }
}

export default inputValidator
