<script setup>
import { jwtDecode } from 'jwt-decode'
import { io } from 'socket.io-client'
</script>


<template>
    <!-- Chat View -->
    <div
      class="col-12 col-md-8 col-lg-9 overflow-auto overflow-auto d-flex flex-column"
      ref="chatView"
      id="chatView"
      style="max-height: 80vh; height: 1000px"
    >
      <div class="border-bottom p-3 d-flex align-items-center">
        <img
          src="../assets/img/profile_other.png"
          class="rounded-circle me-3"
          alt="Chatting with"
          width="40"
          height="40"
        />
        <h5 class="mb-0">{{ $route.params.name }}</h5>
      </div>

      <!-- Messages Area -->
      <div class="flex-grow-1 p-3" id="chatArea" v-for="message in messages">
        <!-- Received Message -->
        <div class="d-flex align-items-start mb-3" v-if="message.senderId._id !== id">
          <img
            v-if="message.senderId.gender == 'male'"
            src="../assets/img/profile_male.png"
            class="rounded-circle me-3"
            alt="User Profile"
            width="40"
            height="40"
          />
          <img
            v-if="message.senderId.gender == 'female'"
            src="../assets/img/profile_female.png"
            class="rounded-circle me-3"
            alt="User Profile"
            width="40"
            height="40"
          />
          <img
            v-if="message.senderId.gender == 'other' || message.senderId.gender == undefined"
            src="../assets/img/profile_other.png"
            class="rounded-circle me-3"
            alt="User Profile"
            width="40"
            height="40"
          />
          <div class="p-3 bg-body-secondary rounded-3">
            <p class="mb-0">
              <strong>{{ message.senderId.username }}</strong
              >: {{ message.content }}
            </p>
            <small class="text-muted">{{
              new Date(message.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })
            }}</small>
          </div>
        </div>

        <!-- Sent Message -->
        <div
          class="d-flex align-items-end flex-row-reverse mb-3"
          v-if="message.senderId._id === id"
        >
          <img
            v-if="message.senderId.gender == 'male'"
            src="../assets/img/profile_male.png"
            class="rounded-circle me-3"
            alt="User Profile"
            width="40"
            height="40"
          />
          <img
            v-if="message.senderId.gender == 'female'"
            src="../assets/img/profile_female.png"
            class="rounded-circle me-3"
            alt="User Profile"
            width="40"
            height="40"
          />
          <img
            v-if="message.senderId.gender == 'other' || message.senderId.gender == undefined"
            src="../assets/img/profile_other.png"
            class="rounded-circle me-3"
            alt="User Profile"
            width="40"
            height="40"
          />
          <div class="p-3 bg-primary text-white rounded-3">
            <p class="mb-0"><strong>Me</strong>: {{ message.content }}</p>
            <small class="text-white-50">{{
              new Date(message.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })
            }}</small>
          </div>
        </div>
      </div>

      <!-- Message Input -->
      <div class="border-top p-3 mt-auto position-sticky bottom-0 bg-white" @submit="emitMessage">
        <form class="d-flex">
          <input
            type="text"
            class="form-control me-2"
            placeholder="Type a message"
            v-model="inputMessage"
          />
          <button type="submit" class="btn btn-primary">Send</button>
        </form>
      </div>
    </div>

</template>

<script>
export default {
    data() {
      return {
        inputMessage: '',
        messages: [],
        socket: null,
        id: jwtDecode(localStorage.getItem('token')).id,
      }
    },
    methods: {
      emitMessage(e) {
        e.preventDefault()
        if (this.inputMessage) {
          this.socket.emit('chat message', this.inputMessage, this.id, this.$route.params.id)
          this.inputMessage = ''
        }
      },
    },
    async mounted() {
      this.socket = io()
    
      this.socket.on('connect', () => {
        console.log('Connected to server!')
        this.socket.emit('join room', this.$route.params.id)
      })
  
      this.socket.on('disconnect', () => {
        console.log('Disconnected from server!')
      })
  
      this.socket.on('chat message', (msg) => {
        this.messages.push(msg)
      })
      this.socket.on('chat init', (msg) => {
        this.messages = msg
      })

    },
    updated() {
      const chatView = this.$refs.chatView
      if (chatView && chatView.scrollHeight > chatView.offsetHeight) {
        chatView.scrollTop = chatView.scrollHeight
      }
    },
  }
  </script>
  