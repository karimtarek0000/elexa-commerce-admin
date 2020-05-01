<template>
  <button class="normal-btn" @click="$emit('normalBtn')">
    {{ nameBtn }}
    <GSvg v-if="statusIcon" nameIcon="add"></GSvg>
  </button>
</template>

<script>
export default {
  name: 'NormalButton',
  props: {
    nameBtn: {
      type: String,
      default: 'click here'
    },
    statusIcon: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
// NORMAL BTN
.normal-btn {
  display: flex;
  align-items: center;

  //
  @include btnManger(
    $fSize: 2rem,
    $width: auto,
    $height: auto,
    $backgroundColor: map-get($background, back-first),
    $padding: 0.5rem 1rem,
    $fontColor: map-get($color, color-first),
    // $tTransform: uppercase
  ) {
    border-radius: 5px;
    box-shadow: map-get($shadow, first);
  }
}
</style>
