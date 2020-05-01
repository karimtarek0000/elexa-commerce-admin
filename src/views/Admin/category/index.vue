<template>
  <div class="category-page">
    <!--  -->
    <not-yet nameStatus="category"></not-yet>
    <!--  -->
    <normal-button nameBtn="add"></normal-button>
  </div>
</template>

<script>
export default {
  name: 'Category',
  data() {
    return {};
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
