import { toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

export const CommonNotify = (msg, type = 'error') => {
  toast[type](msg, { position: toast.POSITION.TOP_RIGHT, autoClose: 6000 })
}
