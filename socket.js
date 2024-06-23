// import { io } from 'socket.io-client';

// const socket = io('http://localhost:8080', {
//     auth: {
//         token: 'abc',
//         roomName: 'mtn',
//         // roomName: companyId,
//         userName: 'Omo',
//     }
// });

// export default socket;

import { reactive } from 'vue'
import { io } from 'socket.io-client'

export const state = reactive({
  connected: false,
  messages: [],
  barEvents: []
})

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8080'
const availableAgent = 'Musa'

const socket = io(URL, {
  auth: {
    token: 'abc',
    roomName: `mtn/${availableAgent}`,
    // roomName: companyId,
    userName: 'Omo'
  }
})

socket.on('connect', () => {
  state.connected = true
})

socket.on('disconnect', () => {
  state.connected = false
})

socket.on('messageQueue', (...args) => {
  state.messages.push(args[0])
})

socket.on('bar', (...args) => {
  state.barEvents.push(args)
})

export default socket
