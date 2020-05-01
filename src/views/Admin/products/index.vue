<template>
  <div class="products-page">
    <!--  -->
    <not-yet nameStatus="products"></not-yet>
    <!--  -->
    <normal-button nameBtn="add" @normalBtn="c"></normal-button>
    <!--  -->
    <transition name="model">
      <model-pop-up v-if="statusModel" @clickExit="statusModel = $event" title="add new item"></model-pop-up>
    </transition>
  </div>
</template>

<script>
//
import ModelPopUp from '@/components/Admin/ModelPopUp/ModelPopUp';
//
export default {
  name: 'Products',
  data() {
    return {
      statusModel: false
    };
  },
  methods: {
    c() {
      return (this.statusModel = true);
    }
  },
  components: {
    ModelPopUp
  }
};
</script>

<style lang="scss">
// PRODUCTS PAGE
.products-page {
  position: relative;
  width: 100%;
  height: 100%;

  //
  & > .normal-btn {
    @extend %editNormalBtn;
  }
}
</style>
