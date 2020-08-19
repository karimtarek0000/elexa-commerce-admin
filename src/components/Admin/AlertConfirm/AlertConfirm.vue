<template>
  <div class="alert-confirm" ref="alertConfirm">
    <div class="alert-confirm__inner">
      <p class="alert-confirm__question">
        {{ message }}
      </p>
      <NormalButton :nameBtn="titleBtn" @normalBtn="statusBtn(true)" class="alert-confirm__confirmed alert-confirm__confirmed--deleted"></NormalButton>
      <NormalButton nameBtn="cancel" @normalBtn="statusBtn(false)" class="alert-confirm__confirmed alert-confirm__confirmed--cancel"></NormalButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertConfirm',
  props: {
    message: {
      type: String,
      default: 'empty'
    },
    titleBtn: {
      type: String,
      required: true
    }
  },
  methods: {
    // STATUS BTN
    statusBtn(status) {
      return this.$emit('normalBtn', status);
    }
  },
  created() {
    // HANDELAR KEYDOWN
    const handelarKeyDown = e => {
      if (e.key == 'Escape') {
        this.statusBtn(false);
      }
    };
    // ADD EVENT LISTENER IN DOCUMNET
    document.addEventListener('keydown', handelarKeyDown);
    // REMOVE EVENT LISTENER
    this.$once('hook:destroyed', () => document.removeEventListener('keydown', handelarKeyDown));
  }
};
</script>

<style scoped lang="scss">
// ALERT CONFIRM
.alert-confirm {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20000;
  width: 40%;
  padding: 15px;
  border-radius: map-get($border-radius, first);
  background-color: map-get($background, back-sixth);
  color: white;
  font-size: 2rem;
  // INNER
  &__inner {
  }
  // QUESTION
  &__question {
    margin-bottom: 1em;
    text-transform: capitalize;
  }
  // CONFIRMED
  &__confirmed {
    padding: 1rem;
    display: inline-block;
    box-shadow: none;
    font-size: 0.9em;

    // DELETE
    &--deleted {
      background-color: map-get($background, back-twelveth);
      margin-right: 5px;
    }
    // CANCEL
    &--cancel {
      background-color: map-get($background, back-second);
      color: map-get($color, color-third);
    }
  }
}
</style>
