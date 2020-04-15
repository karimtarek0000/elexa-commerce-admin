const actionsForms = {
  data() {
    return {
      formValidation: {
        email: null,
        password: null,
        confirmPassword: null,
        id: null
      },
      allStatus: {
        statusEmail: false,
        statusPassword: false
      },
      allMessageError: {
        messageErrorEmail: null,
        messageErrorPassword: null
      },
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
    // VALIDATE EMAIL
    validateEmail() {
      const validate = /^[A-z]{3,}@{1}[A-z]{5,}.{1}[A-z]{3,4}$/g;
      if (this.formValidation.email && this.formValidation.email.match(validate)) {
        this.allStatus.statusEmail = false;
      } else {
        this.allStatus.statusEmail = true;
        this.allMessageError.messageErrorEmail = '✗ not correct - Ex: test@gmail.com';
      }
    },
    // VALIDATE PASSWORD
    validatePassword() {
      // OBLECT ALL VALIDATE PASSWORD
      const validate = {
        lowercase: /[a-z]{2,}/g,
        uppercase: /[^A-Z]{2,}/g,
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
      } else {
        this.allStatus.statusPassword = true;
        this.allMessageError.messageErrorPassword =
          '✗ not correct - at least 8 caracter letter include ( 2 uppercase and 2 lowercase) - 2 number - 2 symbol';
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
