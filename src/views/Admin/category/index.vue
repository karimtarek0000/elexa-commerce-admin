<template>
  <div class="category-page setHeight">
    <!-- NOT YET -->
    <not-yet nameStatus="category" :status="false"></not-yet>
    <!-- ADD BUTTON -->
    <normal-button nameBtn="add" @normalBtn="c" :status="!statusModel">
      <GSvg nameIcon="add" title="add icon"></GSvg>
    </normal-button>
    <!-- MODEL POP UP -->
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
    <!-- CATEGORY -->
    <category-card v-if="allData.length !== 0" :allCategory="allData"></category-card>
  </div>
</template>

<script>
//
import ModelPopUp from '@/components/Admin/ModelPopUp/ModelPopUp';
import CategoryCard from '@/components/Admin/CategoryCard/CategoryCard';
//
export default {
  name: 'Category',
  mixins: ['modelPop', 'dynamicHeightPages'],
  data() {
    return {
      allData: []
    };
  },
  methods: {
    c() {
      return (this.statusModel = true);
    },
    //
    v(data) {
      return this.allData.push(data);
    }
  },
  //
  components: {
    ModelPopUp,
    CategoryCard
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
