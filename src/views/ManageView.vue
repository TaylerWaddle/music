<template>
  <main>
    <!-- Main Content -->
    <section class="container mx-auto mt-6">
      <div class="md:grid md:grid-cols-3 md:gap-4">
        <div class="col-span-1">
          <app-upload ref="upload" :addSong="addSong"></app-upload>
        </div>
        <div class="col-span-2">
          <div class="bg-white rounded border border-gray-200 relative flex flex-col">
            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
              <span class="card-title">My Songs</span>
              <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
            </div>
            <div class="p-6">
              <!-- Composition Items -->
              <composition-item
                v-for="(song, i) in songs"
                :key="song.docID"
                :song="song"
                :updateSong="updateSong"
                :index="i"
                :removeSong="removeSong"
                :updateUnsavedFlag="updateUnsavedFlag"
              ></composition-item>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import AppUpload from '@/components/Upload.vue'
import { songsCollection, auth } from '@/includes/firebase'
import CompositionItem from '@/components/CompositionItem.vue'

export default {
  name: 'manage',
  components: {
    AppUpload,
    CompositionItem
  },
  data() {
    return {
      songs: [],
      unsavedFlag: false
    }
  },
  async created() {
    const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get()

    snapshot.forEach(this.addSong)
  },
  methods: {
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name
      this.songs[i].genre = values.genre
    },
    removeSong(i) {
      this.songs.splice(i, 1)
    },
    addSong(document) {
      const song = {
        ...document.data(),
        docID: document.id
      }
      this.songs.push(song)
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag) {
      next()
    } else {
      // the confirm function is a global function defined by the browser
      //Creates a popup with 'Ok' and 'Cancel' options.
      // If the user clicks 'Ok', the confirm funciton will return true, passing true to the next function, therefore allowing the user to navigate to a new page
      // If the user clicks, 'Cancel', the confirm function will return false, passing false to ther next function, NOT allowing them to leave the page
      const leave = confirm('You have unsaved changes. Are you sure you want ot leave?')
      next(leave)
    }
  }
}
</script>
