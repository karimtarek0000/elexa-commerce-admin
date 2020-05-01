<template>
  <div class="model-pop-up">
    <!-- EXIT -->
    <div class="model-pop-up__exit" @click="sendEventCancel">
      <GSvg nameIcon="wrong"></GSvg>
    </div>
    <!-- MODEL POP UP INNER -->
    <div class="model-pop-up__inner">
      <!-- TITLE -->
      <h2 class="model-pop-up__title" v-text="title"></h2>
      <!-- MODEL POP UP BOX -->
      <div class="model-pop-up__box">
        <!-- NAME ITEM -->
        <div class="model-pop-up__category model-pop-up__category--name-item">
          <label for="nameItem">enter name item</label>
          <input type="text" name="nameItem" placeholder="enter name item" />
        </div>
        <!-- PRICE ITEM -->
        <div class="model-pop-up__category model-pop-up__category--price-item">
          <label for="priceItem">enter price item</label>
          <input type="number" name="priceItem" value="0" />
        </div>
        <!-- DISCOUNT ITEM -->
        <div class="model-pop-up__category model-pop-up__category--discount-item">
          <label for="discountItem">enter discount item</label>
          <input type="number" name="discountItem" value="0" />
        </div>
        <!-- ADD ITEM -->
        <normal-button :statusIcon="false" nameBtn="add item"></normal-button>
        <!-- CANCEL -->
        <normal-button :statusIcon="false" @normalBtn="sendEventCancel" nameBtn="cancel"></normal-button>
        <!-- BUTTON SUBMIT -->
        <!-- <button-confirm
          :statusLoader="true"
          textButton="add item"
          :classCheck="check"
          :classCorrect="correct"
          :classWrong="wrong"
          :statusDisabled="statusDisabledBtnSubmit"
          @clicknow="actionSubmit"
        ></button-confirm> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModelPopUp',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    //
    sendEventCancel() {
      return this.$emit('clickExit', false);
    }
  }
};
</script>

<style lang="scss">
// MODEL POP UP
.model-pop-up {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: map-get($background, back-second);
  padding: 4rem;
  box-shadow: map-get($shadow, fourth);
  border-radius: 7px;
  @include translate('top', 'right', -20%, 0);
  width: 100%;
  height: 100%;
  z-index: 9999;

  //
  &__exit {
    position: absolute;
    font-size: 5rem;
    padding: 0.2em;
    @include translate('top', 'right', 3%, 3%);
    cursor: pointer;
  }

  // INNER
  &__inner {
    background-color: red;
    width: 50%;
    padding: 2rem;
    background-color: white;
    border-radius: 7px;
    text-transform: capitalize;
  }

  // TITLE
  &__title {
    font-size: 3rem;
    font-weight: 300;
    border-bottom: 0.5px solid black;
    padding: 0.5em 0;
    margin-bottom: 0.8em;
  }

  // BOX
  &__box {
    // ALL DIRECT
    & > * {
      &:not(:last-child) {
        margin-bottom: 2rem;
      }
    }
  }

  // CATEGORY
  &__category {
    // LABEL
    & label {
      display: block;
      font-size: 2rem;
      margin-bottom: 0.5em;
    }
    // FORM MANGER
    @include formManger(
      $dir: block,
      $widthForm: 80%,
      $widthInput: 80%,
      $padding: 1rem,
      $fontSize: 1.7rem,
      $bacColor: map-get($background, back-second),
      $fontColor: map-get($color, color-sixth),
      $border: 1px solid map-get($background, back-first),
      $fcPlaceholder: map-get($color, color-third),
      $bRadius: 7px
    ) {
      font-weight: 300;
    }

    // NAME ITEM
    &--name-item {
    }
    // PRICE ITEM AND DISCOUNT ITEM
    &--price-item,
    &--discount-item {
      & input[type='number'] {
        width: 40%;
      }
    }
    // DISCOUNT ITEM
    &--discount-item {
    }
  }

  // CHANGE NORMAL BTN
  .normal-btn {
    display: inline-block;
    padding: 1rem 2rem;
    margin-top: 2rem;

    // NTH OF TYPE 1
    &:nth-of-type(1) {
      margin-right: 1.7rem;
    }
    // NTH OF TYPE 2
    &:nth-of-type(2) {
      background-color: map-get($background, back-second);
      border: 0.5px solid map-get($background, back-first);
      color: map-get($color, color-third);
      box-shadow: none;
    }
  }
}
</style>
