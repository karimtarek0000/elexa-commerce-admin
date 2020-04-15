<template>
  <div class="form form--signIn">
    <!-- EMAIL -->
    <div class="form__email">
      <label>enter your email</label>
      <input
        type="email"
        novalidate
        v-model="formValidation.email"
        @keyup="validateEmail"
        @focus="focusInput($event)"
        @blur="blurInput($event)"
      />
    </div>
    <alert-status :title="allMessageError.messageErrorEmail" :status="allStatus.statusEmail"></alert-status>
    <!-- PASSWORD -->
    <div class="form__password">
      <label>password</label>
      <input
        :type="changedStatusPassword.changeTypeInput"
        v-model="formValidation.password"
        @keyup="validatePassword"
        @focus="focusInput($event)"
        @blur="blurInput($event)"
      />
      <div class="form__password__icon" @click="toggleStatusPassword = !toggleStatusPassword">
        <GSvg v-if="formValidation.password" :nameIcon="changedStatusPassword.changeIconStatusInput"></GSvg>
      </div>
    </div>
    <!-- BUTTON SUBMIT -->
    <button-confirm
      :statusLoader="true"
      textButton="sign in"
      :classCheck="check"
      :classCorrect="correct"
      :classWrong="wrong"
      :statusDisabled="test"
      @clicknow="v"
    ></button-confirm>
  </div>
</template>

<script>
export default {
  name: 'RegisterSignIn',
  mixins: ['actionsForms'],
  props: ['checkc'],
  data() {
    return {
      check: false,
      correct: false,
      wrong: false
    };
  },
  computed: {
    test() {
      if (this.finalData.email && this.formValidation.password) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    v() {
      this.check = true;

      setTimeout(() => {
        this.wrong = true;
        this.$emit('f', this.wrong);
      }, 10000);
    }
  },
  watch: {
    //
    checkc(n) {
      if (!n) {
        this.check = false;
        this.wrong = false;
      }
    }
  },
  destroyed() {
    return this.$emit('closeAlert', false);
  }
};
</script>

<style></style>
