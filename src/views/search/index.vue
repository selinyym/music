<template>
  <div class="search">
    <div class="search-box-wrapper">
      <searchBox ref="searchBox" @query="onQueryChange"></searchBox>
    </div>
    <div class="shortcut-wrapper" ref="shortcutWrapper" v-show="!query">
      <scroll
        class="shortcut"
        ref="shortcut"
        :data="shortCut"
        :refreshDelay="refreshDelay"
      >
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li class="item" v-for="item in hotkey" @click="addQuery(item.k)">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <!--搜索历史部分-->
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <!--搜索历史列表-->
            <search-list
              :searches="searchHistory"
              @delete="deleteSearchHistory"
              @select="addQuery"
            >
            </search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <suggest
        ref="suggest"
        :query="query"
        @listScroll="blurInput"
        @select="saveSearch"
      >
      </suggest>
    </div>
    <confirm
      ref="confirm"
      text="是否清空所有搜索历史"
      confirmBtnText="清空"
      @confirm="clearSearchHistory"
    >
    </confirm>
    <router-view></router-view>
  </div>
</template>
<script>
import SearchBox from 'base/searchBox/searchBox'
import { ERR_OK } from 'api/config'
import { getHotKey } from 'api/search'
import Suggest from 'components/suggest/suggest'
import { mapActions } from 'vuex'
import SearchList from 'base/searchList/searchList'
import Confirm from 'base/confirm/confirm'
import Scroll from 'base/scroll/scroll'
import { playListMixin, searchMixin } from 'common/js/mixin'

export default {
  mixins: [playListMixin, searchMixin],
  data() {
    return {
      hotkey: []
    }
  },
  computed: {
    shortCut() {
      return this.hotkey.concat(this.searchHistory)
    }
  },
  created() {
    this._getHotKey()
  },
  methods: {
    // 如果一个函数仅仅只是调用actions,并且参数是一样的，可以直接在dom上写要调用的actions的方法名，下面的method就可以去掉了 例如delete="deleteSearchHistory"
    // deleteSearchHistory(item) {
    //   this.deleteSearchHistory(item)
    // },
    showConfirm() {
      this.$refs.confirm.show()
    },
    // mini底部自适应
    handlePlayList(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''

      this.$refs.searchResult.style.bottom = bottom
      this.$refs.suggest.refresh()

      this.$refs.shortcutWrapper.style.bottom = bottom
      this.$refs.shortcut.refresh()
    },
    //截取前10个作为热门搜索key
    _getHotKey() {
      getHotKey().then(res => {
        if (res.code === ERR_OK) {
          this.hotkey = res.data.hotkey.slice(0, 10)
        }
      })
    },
    ...mapActions([
      'clearSearchHistory'
    ])
  },
  watch: {
    query(newVal) {
      if (!newVal) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
    }
  },
  components: {
    SearchBox,
    Suggest,
    SearchList,
    Confirm,
    Scroll
  }
}
</script>
<style scoped lang="stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
