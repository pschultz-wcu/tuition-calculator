<script>
import Steps from "./steps";
import DataModule from "../modules/DataModule";
import StepOneModule from "../modules/StepOneModule";
export default {
  name: "TuitionCalculator",
  components: {
    ...Steps,
  },
  data: () => ({    
    stepperKey: 0,
    calculatorData: {},
    previousIndex: null,
    userChoices: {},
    stepData: {},
    wcuProgramData: {},    
    dataModule: null,
    stepOneModule: null,
  }),
  created() {
    this.dataModule = new DataModule();
    this.stepOneModule = new StepOneModule();
    this.setCalculator();
  },
  methods: {
    setCalculator() {
      this.dataModule.setData(this);
    },
    resetCalculator() {
      this.setCalculator();
      this.stepperKey += 1;
    },
    previousStep() {
      (this.calculatorData.step -= 1), (this.calculatorData.progress -= 25);
    },
    nextStep() {
      this.calculatorData.step == 4 ? this.calculateTuition() : null;
      (this.calculatorData.step += 1), (this.calculatorData.progress += 25);
    },
    setOptions(n, o) {
      this.stepOneModule.setOptions(this, n, o)
    },
    multipleOptions(n, o) {
      this.stepOneModule.multipleOptions(this, n, o)
    },
    oneOption(n, o) {
      this.stepOneModule.oneOption(this, n, o)
    },
    setFields(nextField, options) {
      this.stepOneModule.setFields(this, nextField, options)
    },
    clearSuccessiveFields(index) {
      this.stepOneModule.clearSuccessiveFields(this, index)
    },
    setStepOneUserChoices(index) {
      return this.stepOneModule.setStepOneUserChoices(this, index)
    },
    handleSelection(index) {
      this.stepOneModule.handleSelection(this, index)
    },
    setTuitionRate() {
      this.userChoices.stepTwo.tuition.rate =
        this.stepData.stepTwo.tuition.rates[
          this.stepData.stepTwo.tuition.options.indexOf(
            this.userChoices.stepTwo.tuition.option
          )
        ];
    },
    calculateTuition() {
      let cost =
        this.userChoices.stepTwo.tuition.rate * 120 -
        this.userChoices.stepFour.transferCredits *
          this.userChoices.stepTwo.tuition.rate +
        this.calculatorData.fees;
      console.log(cost);
      this.calculatorData.estimatedTuition = `$${cost}`;
    },
  },
};
</script>

<template>
  <v-container class="mt-8" style="border: 1px solid black">
    <v-row no-gutters>
      <v-col cols="12" sm="6" md="8">
        <v-stepper
          v-model="calculatorData.step"
          elevation="0"
          :key="stepperKey"
        >
          <v-progress-linear
            v-model="calculatorData.progress"
            color="secondary"
            height="25"
          >
            <template v-slot:default="{ value }">
              <strong>{{ Math.ceil(value) }}%</strong>
            </template>
          </v-progress-linear>

          <v-stepper-items>
            <v-stepper-content step="1">
              <component
                :is="stepData.stepOne.component"
                :user-choices="userChoices"
                :step-data="stepData"
                @field-changed="handleSelection"
                @next-step="nextStep()"
              ></component>
            </v-stepper-content>

            <v-stepper-content step="2">
              <component
                :is="stepData.stepTwo.component"
                :user-choices="userChoices"
                :step-data="stepData"
                @field-changed="setTuitionRate"
                @next-step="nextStep()"
                @previous-step="previousStep()"
              ></component>
            </v-stepper-content>

            <v-stepper-content step="3">
              <component
                :is="stepData.stepThree.component"
                :user-choices="userChoices"
                :step-data="stepData"
                @next-step="nextStep()"
                @previous-step="previousStep()"
              ></component>
            </v-stepper-content>

            <v-stepper-content step="4">
              <component
                :is="stepData.stepFour.component"
                :user-choices="userChoices"
                :step-data="stepData"
                @next-step="nextStep()"
                @previous-step="previousStep()"
              ></component>
            </v-stepper-content>

            <v-stepper-content step="5">
              <component
                :is="stepData.stepFive.component"
                :user-choices="userChoices"
                :step-data="stepData"
                :calculator-data="calculatorData"
                @reset="resetCalculator()"
              ></component>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
      <v-col cols="6" md="4">
        <v-container>
          <v-row>
            <v-col>
              <h1>{{ calculatorData.estimatedTuition }}</h1>
              <p>Estimated Tuition</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h1>{{ calculatorData.estimatedGradDate }}</h1>
              <p>Estimated Graduation Date</p>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.legal-disclaimer {
  font-size: 12px;
}
</style>
