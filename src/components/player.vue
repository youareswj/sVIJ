<template>
  <div class="bg" v-bind:style="bgcss">
    <div class="drag">
      <!--顶部音乐图片-->
      <div class="m-song-turn">
        <img v-lazy="albumpic" class="paused" @click="animat(1,$event)">
        <span v-if="isplay"><img src="/static/img/play_x.png" class="paused" @click="animat(2,$event)"></span>
      </div>
      <!--歌词-->
      <div class="lyric">
        <div ref="lyscroll">
          <p class="lyrics__item" v-for="(items,i) in lyricList" v-bind:id="'items_'+i" :class="[i==0?'curr':'']">{{items}}</p>
        </div>
      </div>
      <!--进度条-->
      <div>
      <div class="bar">
        <div class="sTime">00:00</div>
        <div class="eTime">04:21</div>
        <div class="p_bar"><i class="audio_bar">
          <span class="audio_btn"></span>
        </i></div>
      </div>
      </div>
      <!--底部操作菜单-->
      <div class="menu">
        <a href="javascript:void(0)" class="loop_t"></a>
        <a href="javascript:void(0)" class="pre"></a>
        <a href="javascript:void(0)" class="play" @click="play"></a>
        <a href="javascript:void(0)" class="next"></a>
        <a href="javascript:void(0)" class="list"></a>
        <div class="clear"></div>
      </div>
    </div>
    <!--歌单列表-->
    <div class="playlist">
      <ul>
        <li>最长的电影</li>
        <li>搁浅</li>
        <li>倒带</li>
        <li>告白气球</li>
        <li>她的睫毛</li>
      </ul>
    </div>
    <!--播放器-->
    <audio ref="player" :src="songurl"></audio>
  </div>
</template>

<script>
  import {getJson,getMUrl} from 'static/js/base'

  export default {
    name: 'player',
    data(){
      return {
        id: this.$route.query.id,          //歌曲url传入id
        songid:this.$route.query.songid,  //歌曲图片、歌词id
        albid:this.$route.query.alid,   //页面传入背景图
        songurl:'',
        lyricList:[],
        albumpic:'',
        isplay: true,
        bgcss:{}
      }
    },
    created(){
      this.albumpic = 'https://y.gtimg.cn/music/photo_new/T002R150x150M000'+this.albid+'.jpg?max_age=2592000'
      this.bgcss= {
        background: 'url(https://y.gtimg.cn/music/photo_new/T002R300x300M000'+this.albid+'.jpg?max_age=2592000)',
        backgroundSize:'100% 100%',
    }
      const songurl = `${'/music?loginUin=0&'
        + 'hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&'
        + 'platform=yqq.json&needNewCode=0&data=%7B%22req_0%22%3A%7B%22'
        + 'module%22%3A%22vkey.GetVkeyServer%22%2C%22method%22%3A%22'
        + 'CgiGetVkey%22%2C%22param%22%3A%7B%22guid%22%3A%2210000%22%2C%22songmid%22%3A%5B%22'}${
          this.id}%22%5D%2C%22songtype%22%3A%5B0%5D%2C%22uin%22%3A%220%22%2C%22loginflag%22`
        + '%3A1%2C%22platform%22%3A%2220%22%7D%7D%2C%22comm%22%3A%7B%22uin%22%3A0%2C%22'
        + 'format%22%3A%22json%22%2C%22ct%22%3A20%2C%22cv%22%3A0%7D%7D';
        getMUrl(songurl,res=>{
          this.songurl = `${res.data.req_0.data.sip[0]}${res.data.req_0.data.midurlinfo[0].purl}`
        })
      this.getlyric()

  },
    mounted(){
      this.lyrics()
    },
    methods: {
      getlyric:function(){
        const _self = this
        const lyParam ={
          g_tk:5381,
          uin:0,
          format:'json',
          inCharset:'utf-8',
          outCharset:'utf-8',
          notice:'0',
          platform:'h5',
          needNewCode:1,
          nobase64:1,
          musicid:this.songid,
          songtype:0,
          _:1553084771745,
          jsonpCallback:'jsonp1'
        }
        getJson('/api/lyric/fcgi-bin/fcg_query_lyric.fcg',lyParam,(res)=>{
          let jsonp = res.data
          let reg = /^\w+\((\{[^()]+\})\)$/
          let reg2 =  /[\u4e00-\u9fa5]/g
          let matches = jsonp.match(reg)
          if(matches){
            matches = JSON.parse(matches[1]);
          }
          let lyricarr = matches.lyric.split('&#10;')
          let lyricarr2 = []
          for(let i in lyricarr){
            if(lyricarr[i].match(reg2)!==null) {
              lyricarr[i]=lyricarr[i].match(reg2).join('')
              lyricarr2.push(lyricarr[i])
            }
          }
          _self.lyricList = lyricarr2
        })
      },
      animat: function (i, el){
        if(i == 1){
          var thisclass = el.target.className
          if(thisclass == 'running'){
            el.target.className = 'paused'
            this.isplay = true
          } else if(thisclass == 'paused'){
            el.target.className = 'running'
            this.isplay = false
          }
        } else if(i == 2){
          el.target.parentElement.parentElement.firstChild.className = 'running'
          this.isplay = false
        }
      },
      lyrics:function (){
        let every = 32
        let top = 0
        let i = 0
        // setInterval(()=>{
        //   this.$refs.lyscroll.children[i].classList.remove('curr')
        //   i++
        //   this.$refs.lyscroll.children[i].classList.add('curr')
        //   this.$refs.lyscroll.style.height = '100%'
        //   this.$refs.lyscroll.style.position = 'relative'
        //   this.$refs.lyscroll.style.padding = 0
        //   this.$refs.lyscroll.style.margin = 0
        //   if(i>7){
        //     top =every*(i-7)
        //     this.$refs.lyscroll.style.top = -top + 'px'
        //   }
        //   },1000)
      },
      play:function () {
        this.$refs.player.play()
      }
    }
  }
