<template>
  <div class="admin__header">
    <!-- COMPONENT SEARCH -->
    <search-input fillIcon="white"></search-input>

    <!-- COMPONENT OPTIONS CENTER -->
    <options-center></options-center>

    <!-- COMPONENT USER -->
    <user imgUser="https://picsum.photos/100/100" :userName="userName" :logOut="logOutAction"></user>
  </div>
</template>

<script>
//
import SearchInput from '@/components/Shared/Search/SearchInput';
import User from '@/components/Admin/OptionsUsers/User';
import * as Types from '@/store/Type/index';
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
      exitSignOut: Types.EXITSIGNOUT,
      getDataUser: Types.GETDATAUSER
    }),
    // GET DATA USER
    dataUser() {
      this.getDataUser({ nameCollection: 'profiles-admin', nameWhere: 'id' }).then(data => {
        this.userName = data.name;
      });
    },
    // LOG OUT ACTIONS
    logOutAction() {
      this.exitSignOut().then(() => {
        this.$router.push({ name: 'Register' });
      });
    }
  },
  components: {
    SearchInput,
    User
  },
  created() {
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
