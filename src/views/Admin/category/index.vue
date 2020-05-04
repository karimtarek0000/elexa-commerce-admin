<template>
  <div class="category-page">
    <!--  -->
    <not-yet nameStatus="category" :status="!statusModel"></not-yet>
    <!--  -->
    <normal-button nameBtn="add" @normalBtn="c" :status="!statusModel"></normal-button>
    <!--  -->
    <transition name="model">
      <model-pop-up
        v-if="statusModel"
        @clickExit="statusModel = $event"
        title="add new category"
        :statusPrice="false"
        :statusDiscount="false"
        :statusQuantity="false"
        :statusSelect="false"
        :statusSelectImage="false"
        @postAllData="v"
      ></model-pop-up>
    </transition>
  </div>
</template>

<script>
//
import ModelPopUp from '@/components/Admin/ModelPopUp/ModelPopUp';
//
export default {
  name: 'Category',
  mixins: ['modelPop'],
  data() {
    return {};
  },
  methods: {
    c() {
      return (this.statusModel = true);
    },
    //
    v(data) {
      return console.log(data);
    }
  },
  //
  components: {
    ModelPopUp
  }
};
</script>

<style lang="scss">
// CATEGORY PAGE
.category-page {
  position: relative;
  width: 100%;
  height: 100%;

  & > .normal-btn {
    @extend %editNormalBtn;
  }
}
</style>
