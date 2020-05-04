<template>
  <div :class="['admin', { 'admin--active': toggle }]">
    <!-- START ASIDE NAV -->
    <aside-nav @addClass="toggle = $event"></aside-nav>

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
  data() {
    return {
      toggle: false
    };
  },
  components: {
    AsideNav,
    HeaderAdmin
  }
};
</script>

<style lang="scss">
// ADMIN
.admin {
  display: grid;
  overflow: hidden;

  // MANGER GRID SYSTEM
  grid-template-rows: [start-global-row start-header] 8rem [end-header start-content] calc(100vh - 8rem) [end-content end-global-row];
  grid-template-columns:
    [start-global-column start-aside] 25rem [end-aside start-content start-header] minmax(20rem, 1fr)
    [end-content end-header end-global-column];
  transition: all 0.5s ease;

  // CLASS MODIFIRE ACTIVE
  &--active {
    grid-template-columns: [start-global-column start-aside] 5rem [end-aside start-content start-header] 1fr [end-content end-header end-global-column];
  }

  // CONTENT
  &__content {
    perspective: 4000px;
    grid-area: start-content / start-content / end-content / end-content;
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
