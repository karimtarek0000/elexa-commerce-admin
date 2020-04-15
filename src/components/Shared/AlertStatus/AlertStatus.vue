<template>
  <div :class="['alert__status', { 'alert__status--not-correct': statusCorrect }]" v-if="status">
    <span class="alert__status__close" v-if="visibleClose" @click="$emit('close', false)">&times;</span>
    <p class="alert__status__title" v-text="title"></p>
  </div>
</template>

<script>
export default {
  name: 'AlertStatus',
  props: {
    title: {
      type: [String, Number],
      required: false,
      default: 'error'
    },
    status: {
      type: Boolean,
      required: true,
      default: false
    },
    statusCorrect: {
      type: Boolean,
      required: true,
      default: false
    },
    visibleClose: {
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
// ALERT STATUS
.alert__status {
  padding: 10px;
  border-radius: 5px;
  color: map-get($color, color-first);
  box-shadow: map-get($shadow, first);
  text-transform: capitalize;

  // NOT CORRECT
  &--not-correct {
    background-color: map-get($background, back-sixth);
    box-shadow: map-get($shadow, second);
  }

  // CLOSE
  &__close {
    display: block;
    font-size: 3rem;
    margin-bottom: 1rem;
    cursor: pointer;
  }

  // TITLE
  &__title {
    user-select: none;
    font-size: 1.6rem;
    line-height: 2.4rem;
  }
}
</style>
