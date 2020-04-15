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
      <router-view></router-view>
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

  // MANGER GRID SYSTEM
  grid-template-rows: [start-global-row start-header] 8rem [end-header start-content] calc(100vh - 8rem) [end-content end-global-row];
  grid-template-columns: [start-global-column start-aside] 25rem [end-aside start-content start-header] 1fr [end-content end-header end-global-column];
  transition: all 0.5s ease;

  // CLASS MODIFIRE ACTIVE
  &--active {
    grid-template-columns: [start-global-column start-aside] 5rem [end-aside start-content start-header] 1fr [end-content end-header end-global-column];
  }

  // CONTENT
  &__content {
    grid-area: start-content / start-content / end-content / end-content;
    background-color: map-get($background, back-second);
    padding: 1.5rem;

    // TITLE
    &__title {
      padding: 1rem;

      // H2
      h2 {
        font-size: 3rem;
        text-transform: capitalize;
        font-weight: 300;
      }
    }
  }
}
</style>
