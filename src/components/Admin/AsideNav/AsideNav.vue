<template>
  <aside :class="['admin__aside', { 'admin__aside--active': statusToggleActive }]">
    <!-- START ADMIN TOGGLE -->
    <button class="admin__aside__toggle" v-if="statusButtonAside" @click="changeToggleNav">
      <span></span>
    </button>

    <!-- START LOGO -->
    <div class="admin__aside__logo">
      <router-link :to="{ name: 'admin' }" tag="svg">
        <use xlink:href="@/assets/image/icons/sprite.svg#icon-elexa-logo"></use>
      </router-link>
    </div>

    <!-- START NAV LIST -->
    <ul class="admin__aside__navlist">
      <!-- START CONTENT ITEM -->
      <router-link
        class="admin__aside__item"
        active-class="admin__aside__item--active"
        :exact="index == 0"
        tag="li"
        :to="{ name: item == 'home' ? 'admin' : item }"
        v-for="(item, index) in nav.items"
        :key="index"
      >
        <!-- START ICON-->
        <span class="admin__aside__item__icon">
          <GSvg :nameIcon="nav.icons[index]"></GSvg>
        </span>

        <!-- START TEXT -->
        <span class="admin__aside__item__text">
          {{ item }}
        </span>
      </router-link>
    </ul>
  </aside>
</template>

<script>
//
import * as Type from '@/store/Type/index';
//
export default {
  name: 'AsideNav',
  props: {
    statusButtonAside: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      nav: {
        items: ['home', 'category', 'products'],
        icons: ['home', 'category', 'product']
      }
    };
  },
  computed: {
    // STATUS TOGGLE ACTIVE
    statusToggleActive() {
      return this.$store.state.Admin.statusAside;
    }
  },
  methods: {
    // CHANGE TOGGLE NAV
    changeToggleNav() {
      // CHANGE TOGGLE
      this.toggleNav = !this.toggleNav;
      // WILL BE CHANGE IN STATE VUEX
      this.$store.commit(Type.CHANGE_STATUS_ASIDE, this.toggleNav);
      // CUSTOM EVENT ( ADD CLASS )
      this.$emit('addClass', this.toggleNav);
    }
  }
};
</script>

<style lang="scss">
// ADMIN ASIDE
.admin {
  // ASIDE
  &__aside {
    position: relative;
    grid-area: start-global-row / start-aside / end-global-row / end-aside;
    background-color: map-get($background, back-first);
    color: map-get($color, color-first);
    border-radius: 0 20px 20px 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    overflow: hidden;

    // CLASS MODIFIRE ACTIVE
    &--active {
      // CHNAGE CLASS LOGO
      [class$='__logo'] {
        visibility: hidden;
        opacity: 0;
      }
    }

    // TOGGLE
    &__toggle {
      position: absolute;
      @include btnManger($backgroundColor: transparent) {
        @include translate('top', 'right', 0.5rem, 0.5rem);
        height: 40px;
        width: 40px;
        border-radius: 50%;
        transition: background-color 0.5s ease;

        // HOVER
        &:hover {
          background-color: darken(map-get($background, back-first), 5%);
        }
      }

      // SPAN
      > span {
        position: absolute;
        display: block;
        background-color: map-get($background, back-second);
        height: 2px;
        width: 60%;
        @include translate('top', 'left', 50%, 50%);

        // AFTER AND BEFORE
        &::before,
        &::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: inherit;
        }

        // BEFORE
        &::before {
          @include translate('top', 'left', -7px, 0);
        }

        // AFTER
        &::after {
          @include translate('top', 'left', 7px, 0);
        }
      }
    }

    // LOGO
    &__logo {
      text-align: center;
      cursor: pointer;

      // SVG
      > svg {
        @include svgManger(6rem, 5rem, $fill: map-get($background, back-second));
      }
    }

    // NAV LIST
    &__navlist {
      list-style: none;
      margin-top: 4rem;
      text-transform: capitalize;
      font-size: 1.5rem;
    }

    // ITEM
    &__item {
      position: relative;
      display: flex;
      align-items: center;
      padding: 1rem;
      transition: background-color 0.5s ease;
      transition: all 0.5s ease;
      cursor: pointer;

      // MODIFIER CLASS ACTIVE
      &--active {
        color: map-get($color, color-second);

        // SELECT BY ATTRIBUTES
        [class$='__icon'] {
          svg {
            use {
              fill: map-get($color, color-second) !important;
            }
          }
        }

        // AFTER
        &::after {
          content: '';
          mask-image: url('~@/assets/image/icons/shape.svg');
          mask-size: cover;
          background-color: map-get($background, back-second);
          position: absolute;
          display: block;
          @include translate('top', 'right', -84%, -0.5px);
          width: 100%;
          height: 125px;

          // RESPONSIVE
          @include respond(1196px) {
            top: -57%;
            height: 87px;
          }
          @include respond(tablet-p) {
            top: -73%;
            height: 91px;
          }
        }
      }

      // TEXT
      &__text {
        margin-left: 2rem;
        font-size: 1.7rem;
      }

      //
      &__icon,
      &__text {
        z-index: 9999;
      }

      // NOT LAST CHILD
      &:not(:last-child) {
        margin-bottom: 2rem;
      }

      // HOVER
      // &:hover {
      //   background-color: darken(map-get($background, back-first), 5%);
      // }
    }
  }
}
</style>
