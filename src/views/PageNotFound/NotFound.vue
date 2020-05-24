<template>
  <div class="page-not-found">
    <!-- INFO -->
    <div class="page-not-found__info">
      <h2 class="page-not-found__info__head">this page not found in site</h2>
      <p class="page-not-found__info__subtitle">click on this button will be go home :)</p>
      <router-link tag="div" :to="{ name }">
        <normal-button nameBtn="go to home"></normal-button>
      </router-link>
    </div>
    <!-- IMAGE -->
    <div class="page-not-found__image">
      <img src="@/assets/image/image-global/page-not-found.svg" alt="page not found" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data() {
    return {
      name: null
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.fullPath.includes('admin')) {
        vm.name = 'home';
      } else {
        vm.name = 'about';
      }
    });
  }
};
</script>

<style lang="scss">
// PAGE NOT FOUND
.page-not-found {
  // INFO
  &__info {
    background-color: map-get($background, back-first);
    text-align: center;
    text-transform: capitalize;
    color: map-get($color, color-first);
    font-size: 5rem;

    // RESPONSIVE
    @include respond(tablet-l) {
      font-size: 4.5rem;
    }
    // HEAD
    &__head {
      font-size: 1em;
      margin-top: 40vh;
      font-weight: 300;
    }

    // SUBTITLE
    &__subtitle {
      font-size: 0.4em;
      margin: 3rem 0;
    }

    // DIV
    div {
      width: fit-content;
      margin: 0 auto;
    }
  }
  // image
  &__image {
    // IMG
    img {
      margin-top: 20vh;
      max-width: 100%;
    }
  }

  // NORMAL BTN
  .normal-btn {
    border: 1px solid map-get($color, color-first);
    padding: 1.5rem 2rem;
    transition: all 0.3s ease;

    // HOVER
    &:hover {
      background-color: map-get($background, back-second);
      color: map-get($color, color-second);
    }
  }
}
</style>
