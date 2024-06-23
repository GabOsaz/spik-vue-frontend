<template>
  <div class="shadow-2xl mt-16 w-96 h-[70vh] mx-auto overflow-y-scroll relative">
    <!-- <p>State: {{ connected }}</p> -->
    <div class="shadow-lg w-full h-full overflow-y-scroll">
      <div class="w-full h-full">
        <div
          class="w-full px-1 h-[60vh] flex flex-col justify-end shadow-md pb-2 absolute bottom-16"
        >
          <ul ref="conversations" className="overflow-y-scroll">
            <li
              :id="index + 1"
              ref="messageRef"
              v-bind:key="index + 1"
              v-for="(message, index) in messages"
              class="flex flex-col"
            >
              <div class="rounded-lg mb-2 p-3 bg-blue-100 text-gray-800 self-start">
                <p class="text-sm flex">
                  <img
                    alt="Vue logo"
                    class="logo"
                    src="@/assets/customerIcon.svg"
                    width="16"
                    height="16"
                  />
                  {{ message?.person }}
                </p>
                {{ message.message }}
              </div>
            </li>
          </ul>
        </div>
        <form
          class="space-y-2 rounded-md px-1 mb-1 mt-2 w-full absolute bottom-0 left-0"
          @submit.prevent="sendMessage()"
        >
          <div class="flex space-x-1 items-center w-full">
            <input
              type="text"
              v-model="message"
              placeholder="Type message"
              class="p-2 w-full bg-gray-50 focus:outline-none border-indigo-500 rounded-md"
              autofocus
            />
            <div>
              <button type="submit" class="p-2 rounded-md bg-indigo-600 text-white">Send</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import socket, { state } from '../../socket'

export default {
  name: 'Chat Integration',
  computed: {
    connected() {
      return state.connected
    }
  },
  data() {
    return {
      message: '',
      messages: state.messages
    }
  },

  updated() {
    this.scrollToBottom()
  },

  methods: {
    sendMessage() {
      const newMessage = {
        person: 'Agent',
        message: this.message,
        time: new Date().getTime()
      }
      if (!this.message) return
      socket.emit('message', newMessage)
      this.message = ''
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const messages = this.$refs.messageRef
        if (messages?.length) {
          messages[messages.length - 1].scrollIntoView({ behavior: 'smooth' })
        }
      })
    }
  },
  onMounted: () => {
    console.log('Store actions:', this.initializeSocket)
    if (this.initializeSocket) {
      console.log(this.initializeSocket)
      this.initializeSocket()
    } else {
      console.error('initializeSocket is not defined')
    }
    // this.initializeSocket();
  }
}
</script>
