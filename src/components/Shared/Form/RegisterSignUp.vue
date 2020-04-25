<template>
  <div class="form form--signUp">
    <!-- ID -->
    <div class="form__id">
      <label>enter secret id</label>
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
    <!-- NAME -->
    <div class="form__id">
      <label>enter your name</label>
      <input
        type="text"
        @keyup="validateName"
        novalidate
        v-model="formValidation.name"
        @focus="focusInput($event)"
        @blur="blurInput($event)"
      />
    </div>
    <alert-status :title="allMessageError.messageErrorName" :status="allStatus.statusName"></alert-status>
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
    <alert-status :title="allMessageError.messageErrorConfirmPassword" :status="allStatus.statusConfirmPassword"></alert-status>
    <!-- BUTTON SUBMIT -->
    <button-confirm
      :statusLoader="true"
      textButton="sign up"
      :classCheck="check"
      :classCorrect="correct"
      :classWrong="wrong"
      :statusDisabled="statusDisabledBtnSubmit"
      @clicknow="actionSubmit"
    ></button-confirm>
  </div>
</template>

<script>
import slugify from 'slugify';

export default {
  name: 'RegisterSignUp',
  mixins: ['actionsForms'],
  props: {
    getFunctionSignUp: {
      type: Function,
      required: false
    }
  },
  data() {
    return {
      title: 'test',
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

      // IF ALL INPUT RETURN VALUE
      if (!this.statusDisabledBtnSubmit) {
        // 1) CHECK ID
        this.$store.dispatch('checkInfo', this.finalData.name).then(data => {
          // IF GET ID EQUAL FINAL DATA ID
          if (data.getId == this.finalData.id) {
            // IF GET NAME NOT EXISTS BEFORE
            if (!data.getName.exists) {
              // RUN DATA SUBMIT
              this.addDataSubmit();
            } else {
              this.wrong = true;
              this.allActions(this.wrong, 'this name exists before', true);
            }
          } else {
            this.wrong = true;
            this.allActions(this.wrong, 'not correct id', true);
          }
        });
      }
    },
    // ALL ACTIONS THEN
    allActions(pushAlert, pushTitle, statusClose) {
      this.$emit('pushAlert', pushAlert);
      this.$emit('pushTitle', pushTitle);
      this.$emit('statusClose', statusClose);
    },
    // ADD DATA SUBMIT
    addDataSubmit() {
      // 2) CREATE NEW ACCOUNT
      this.$store
        .dispatch('createNewAccount', {
          email: this.finalData.email,
          password: this.finalData.password
        })
        // THEN
        .then(info => {
          // DATA PROFILE
          const dataProfile = {
            id: info.user.uid,
            name: this.finalData.name,
            email: this.finalData.email
          };
          // 3) CREATE PROFILE USER
          this.$store
            .dispatch('createProfileUser', { nameProfile: this.finalData.name, dataProfile })
            // THEN
            .then(() => {
              this.correct = true;
              this.allActions(this.correct, 'create account successful', false);
              setTimeout(() => {
                this.$emit('changeCompon', 'RegisterSignIn');
              }, 2000);
            })
            // CATCH
            .catch(() => {
              this.wrong = true;
              this.allActions(this.wrong, 'somthing error please try again', true);
            });
        })
        // CATCH
        .catch(() => {
          this.wrong = true;
          this.allActions(this.wrong, 'this email exists before', true);
        });
    }
  },
  computed: {
    statusDisabledBtnSubmit() {
      if (
        this.finalData.id &&
        this.finalData.name &&
        this.finalData.email &&
        this.finalData.password &&
        this.finalData.confirmPassword
      ) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style></style>
