<template>
  <div class="over">
    <span class="rela">
      <p v-if="time == 'over'">活动已结束！</p>
      <p v-else>团长取消拼团，组团失效</p>
      <img src="../assets/image/01.jpg" />
    </span>
      <img src="../assets/image/02.jpg" />
      <img src="../assets/image/03.jpg" />
      <img src="../assets/image/04.jpg" />
  </div>
</template>
<script>
export default {
  data(){
    return{
      time:'over'
    }
  },
  created(){
    this.time = location.href.includes('time=over')?'over':'not'
  }
}
</script>
<style lang="scss" scoped>
  .over{
    width: 100%;
    .rela{
      position: relative;
      width: 100%;
      display: inline-block;
      p{
        color: #fff444;
        font-size: .23rem;
        font-weight: bold;
        position: absolute;
        top: 2.4rem;
        left: 0;
        width: 100%;
        text-align: center;
        z-index: 99;
      }
    }
    img{
      width: 100%;
      vertical-align: bottom;
    }
  }
</style>