</script>

<style scoped>
    .bg {
      position: absolute;
      width: 100%;
      height: 100%;
      padding: 1px;
      box-sizing: border-box;
      z-index: 1;
    }

    .bg:after {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: inherit;
      filter: blur(10px);
      z-index: 2;
    }

    .drag {
      position: absolute;
      left: 50%;
      margin-top: 40%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 300px;
      text-align: center;
      z-index: 11;
    }

    .m-song-turn {
      position: relative;
      z-index: 120;
      width: 100%;
      height: 100%;
      margin: 0 auto;
    }

    .m-song-turn img {
      z-index: 200;
      position: absolute;
      width: 190px;
      height: 190px;
      left: 25%;
      top: 18%;
      border-radius: 90px;
      animation: rotate-animation 20s infinite linear;
    }

    .m-song-turn span img {
      z-index: 260;
      width: 56px;
      height: 56px;
      position: absolute;
      top: 40%;
      left: 43%;
    }

    @keyframes rotate-animation {
      0% {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(180deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .paused {
      animation-play-state: paused !important;
    }

    .m-song-turn:before {
      content: " ";
      position: absolute;
      left: 10%;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 100;
      background: url("/static/img/disc.png") no-repeat;
      background-image: url("/static/img/disc-ip6.png");
      background-size: contain;
    }

    .lyric {
      position: relative;
      height: 100%;
      overflow: hidden;
    }

    .lyrics__item {
      color: white;
      line-height: 32px;
    }
    .lyricbg{
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
    }
    .lyricbg img{
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      opacity: .06;
    }
    .bar{
      height: 20px;
      position: relative;
      bottom: -4%;
      z-index: 400;
      padding: 0 20%;
    }
    .sTime{
      position: absolute;
      left: 0;
      color: #fff;
      width: 20%;
    }
    .eTime{
      position: absolute;
      right: 0;
      width: 20%;
      color: #fff;
    }
    .p_bar{
      position: relative;
      height: 3px;
      background: #fff;
      top:50%;
    }
    .audio_bar{
      position: absolute;
      font-style: normal;
      width: 0;
      height: 2px;
      background-color: #19d8bf;
      z-index: 400;
      left: 0;
      top: 0;
    }
    .audio_btn{
      position: absolute;
      margin-top: -3px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #fff;
      right: -7px;
    }
    .playlist{
      width: 100%;
      position: absolute;
      z-index: 100;
      background: #fff;
      border-radius: 20px 20px 0 0;
      bottom:0;
      display: none;
    }
    .playlist ul li{
      text-align: left;
      padding:4% 4% 4% 8%;
    }
    .curr{
      color: #19d8bf;
      font-weight: bold;
    }
    .menu {
      z-index: 200;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      padding-left: 6%;
    }

    .menu a {
      float: left;
      margin: 2% 4% 0 4%;
    }

    .loop_t {
      z-index: 300;
      display: block;
      width: 32px;
      height: 32px;
      margin-left: 4%;
      background: url("/static/img/play_t.png");
    }
    .pre {
      z-index: 300;
      display: block;
      width: 32px;
      height: 32px;
      background: url("/static/img/pre.png");
    }
    .next {
      z-index: 300;
      display: block;
      width: 32px;
      height: 32px;
      background: url("/static/img/next.png");
    }
    .play {
      z-index: 300;
      display: block;
      width: 32px;
      height: 32px;
      background: url("/static/img/play_m.png");
    }
    .list {
      z-index: 300;
      display: block;
      width: 32px;
      height: 32px;
      background: url("/static/img/list.png");
    }
    img[lazy=loading] {
      width: 40px;
      height: 40px;
      position: fixed;
      margin-left: 18%;
      margin-top: 20%;
    }

    img[lazy=error] {
      width: 40px;
      height: 40px;
      position: fixed;
      margin-left: 18%;
      margin-top: 20%;
    }
    /*iphone 5/se*/
    @media  screen and (max-width: 360px){
      .lyric{
        height: 110%;
      }
    }

    @media only screen and (max-width: 320px) and (min-height: 568px){
      .drag{
        margin-top: 50%;
      }
      .lyric{
        height: 70%;
      }
    }
    @media only screen and (max-width: 360px) and (min-height: 640px) {
      .lyric{
        height: 100%;
      }
    }
    /*iphone 6/7/8*/
    @media only screen and (min-height: 667px) {
      .menu{
        padding-left: 10%;
      }
      .menu a{
        margin-top: 6%;
      }
    }
    @media only screen and (max-width: 411px) and (min-height: 731px){
      .lyric{
        height: 114%;
      }
    }
    /*iphone 6/7/8/plus*/
    @media only screen and (min-height: 736px) {
      .drag{
        margin-top: 42%;
      }
      .m-song-turn:before{
        left: 14%;
      }
      .m-song-turn img{
        left: 28%;
      }
      .m-song-turn span img{
        left:44%;
      }
      .menu{
        padding-left: 10%;
      }
      .lyric{
        height: 120%;
      }
    }
    /*iphone x+*/
    @media only screen and (min-height: 812px){
      .drag{
        margin-top: 60%;
      }
      .lyric{
        height: 120%;
      }
    }

</style>
