import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import axios from 'axios'

export default function instantiatePusher() {
  window.Pusher = Pusher
  window.Echo = new Echo({
    authEndpoint: `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/broadcasting/auth`,
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_KEY,
    forceTLS: true,
    cluster: ['eu'],
    authorizer: (channel) => {
      return {
        authorize: (socketId, callback) => {
          axios
            .post(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/broadcasting/auth`, {
              socket_id: socketId,
              channel_name: channel.name
            })
            .then((response) => {
              callback(null, response.data)
            })
            .catch((error) => {
              callback(error)
            })
        }
      }
    }
  })

  // ...

  return true
}
