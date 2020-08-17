<template>
  <div id="app">
    <!-- ALERT CONFIRM  -->
    <transition name="alert">
      <AlertConfirm
        v-if="actionsConfirmAlert.statusConfirmAlert"
        :message="actionsConfirmAlert.messageConfirmAlert"
        :titleBtn="actionsConfirmAlert.titleBtnDelete"
        @normalBtn="statusBtnConfirmAlert"
      ></AlertConfirm>
    </transition>
    <!-- BLOCK SCREEN  -->
    <div v-if="actionsConfirmAlert.statusConfirmAlert" class="block-screen"></div>
    <router-view />
  </div>
</template>

<script>
//
import * as Type from '@/store/Type/index';
//
export default {
  name: 'App',
  data() {
    return {
      name: 'apple'
    };
  },
  computed: {
    //
    actionsConfirmAlert() {
      return this.$store.getters[Type.GET_ACTIONS_CONFIRM_ALERT];
    }
  },
  methods: {
    // STATUS BTN CONFIRM ALERT
    statusBtnConfirmAlert(status) {
      return this.$store.commit(Type.CHANGE_STATUS_BTN_CONFRIM_ALERT, status);
    }
  },
  components: {
    AlertConfirm: () => import('@/components/Admin/AlertConfirm/AlertConfirm')
  }
};
</script>

<style lang="scss">
#app {
}

.block-screen {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 100%;
  height: 100%;
  background-color: rgba(black, 0.5);
}
</style>
