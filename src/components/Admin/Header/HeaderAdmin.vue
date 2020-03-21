<template>
  <div class="admin__header">
    <search-input fillIcon="white"></search-input>
    <user imgUser="https://picsum.photos/100/100" userName="karim tarek"></user>
  </div>
</template>

<script>
//
import SearchInput from "@/components/Shared/Search/SearchInput";
import User from "@/components/Admin/OptionsUsers/User";

export default {
  name: "HeaderAdmin",
  data() {
    return {};
  },
  components: {
    SearchInput,
    User
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
  grid-template-columns: [start-search] 40rem [end-search] repeat(2, [col-start] 1fr [col-end] ) [start-avatar] 20rem [end-avatar];
  align-items: center;
}
</style>
