<template>
  <div>
    <button
      :class="['button__confirm', { 'button__confirm--active': statusDisabled, 'button__confirm--wrong': classWrong }]"
      :type="typeBtn"
      @click.prevent="$emit('clicknow')"
      :disabled="statusDisabled"
      :style="classCheck ? 'pointer-events: none' : false"
    >
      <!-- TITLE -->
      <span :class="['button__confirm__title', { 'button__confirm__title--title': classCheck }]">{{ textButton }}</span>
      <!-- CONFIRM CHECK -->
      <div
        :class="[
          'button__confirm__check',
          {
            'button__confirm__check--check': classCheck,
            'button__confirm__check--correct': classCorrect,
            'button__confirm__check--wrong': classWrong
          }
        ]"
      >
        <!-- LOADER -->
        <loader :status="statusLoader"></loader>
        <!-- ICON CORRECT -->
        <div class="button__confirm__check__correct">
          <GSvg nameIcon="correct"></GSvg>
        </div>
        <!-- ICON WRONG -->
        <div class="button__confirm__check__wrong">
          <GSvg nameIcon="wrong"></GSvg>
        </div>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ButtonConfirm',
  props: {
    typeBtn: {
      type: String,
      required: false,
      default: 'submit'
    },
    statusLoader: {
      type: Boolean,
      required: false,
      default: false
    },
    textButton: {
      type: String,
      required: false,
      default: 'click'
    },
    statusDisabled: {
      type: Boolean,
      required: false,
      default: true
    },
    classCheck: {
      type: Boolean,
      required: false,
      default: false
    },
    classCorrect: {
      type: Boolean,
      required: false,
      default: false
    },
    classWrong: {
      type: Boolean,
      required: false,
      default: false
    },
    getFunction: {
      type: Function,
      required: false
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
// BUTTON CONFIRM
.button__confirm {
  position: relative;
  overflow: hidden;
  margin-top: 0.5rem;

  // BTN MANGER
  @include btnManger(
    $fSize: 1.8rem,
    $backgroundColor: map-get($background, back-first),
    $padding: 2.5rem 9.5rem,
    $fontColor: map-get($color, color-first),
    $border: 1px solid transparent,
    $tTransform: uppercase
  ) {
    border-radius: 5px;
    box-shadow: map-get($shadow, first);
    transition: all 0.5s ease;
  }

  // ACTIVE
  &--active {
    opacity: 0.5;
    cursor: auto;
  }

  // WRONG
  &--wrong {
    background-color: map-get($background, back-sixth);
    box-shadow: map-get($shadow, second);
  }

  // TITLE
  &__title {
    display: block;
    position: absolute;
    @include translate('top', 'left', 50%, 50%);
    transition: all 0.7s ease-in-out;
    opacity: 1;

    // TITLE
    &--title {
      left: -100%;
      opacity: 0;
      transform: scale(0);
    }
  }

  // CHECK
  &__check {
    width: 100%;

    // LOADER
    .loader {
      @include translate('top', 'right', 50%, -100%);
      transform: translateY(-50%) scale(0);
      opacity: 0;
      transition: all 0.7s ease-in-out;
    }

    // ACTIVE
    &--check {
      // LOADER
      .loader {
        right: 0;
        opacity: 1;
        transform: translateY(-50%) scale(1);
      }
    }

    // CORRECT
    &--correct,
    &--wrong {
      .loader {
        right: 100%;
        opacity: 0;
        transform: translateY(-50%) scale(0);
      }
    }
  }
}
</style>
