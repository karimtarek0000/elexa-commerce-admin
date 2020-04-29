<template>
  <div class="profile-setting">
    <!-- PROFILE SETTING HEADER -->
    <transition name="profile-head">
      <div class="profile-setting__header" v-if="statusAnim">
        <div class="profile-setting__icon" @click="back">
          <GSvg nameIcon="angle-up"></GSvg>
        </div>
        <h2 class="profile-setting__title">profile setting</h2>
      </div>
    </transition>

    <!-- PROFILE SETTING OPTIONS -->
    <transition name="profile-setting">
      <div class="profile-setting__options" v-if="statusAnim">
        <!-- OPTIONS SELECT IMAGE -->
        <div class="profile-setting__options__select-image">
          <!-- PREVIEW IMAGE -->
          <div class="profile-setting__options__preview-image">
            <img src="@/assets/image/image-global/avatar.png" alt="" />
          </div>
          <!-- SELECT -->
          <div class="profile-setting__options__select">
            <label for="file">change your image</label>
            <div class="profile-setting__options__custom-input">
              <input type="file" id="file" @change="getData($event)" />
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
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Setting',
  data() {
    return {
      nameFile: 'no select image',
      statusAnim: false
    };
  },
  methods: {
    getData(el) {
      this.nameFile = el.target.files[0].name;
    },
    //
    back() {
      return this.$router.back();
    }
  },
  mounted() {
    // STATUS ANIMATION
    this.statusAnim = true;
  }
  // beforeRouteEnter(to, from, next) {
  //   const pathFrom = from.path;
  //   next(vm => {
  //     vm.$router.push({ params: { namePage: `${pathFrom} #` } });
  //   });
  // }
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
    font-weight: 300;
    letter-spacing: 1px;
  }

  // ICON
  &__icon {
    animation: iconBack 1s ease 5 alternate;
  }

  // OPTIONS
  &__options {
    grid-area: start-body / start-form / end-body / end-form;
    background-color: map-get($background, back-second);
    padding: 1rem;
    border-radius: 1rem;

    //
    & > * {
      padding: 2rem 0;
      &:not(:last-child) {
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
      margin-right: 1.5rem;
      border-radius: 50%;

      //
      & img {
        max-width: 100%;
      }
    }

    //
    &__select {
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
            border-radius: 0.5rem;
            color: map-get($color, color-first);
          }
        }

        //
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
        $fontSize: 1.5rem,
        $bacColor: transparent,
        $fontColor: black,
        $border: 1px solid lighten(map-get($background, back-first), 30%),
        $outline: none,
        $fcPlaceholder: black,
        $bRadius: 0.5rem
      ) {
        transition: all 0.5s;
        &:focus {
          border-color: map-get($background, back-first);
        }
      }
    }
  }
}

//////////////////////////////////
/// ANIMATION
// PROFILE HEAD
.profile-head-enter-active {
  animation: slideRight 1s ease-out forwards;
}
.profile-head-leave-to {
  animation: slideleft 1s ease-out forwards;
}

// PROFILE SETTING
.profile-setting-enter-active {
  animation: moveUp 1s ease-out forwards;
}

// SLIDE RIGHT
@keyframes slideRight {
  0% {
    transform: translateX(50px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
// SLIDE RIGHT
@keyframes slideleft {
  0% {
    transform: translateX(0);
    opacity: 0;
  }
  100% {
    transform: translateX(50px);
    opacity: 1;
  }
}

// MOVE UP
@keyframes moveUp {
  0% {
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

// ICON BACK
@keyframes iconBack {
  0% {
    transform: translateX(20px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
