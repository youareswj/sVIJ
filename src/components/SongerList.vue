<template>
  <div clas="songer">
    <div class="album">
      <div class="spic"><img v-lazy="artistid"></div>
      <div class="sint"><h3 v-text="artist"></h3>
        <p v-text="a_desc"></p>
      </div>
      <div class="clear"></div>
    </div>
    <div class="total"><i class="icon"></i>
      <p>播放全部(共{{mTotal}}首)</p></div>
    <scroller :on-refresh="refresh"
              :on-infinite="infinite" refresh-text="There Is Nothing" noDataText="没有啦!" ref="scroll" class="scroll">
      <div class="songlist">
        <ul>
          <div v-for="items in list">
            <li v-if="items.disable" class="disable">
              <p><a href="javascript:void(0)" @click="show">{{items.songname}}</a></p>
              <p class="gray">{{artist}}.{{items.songalbum}}</p>
            </li>
            <li v-if="!items.disable">
              <p>
                <router-link
                  :to="{path:'/player',query:{id:items.songmid,alid:items.albummid,songid:items.songid,albid:items.albummid}}">
                  {{items.songname}}
                </router-link>
              </p>
              <p class="white">{{artist}}.{{items.songalbum}}</p></li>
          </div>
        </ul>
      </div>
    </scroller>
    <transition name="fade">
      <div ref="pop" v-show="flag">
        <popUp :cont="confirm"></popUp>
      </div>
    </transition>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {getJson, dealxml, reMlist} from 'static/js/base' //static地址要base文件resolve
  import VueScroller from 'vue-scroller'
  import popUp from '@/function/popUp'

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
        artist: '',        //歌手名称
        artistid: '',     //歌手id
        artistDesc: '',  //歌手简介
        nums: 2,        //加载页数
        list: [],     //歌曲列表
        mTotal: '',    //歌手歌曲总数
        flag: false,
        confirm: '由于版权原因,该音乐暂时不能播放!' //弹窗提示内容
      }
    },
    components: {popUp},
    mounted () {
      this.top = 1
      this.bottom = 20
    },
    created () {
      this.$ajax()
    },
    computed: {
      a_desc: function () {
        return this.artistDesc.toString().substring(0, 70) + '...'
      }
    },
    methods: {
      $ajax: function () {
        const _self = this //将this传递出来
        getJson('/api/v8/fcg-bin/fcg_v8_singer_track_cp.fcg', param, (res) => {
          _self.artist = res.data.data.singer_name   //歌手姓名
          _self.list = reMlist(res.data.data)           //歌曲列表
          _self.mTotal = res.data.data.total       //总条数
          _self.artistid = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${res.data.data.singer_mid}.jpg` //歌手图片
        })
        getJson('/api/splcloud/fcgi-bin/fcg_get_singer_desc.fcg', xmlparam, function (res) {
          _self.artistDesc = dealxml(res.data, 'desc')
        })
      },

      refresh (done) {
        done(true)//禁用下拉更新
      },

      infinite (done) { //上拉加载数据
        const _self = this
        var counts = ++_self.nums
        const pgSize = param.num
        const pgNo = param.begin + pgSize * counts
        var muTotal = ''
        var pulist = []
        const restart = {
          singermid: param.singermid,
          order: param.order,
          begin: pgNo,
          num: pgSize,
          songstatus: param.songstatus
        }
        getJson('/api/v8/fcg-bin/fcg_v8_singer_track_cp.fcg', restart, (res) => {
          muTotal = res.data.data.total
          pulist = reMlist(res.data.data)
          if (muTotal == 0) {
            setTimeout(() => {
              done(true)
            }, 1500)
            return
          }
          setTimeout(() => {
            let start = this.bottom + 1
            this.bottom = this.bottom + 20
            for (let i in pulist) {
              _self.list.push(pulist[i])
            }
            setTimeout(() => {
              done()
            })
          }, 1500)
        })
      },
      show: function () {
        this.flag = true
      }
    },
    watch:{
      flag(n,o){
        if(n){
          setTimeout(()=>{
            this.flag = false
          },3000)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .scroll {
    position: absolute;
    top: auto;
  }

  .album {
    width: 100%;
    color: #fff;
    background: rgb(0, 0, 0, .5);
  }

  .spic {
    float: left;
    margin: 2% 0 0 2%;
  }

  .spic img {
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

  .total {
    height: 40px;
    background: #777;
    text-align: center;
    border-radius: 0 0 15px 15px;
  }

  .total .icon {
    display: inline-block;
    width: 32px;
    height: 32px;
    background: url("/static/img/bofang_m.png");
    vertical-align: middle;
    float: left;
    margin: 1%;
  }

  .total p {
    color: #fff;
    float: left;
    height: 40px;
    line-height: 40px;
  }

  .songlist {
    margin-bottom: 14%;
    width: 100%;
    overflow: hidden;
    background: rgb(0, 0, 0, .5);
    border-top: 0.8px solid #777777;
    border-radius: 15px 15px 0 0;
    outline: none;
  }

  .songlist ul li {
    line-height: 32px;
  }

  .songlist ul div {
  }

  .songlist ul div:first-child {
    margin-top: 2%;
  }

  .songlist ul div:last-child {
    margin-bottom: 10%;
  }

  .songlist p {
    font-size: 18px;
  }

  .songlist p[class=gray] {
    font-size: 15px;
  }

  .songlist p[class=white] {
    color: #b9936a;
    font-size: 15px;
  }

  .songlist p {
    text-align: left;
    padding-left: 22px;
  }

  .songlist p a {
    color: #fff;
  }

  .songlist .disable a {
    color: rgba(255, 255, 255, 0.5);
  }

  img[lazy=loading] {
    width: 40px;
    height: 40px;
    position: absolute;
    left: 15%;
    top: 8%;
  }

  img[lazy=error] {
    width: 40px;
    height: 40px;
    position: absolute;
    left: 15%;
    top: 8%;
  }

  /*iphone 5/se*/
  @media screen and (max-width: 360px) {
    .lyric {
      height: 110%;
    }
  }

  @media only screen and (max-width: 320px) and (min-height: 568px) {
    .spic {
      margin: 0;
    }

    .spic img {
      width: 140px;
      height: 140px;
    }

    .sint p {
      height: 108px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
    }
  }

  @media only screen and (max-width: 360px) and (min-height: 640px) {
    .spic {
      margin: 0;
    }

    .spic img {
      width: 140px;
      height: 140px;
    }

    .sint p {
      height: 108px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
    }
  }

  /*iphone 6/7/8*/
  @media only screen and (min-height: 667px) {
    .menu {
      padding-left: 10%;
    }

    .menu a {
      margin-top: 6%;
    }
  }

  @media only screen and (max-width: 411px) and (min-height: 731px) {
    .sint p {
      line-height: 26px;
    }
  }

  /*iphone 6/7/8/plus*/
  @media only screen and (min-height: 736px) {
    .sint p {
      line-height: 26px;
    }
  }

  /*iphone x+*/
  @media only screen and (min-height: 812px) {
    .sint p {
      height: 126px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: all 0.5s ease-in-out;
  }
  .fade-enter-active .popup, .fade-leave-active .popup {
    transition: all 0.5s ease-in-out;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
<style>
  ._v-container > ._v-content > .loading-layer > .no-data-text[data-v-ecaca2b0] {
    top: -75%;
  }

  ._v-container > ._v-content > .loading-layer[data-v-ecaca2b0] {
    margin-top: -10%;
  }
</style>
