<template>
  <div class="admin">
    <!-- START ASIDE NAV -->
    <aside-nav></aside-nav>

    <!-- START HEADER -->
    <header-admin></header-admin>

    <!-- START ADMIN CONTENT -->
    <div class="admin__content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AsideNav from "@/components/Admin/AsideNav/AsideNav";
import HeaderAdmin from '@/components/Admin/Header/HeaderAdmin';

export default {
  name: "Admin",
  data() {
    return {};
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
  grid-template-rows: [start-global-row start-header] 10rem [end-header start-content] calc(100vh - 10rem) [end-content end-global-row];
  grid-template-columns: [start-global-column start-aside] 25rem [end-aside start-content start-header] 1fr [end-content end-header end-global-column];

  // CONTENT
  &__content {
    grid-area: start-content / start-content / end-content / end-content;
    background-color: map-get($background, back-second);
  }
}
</style>
