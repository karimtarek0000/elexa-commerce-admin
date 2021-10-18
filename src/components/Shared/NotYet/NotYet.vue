<template>
  <div class="not-yet" v-if="status">
    <h2 class="not-yet__title">not {{ nameStatus }} yet</h2>
  </div>
</template>

<script>
export default {
  name: 'NotYet',
  props: {
    nameStatus: {
      type: String,
      required: true
    },
    status: {
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
//
.not-yet {
  position: absolute;
  @include translate('top', 'left', 40%, 50%);
  text-transform: capitalize;

  // TITLE
  &__title {
    font-size: 2rem;
    font-weight: 300;
    letter-spacing: 1px;
  }
}
</style>
