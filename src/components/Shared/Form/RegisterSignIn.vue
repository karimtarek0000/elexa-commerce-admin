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
      :statusDisabled="statusDisabledBtnSubmit"
      @clicknow="actionSubmit"
    ></button-confirm>
  </div>
</template>

<script>
export default {
  name: 'RegisterSignIn',
  mixins: ['actionsForms'],
  props: {
    targetPageName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      check: false,
      correct: false,
      wrong: false
    };
  },
  methods: {
    // ACTION SUBMIT
    actionSubmit() {
      // RUN LOADER
      this.check = true;
      // ENTER SIGN IN
      this.$store
        .dispatch('Shared/enterSignIn', { email: this.finalData.email, password: this.finalData.password })
        .then(() => {
          this.correct = true;
          // RUN ALL ACTION
          this.allActions(this.correct, 'successful', false);
          setTimeout(() => {
            this.$router.replace({ name: this.targetPageName });
          }, 1000);
        })
        .catch(() => {
          this.wrong = true;
          // RUN ALL ACTION
          this.allActions(this.wrong, 'this email or password not correct', true);
        });
    }
  },
  computed: {
    // STATUS DISABLED BTN SUBMIT
    statusDisabledBtnSubmit() {
      if (this.finalData.email && this.formValidation.password) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style></style>
