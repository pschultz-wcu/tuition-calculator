export default class DataModule {
  setData(that) {    
    that.calculatorData = {
      progress: 0,
      step: 1,
      estimatedTuition: "$0",
      estimatedGradDate: "TBD",
      fees: 10000,
    };
    that.userChoices = {
      stepOne: ["", "", "", ""],
      programData: null,
      stepTwo: {
        tuition: {
          option: null,
          rate: null,
        },
      },
      stepThree: {
        startDate: "",
        courseLoad: "",
      },
      stepFour: {
        transferCredits: 0,
        workExperience: "",
      },
    };
    that.stepData = {
      stepOne: {
        valid: false,
        fieldRules: [(v) => !!v || "This field is required"],
        fields: [
          {
            _id: 0,
            reference: "campus",
            label: "Choose a WCU Campus",
            options: ["California", "Texas", "Florida"],
            isRequired: true,
          },
          {
            _id: 1,
            reference: "areaOfStudy",
            label: "Choose Area of Study",
            options: null,
            disabled: true,
            isRequired: true,
          },
          {
            _id: 2,
            reference: "degreeLevel",
            label: "Choose Degree Level",
            options: null,
            disabled: true,
            isRequired: true,
          },
          {
            _id: 3,
            reference: "program",
            label: "Choose Program",
            options: null,
            disabled: true,
            isRequired: true,
          },
        ],
      },
      stepTwo: {        
        valid: false,
        fieldRules: [(v) => !!v || "This field is required"],
        tuition: {
          options: ["Standard Rate", "Active Duty", "Veteran"],
          rates: [460, 391, 250],
          isRequired: true,
        },
      },
      stepThree: {        
        valid: false,
        fieldRules: [(v) => !!v || "This field is required"],
        startDate: {
          isRequired: true,
        },
        courseLoad: {
          isRequired: true,
        },
      },
      stepFour: {        
        valid: false,
        fieldRules: [(v) => !!v || "This field is required"],
        workExperience: {
          isRequired: true,
          value: "",
        },
      },
    };
    that.wcuProgramData = {
      California: {
        "Dental Hygiene": {
          "Bachelor's": {
            "Bachelor of Science in Dental Hygiene": {
              total_credits: 124,
              program_length: 7,
              term_type: "semesters",
            },
          },
        },
        Nursing: {
          "Bachelor's": {
            "LVN to Bachelor of Science in Nursing": {
              total_credits: 120,
              program_length: 7,
              term_type: "semesters",
            },
            "Bachelor of Science in Nursing": {
              total_credits: 120,
              program_length: 8,
              term_type: "semesters",
            },
          },
        },
        "Occupational Therapy": {
          Doctorate: {
            "Occupational Therapy Doctorate": {
              total_credits: 120,
              program_length: 8,
              term_type: "trimesters",
            },
          },
          "Master's": {
            "Master of Science in Occupational Therapy": {
              total_credits: 96,
              program_length: 6,
              term_type: "trimesters",
            },
          },
        },
        Pharmacy: {
          Doctorate: {
            "Doctor of Pharmacy": {
              total_credits: 144,
              program_length: 9,
              term_type: "trimesters",
            },
          },
        },
        "Physical Therapy": {
          Doctorate: {
            "Doctor of Physical Therapy": {
              total_credits: 133,
              program_length: 9,
              term_type: "trimesters",
            },
          },
        },
      },
      Florida: {
        Nursing: {
          Associate: {
            "Associate Degree in Nursing": {
              total_credits: 67,
              program_length: 4,
              term_type: "semesters",
            },
          },
          "Bachelor's": {
            "Bachelor of Science in Nursing": {
              total_credits: 120,
              program_length: 8,
              term_type: "semesters",
            },
            "LPN to Bachelor of Science in Nursing": {
              total_credits: 120,
              program_length: 7,
              term_type: "semesters",
            },
          },
        },
      },
      Texas: {
        Nursing: {
          "Bachelor's": {
            "Bachelor of Science in Nursing": {
              total_credits: 120,
              program_length: 8,
              term_type: "semesters",
            },
            "LVN to Bachelor of Science in Nursing": {
              total_credits: 120,
              program_length: 7,
              term_type: "semesters",
            },
          },
        },
        "Occupational Therapy": {
          "Master's": {
            "Master of Science in Occupational Therapy": {
              total_credits: 90,
              program_length: 6,
              term_type: "trimesters",
            },
          },
        },
        "Physician Assistant": {
          "Master's": {
            "Master of Physician Assistant": {
              total_credits: 117,
              program_length: 6,
              term_type: "trimesters",
            },
          },
        },
      },
    };
  }

  setStepperComponentsData(that) {
    that.stepperComponentsData = [
      {
        step: 1,
        name: "StepOne",
        props: {
          stepData: that.stepData,
          userChoices: that.userChoices,
        },
        on: {
          "field-changed": (e) => {
            console.log(e);
            that.handleSelection(e);
          },
          "next-step": () => {
            that.nextStep();
          },
        },
      },
      {
        step: 2,
        name: "StepTwo",
        props: {
          stepData: that.stepData,
          userChoices: that.userChoices,
        },
        on: {
          "field-changed": (e) => {
            console.log(e);
            that.setTuitionRate();
          },
          "previous-step": () => {
            that.previousStep();
          },
          "next-step": () => {
            that.nextStep();
          },
        },
      },
      {
        step: 3,
        name: "StepThree",
        props: {
          stepData: that.stepData,
          userChoices: that.userChoices,
        },
        on: {
          "previous-step": () => {
            that.previousStep();
          },
          "next-step": () => {
            that.nextStep();
          },
        },
      },
      {
        step: 4,
        name: "StepFour",
        props: {
          stepData: that.stepData,
          userChoices: that.userChoices,
        },
        on: {
          "previous-step": () => {
            that.previousStep();
          },
          "next-step": () => {
            that.nextStep();
          },
        },
      },
      {
        step: 5,
        name: "StepFive",
        props: {
          userChoices: that.userChoices,
          stepData: that.stepData,
          calculatorData: that.calculatorData,
        },
        on: {
          "reset": () => {
            that.resetCalculator();
          },
        },
      },
    ];
  }
}
