<template>
  <div :class="['admin', { 'admin--active': toggle }]">
    <!-- START ASIDE NAV -->
    <aside-nav @addClass="toggle = $event" :statusButtonAside="statusButtonAside"></aside-nav>

    <!-- START HEADER -->
    <header-admin></header-admin>

    <!-- START ADMIN CONTENT -->
    <div class="admin__content">
      <div class="admin__content__title">
        <h2>{{ $route.name }}</h2>
      </div>

      <!-- ROUTER VIEW -->
      <transition name="router" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
//
import AsideNav from '@/components/Admin/AsideNav/AsideNav';
import HeaderAdmin from '@/components/Admin/Header/HeaderAdmin';

export default {
  name: 'Admin',
  mixins: ['dynamicHeightPages'],
  data() {
    return {
      toggle: false,
      statusButtonAside: true
    };
  },
  methods: {
    // FIXED WIDTH RESPONSIVE
    fixedWidthResponsive() {
      if (window.innerWidth <= 1200) {
        this.toggle = true;
        this.statusButtonAside = false;
      } else {
        this.toggle = false;
        this.statusButtonAside = true;
      }
      // WILL BE CHNAGE IN STATE WIDTH MUTATIONS
      this.$store.commit('Admin/chnageStatusAside', this.toggle);
    }
  },
  components: {
    AsideNav,
    HeaderAdmin
  },
  mounted() {
    // WIDTH
    this.fixedWidthResponsive();

    // RESIZE
    window.addEventListener('resize', this.fixedWidthResponsive);
  }
};
</script>

<style lang="scss">
// ADMIN
.admin {
  overflow: hidden;
  transition: all 0.5s ease;

  // CONTENT
  &__content {
    perspective: 4000px;
    background-color: map-get($background, back-second);
    padding: 1.5rem;

    // TITLE
    &__title {
      padding: 1rem;

      // H2
      h2 {
        position: relative;
        font-size: 3rem;
        text-transform: capitalize;
        font-weight: 300;

        // AFTER
        &::after {
          content: '';
          position: absolute;
          @include translate('top', 'right', 50%, 22px);
          width: 80%;
          height: 0.5px;
          background-color: lighten(map-get($background, back-first), 40%);
        }
      }
    }
  }
}

// ROUTER ENTER ACTIVE
.router-enter-active {
  animation: routerIn 0.6s ease-in-out forwards;
}

// ROUTER LEAVE TO
.router-leave-to {
  animation: routerOut 0.6s ease-in-out forwards;
}

// ROUTER IN
@keyframes routerIn {
  0% {
    transform: translateX(20%) rotateY(100grad);
    opacity: 0;
  }
  100% {
    transform: translateX(0) rotateY(0deg);
    opacity: 1;
  }
}

// ROUTER OUT
@keyframes routerOut {
  0% {
    transform: translateX(0) rotateY(0deg);
    opacity: 1;
  }
  100% {
    transform: translateX(-20%) rotateY(-100grad);
    opacity: 0;
  }
}
</style>
