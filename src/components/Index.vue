<template>
  <div class="page-container">
    <form class="container" @submit="getGifText">
      <input v-model="textQuery">
      <button @click="getGifText" class="btn" :disabled="submitDisabled">Submit</button>
    </form>
    <button @click="toggleListening" class="toggle-btn">
      <span v-text="buttonText" class="btn-text"></span>
      <i v-if="isListening" class="fa fa-circle-o-notch fa-spin fa-2x fa-fw"></i>
      <i v-else class="fa fa-microphone fa-2x"></i>
    </button>
    <img :src="gifUrl" class="gif">
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data: () => {
    return {
      recognition: null,
      speechQuery: '',
      textQuery: '',
      isListening: true
    }
  },

  created() {
    this.initRecognition()
    this.getGif('hello')
  },
  computed: {
    ...mapState({
      gifUrl: ({ gif }) => gif.gifUrl,
      pending: ({ gif }) => gif.pending
    }),
    buttonText() {
      return this.isListening ? 'Stop Listening' : 'Start Listening'
    },
    submitDisabled() {
      return this.textQuery === ''
    }
  },
  methods: {
    ...mapActions([
      'getGif'
    ]),
    toggleListening() {
      this.isListening = !this.isListening

      return this.isListening
        ? this.recognition.start()
        : this.recognition.stop()
    },
    getGifText(e) {
      e.preventDefault()

      if (this.textQuery) {
        this.getGif(this.textQuery)
      }
    },
    getGifSpeech() {
      if (this.speechQuery) {
        this.getGif(this.speechQuery)
      }
    },
    initRecognition() {
      if (!('webkitSpeechRecognition' in window)) {
        return window.upgrade()
      }

      // eslint-disable-next-line new-cap
      this.recognition = new window.webkitSpeechRecognition()
      this.recognition.continuous = true
      this.recognition.interimResults = true

      this.recognition.onresult = (event) => {
        let finalTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript
          }
        }

        this.speechQuery = finalTranscript
        this.getGifSpeech()
      }

      this.recognition.start()
    }
  }
}
</script>

<style scoped>
input {
  height: 35px;
  padding-left: 8px;
  font-size: 16px;
  width: 400px;
}

.btn-text {
  padding-bottom: 6px;
}

.toggle-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 80px;
  margin-top: 15px;
}

.gif {
  margin-top: 25px;
  width: 450px;
  border: 1px solid #CCC;
}
</style>
