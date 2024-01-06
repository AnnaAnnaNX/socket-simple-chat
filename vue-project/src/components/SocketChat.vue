<script setup lang="ts">
import {onMounted, ref} from 'vue'
import axios from 'axios'
  defineProps<{
    msg: string
  }>()
  const messages = ref([])
  const message = ref('')

  const socket = ref({})
  const connected = ref(false)
  const username = ref('')
  const connect = () => {
    socket.value = new WebSocket('ws://localhost:5000')
    socket.value.onopen = () => {
      connected.value = true
      const message = {
        event: 'connection',
        username: username.value
      }
      socket.value.send(JSON.stringify(message))
    }
    socket.value.onmessage = (event) => {
      const message = JSON.parse(event.data)
      messages.value = [ message, ...messages.value]
    }
  }

  const send = () => {
    const messageObj = {
      event: 'message',
      username: username.value,
      message: message.value
    }
    socket.value.send(JSON.stringify(messageObj))
    message.value = ''
  }
</script>

<template>
  <div v-if="!connected">
    <input placeholder="Имя пользователя" v-model="username" style="display: block;"></input>
    <button @click="connect">Send</button>
  </div>
  <div v-else>
    <textarea placeholder="Сообщение" v-model="message" style="display: block;"></textarea>
    <button @click="send">Send</button>
  </div>
  <div v-for="message in messages" key="message.date">
    <div v-if="message.event === 'connection'">
      Подключился пользователь {{ message.username }}
    </div>
    <div v-else>
      {{ message.username }}: {{ message.message }}
    </div>
  </div>
</template>

<style scoped>
</style>
