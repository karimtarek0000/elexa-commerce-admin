<template>
  <div class="form form--signUp">
    <!-- ID -->
    <div class="form__id">
      <label>enter id</label>
      <input
        type="text"
        @keyup="validateId"
        novalidate
        v-model="formValidation.id"
        @focus="focusInput($event)"
        @blur="blurInput($event)"
      />
    </div>
    <alert-status :title="allMessageError.messageErrorId" :status="allStatus.statusId"></alert-status>
    <!-- EMAIL -->
    <div class="form__email">
      <label>enter your email</label>
      <input
        type="email"
        @keyup="validateEmail"
        novalidate
        v-model="formValidation.email"
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
        @keyup="validatePassword"
        v-model="formValidation.password"
        @focus="focusInput($event)"
        @blur="blurInput($event)"
      />
      <div class="form__password__icon" @click="toggleStatusPassword = !toggleStatusPassword">
        <GSvg v-if="formValidation.password" :nameIcon="changedStatusPassword.changeIconStatusInput"></GSvg>
      </div>
    </div>
    <alert-status :title="allMessageError.messageErrorPassword" :status="allStatus.statusPassword"></alert-status>
    <!-- CONFIRM PASSWORD -->
    <div class="form__confirm__password">
      <label>confirm password</label>
      <input
        :type="changedStatusPassword.changeTypeInput"
        @keyup="validateConfirmPassword"
        v-model="formValidation.confirmPassword"
        @focus="focusInput($event)"
        @blur="blurInput($event)"
        :disabled="statusDisabledConfirmPassword"
      />
    </div>
    <alert-status
      :title="allMessageError.messageErrorConfirmPassword"
      :status="allStatus.statusConfirmPassword"
    ></alert-status>
    <!-- BUTTON SUBMIT -->
    <button-confirm
      :statusLoader="true"
      textButton="sign up"
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
  name: 'RegisterSignUp',
  mixins: ['actionsForms'],
  data() {
    return {
      title: 'test',
      check: false,
      correct: false,
      wrong: false
    };
  },
  methods: {
    v() {
      this.check = true;

      setTimeout(() => {
        this.correct = true;
      }, 10000);
    }
  },
  computed: {
    test() {
      if (this.finalData.id && this.finalData.email && this.finalData.password && this.finalData.confirmPassword) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style></style>
