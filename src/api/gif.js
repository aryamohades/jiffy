import request from 'axios'
import { GIPHY_API } from '../constants'

export default {
  getGif(q) {
    const requestUri = GIPHY_API + '&q=' + q
    return request.get(requestUri)
  }
}
