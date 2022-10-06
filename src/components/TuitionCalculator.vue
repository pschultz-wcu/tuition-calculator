<script>
import Steps from "./steps";
import Results from "./Results.vue";
import ProgressBar from "./ProgressBar.vue";
import DataModule from "../modules/DataModule";
import CalculationModule from "../modules/CalculationModule";
import StepOneModule from "../modules/StepOneModule";
export default {
  name: "TuitionCalculator",
  components: {
    ...Steps,
    Results,
    ProgressBar,
  },
  data: () => ({
    stepperKey: 0,
    stepperComponentsData: [],
    calculatorData: {},
    previousIndex: null,
    userChoices: {},
    stepData: {},
    wcuProgramData: {},
    dataModule: null,
    calculationModule: null,
    stepOneModule: null,
  }),
  created() {
    this.dataModule = new DataModule();
    this.calculationModule = new CalculationModule();
    this.stepOneModule = new StepOneModule();
    this.dataModule.setData(this);
    this.dataModule.setStepperComponentsData(this);
  },
  methods: {
    resetCalculator() {
      this.stepperKey += 1;
      this.dataModule.setData(this);
      this.dataModule.setStepperComponentsData(this);
    },
    previousStep() {
      (this.calculatorData.step -= 1), (this.calculatorData.progress -= 25);
    },
    nextStep() {
      switch (this.calculatorData.step) {
        case 1:          
          this.userChoices.programData =
            this.wcuProgramData[this.userChoices.stepOne[0]][
              this.userChoices.stepOne[1]
            ][this.userChoices.stepOne[2]][this.userChoices.stepOne[3]];
          break;
        case 4:
          this.calculateTuition();
          break;
      }
      (this.calculatorData.step += 1), (this.calculatorData.progress += 25);
    },
    setOptions(n, o) {
      this.stepOneModule.setOptions(this, n, o);
    },
    multipleOptions(n, o) {
      this.stepOneModule.multipleOptions(this, n, o);
    },
    oneOption(n, o) {
      this.stepOneModule.oneOption(this, n, o);
    },
    setFields(nextField, options) {
      this.stepOneModule.setFields(this, nextField, options);
    },
    clearSuccessiveFields(index) {
      this.stepOneModule.clearSuccessiveFields(this, index);
    },
    setStepOneUserChoices(index) {
      return this.stepOneModule.setStepOneUserChoices(this, index);
    },
    handleSelection(index) {
      console.log(index);
      this.stepOneModule.handleSelection(this, index);
    },
    setTuitionRate() {
      this.calculationModule.setTuitionRate(this);
    },
    calculateTuition() {
      this.calculationModule.calculateTuition(this);
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
          <ProgressBar :calculator-data="calculatorData" />
          <v-stepper-items>
            <v-stepper-content
              v-for="component in stepperComponentsData"
              :key="`${component.name}-${stepperKey}`"
              :step="component.step"
              ><component
                :is="component.name"
                v-bind="component.props"
                v-on="component.on"
              ></component>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
      <v-col cols="6" md="4">
        <Results :calculator-data="calculatorData" />
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.legal-disclaimer {
  font-size: 12px;
}
</style>
