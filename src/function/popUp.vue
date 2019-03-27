<template>
    <div class="popup" ref="popUp">
      <div class="cont">
        <i class="p_icon"></i>
        <div>{{cont}}</div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'popUp',
    data () {
      return {}
    },
    props: {
      cont: {
        type: String,
        default: null
      }
    }
  }
</script>

<style scoped>
  .popup {
    width: 100%;
    height: 5%;
    position: fixed;
    top: 21%;
    border: 1px dotted #cccccc;
    background: white;
    border-radius: 15px;
  }

  .popup .cont .p_icon {
    position: absolute;
    width: 32px;
    height: 32px;
    background: url("/static/img/popup_mg.png");
    left: 4%;
    top: 10%;
  }

  .popup .cont div {
    width: 100%;
    font-weight: bold;
    color: #777777;
    padding-top: 3%;
  }
</style>
