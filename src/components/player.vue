<template>
  <div class="bg">
    <div class="drag">
      <div class="m-song-turn">
        <img src="/static/img/jay.jpg" class="paused" @click="animat(1,$event)">
        <span v-if="isplay"><img src="/static/img/paused.png" class="paused" @click="animat(2,$event)"></span>
      </div>
      <div class="lyric">
        <p id="line_0" class="lyrics__item">告白气球 - 周杰伦 (Jay Chou)</p>
        <p id="line_1" class="lyrics__item">词：方文山</p>
        <p id="line_2" class="lyrics__item">曲：周杰伦</p>
        <p id="line_3" class="lyrics__item">塞纳河畔 左岸的咖啡</p>
        <p id="line_4" class="lyrics__item">我手一杯 品尝你的美</p>
        <p id="line_5" class="lyrics__item">留下唇印的嘴</p>
        <p id="line_6" class="lyrics__item">花店玫瑰 名字写错谁</p>
        <p id="line_7" class="lyrics__item">告白气球 风吹到对街</p>
        <p id="line_8" class="lyrics__item">微笑在天上飞</p>
      </div>
      <div class="menu">
        <a href="javascript:void(0)" class="loop_t"></a>
        <a href="javascript:void(0)" class="pre"></a>
        <a href="javascript:void(0)" class="play"></a>
        <a href="javascript:void(0)" class="next"></a>
        <a href="javascript:void(0)" class="list"></a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'player',
    data () {
      return {
        id: this.$route.query.id,
        isplay: true
      }
    },
    methods: {
      animat: function (i, el) {
        if (i == 1) {
          var thisclass = el.target.className
          if (thisclass == 'running') {
            el.target.className = 'paused'
            this.isplay = true
          } else if (thisclass == 'paused') {
            el.target.className = 'running'
            this.isplay = false
          }
        } else if (i == 2) {
          el.target.parentElement.parentElement.firstChild.className = 'running'
          this.isplay = false
        }
      }
    }
  }
</script>

<style scoped>
  .bg {
    width: 100%;
    height: 100%;
    position: relative;
    background: url("/static/img/timg.jfif") no-repeat fixed;
    padding: 1px;
    box-sizing: border-box;
    z-index: 1;
  }

  .bg:after {
    content: "";
    width: 100%;
    height: 1000px;
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
    margin-top: 70%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 300px;
    text-align: center;
    z-index: 11;
  }

  .m-song-turn {
    position: relative;
    z-index: 120;
    width: 290px;
    height: 290px;
    margin: 0 auto;
  }

  .m-song-turn img {
    z-index: 200;
    position: absolute;
    width: 185px;
    height: 185px;
    left: 18%;
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
    left: 40%;
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

  .running {
    /*animation-play-state: running !important;*/
  }

  .m-song-turn:before {
    content: " ";
    position: absolute;
    left: 0;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    background: url("/static/img/disc.png") no-repeat;
    background-image: url("/static/img/disc-ip6.png");
    background-size: contain;
  }

  .lyrics__item {
    color: white;
  }

  .menu {
    z-index: 200;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding-left: 6%;
  }
  .menu a{
    float: left;
    margin: 2% 4% 0 4%;
  }
  .loop_t{
    z-index: 300;
    display: block;
    width: 40px;
    height: 40px;
    background: url("/static/img/playbar.png") no-repeat 0 9999px;
    background-position: -90px -244px;
  }
  .next{
    z-index: 300;
    display: block;
    width: 36px;
    height: 36px;
    background: url("/static/img/playbar.png") no-repeat 0 9999px;
    background-position: 0 -204px;
  }
</style>
