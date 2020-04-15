<template>
  <section class="admin__register">
    <!-- ADMIN REGISTER WELCOME -->
    <div class="admin__register__welcome">
      <div class="admin__register__image">
        <img src="@/assets/image/image-admin/welcome-admin.svg" alt="" />
      </div>
      <div class="admin__register__logo">
        <GSvg nameIcon="elexa-logo"></GSvg>
      </div>
    </div>

    <!-- ADMIN REGISTER FORM -->
    <div class="admin__register__form">
      <!-- ALERT STATUS -->
      <transition name="alert">
        <alert-status
          key="1"
          v-if="st"
          :title="title"
          :status="true"
          :statusCorrect="true"
          :visibleClose="true"
          @close="st = $event"
        ></alert-status>
      </transition>
      <!-- HEAD -->
      <h2 class="admin__register__form__title">admin register</h2>
      <!-- ADMIN REGISTER FORM NAVIGATION -->
      <ul class="admin__register__navigation">
        <li
          :class="['admin__register__item', status == 'RegisterSignIn' ? 'admin__register__item--active' : '']"
          @click="status = 'RegisterSignIn'"
        >
          sign in
        </li>
        <li
          :class="['admin__register__item', status == 'RegisterSignUp' ? 'admin__register__item--active' : '']"
          @click="status = 'RegisterSignUp'"
        >
          sign up
        </li>
      </ul>

      <!-- ADMIN REGISTER FORM BOX -->
      <form class="admin__register__form__box">
        <transition name="form" mode="out-in" appear>
          <component :is="status" @f="st = $event" :checkc="st">
            <register-sign-in></register-sign-in>
            <register-sign-up></register-sign-up>
          </component>
        </transition>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      status: 'RegisterSignIn',
      title: 'email or password not correct please try again!',
      st: false
    };
  }
};
</script>

<style lang="scss">
// ADMIN REGISTER
.admin__register {
  display: grid;
  grid-template-columns: repeat(2, [col-start] 1fr [col-end]);
  height: 100vh;

  // WELCOME
  &__welcome {
    background-color: map-get($background, back-first);
    grid-column: col-start 1 / col-end 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  // IMAGE
  &__image {
  }
  // LOGO
  &__logo {
  }

  // FORM
  &__form {
    position: relative;
    grid-column: col-start 2 / col-end 2;
    background-color: map-get($background, back-second);
    display: flex;
    flex-direction: column;
    align-items: center;

    // BOX
    &__box {
      width: 60%;
    }

    // TITLE
    &__title {
      margin-top: 4rem;
      font-size: 5rem;
      font-weight: 300;
      text-transform: capitalize;
    }
  }

  // NAVIGATION
  &__navigation {
    display: flex;
    justify-content: space-between;
    list-style: none;
    color: white;
    width: 60%;
    text-transform: capitalize;
    margin-top: 4rem;
    border-radius: 10px;
  }

  // ITEM
  &__item {
    justify-content: space-between;
    padding: 20px;
    border-radius: 5px;
    font-size: 2.2rem;
    text-align: center;
    flex-basis: 47%;
    color: map-get($color, color-third);
    border: 1px solid map-get($background, back-fifth);
    cursor: pointer;

    // ACTIVE
    &--active {
      background-color: map-get($background, back-first);
      color: map-get($color, color-first);
      box-shadow: map-get($shadow, first);
    }
  }

  // ALERT STATUS
  .alert__status {
    position: absolute;
    display: block;
    padding: 2rem;
    width: 60%;
    @include translate('top', 'left', 2%, 50%);
  }
}
</style>
