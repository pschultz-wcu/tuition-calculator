<script>
import BackButton from "./form/BackButton.vue";
import NextButton from "./form/NextButton.vue";
import DataModule from "../modules/DataModule";
export default {
  name: "TuitionCalculator",
  components: {
    BackButton,
    NextButton,
  },
  data: () => ({
    dataModule: null,
    stepperKey: 0,
    calculatorData: {},
    previousIndex: null,
    userChoices: {},
    stepData: {},
    wcuProgramData: {},
  }),
  created() {
    this.dataModule = new DataModule();
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
      for (const program of Object.keys(o)) {
        this.stepData.stepOne.fields[n].options.push(program);
      }
    },
    multipleOptions(n, o) {
      this.setOptions(n, o);
      this.stepData.stepOne.fields[n].disabled = false;      
    },
    oneOption(n, o) {
      console.log("nextField = ", n);
      console.log("options = ", Object.keys(o)[0]);
      this.setOptions(n, o);
      this.userChoices.stepOne[n] = Object.keys(o)[0];
      this.stepData.stepOne.fields[n].disabled = false;
      this.stepData.stepOne.fields[n + 1].disabled = false;
      this.handleSelection(n);      
    },
    setFields(nextField, options) {
      console.log(Object.keys(options).length == 1);
      Object.keys(options).length == 1
        ? this.oneOption(nextField, options)
        : this.multipleOptions(nextField, options);      
    },
    clearSuccessiveFields(index) {
      console.log(index, this.previousIndex);
      let clearIndex = index + 1;
      while (clearIndex < 4) {
        console.log(clearIndex)
        this.userChoices.stepOne[clearIndex] = "";
        clearIndex++;
      }
      this.stepperKey += 1;
    },
    setStepOneUserChoices(index) {
      let options;
      switch (index) {
        case 0:
          options = this.wcuProgramData[this.userChoices.stepOne[0]];
          break;
        case 1:
          options =
            this.wcuProgramData[this.userChoices.stepOne[0]][
              this.userChoices.stepOne[1]
            ];
          break;
        case 2:
          options =
            this.wcuProgramData[this.userChoices.stepOne[0]][
              this.userChoices.stepOne[1]
            ][this.userChoices.stepOne[2]];
          break;
      }
      return options;
    },
    handleSelection(index) {
      console.log(
        "previous index: " + this.previousIndex, 
        "index: " + index,         
      );
      this.stepData.stepOne.fields[index + 1].options = [];
      if (this.previousIndex !== null && index < this.previousIndex) {
        this.clearSuccessiveFields(index);
      }
      const options = this.setStepOneUserChoices(index);
      console.log(options);
      this.previousIndex = index
      this.setFields(index + 1, options);      
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
              <p>Select a Program</p>

              <v-form v-model="stepData.stepOne.valid">
                <v-select
                  outlined
                  v-for="field in stepData.stepOne.fields"
                  :key="field.label"
                  :label="field.label"
                  :disabled="field.disabled"
                  :items="field.options"
                  @change="field._id !== 3 ? handleSelection(field._id) : null"
                  v-model="userChoices.stepOne[field._id]"
                  :required="field.isRequired"
                  :rules="stepData.stepOne.fieldRules"
                ></v-select>
              </v-form>

              <p class="legal-disclaimer">
                This tool is provided for informational purposes only and does
                not represent a guarantee of the time required to complete a
                program or the total program cost. Completion time is based on
                the assumptions that you will enroll in time to begin classes on
                the start date selected, will remain enrolled for each
                consecutive term, and will maintain satisfactory academic
                standing in each term to progress toward completion of your
                program. Tuition estimates do not include general program
                specific fees.
              </p>

              <div class="nav-btn-container d-flex align-center justify-end">
                <NextButton @clicked="nextStep()" :fields="stepData.stepOne" />
              </div>
            </v-stepper-content>

            <v-stepper-content step="2">
              <p>Select a Tuition Rate</p>

              <p>
                Special tuition rates are available for specific student
                populations, including Indiana residents, military
                servicemembers and veterans, alumni, and more.&nbsp;Select
                <strong>Standard Rate</strong>&nbsp;if none apply and see other
                ways to save on tuition.
              </p>

              <v-form v-model="stepData.stepTwo.valid">
                <v-select
                  :items="stepData.stepTwo.tuition.options"
                  v-model="userChoices.stepTwo.tuition.option"
                  @change="setTuitionRate()"
                  outlined
                  label="Choose a Tuition Rate"
                  :required="stepData.stepTwo.tuition.isRequired"
                  :rules="stepData.stepTwo.fieldRules"
                ></v-select>
              </v-form>

              <p class="legal-disclaimer">
                Tuition estimates will vary based on program of interest,
                tuition reduction selected, rate at which you complete the
                program, availability of eligible prior learning credits,
                prerequisites required, and repeated courses. Tuition estimates
                do not include general or program-specific fees.
              </p>

              <div
                class="nav-btn-container d-flex align-center justify-space-between"
              >
                <BackButton @clicked="previousStep()" />
                <NextButton @clicked="nextStep()" :fields="stepData.stepTwo" />
              </div>
            </v-stepper-content>

            <v-stepper-content step="3">
              <p>Select Your Preferred Schedule</p>

              <p>
                WCU offers monthly start dates, so you can begin classes when
                it’s most convenient for you. Select&nbsp;one below.
              </p>

              <v-form v-model="stepData.stepThree.valid">
                <p>Expected Start Date</p>
                <v-radio-group
                  row
                  class="mx-8"
                  :required="stepData.stepThree.startDate.isRequired"
                  v-model="userChoices.stepThree.startDate"
                  :rules="stepData.stepThree.fieldRules"
                >
                  <v-radio
                    label="September 21 2022"
                    value="September 21 2022"
                  ></v-radio>
                  <v-radio
                    label="October 19 2022"
                    value="October 19 2022"
                  ></v-radio>
                  <v-radio
                    label="December 7 2022"
                    value="December 7 2022"
                  ></v-radio>
                </v-radio-group>

                <p>Courses Per Term</p>

                <p>
                  Full-time undergraduate students typically take&nbsp;2 courses
                  per term. Certain programs may require you to meet academic
                  requirements or receive prior approval to take more
                  than&nbsp;2 courses per term.
                </p>

                <v-radio-group
                  row
                  class="mx-8"
                  :required="stepData.stepThree.courseLoad.isRequired"
                  v-model="userChoices.stepThree.courseLoad"
                  :rules="stepData.stepThree.fieldRules"
                >
                  <v-radio label="1" value="1"></v-radio>
                  <v-radio label="2" value="2"></v-radio>
                  <v-radio label="3" value="3"></v-radio>
                </v-radio-group>
              </v-form>

              <div
                class="nav-btn-container d-flex align-center justify-space-between"
              >
                <BackButton @clicked="previousStep()" />
                <NextButton
                  @clicked="nextStep()"
                  :fields="stepData.stepThree"
                />
              </div>
            </v-stepper-content>

            <v-stepper-content step="4">
              <p>Credit for Prior Learning & Experience</p>

              <p>
                Prior&nbsp;coursework and life experiences can translate into
                college credit, saving time and money. Estimate quarter credits
                you earned from a prior college or university.&nbsp;1 semester
                credit hour = 1.5 quarter credit hours.
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

              <p>
                Do you plan on completing a credit-for-work-experience course?
              </p>
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

              <div
                class="nav-btn-container d-flex align-center justify-space-between"
              >
                <BackButton @clicked="previousStep()" />
                <NextButton @clicked="nextStep()" :fields="stepData.stepFour" />
              </div>
            </v-stepper-content>

            <v-stepper-content step="5">
              <p>Your Estimate</p>

              <v-simple-table fixed-header height="300px">
                <thead>
                  <tr>
                    <th class="text-left">Program</th>
                    <th class="text-right">
                      {{ userChoices.stepOne[3] }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-left">Total Quarter Credits</td>
                    <td class="text-right">120</td>
                  </tr>
                  <tr>
                    <td class="text-left">Tuition Rate</td>
                    <td class="text-right">
                      {{ userChoices.stepTwo.tuition.option }} - ${{
                        userChoices.stepTwo.tuition.rate
                      }}/credit
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">Estimated Transfer Credits</td>
                    <td class="text-right">
                      {{ userChoices.stepFour.transferCredits }}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">Supplies & Fees</td>
                    <td class="text-right">${{ calculatorData.fees }}</td>
                  </tr>
                  <tr>
                    <td class="text-left">Estimated Tuition Cost</td>
                    <td class="text-right">
                      {{ calculatorData.estimatedTuition }}
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>

              <v-simple-table class="mt-4" fixed-header height="300px">
                <tbody>
                  <tr>
                    <td class="text-left">Start Date</td>
                    <td class="text-right">
                      {{ stepData.stepThree.startDate.value }}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">Course Length</td>
                    <td class="text-right">10</td>
                  </tr>
                  <tr>
                    <td class="text-left">Courses per Term</td>
                    <td class="text-right">2</td>
                  </tr>
                  <tr>
                    <td class="text-left">Terms to Graduate</td>
                    <td class="text-right">18</td>
                  </tr>
                  <tr>
                    <td class="text-left">Estimate Graduation Date</td>
                    <td class="text-right">Spring 2026</td>
                  </tr>
                </tbody>
              </v-simple-table>

              <div
                class="nav-btn-container d-flex align-center justify-space-between"
              >
                <v-btn text @click="resetCalculator"> Start Over </v-btn>
                <v-btn color="primary"> Apply Now</v-btn>
              </div>
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
