<template>
  <!-- ADMIN REGISTER FORM -->
  <div class="admin__register__form">
    <!-- ALERT STATUS -->
    <transition name="alert">
      <alert-status
        key="1"
        v-if="statusClickCloseAlert"
        :title="title"
        :visibleSlide="true"
        :status="statusClickCloseAlert"
        :statusCorrect="!statusClose"
        :visibleClose="statusClose"
        @close="statusClickCloseAlert = $event"
      ></alert-status>
    </transition>
    <!-- HEAD -->
    <h2 class="admin__register__form__title" v-text="titleHead"></h2>
    <!-- ADMIN REGISTER FORM NAVIGATION -->
    <ul class="admin__register__navigation">
      <li
        :class="['admin__register__item', nameComponent == 'RegisterSignIn' ? 'admin__register__item--active' : '']"
        @click="nameComponent = 'RegisterSignIn'"
      >
        sign in
      </li>
      <li
        :class="['admin__register__item', nameComponent == 'RegisterSignUp' ? 'admin__register__item--active' : '']"
        @click="nameComponent = 'RegisterSignUp'"
      >
        sign up
      </li>
    </ul>

    <!-- ADMIN REGISTER FORM BOX -->
    <form class="admin__register__form__box">
      <!-- FORM -->
      <transition name="form" mode="out-in" appear>
        <component
          :is="nameComponent"
          @pushAlert="statusClickCloseAlert = $event"
          @pushTitle="title = $event"
          @statusClose="statusClose = $event"
          @closeAlert="statusClickCloseAlert = $event"
          @changeCompon="nameComponent = $event"
          :statusAlertNow="statusClickCloseAlert"
          :nameCollection="nameCollection"
          targetPageName="home"
          :statusInputId="statusInputId"
          :statusNameFunctionSubmit="statusNameFunctionSubmit"
        >
          <register-sign-in></register-sign-in>
          <register-sign-up></register-sign-up>
        </component>
      </transition>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Forms',
  props: {
    titleHead: {
      type: [String, Number],
      required: true
    },
    nameCollection: {
      type: [String, Number],
      required: true
    },
    statusInputId: {
      type: Boolean,
      required: false,
      default: false
    },
    statusNameFunctionSubmit: {
      type: String,
      default: 'admin'
    }
  },
  data() {
    return {
      nameComponent: 'RegisterSignIn',
      title: null,
      statusClickCloseAlert: false,
      statusClose: true
    };
  }
};
</script>

<style lang="scss">
.admin__register {
  // NAVIGATION
  &__navigation {
    display: flex;
    justify-content: space-between;
    list-style: none;
    color: white;
    width: 60%;
    text-transform: capitalize;
    margin-top: 4rem;
    border-radius: map-get($border-radius, third);
  }

  // ITEM
  &__item {
    justify-content: space-between;
    padding: 20px;
    border-radius: map-get($border-radius, second);
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
}
</style>
