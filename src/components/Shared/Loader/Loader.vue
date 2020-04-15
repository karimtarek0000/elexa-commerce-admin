<template>
  <div class="loader" v-if="status">
    <span class="loader__icon"></span>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    status: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
//
$color-border: map-get($background, back-second);

// LOADER
.loader {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;

  // ICON
  &__icon {
    display: block;
    border: 3px solid;
    border-color: $color-border transparent $color-border $color-border;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: rotateLoader 0.5s ease infinite;
  }
}
</style>
