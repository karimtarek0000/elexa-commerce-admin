<template>
  <svg>
    <use :xlink:href="require('@/assets/image/icons/sprite.svg') + '#icon-' + nameIcon">
      <title v-text="title"></title>
    </use>
  </svg>
</template>

<script>
export default {
  name: 'GSvg',
  props: {
    title: {
      type: String,
      default: 'icon'
    },
    nameIcon: {
      type: String,
      required: true
    }
  }
};
</script>

<style></style>
