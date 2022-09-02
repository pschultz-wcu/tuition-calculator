<script>
import NextButton from "../form/NextButton.vue";
import BackButton from "../form/BackButton.vue";
export default {
  name: "StepTwo",
  components: {
    NextButton,
    BackButton,
  },
  props: {
    stepData: Object,
    userChoices: Object,
  },
  methods: {
    handleChange(index) {
      console.log(index);
      this.$emit("field-changed");
    },
    nextButtonClicked() {
      this.$emit("next-step");
    },
    backButtonClicked() {
      this.$emit("previous-step");
    },
  },
};
</script>
<template>
  <div>
    <p>Select a Tuition Rate</p>

    <p>
      Special tuition rates are available for specific student populations,
      including Indiana residents, military servicemembers and veterans, alumni,
      and more.&nbsp;Select
      <strong>Standard Rate</strong>&nbsp;if none apply and see other ways to
      save on tuition.
    </p>

    <v-form v-model="stepData.stepTwo.valid">
      <v-select
        :items="stepData.stepTwo.tuition.options"
        v-model="userChoices.stepTwo.tuition.option"
        @change="handleChange()"
        outlined
        label="Choose a Tuition Rate"
        :required="stepData.stepTwo.tuition.isRequired"
        :rules="stepData.stepTwo.fieldRules"
      ></v-select>
    </v-form>

    <p class="legal-disclaimer">
      Tuition estimates will vary based on program of interest, tuition
      reduction selected, rate at which you complete the program, availability
      of eligible prior learning credits, prerequisites required, and repeated
      courses. Tuition estimates do not include general or program-specific
      fees.
    </p>

    <div class="nav-btn-container d-flex align-center justify-space-between">
      <BackButton @clicked="backButtonClicked()" />
      <NextButton @clicked="nextButtonClicked()" :fields="stepData.stepTwo" />
    </div>
  </div>
</template>
