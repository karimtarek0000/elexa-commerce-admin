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
          <label for="nameItem">enter name</label>
          <input type="text" name="nameItem" v-model="allData.name" placeholder="enter name" ref="nameItem" />
        </div>
        <!-- SELECT IMAGE -->
        <div class="model-pop-up__category model-pop-up__category--select-image" v-if="statusSelectImage">
          <upload-file
            addImageAvatar="image-global/item.png"
            :sendNewImage="sendNewImage"
            :statusLoader="statusLoader"
            :textButton="textButton"
            nameLabel="select image product"
            @postFile="allData.image = $event"
            @changeNewImage="changeImage"
          ></upload-file>
        </div>
        <!-- PRICE ITEM -->
        <div class="model-pop-up__category model-pop-up__category--price-item" v-if="statusPrice">
          <label for="priceItem">enter price</label>
          <input type="number" name="priceItem" min="0" v-model="allData.price" />
        </div>
        <!-- DISCOUNT ITEM -->
        <div class="model-pop-up__category model-pop-up__category--discount-item" v-if="statusDiscount">
          <label for="discountItem">enter discount</label>
          <input type="number" name="discountItem" min="0" v-model="allData.discount" />
        </div>
        <!-- QUANTITY ITEM -->
        <div class="model-pop-up__category model-pop-up__category--quantity-item" v-if="statusQuantity">
          <label for="quantityItem">enter quantity</label>
          <input type="number" name="quantityItem" min="0" v-model="allData.quantity" />
        </div>
        <!-- SELECT CATEGORY -->
        <div class="model-pop-up__category model-pop-up__category--select-category" v-if="statusSelect">
          <label for="selectCategory">select category</label>
          <!--  -->
          <div class="custom-select">
            <div class="custom-select__icon">
              <GSvg nameIcon="angle-up"></GSvg>
              <GSvg nameIcon="angle-down"></GSvg>
            </div>
            <!--  -->
            <select v-model="allData.selectCategory">
              <option v-for="(category, index) in getAllCategory" :key="index" :value="category" v-text="category"></option>
            </select>
          </div>
        </div>
        <!-- ALL BUTTON -->
        <div class="model-pop-up__category model-pop-up__category--buttons">
          <!-- ADD ITEM -->
          <button-confirm
            :statusLoader="true"
            textButton="add"
            :classCheck="check"
            :classCorrect="correct"
            :classWrong="wrong"
            :statusDisabled="statusDisabled"
            @clicknow="actionSubmit"
          ></button-confirm>
          <!-- CANCEL -->
          <normal-button :statusIcon="false" @normalBtn="sendEventCancel" nameBtn="cancel"></normal-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModelPopUp',
  props: {
    check: {
      type: Boolean,
      default: false
    },
    correct: {
      type: Boolean,
      default: false
    },
    wrong: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    statusPrice: {
      type: Boolean,
      default: true
    },
    statusDiscount: {
      type: Boolean,
      default: true
    },
    statusQuantity: {
      type: Boolean,
      default: true
    },
    statusSelect: {
      type: Boolean,
      default: true
    },
    statusSelectImage: {
      type: Boolean,
      default: true
    },
    sendNewImage: {
      type: [String, Boolean],
      required: false
    },
    getAllCategory: {
      type: Array,
      default: null
    },
    statusLoader: {
      type: Boolean,
      default: false
    },
    textButton: {
      type: String
    }
  },
  data() {
    return {
      allData: {
        name: null,
        price: 0,
        discount: 0,
        image: null,
        quantity: 0,
        selectCategory: null
      }
    };
  },
  computed: {
    // STATUS DISABLED
    statusDisabled() {
      if (this.statusPrice && this.statusDiscount && this.statusSelect && this.statusQuantity) {
        if (this.allData.name && this.allData.price && this.allData.selectCategory && this.allData.quantity) {
          return false;
        } else {
          return true;
        }
      } else if (this.allData.name) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    // ACTION SUBMIT
    actionSubmit() {
      if (this.allData.name && this.allData.price && this.allData.selectCategory && this.allData.quantity) {
        // CONVERT DATA TO NUMBER FROM INPUT
        const price = parseFloat(this.allData.price);
        const discount = parseFloat(this.allData.discount) || 0;
        const quantity = parseFloat(this.allData.quantity);
        // ASSIGN DATA INTO OBJECT
        const finalData = Object.assign({}, this.allData, { price, discount, quantity });
        // CUSTOM EVENT RETURN ALL DATA
        return this.$emit('postAllData', finalData);
      } else if (this.allData.name) {
        // CUSTOM EVENT RETURN DATA NAME
        return this.$emit('postAllData', this.allData.name);
      }
    },
    // SEND EVENT CANCEL
    sendEventCancel() {
      return this.$emit('clickExit', false);
    },
    //
    changeImage(status) {
      this.$emit('changeNewImage', status);
    }
  },
  watch: {
    'allData.image'() {
      this.$emit('sendDataImg', this.allData.image);
    }
  },
  mounted() {
    // VAR INPUT NAME ITEM
    const inputNameItem = this.$refs.nameItem;

    // INIT INPUT WILL BE FOCUS IN
    if (inputNameItem) inputNameItem.focus();
  }
};
</script>

