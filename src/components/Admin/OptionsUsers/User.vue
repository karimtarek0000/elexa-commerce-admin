<template>
  <div class="admin__header__user">
    <!-- START ADMIN HEADER OPTIONS USER CONTENT -->
    <div class="admin__header__user__content" @click.stop="toggleSlide">
      <div class="admin__header__user__avatar">
        <img :src="require(`@/assets/${imgUser}`)" alt="avatar" />
      </div>

      <!-- START ADMIN HEADER OPTIONS USER NAME -->
      <div class="admin__header__user__name">
        <span v-text="userName"></span>
      </div>

      <!-- START ADMIN HEADER OPTIONS USER ICON -->
      <div class="admin__header__user__icon">
        <GSvg nameIcon="angle-down"></GSvg>
      </div>
    </div>

    <!-- START ADMIN HEADER USER CONTENT -->
    <ul :class="['admin__header__user__options', { 'admin__header__user__options--active': statusToggle }]">
      <router-link class="admin__header__user__options__item" tag="li" :to="{ name: 'ProfileSettingAdmin' }">
        <GSvg nameIcon="settings"></GSvg>
        <span class="admin__header__user__options__title">settings</span>
      </router-link>

      <li class="admin__header__user__options__item" @click="logOut">
        <GSvg nameIcon="log_out"></GSvg>
        <span class="admin__header__user__options__title">log out</span>
      </li>
    </ul>
  </div>
</template>

<script>
//

export default {
  name: 'User',
  props: {
    imgUser: {
      type: String,
      required: true
    },
    userName: {
      type: [String, Boolean],
      required: true
    },
    logOut: {
      type: Function
    }
  },
  data() {
    return {
      statusToggle: false
    };
  },
  methods: {
    // TOGGLE SLIDE
    toggleSlide() {
      return (this.statusToggle = !this.statusToggle);
    },
    //
    v() {
      return this.$router.push({ name: 'Setting' });
    }
  },
  watch: {
    // WATCH WHEN CLICK WINDOW WILL BE CHANGE STATUS TOGGLE TO FALSE
    statusToggle(n) {
      if (n) window.onclick = () => (this.statusToggle = false);
    }
  }
};
</script>

<style lang="scss" scoped>
// ADMIN HEADER
.admin__header {
  // OPTIONS USER
  &__user {
    position: relative;
    grid-column: start-avatar / end-avatar;
    margin-right: 20px;

    // CONTENT
    &__content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 20px;
      width: 100%;
      padding: 3px;
      border-radius: 50px;
      border: 1px solid map-get($background, back-fourth);
      background-color: white;
      cursor: pointer;
    }

    // AVATAR
    &__avatar {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      overflow: hidden;

      // IMG
      img {
        border-radius: 50%;
        max-width: 100%;
      }
    }

    // NAME
    &__name {
      user-select: none;
      text-transform: capitalize;

      // SPAN
      span {
        font-size: 1.5rem;
      }
    }

    // OPTIONS
    &__options {
      position: absolute;
      display: block;
      width: 100%;
      height: auto;
      max-height: 0;
      transition: max-height 0.8s ease-in-out;
      background-color: white;
      @include translate('top', 'left', 110%, 0);
      border-radius: map-get($border-radius, third);
      box-shadow: 0 2px 5px rgba(darken(white, 20%), 0.3);
      list-style: none;
      overflow: hidden;
      z-index: 9999;

      // ADD CLASS ACTIVE
      &--active {
        max-height: 500px;
      }

      // ITEM
      &__item {
        display: flex;
        align-items: center;
        padding: 1.5rem 0 1.5rem 2rem;
        text-transform: capitalize;
        font-size: 1.5rem;
        transition: background-color 0.5s;
        cursor: pointer;

        // NOT
        &:not(:last-of-type) {
          border-bottom: 1px solid map-get($background, back-fourth);
        }

        // HOVER AND ACTIVE
        &:hover,
        &:active {
          background-color: map-get($background, back-third);
        }
      }

      // TITLE
      &__title {
        color: map-get($color, color-third);
      }
    }
  }
}
</style>
