<template>
  <div class="form">
    <!-- ID -->
    <div class="form__id">
      <label>enter id</label>
      <input type="text" novalidate v-model="formValidation.id" @focus="focusInput($event)" @blur="blurInput($event)" />
    </div>
    <!-- EMAIL -->
    <div class="form__email">
      <label>enter your email</label>
      <input type="email" novalidate v-model="formValidation.email" @focus="focusInput($event)" @blur="blurInput($event)" />
    </div>
    <!-- PASSWORD -->
    <div class="form__password">
      <label>password</label>
      <input
        :type="changedStatusPassword.changeTypeInput"
        v-model="formValidation.password"
        @focus="focusInput($event)"
        @blur="blurInput($event)"
      />
      <div class="form__password__icon" @click="toggleStatusPassword = !toggleStatusPassword">
        <GSvg v-if="formValidation.password" :nameIcon="changedStatusPassword.changeIconStatusInput"></GSvg>
      </div>
    </div>
    <!-- CONFIRM PASSWORD -->
    <div class="form__confirm__password">
      <label>confirm password</label>
      <input
        :type="changedStatusPassword.changeTypeInput"
        v-model="formValidation.confirmPassword"
        @focus="focusInput($event)"
        @blur="blurInput($event)"
      />
    </div>
    <button-confirm statusLoader="true" textButton="sign up"></button-confirm>
  </div>
</template>

<script>
export default {
  name: 'RegisterSignUp',
  mixins: ['actionsForms'],
  data() {
    return {};
  }
};
</script>

<style></style>