<style lang="scss">
// MODEL POP UP
.model-pop-up {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: map-get($background, back-second);
  padding: 4rem;
  box-shadow: map-get($shadow, fourth);
  border-radius: map-get($border-radius, first);
  @include translate('top', 'right', -148px, 0);
  width: 100%;
  height: 100vh;
  z-index: 9999;

  // RESPONSIVE
  @include respond(tablet-p) {
    top: -120px;
  }

  // EXIT
  &__exit {
    position: absolute;
    font-size: 5rem;
    padding: 0.2em;
    @include translate('top', 'right', 3%, 3%);
    cursor: pointer;
  }

  // INNER
  &__inner {
    width: 60%;
    padding: 2rem;
    background-color: white;
    border-radius: map-get($border-radius, first);
    text-transform: capitalize;

    // RESPONSIVE
    @include respond(tablet-p) {
      width: 70%;
    }
    @include respond(760px) {
      width: 85%;
    }
  }

  // TITLE
  &__title {
    font-size: 3rem;
    font-weight: 300;
    border-bottom: 0.5px solid map-get($background, back-fifth);
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
    &--discount-item,
    &--quantity-item {
      width: 40%;
      display: inline-block;
      //
      & input[type='number'] {
        width: 100%;
      }
    }

    // DISCOUNT ITEM
    &--discount-item {
      margin-left: 10%;
    }

    // SELECT CATEGORY
    &--select-category {
      // CUSTOM SELECT
      .custom-select {
        position: relative;
        width: 40%;
        height: 100%;
        background-color: blue;

        // ICON
        &__icon {
          position: absolute;
          display: block;
          @include translate('top', 'right', 1.5px, 10px);
          z-index: 200;
          pointer-events: none;

          // ALL DIRECT
          & > * {
            display: block;
          }
        }
      }
      // SELECT
      & select {
        position: absolute;
        display: block;
        @include translate('top', 'left', 0, 0);
        width: 100%;
        appearance: none;
        border: 1px solid map-get($background, back-first);
        padding: 1rem;
        outline: none;
        font-size: 1.7rem;
        border-radius: map-get($border-radius, first);
        text-transform: capitalize;
        background-color: map-get($background, back-second);
      }
    }

    // CHANGE NORMAL BTN
    &--buttons {
      display: flex;
      font-size: 1.7rem;
      margin-top: 7rem;

      // BUTTON CONFIRM
      .button__confirm {
        margin: 0;
        padding: 2.5rem 7rem;
        font-size: 1.6rem;
      }
      // NORMAL BTN
      .normal-btn {
        padding: 1.2rem 3rem;
        margin-left: 0.5rem;
        background-color: map-get($background, back-second);
        border: 0.5px solid map-get($background, back-first);
        color: map-get($color, color-third);
        box-shadow: none;
        text-transform: uppercase;
        font-size: 1.6rem;
      }
    }
  }

  //
}
</style>
