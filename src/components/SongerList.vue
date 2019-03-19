<template>
  <div clas="songer">
    <div class="album">
      <div class="spic"><img v-lazy="artistid" ></div>
      <div class="sint"><h3 v-text="artist"></h3>
        <p v-text="a_desc"></p>
      </div>
      <div class="clear"></div>
    </div>
    <scroller :on-refresh="refresh"
              :on-infinite="infinite" refresh-text="There Is Nothing" noDataText="没有啦!" ref="scroll"
              style="position:absolute;top:auto" height="100%">
      <div class="clear"></div>
      <div class="songlist">
        <ul>
          <li v-for="items in list">
            <p>
              <router-link :to="{path:'/player',query:{id:items.musicData.songmid}}">{{items.musicData.songname}}
              </router-link>
            </p>
            <p class="gray">{{artist}}.{{items.musicData.albumname}}</p></li>
        </ul>
      </div>
    </scroller>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {getJson, dealxml} from 'static/js/getJson' //static地址要base文件resolve
  import VueScroller from 'vue-scroller'

  Vue.use(VueScroller)

  const param = {
    singermid: '0025NhlN2yWrP4',
    order: 'listen',
    begin: 0,
    num: 30,
    songstatus: 1
  }
  const xmlparam = {
    singermid: '0025NhlN2yWrP4',
    utf8: '1',
    outCharset: 'utf-8',
    format: 'xml',
    r: '1552980603130'
  }

  export default {
    name: 'SongerList',
    data () {
      return {
        artist: '',
        artistid: '',
        artistDesc: '',
        list: []
      }
    },
    mounted () {
      this.top = 1
      this.bottom = 20
    },
    created () {
      this.$ajax()
    },
    computed:{
      a_desc:function () {
         return this.artistDesc.toString().substring(0,70)+'...';
      }
    },
    methods: {
      $ajax: function () {
        const _self = this //将this传递出来
        getJson('/api/v8/fcg-bin/fcg_v8_singer_track_cp.fcg', param, function (res) {
          _self.artist = res.data.data.singer_name;
          _self.list = res.data.data.list;
          _self.artistid = 'https://y.gtimg.cn/music/photo_new/T001R300x300M000'+res.data.data.singer_mid+'.jpg';
        })
        getJson('/api/splcloud/fcgi-bin/fcg_get_singer_desc.fcg', xmlparam, function (res) {
          _self.artistDesc = dealxml(res.data, 'desc');
        })
      },

      refresh (done) {
        done(true)//禁用下拉更新
      },

      infinite (done) { //上拉加载数据
        if (this.bottom >= 30) {
          setTimeout(() => {
            done(true)
          }, 1500)
          return
        }
        const _self = this
        setTimeout(() => {
          let start = this.bottom + 1
          this.bottom = this.bottom + 10
          setTimeout(() => {
            done()
          })
        }, 1500)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .album {
    width: 100%;
    color: #fff;
    background: rgb(0, 0, 0, .5);
  }

  .spic {
    float: left;
    margin: 2% 0 0 2%;
  }
  .spic img{
    width: 160px;
    height: 160px;
  }

  .sint {
    float: right;
    width: 55%;
  }

  .sint p {
    margin: 0;
    padding-right: 4%;
    padding-top: 4%;
  }

  .sint h3 {
    font-size: 24px;
    margin: 0;
  }

  .songlist {
    margin-bottom: 10%;
    width: 100%;
    overflow: hidden;
    background: rgb(0, 0, 0, .5);
  }

  .songlist ul li {
    line-height: 32px;
  }

  .songlist p {
    text-align: left;
    padding-left: 22px;
  }

  .songlist p a {
    color: #fff;
  }
  img[lazy=loading]{
    width: 40px;
    height: 40px;
    position: absolute;
    left: 15%;
    top: 8%;
  }
  img[lazy=error]{
    width: 40px;
    height: 40px;
    position: absolute;
    left: 15%;
    top: 8%;
  }
</style>
