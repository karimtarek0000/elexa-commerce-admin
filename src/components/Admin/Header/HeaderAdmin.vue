<template>
  <div class="admin__header">
    <!-- COMPONENT SEARCH -->
    <search-input fillIcon="white"></search-input>

    <!-- COMPONENT OPTIONS CENTER -->
    <options-center></options-center>

    <!-- COMPONENT USER -->
    <user imgUser="image/image-global/avatar.png" @if="userName" :userName="userName" :logOut="logOutAction"></user>
  </div>
</template>

<script>
//
import SearchInput from '@/components/Shared/Search/SearchInput';
import User from '@/components/Admin/OptionsUsers/User';
import * as Type from '@/store/Type/index';
import { mapActions } from 'vuex';
//
export default {
  name: 'HeaderAdmin',
  data() {
    return {
      userName: ''
    };
  },
  methods: {
    ...mapActions({
      exitSignOut: Type.EXIT_SIGN_OUT,
      getDataUser: Type.GET_DATA_USER
    }),
    // GET DATA USER
    dataUser() {
      this.getDataUser({ nameCollection: Type.NAME_COLLECTION_PROFILE_ADMIN, nameWhere: 'id' }).then(data => {
        this.userName = data.name;
      });
    },
    // LOG OUT ACTIONS
    logOutAction() {
      this.exitSignOut().then(() => this.$router.replace({ name: 'register' }));
    }
  },
  components: {
    SearchInput,
    User
  },
  mounted() {
    // RUN GET DATA USER
    this.dataUser();
  }
};
</script>

<style lang="scss">
// ADMIN HEADER
.admin__header {
  background-color: map-get($background, back-second);
  grid-area: start-header / start-header / end-header / end-header;
  padding: 1.5rem;

  //
  display: grid;
  grid-template-columns: [start-search] 40rem [end-search] repeat(2, [col-start] 1fr [col-end]) [start-avatar] 20rem [end-avatar];
  grid-column-gap: 2rem;
  align-items: center;
}
</style>
