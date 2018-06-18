<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songs" :rank="rank"></music-list>
  </transition>
</template>
<script>
import MusicList from 'components/musicList/musicList'
import { mapGetters } from 'vuex'
import { ERR_OK } from 'api/config'
import { getTopListDetail } from 'api/rank'
import {getVkey} from 'api/song'
import { createSong } from 'common/js/song'

export default {
  data() {
    return {
      songs: [],
      rank: true
    }
  },
  computed: {
    ...mapGetters([
      'topList'
    ]),
    title() {
      return this.topList.topTitle
    },
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].image
      }
      return ''
    }
  },
  created() {
    this._getTopListDetail()
  },
  methods: {
    _getTopListDetail() {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }
      getTopListDetail(this.topList.id).then(res => {
        if (res.code === ERR_OK) {
          console.log(res)
          this.songs = this._normalizeList(res.songlist)
        }
      })
    },
    _normalizeList(list) {
      let ret = []
      list.forEach((item) => {
        const musicData = item.data
        if (musicData.songid && musicData.albummid) {
           ret.push(createSong(musicData))
        }
      })
      ret.forEach(item => {
        if (!item.url) {
          getVkey(item.mid).then(vkey => {
            item.url = `http://dl.stream.qqmusic.qq.com/C400${item.mid}.m4a?vkey=${vkey}&guid=7595976838&uin=0&fromtag=66`
          })
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>
<style scoped lang="stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
