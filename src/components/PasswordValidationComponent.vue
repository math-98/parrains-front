<template>
  <div class="alert alert-info mb-0">
    <div class="row">
      <div :class="'col-' + 12 / cols">
        <div v-if="validationCase" v-bind:class="{ 'text-success': caseValid }">
          <i
            v-bind:class="{
              fas: true,
              'fa-check': caseValid,
              'fa-times': !caseValid,
            }"
          ></i>
          Majuscules et minuscules
        </div>
      </div>
      <div :class="'col-' + 12 / cols">
        <div
          v-if="validationDigits"
          v-bind:class="{ 'text-success': digitsValid }"
        >
          <i
            v-bind:class="{
              fas: true,
              'fa-check': digitsValid,
              'fa-times': !digitsValid,
            }"
          ></i>
          Chiffres
        </div>
      </div>
      <div :class="'col-' + 12 / cols">
        <div
          v-if="validationSpecialCharacters"
          v-bind:class="{ 'text-success': specialCharsValid }"
        >
          <i
            v-bind:class="{
              fas: true,
              'fa-check': specialCharsValid,
              'fa-times': !specialCharsValid,
            }"
          ></i>
          Caractères spéciaux
        </div>
      </div>
      <div :class="'col-' + 12 / cols">
        <div
          v-if="validationMinLength > 0"
          v-bind:class="{ 'text-success': lengthValid }"
        >
          <i
            v-bind:class="{
              fas: true,
              'fa-check': lengthValid,
              'fa-times': !lengthValid,
            }"
          ></i>
          {{ validationMinLength }} caractères minimum
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      caseValid: false,
      digitsValid: false,
      lengthValid: false,
      specialCharsValid: false,
    };
  },
  methods: {
    emitPassword() {
      let valid = true;
      if (this.validationCase) {
        valid = valid && this.caseValid;
      }
      if (this.validationDigits) {
        valid = valid && this.digitsValid;
      }
      if (this.validationSpecialCharacters) {
        valid = valid && this.specialCharsValid;
      }
      if (this.validationMinLength > 0) {
        valid = valid && this.lengthValid;
      }

      this.$emit("validate", valid);
    },
  },
  watch: {
    password() {
      this.caseValid =
        /[A-Z]/.test(this.password) && /[a-z]/.test(this.password);
      this.digitsValid = /[0-9]/.test(this.password);
      this.lengthValid = this.password.length >= this.validationMinLength;
      this.specialCharsValid = /[\W_]/.test(this.password);

      this.emitPassword();
    },
  },
  name: "PasswordValidationComponent",
  props: {
    cols: {
      type: Number,
      default: 1,
    },
    password: {
      type: String,
      required: true,
    },
    validationCase: {
      type: Boolean,
      default: true,
    },
    validationDigits: {
      type: Boolean,
      default: true,
    },
    validationMinLength: {
      type: Number,
      default: 8,
    },
    validationSpecialCharacters: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
