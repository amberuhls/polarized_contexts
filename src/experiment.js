/**
 * @title polarized_contexts
 * @description 
 * @version 0.1.0
 *
 * @assets assets/
 */

// You can import stylesheets (.scss or .css).
import "../styles/main.scss";

import FullscreenPlugin from "@jspsych/plugin-fullscreen";
import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";
import SurveyTextPlugin from "@jspsych/plugin-survey-text"
import SurveyMultiChoicePlugin from "@jspsych/plugin-survey-multi-choice"
import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";
import ImageKeyboardResponsePlugin from "@jspsych/plugin-image-keyboard-response";
import SurveyPlugin from "@jspsych/plugin-survey";
import PreloadPlugin from "@jspsych/plugin-preload";
import { initJsPsych } from "jspsych";

/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 *
 * @type {import("jspsych-builder").RunFunction}
 */
export async function run({ assetPaths, input = {}, environment, title, version }) {
  const jsPsych = initJsPsych();

  const timeline = [];

  // Preload assets
  timeline.push({
    type: PreloadPlugin,
    images: assetPaths.images,
    audio: assetPaths.audio,
    video: assetPaths.video,
  });

  var test_stimuli = assetPaths.images.map(function (item) {
    return { stimulus: [item] };
  });

  // Welcome screen
  timeline.push({
    type: HtmlKeyboardResponsePlugin,
    stimulus: "<p>Welcome to polarized_contexts!<p/>",
  });
  /* 
    // Switch to fullscreen
    timeline.push({
      type: FullscreenPlugin,
      fullscreen_mode: true,
    });
   */
  // screener questions
  var questions = {
    type: SurveyPlugin,
    data: { trial_name: 'consent' },
    survey_json: {
      showQuestionNumbers: false,
      elements: [
        {
          //Capture prolific ID manually
          type: "text",
          title: "Please enter your Prolific ID accurately.",
        },
        {
          //Screener task english - need more screeners... check demoSurvey
          type: "radiogroup",
          title: "Are you fluent in English?",
          name: "Eng",
          choices: ["Yes", "No"],
          isRequired: true,
        },
        {
          type: "radiogroup",
          title: 'Please read the following instructions: Recent research on decision making has shown that choices are affected by political party affiliation. To help us understand how people from different backgrounds make decisions, we are interested in information about you. Specifically, we want to know if you actually read any of the instructions we give at the beginning of our survey; if not, some results may not tell us very much about decision making and perception in the real world. To show that you have read the instructions, please ignore the questions about political party affiliation below and simply select "Other" at the bottom. For which political party do you typically vote?',
          choices: [
            "Democratic",
            "Republican",
            "Independent",
            "Libertarian",
            "Green Party",
            "Other",
          ],
          name: "attention_check",
        },
      ],
    },
    button_label_finish: 'Continue',
    on_finish: function (data) {
      //Ends experiment early if failed english or attention check
      //NOTE: This still leads to the regular end screen and saves data. Do we want this? 
      if (data.response.Eng == "No") {
        jsPsych.endExperiment();
      } else if (data.response.attention_check != "Other") {
        jsPsych.endExperiment();
      }
    }
  };

  timeline.push(questions);


  var blank = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: '',
    choices: ['e', 'i'],
    prompt: "<p>Press 'e' for blue and 'i' for not blue.</p>",
  };

  var mainTask = {
    type: ImageKeyboardResponsePlugin,
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: ['NO_KEYS'],
    stimulus_height: 300,
    trial_duration: 500,
    maintain_aspect_ratio: true,
  }

  var test = {
    timeline: [mainTask, blank],
    timeline_variables: test_stimuli,
    sample: {
      type: 'with-replacement',
      size: 10
    },
  }
  timeline.push(test)



  //Adds demographics survey to timeline


  //mult choice: religion, gender, hispanic, race, sexOrientation, education
  var taskAge = {
    type: SurveyTextPlugin,
    questions: [{ prompt: "What is your age?", name: "age" }],
  };

  //demo questions
  var taskDemo = {
    type: SurveyMultiChoicePlugin,
    questions: [
      {
        prompt: "With which race/ethnicity do you most identify?",
        name: "race",
        options: [
          "American Indian or Alaska Native",
          "Asian",
          "Black or African-American",
          "Native Hawaiian or Other Pacific Islander",
          "White",
          "Other",
        ],
        required: true,
      },
      {
        prompt: "Do you consider yourself to be Hispanic or Latino?",
        name: "hispanic",
        options: [
          "Hispanic or Latino",
          "Not Hispanic or Latino",
          "I do not wish to provide this information",
        ],
        required: true,
      },
      {
        prompt: "With which gender do you most identify?",
        name: "gender",
        options: [
          "Male",
          "Female",
          "Not otherwise specified",
          "I do not with to provide this information",
        ],
        required: true,
      },
      {
        prompt: "With which sexual orientation do you most identify?",
        name: "sexOrientation",
        options: [
          "Heterosexual or straight",
          "Gay or lesbian",
          "Bisexual",
          "Not otherwise specified",
          "I do not with to provide this information",
        ],
        required: true,
      },
      {
        prompt: "What is the highest level of school that you completed?",
        name: "education",
        options: [
          "No schooling completed",
          "Some Highschool",
          "Highschool",
          "GED",
          "Some College",
          "Associates degree",
          "Bachelor's degree",
          "Master's degree",
          "Professional degree",
          "Doctorate degree",
        ],
        required: true,
      },
    ]
  };

  timeline.push(taskAge, taskDemo);

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  return jsPsych;
}
