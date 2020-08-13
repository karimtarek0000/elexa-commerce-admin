<template>
  <div class="upload-file__select">
    <!-- PREVIEW IMAGE -->
    <div class="upload-file__preview-image">
      <img v-if="sendNewImage" :src="sendNewImage" alt="image" />
      <loader v-else-if="statusLoader" selectColorLoader="#0064ff" :status="statusLoader"></loader>
      <img v-else :src="require(`@/assets/image/${addImageAvatar}`)" alt="image" />
    </div>
    <!-- SELECT -->
    <div class="upload-file__select-image">
      <label @click="$refs.file.click()" v-text="nameLabel"></label>
      <div class="upload-file__custom-input">
        <input type="file" ref="file" @change="getData($event)" />
        <div class="edit">
          <button v-text="textButton" :class="{ change: textButton == 'change image' }"></button>
          <p>{{ image.name ? image.name : image }}</p>
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
    textButton: {
      type: String,
      default: 'upload file'
    },
    sendNewImage: {
      type: [String, Boolean],
      required: false
    },
    statusLoader: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      image: 'no select image'
    };
  },
  methods: {
    // GET DATA
    getData(el) {
      // NAME FILE
      this.image = el.target.files[0];
      // WILL BE POST CHANGE IMAGE
      this.$emit('changeNewImage', null);
      // WILL BE POST DATA OTHER COMPONENTS
      this.$emit('postFile', this.image);
    }
  }
};
</script>

<style lang="scss">
//
.upload-file {
  width: 57px;
  // SELECT
  &__select {
    display: flex;
    align-items: center;
  }
  // PREVIEW IMAGE
  &__preview-image {
    position: relative;
    width: 80px;
    height: 80px;
    margin-right: 1.5rem;
    border-radius: 50%;
    flex-shrink: 0;
    overflow: hidden;
    border: 1px solid map-get($background, back-fifth);

    // IMAGE
    & img {
      max-width: 100%;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  //
  &__select-image {
    width: calc(100% - 100px);
  }
  // CUSTOM INPUT
  &__custom-input {
    position: relative;
    padding: 10px;
    width: 500px;
    height: 40px;
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
      @include translate('top', 'left', 0, 0);
      z-index: 1;

      // BUTTON
      & > button {
        @include btnManger(
          $fSize: 1.5rem,
          $backgroundColor: map-get($background, back-first),
          $padding: 1rem,
          $fontColor: black
        ) {
          border-radius: map-get($border-radius, second);
          color: map-get($color, color-first);
          margin-right: 10px;
        }
      }

      // CHANGE
      .change {
        background-color: map-get($background, back-sixth);
      }

      // P
      & > p {
        font-size: 1.5rem;
      }
    }
  }
}
</style>
