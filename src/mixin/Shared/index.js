const actionsForms = {
  props: {
    statusAlertNow: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      formValidation: {
        id: null,
        name: null,
        email: null,
        password: null,
        confirmPassword: null
      },
      allStatus: {
        statusId: false,
        statusName: false,
        statusEmail: false,
        statusPassword: false,
        statusConfirmPassword: false
      },
      allMessageError: {
        messageErrorId: null,
        messageErrorName: null,
        messageErrorEmail: null,
        messageErrorPassword: null,
        messageErrorConfirmPassword: null
      },
      finalData: {
        id: null,
        name: null,
        email: null,
        password: null,
        confirmPassword: null
      },
      statusDisabledConfirmPassword: true,
      classActive: 'form--active',
      toggleStatusPassword: false
    };
  },
  methods: {
    // FOCUS INPUT
    focusInput(el) {
      //
      const label = el.target.parentElement;

      // ADD CLASS
      label.classList.add(this.classActive);
    },
    // BLUR INPUT
    blurInput(el) {
      if (!el.target.value) {
        //
        const label = el.target.parentElement;

        // REMOVE CLASS
        label.classList.remove(this.classActive);
      }
    },
    // VALIDATE ID
    validateId() {
      const validate = /^[0-9]{3}$/g;

      if (this.formValidation.id && this.formValidation.id.match(validate)) {
        this.allStatus.statusId = false;
        this.finalData.id = this.formValidation.id;
      } else {
        this.allStatus.statusId = true;
        this.finalData.id = null;
        this.allMessageError.messageErrorId = '✗ not correct this id - use number only';
      }
    },
    // VALIDATE NAME
    validateName() {
      const validate = /^[a-z]{3,7}$/g;
      if (this.formValidation.name && this.formValidation.name.match(validate)) {
        this.allStatus.statusName = false;
        this.finalData.name = this.formValidation.name;
      } else {
        this.allStatus.statusName = true;
        this.finalData.name = null;
        this.allMessageError.messageErrorName = '✗ must be between 5 to 8 letter small';
      }
    },
    // VALIDATE EMAIL
    validateEmail() {
      const validate = /^[A-z]{3,}@{1}[A-z]{5,}.{1}[A-z]{3,4}$/g;
      if (this.formValidation.email && this.formValidation.email.match(validate)) {
        this.allStatus.statusEmail = false;
        this.finalData.email = this.formValidation.email;
      } else {
        this.allStatus.statusEmail = true;
        this.finalData.email = null;
        this.allMessageError.messageErrorEmail = '✗ not correct - Ex: test@gmail.com';
      }
    },
    // VALIDATE PASSWORD
    validatePassword() {
      // OBLECT ALL VALIDATE PASSWORD
      const validate = {
        lowercase: /[a-z]{2,}/g,
        uppercase: /[A-Z]{2,}/g,
        symbol: /[@#$%^&*!]{2,}/g,
        number: /[1-9]{2,}/g
      };

      if (
        this.formValidation.password &&
        validate.lowercase.test(this.formValidation.password) &&
        validate.uppercase.test(this.formValidation.password) &&
        validate.symbol.test(this.formValidation.password) &&
        validate.number.test(this.formValidation.password)
      ) {
        this.allStatus.statusPassword = false;
        this.finalData.password = this.formValidation.password;
        this.statusDisabledConfirmPassword = false;
      } else {
        this.allStatus.statusPassword = true;
        this.finalData.password = null;
        this.statusDisabledConfirmPassword = true;
        this.allMessageError.messageErrorPassword =
          '✗ not correct - at least 8 caracter letter include ( 2 uppercase and 2 lowercase) - 2 number - 2 symbol';
      }
    },
    // VALIDATE CONFIRM PASSWORD
    validateConfirmPassword() {
      if (this.formValidation.password == this.formValidation.confirmPassword) {
        this.allStatus.statusConfirmPassword = false;
        this.finalData.confirmPassword = this.formValidation.confirmPassword;
      } else {
        this.allStatus.statusConfirmPassword = true;
        this.finalData.confirmPassword = null;
        this.allMessageError.messageErrorConfirmPassword = '✗ confirm password not matched with password';
      }
    },
    // ALL ACTIONS THEN
    allActions(pushAlert, pushTitle, statusClose) {
      this.$emit('pushAlert', pushAlert);
      this.$emit('pushTitle', pushTitle);
      this.$emit('statusClose', statusClose);
    }
  },
  computed: {
    // CHANGED STATUS PASSWORD
    changedStatusPassword() {
      const changeIconStatusInput = this.toggleStatusPassword ? 'visibility' : 'visibility-off';
      const changeTypeInput = this.toggleStatusPassword ? 'text' : 'password';

      //
      return {
        changeIconStatusInput,
        changeTypeInput
      };
    }
  },
  watch: {
    //
    statusAlertNow(n) {
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
// ALERT STATUS
const alertStatus = {
  data() {
    return {
      titles: null,
      statusClickCloseAlert: false,
      statusClose: true
    };
  }
};

// BTN CONFIRM AND ALERT
const btnConfirmAndAlert = {
  data() {
    return {
      // // BTN CONFIRM
      statusCheckData: {
        check: false,
        correct: false,
        wrong: false
      }
    };
  },
  methods: {
    // ALL ACTIONS WILL BE RUNNING WITH AJAX CALL
    allActionsChangeStatus({ check = false, wrong = false, correct = false, statusAlert = false, data = null }) {
      this.statusCheckData.wrong = wrong;
      this.statusCheckData.check = check;
      this.statusCheckData.correct = correct;
      this.statusClickCloseAlert = statusAlert;
      this.titles = data;
    }
  }
};

// EXPORT DEFAULT
export default [actionsForms, alertStatus, btnConfirmAndAlert];
