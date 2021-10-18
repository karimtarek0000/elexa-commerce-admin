<template>
  <section class="admin__register">
    <!-- ADMIN REGISTER WELCOME -->
    <div class="admin__register__welcome">
      <!-- IMAGE WELCOME -->
      <div class="admin__register__image">
        <img src="@/assets/image/image-admin/welcome-admin.svg" alt="welcome" />
      </div>
      <!-- LOGO -->
      <div class="admin__register__logo">
        <GSvg nameIcon="elexa-logo"></GSvg>
      </div>
    </div>
    <!-- FORMS -->
    <forms titleHead="admin register" :nameCollection="getNameCollection" :statusInputId="true"></forms>
  </section>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {};
  },
  methods: {},
  computed: {
    // GET NAME COLLECTION
    getNameCollection() {
      return this.$store.state.Admin.nameCollection;
    }
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
}
</style>
