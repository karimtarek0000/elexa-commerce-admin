const actionsForms = {
  data() {
    return {
      formValidation: {
        id: null,
        email: null,
        password: null,
        confirmPassword: null
      },
      allStatus: {
        statusId: false,
        statusEmail: false,
        statusPassword: false,
        statusConfirmPassword: false
      },
      allMessageError: {
        messageErrorId: null,
        messageErrorEmail: null,
        messageErrorPassword: null,
        messageErrorConfirmPassword: null
      },
      finalData: {
        id: null,
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
        this.allMessageError.messageErrorId = '✗ not correct this id';
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
  }
};

// EXPORT DEFAULT
export default [actionsForms];
