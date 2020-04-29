<template>
  <div class="profile-setting">
    <!-- PROFILE SETTING HEADER -->
    <div class="profile-setting__header">
      <div @click="back">
        <GSvg nameIcon="angle-up"></GSvg>
      </div>
      <h2 class="profile-setting__title">profile setting</h2>
    </div>

    <!-- PROFILE SETTING OPTIONS -->
    <div class="profile-setting__options">
      <!-- OPTIONS SELECT IMAGE -->
      <div class="profile-setting__options__select-image">
        <!-- PREVIEW IMAGE -->
        <div class="profile-setting__options__preview-image">
          <img src="" alt="" />
        </div>
        <!-- SELECT -->
        <div class="profile-setting__options__select">
          <label for="file">change your image</label>
          <div class="profile-setting__options__custom-input">
            <input type="file" id="file" @input="getData($event)" accept="image/*" />
            <div class="edit">
              <button>uploade image</button>
              <p>{{ nameFile }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- OPTIONS NAME -->
      <div class="profile-setting__options__name">
        <label for="name">change your name</label>
        <input type="text" id="name" placeholder="change your name" />
      </div>
      <!--  -->
      <div class="profile-setting__options__email">
        <label for="email">change your email</label>
        <input type="email" id="email" placeholder="change your email" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Setting',
  data() {
    return {
      nameFile: 'no select image'
    };
  },
  methods: {
    getData(el) {
      this.nameFile = el.target.files[0].name;
    },
    //
    back() {
      return this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">
// PROFILE SETTING
.profile-setting {
  display: grid;
  grid-template-rows: [start-head] 15vh [end-head start-body] 1fr [end-body];
  grid-template-columns: [start-form] 50vw [end-form];
  justify-content: center;
  height: 100vh;
  text-transform: capitalize;

  // HEADER
  &__header {
    display: flex;
    align-items: center;
  }

  // TITLE
  &__title {
    display: flex;
    align-items: center;
    font-size: 5rem;
    text-transform: capitalize;
    grid-area: start-head / start-form / end-head / end-form;
    margin-left: 2rem;
  }

  // OPTIONS
  &__options {
    grid-area: start-body / start-form / end-body / end-form;
    background-color: map-get($background, back-second);
    padding: 1rem;
    border-radius: 1rem;

    //
    & > * {
      padding: 1.5rem 0;
      &:not(:last-child) {
        margin-bottom: 2rem;
        border-bottom: 1px solid rgb(215, 218, 230);
      }
    }

    //
    label {
      display: block;
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    //
    &__select-image {
      display: flex;
      align-items: center;
    }

    //
    &__preview-image {
      width: 100px;
      height: 100px;
      background-color: rgb(204, 155, 155);
      margin-right: 1.5rem;
      border-radius: 50%;
    }

    //
    &__select {
    }

    //
    &__custom-input {
      position: relative;
      padding: 10px;
      width: 300px;
      height: 50px;
      background-color: transparent;

      //
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

      //
      & > .edit {
        position: absolute;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
        @include translate('top', 'left', 0, 0);
        // background-color: orange;
        z-index: 1;

        & > button {
          @include btnManger(
            $fSize: 1.5rem,
            $backgroundColor: map-get($background, back-first),
            $padding: 1rem,
            $fontColor: black
          ) {
            border-radius: 0.5rem;
            color: map-get($color, color-first);
          }
        }

        & > p {
          font-size: 1.5rem;
        }
      }
    }

    //
    &__name,
    &__email {
      @include formManger(
        $dir: block,
        $widthForm: 100%,
        $widthInput: 60%,
        $padding: 1rem,
        $fontSize: 2rem,
        $bacColor: transparent,
        $fontColor: black,
        $border: 1px solid black,
        $outline: none,
        $fcPlaceholder: black,
        $bRadius: 1rem
      );
    }
  }
}
</style>
