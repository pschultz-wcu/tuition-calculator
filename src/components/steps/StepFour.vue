<script>
import NextButton from "../form/NextButton.vue";
import BackButton from "../form/BackButton.vue";
export default {
  name: "StepFour",
  components: {
    NextButton,
    BackButton,
  },
  props: {
    userChoices: Object,
    stepData: Object,
  },
  methods: {
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
    <p>Credit for Prior Learning & Experience</p>

    <p>
      Prior&nbsp;coursework and life experiences can translate into college
      credit, saving time and money. Estimate quarter credits you earned from a
      prior college or university.&nbsp;1 semester credit hour = 1.5 quarter
      credit hours.
    </p>

    <p>Transfer Credits</p>

    <v-slider
      v-model="userChoices.stepFour.transferCredits"
      class="align-center mx-8 mt-16"
      :max="97"
      :min="0"
      hide-details
      thumb-label="always"
    >
    </v-slider>

    <p>Do you plan on completing a credit-for-work-experience course?</p>
    <v-form v-model="stepData.stepFour.valid">
      <v-radio-group
        row
        class="mx-8"
        :required="stepData.stepFour.workExperience.isRequired"
        v-model="userChoices.stepFour.workExperience"
        :rules="stepData.stepFour.fieldRules"
      >
        <v-radio label="Yes" value="Yes"></v-radio>
        <v-radio label="No" value="No"></v-radio>
      </v-radio-group>
    </v-form>

    <div class="nav-btn-container d-flex align-center justify-space-between">
      <BackButton @clicked="backButtonClicked()" />
      <NextButton @clicked="nextButtonClicked()" :fields="stepData.stepFour" />
    </div>
  </div>
</template>
