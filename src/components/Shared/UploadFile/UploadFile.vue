<template>
  <div class="upload-file__select">
    <!-- PREVIEW IMAGE -->
    <div class="upload-file__preview-image">
      <img v-if="sendNewImage" :src="sendNewImage" alt="image" />
      <img v-else :src="require(`@/assets/image/${addImageAvatar}`)" alt="image" />
    </div>
    <!-- SELECT -->
    <div class="upload-file__select-image">
      <label for="file" v-text="nameLabel"></label>
      <div class="upload-file__custom-input">
        <input type="file" id="file" @change="getData($event)" />
        <div class="edit">
          <button>upload image</button>
          <p>{{ nameFile }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadFile',
  props: {
    addImageAvatar: {
      type: [String, Number],
      required: true
    },
    nameLabel: {
      type: String,
      default: 'select'
    },
    sendNewImage: {
      type: [String, Number],
      required: false
    }
  },
  data() {
    return {
      nameFile: 'no select image'
    };
  },
  methods: {
    // GET DATA
    getData(el) {
      this.nameFile = el.target.files[0].name;
      //   WILL BE POST DATA OTHER COMPONENTS
      this.$emit('postFile', this.nameFile);
    }
  }
};
</script>

<style lang="scss">
//
.upload-file {
  //
  &__select {
    display: flex;
    align-items: center;
  }
  //
  &__preview-image {
    width: 80px;
    height: 80px;
    margin-right: 1.5rem;
    border-radius: 50%;
    flex-shrink: 0;

    //
    & img {
      max-width: 100%;
    }
  }
  // CUSTOM INPUT
  &__custom-input {
    position: relative;
    padding: 10px;
    width: 300px;
    height: 50px;
    background-color: transparent;

    // INPUT TYPE FILE
    input[type='file'] {
      position: absolute;
      display: block;
      @include translate('top', 'left', 0, 0);
      width: 100%;
      height: 100%;
      background-color: red;
      z-index: 2;
      opacity: 0;
      cursor: pointer;
    }

    // EDIT
    & > .edit {
      position: absolute;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100%;
      @include translate('top', 'left', 0, 0);
      z-index: 1;

      //
      & > button {
        @include btnManger(
          $fSize: 1.5rem,
          $backgroundColor: map-get($background, back-first),
          $padding: 1rem,
          $fontColor: black
        ) {
          border-radius: map-get($border-radius, second);
          color: map-get($color, color-first);
        }
      }

      //
      & > p {
        font-size: 1.5rem;
      }
    }
  }
}
</style>
