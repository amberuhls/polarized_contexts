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
  /******************************************/
  /*           Setup                     */
  /******************************************/


  var quick_mode = false;
  var test_mode = false;

  var coin = [0, 1];
  var coin_flip = jsPsych.randomization.sampleWithoutReplacement(coin, 1);
  if (coin_flip == 0) { var stable = false; } else { var stable = true; }





  var n_stable = 16;
  var n_startup = 4;
  var n_variable = 9;



  var quickmode_speed = 10;
  var after_trial_gap = null;
  var image_duration = 500;
  var fixation_duration = 5000;

  var trials_per_block = 50;
  var first_variable_signal = 0.4 * trials_per_block;
  var second_variable_signal = 0.28 * trials_per_block;
  var third_variable_signal = 0.16 * trials_per_block;
  var fourth_variable_signal = 0.06 * trials_per_block;

  var start_time;





  var subject_id = 'pcc' + jsPsych.randomization.randomID(10);
  var blockcounter = 0;



  jsPsych.data.addProperties({ subject_id: subject_id });
  jsPsych.data.addProperties({ stable: stable });
  jsPsych.data.addProperties({ blockcounter: blockcounter });


  // Preload assets
  timeline.push({
    type: PreloadPlugin,
    images: assetPaths.images,
    audio: assetPaths.audio,
    video: assetPaths.video,
  });

  /* BLUE */
  var signal = [
    { stimulus: "assets/dots/Graph0.png", data: { test_part: 'test', actual_intensity: '0' } },
    { stimulus: "assets/dots/Graph1.png", data: { test_part: 'test', actual_intensity: '1' } },
    { stimulus: "assets/dots/Graph2.png", data: { test_part: 'test', actual_intensity: '2' } },
    { stimulus: "assets/dots/Graph3.png", data: { test_part: 'test', actual_intensity: '3' } },
    { stimulus: "assets/dots/Graph4.png", data: { test_part: 'test', actual_intensity: '4' } },
    { stimulus: "assets/dots/Graph5.png", data: { test_part: 'test', actual_intensity: '5' } },
    { stimulus: "assets/dots/Graph6.png", data: { test_part: 'test', actual_intensity: '6' } },
    { stimulus: "assets/dots/Graph7.png", data: { test_part: 'test', actual_intensity: '7' } },
    { stimulus: "assets/dots/Graph8.png", data: { test_part: 'test', actual_intensity: '8' } },
    { stimulus: "assets/dots/Graph9.png", data: { test_part: 'test', actual_intensity: '9' } },
    { stimulus: "assets/dots/Graph10.png", data: { test_part: 'test', actual_intensity: '10' } },
    { stimulus: "assets/dots/Graph11.png", data: { test_part: 'test', actual_intensity: '11' } },
    { stimulus: "assets/dots/Graph12.png", data: { test_part: 'test', actual_intensity: '12' } },
    { stimulus: "assets/dots/Graph13.png", data: { test_part: 'test', actual_intensity: '13' } },
    { stimulus: "assets/dots/Graph14.png", data: { test_part: 'test', actual_intensity: '14' } },
    { stimulus: "assets/dots/Graph15.png", data: { test_part: 'test', actual_intensity: '15' } },
    { stimulus: "assets/dots/Graph16.png", data: { test_part: 'test', actual_intensity: '16' } },
    { stimulus: "assets/dots/Graph17.png", data: { test_part: 'test', actual_intensity: '17' } },
    { stimulus: "assets/dots/Graph18.png", data: { test_part: 'test', actual_intensity: '18' } },
    { stimulus: "assets/dots/Graph19.png", data: { test_part: 'test', actual_intensity: '19' } },
    { stimulus: "assets/dots/Graph20.png", data: { test_part: 'test', actual_intensity: '20' } },
    { stimulus: "assets/dots/Graph21.png", data: { test_part: 'test', actual_intensity: '21' } },
    { stimulus: "assets/dots/Graph22.png", data: { test_part: 'test', actual_intensity: '22' } },
    { stimulus: "assets/dots/Graph23.png", data: { test_part: 'test', actual_intensity: '23' } },
    { stimulus: "assets/dots/Graph24.png", data: { test_part: 'test', actual_intensity: '24' } },
    { stimulus: "assets/dots/Graph25.png", data: { test_part: 'test', actual_intensity: '25' } },
    { stimulus: "assets/dots/Graph26.png", data: { test_part: 'test', actual_intensity: '26' } },
    { stimulus: "assets/dots/Graph27.png", data: { test_part: 'test', actual_intensity: '27' } },
    { stimulus: "assets/dots/Graph28.png", data: { test_part: 'test', actual_intensity: '28' } },
    { stimulus: "assets/dots/Graph29.png", data: { test_part: 'test', actual_intensity: '29' } },
    { stimulus: "assets/dots/Graph30.png", data: { test_part: 'test', actual_intensity: '30' } },
    { stimulus: "assets/dots/Graph31.png", data: { test_part: 'test', actual_intensity: '31' } },
    { stimulus: "assets/dots/Graph32.png", data: { test_part: 'test', actual_intensity: ' ' } },
    { stimulus: "assets/dots/Graph33.png", data: { test_part: 'test', actual_intensity: '33' } },
    { stimulus: "assets/dots/Graph34.png", data: { test_part: 'test', actual_intensity: '34' } },
    { stimulus: "assets/dots/Graph35.png", data: { test_part: 'test', actual_intensity: '35' } },
    { stimulus: "assets/dots/Graph36.png", data: { test_part: 'test', actual_intensity: '36' } },
    { stimulus: "assets/dots/Graph37.png", data: { test_part: 'test', actual_intensity: '37' } },
    { stimulus: "assets/dots/Graph38.png", data: { test_part: 'test', actual_intensity: '38' } },
    { stimulus: "assets/dots/Graph39.png", data: { test_part: 'test', actual_intensity: '39' } },
    { stimulus: "assets/dots/Graph40.png", data: { test_part: 'test', actual_intensity: '40' } },
    { stimulus: "assets/dots/Graph41.png", data: { test_part: 'test', actual_intensity: '41' } },
    { stimulus: "assets/dots/Graph42.png", data: { test_part: 'test', actual_intensity: '42' } },
    { stimulus: "assets/dots/Graph43.png", data: { test_part: 'test', actual_intensity: '43' } },
    { stimulus: "assets/dots/Graph44.png", data: { test_part: 'test', actual_intensity: '44' } },
    { stimulus: "assets/dots/Graph45.png", data: { test_part: 'test', actual_intensity: '45' } },
    { stimulus: "assets/dots/Graph46.png", data: { test_part: 'test', actual_intensity: '46' } },
    { stimulus: "assets/dots/Graph47.png", data: { test_part: 'test', actual_intensity: '47' } },
    { stimulus: "assets/dots/Graph48.png", data: { test_part: 'test', actual_intensity: '48' } },
    { stimulus: "assets/dots/Graph49.png", data: { test_part: 'test', actual_intensity: '49' } },
  ];

  /* PURPLE */
  var noise = [
    { stimulus: "assets/dots/Graph50.png", data: { test_part: 'test', actual_intensity: '50' } },
    { stimulus: "assets/dots/Graph51.png", data: { test_part: 'test', actual_intensity: '51' } },
    { stimulus: "assets/dots/Graph52.png", data: { test_part: 'test', actual_intensity: '52' } },
    { stimulus: "assets/dots/Graph53.png", data: { test_part: 'test', actual_intensity: '53' } },
    { stimulus: "assets/dots/Graph54.png", data: { test_part: 'test', actual_intensity: '54' } },
    { stimulus: "assets/dots/Graph55.png", data: { test_part: 'test', actual_intensity: '55' } },
    { stimulus: "assets/dots/Graph56.png", data: { test_part: 'test', actual_intensity: '56' } },
    { stimulus: "assets/dots/Graph57.png", data: { test_part: 'test', actual_intensity: '57' } },
    { stimulus: "assets/dots/Graph58.png", data: { test_part: 'test', actual_intensity: '58' } },
    { stimulus: "assets/dots/Graph59.png", data: { test_part: 'test', actual_intensity: '59' } },
    { stimulus: "assets/dots/Graph60.png", data: { test_part: 'test', actual_intensity: '60' } },
    { stimulus: "assets/dots/Graph61.png", data: { test_part: 'test', actual_intensity: '61' } },
    { stimulus: "assets/dots/Graph62.png", data: { test_part: 'test', actual_intensity: '62' } },
    { stimulus: "assets/dots/Graph63.png", data: { test_part: 'test', actual_intensity: '63' } },
    { stimulus: "assets/dots/Graph64.png", data: { test_part: 'test', actual_intensity: '64' } },
    { stimulus: "assets/dots/Graph65.png", data: { test_part: 'test', actual_intensity: '65' } },
    { stimulus: "assets/dots/Graph66.png", data: { test_part: 'test', actual_intensity: '66' } },
    { stimulus: "assets/dots/Graph67.png", data: { test_part: 'test', actual_intensity: '67' } },
    { stimulus: "assets/dots/Graph68.png", data: { test_part: 'test', actual_intensity: '68' } },
    { stimulus: "assets/dots/Graph69.png", data: { test_part: 'test', actual_intensity: '69' } },
    { stimulus: "assets/dots/Graph70.png", data: { test_part: 'test', actual_intensity: '70' } },
    { stimulus: "assets/dots/Graph71.png", data: { test_part: 'test', actual_intensity: '71' } },
    { stimulus: "assets/dots/Graph72.png", data: { test_part: 'test', actual_intensity: '72' } },
    { stimulus: "assets/dots/Graph73.png", data: { test_part: 'test', actual_intensity: '73' } },
    { stimulus: "assets/dots/Graph74.png", data: { test_part: 'test', actual_intensity: '74' } },
    { stimulus: "assets/dots/Graph75.png", data: { test_part: 'test', actual_intensity: '75' } },
    { stimulus: "assets/dots/Graph76.png", data: { test_part: 'test', actual_intensity: '76' } },
    { stimulus: "assets/dots/Graph77.png", data: { test_part: 'test', actual_intensity: '77' } },
    { stimulus: "assets/dots/Graph78.png", data: { test_part: 'test', actual_intensity: '78' } },
    { stimulus: "assets/dots/Graph79.png", data: { test_part: 'test', actual_intensity: '79' } },
    { stimulus: "assets/dots/Graph80.png", data: { test_part: 'test', actual_intensity: '80' } },
    { stimulus: "assets/dots/Graph81.png", data: { test_part: 'test', actual_intensity: '81' } },
    { stimulus: "assets/dots/Graph82.png", data: { test_part: 'test', actual_intensity: '82' } },
    { stimulus: "assets/dots/Graph83.png", data: { test_part: 'test', actual_intensity: '83' } },
    { stimulus: "assets/dots/Graph84.png", data: { test_part: 'test', actual_intensity: '84' } },
    { stimulus: "assets/dots/Graph85.png", data: { test_part: 'test', actual_intensity: '85' } },
    { stimulus: "assets/dots/Graph86.png", data: { test_part: 'test', actual_intensity: '86' } },
    { stimulus: "assets/dots/Graph87.png", data: { test_part: 'test', actual_intensity: '87' } },
    { stimulus: "assets/dots/Graph88.png", data: { test_part: 'test', actual_intensity: '88' } },
    { stimulus: "assets/dots/Graph89.png", data: { test_part: 'test', actual_intensity: '89' } },
    { stimulus: "assets/dots/Graph90.png", data: { test_part: 'test', actual_intensity: '90' } },
    { stimulus: "assets/dots/Graph91.png", data: { test_part: 'test', actual_intensity: '91' } },
    { stimulus: "assets/dots/Graph92.png", data: { test_part: 'test', actual_intensity: '92' } },
    { stimulus: "assets/dots/Graph93.png", data: { test_part: 'test', actual_intensity: '93' } },
    { stimulus: "assets/dots/Graph94.png", data: { test_part: 'test', actual_intensity: '94' } },
    { stimulus: "assets/dots/Graph95.png", data: { test_part: 'test', actual_intensity: '95' } },
    { stimulus: "assets/dots/Graph96.png", data: { test_part: 'test', actual_intensity: '96' } },
    { stimulus: "assets/dots/Graph97.png", data: { test_part: 'test', actual_intensity: '97' } },
    { stimulus: "assets/dots/Graph98.png", data: { test_part: 'test', actual_intensity: '98' } },
    { stimulus: "assets/dots/Graph99.png", data: { test_part: 'test', actual_intensity: '99' } },
  ];

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


  var instructions1 = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: "Welcome to this study! We are interested in studying how people perceive and identify colors.",
    choices: [' '],
    prompt: "<p>Press Spacebar to Continue</p>",
    on_finish: function (data) {
      start_time = jsPsych.getStartTime(); //save start time as global variable
      jsPsych.data.addProperties({ start_time: start_time });
    } //record start time
  };

  var instructions2 = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: "In this task, you will see dots presented on the screen one at a time, in a variety of colors. Your task in this study will be to identify blue dots.",
    choices: [' '],
    prompt: "<p>Press Spacebar to Continue</p>"
  };

  var instructions3 = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: "When you see a blue dot on the screen, press the 'blue' key. For all other dots, press the 'not blue' key.",
    choices: [' '],
    prompt: "<p>Press Spacebar to Continue</p>"
  };

  var instructions4 = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: "The dots will be presented in series with breaks in between. This means that you will see a series of dots, have a short break, and then another series of dots, until you have seen 16 series. ",
    choices: [' '],
    prompt: "<p>Press Spacebar to Continue</p>"
  };

  var instructions5 = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: "Some of the series you see may have a lot of blue dots, and other may have only a few. There is nothing for you to count or keep track of -- your only task is to identify blue dots. ",
    choices: [' '],
    prompt: "<p>Press Spacebar to Continue</p>"
  };

  var instructions6 = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: "You should do your best to answer quickly and accurately during the study. However, if you make a mistake and hit the wrong button at any point, just keep going. ",
    choices: [' '],
    prompt: "<p>Press Spacebar to Continue</p>"
  };

  var instructions7 = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: "Now you will complete a brief practice series so you can get used to the task. ",
    choices: [' '],
    prompt: "<p>Press Spacebar to Continue</p>"
  };

  var instructions8 = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: " You have now completed the practice series. Prepare for the main task.",
    choices: [' '],
    prompt: "<p>Press Spacebar to Continue</p>"
  };




  timeline.push(instructions1);
  timeline.push(instructions2);
  timeline.push(instructions3);
  timeline.push(instructions4);
  timeline.push(instructions5);
  timeline.push(instructions6);
  timeline.push(instructions7);

  /* 
    // Switch to fullscreen
    timeline.push({
      type: FullscreenPlugin,
      fullscreen_mode: true,
    });
   */



  /******************************************/
  /*          Trial Variables               */
  /******************************************/


  /* image block variables */
  var allimages = signal.concat(noise);


  var first_variable_noise = trials_per_block - first_variable_signal;
  var second_variable_noise = trials_per_block - second_variable_signal;
  var third_variable_noise = trials_per_block - third_variable_signal;
  var fourth_variable_noise = trials_per_block - fourth_variable_signal;

  var signal40 = jsPsych.randomization.sampleWithoutReplacement(signal, first_variable_signal);
  var noise60 = jsPsych.randomization.sampleWithoutReplacement(noise, first_variable_noise);
  var b5 = signal40.concat(noise60);
  var block5 = jsPsych.randomization.repeat(b5, 1);

  var signal28 = jsPsych.randomization.sampleWithoutReplacement(signal, second_variable_signal);
  var noise72 = jsPsych.randomization.sampleWithoutReplacement(noise, second_variable_noise);
  var b6 = signal28.concat(noise72);
  var block6 = jsPsych.randomization.repeat(b6, 1);

  var signal16 = jsPsych.randomization.sampleWithoutReplacement(signal, third_variable_signal);
  var noise84 = jsPsych.randomization.sampleWithoutReplacement(noise, third_variable_noise);
  var b7 = signal16.concat(noise84);
  var block7 = jsPsych.randomization.repeat(b7, 1);



  var test = {
    type: ImageKeyboardResponsePlugin,
    stimulus: jsPsych.timelineVariable('stimulus'),
    stimulus_height: 500,
    stimulus_width: 500,
    choices: ["NO_KEYS"],
    data: jsPsych.timelineVariable('data'),
    on_finish: function () {
      blockcounter = blockcounter + 1;
      jsPsych.data.addDataToLastTrial({ blockcounter: blockcounter });
    },
    trial_duration: function () {
      if (quick_mode == false) {
        return (image_duration)
      } else { return (quickmode_speed) }
    }
  }


  var fixation = {
    type: ImageKeyboardResponsePlugin,
    stimulus: 'assets/img/question.png',
    choices: ['f', 'j'],
    post_trial_gap: function () {
      console.log(quick_mode == false)
      if (quick_mode == false) { return (500) } else { return (quickmode_speed) }
    },
    trial_duration: function () {
      if (quick_mode == false) {
        console.log(fixation_duration)
        return (fixation_duration)
      } else { return (quickmode_speed) }
    },
    data: { test_part: 'fixation' },
    // post_trial_gap: function(){
    //     if (quick_mode == false){return(after_trial_gap)} else {return(500)}
    // },
    prompt: "<p> Not Blue (F) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Blue (J)</p>"
  }




  /* random sampling */
  var random_even_test_procedure = {
    timeline: [test, fixation],
    timeline_variables: jsPsych.randomization.sampleWithReplacement(allimages, 10),
    randomize_order: true,
    repetitions: 1
  }

  /* random sampling */
  var random_last_test_procedure = {
    timeline: [test, fixation],
    timeline_variables: allimages,
    sample: {
      type: 'without-replacement',
      size: trials_per_block,
      weights: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47],
    }
  }


  timeline.push(random_even_test_procedure);
  timeline.push(instructions8);

  /* deterministic sampling */
  function evenSample() {
    var a1 = jsPsych.randomization.sampleWithoutReplacement(signal, (0.5 * trials_per_block)).concat(jsPsych.randomization.sampleWithoutReplacement(noise, (0.5 * trials_per_block)));
    return a1;
  }

  /* deterministic sampling */
  function lastSample() {
    var b1 = jsPsych.randomization.sampleWithoutReplacement(signal, fourth_variable_signal).concat(jsPsych.randomization.sampleWithoutReplacement(noise, fourth_variable_noise));
    return b1;
  }





  /* deterministic sampling */
  var test_procedure5 = {
    timeline: [test, fixation],
    timeline_variables: block5,
    randomize_order: true,
    repetitions: 1
  }

  /* deterministic sampling */
  var test_procedure6 = {
    timeline: [test, fixation],
    timeline_variables: block6,
    randomize_order: true,
    repetitions: 1
  }

  /* deterministic sampling */
  var test_procedure7 = {
    timeline: [test, fixation],
    timeline_variables: block7,
    randomize_order: true,
    repetitions: 1
  }


  /*  static */
  var next_block = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: "Please take a short break. You can start the next series in a moment.",
    trial_duration: null,
    choices: [' '],
    prompt: "<p>Press Spacebar to Continue When Ready</p>"
  };
  /*  static */
  var finished1 = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: "Press any key to proceed.",
    on_finish: function (data) {
      time = jsPsych.getTotalTime(); //save total time as global variable
      jsPsych.data.addProperties({ time: time });
    } //record total time
  };


  /*  static */
  var code_block = {
    type: HtmlButtonResponsePlugin,
    stimulus: ["<b>" + subject_id + "</b>" + " <br> Please cut and paste the code above to redeem your HIT. Then, press the finish button below to submit your responses. <b> If you do not press the button you cannot be paid for the HIT </b>."],
    choices: ["finish"]
  };

  var survey_prompt = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: "Thanks for participating in the study! Please answer a few last questions before you go.",
    choices: [' '],
    prompt: "<p>Press Spacebar to Continue</p>"
  };

  var q1 = {
    type: SurveyTextPlugin,
    questions: [{ prompt: "How old are you?" }],
  };

  var q2 = {
    type: SurveyMultiChoicePlugin,
    questions: [{ prompt: "Please indicate your gender", options: ["Male", "Female", "Prefer not to answer"], required: true }]
  };

  var q3 = {
    type: SurveyMultiChoicePlugin,
    questions: [{ prompt: "Did you find the task easy or difficult?", options: ["Very Easy", "Easy", "Somewhat Easy", "Neutral", "Somewhat Difficult", "Difficult", "Very Difficult"], required: true, horizontal: true }]
  };

  var q4 = {
    type: SurveyMultiChoicePlugin,
    questions: [{ prompt: " Are you right handed or left handed?", options: ["Right handed", "Left handed"], required: true }]
  };

  var q5 = {
    type: SurveyMultiChoicePlugin,
    questions: [{ prompt: "Do you wear corrective lenses? If so, are you wearing them right now? ", options: ["Yes, but I am not wearing them right now", "Yes, and I am wearing them right now", "No"], required: true }]
  };

  var q6 = {
    type: SurveyMultiChoicePlugin,
    questions: [{ prompt: "Do you have normal color vision", options: ["Yes", "No"], required: true }]
  };

  var q7 = {
    type: SurveyMultiChoicePlugin,
    questions: [{ prompt: "Is English your only native language", options: ["Yes", "No, English is not my native language", "No, I spoke English and other languages growing up"], required: true }]
  };

  var q8 = {
    type: SurveyTextPlugin,
    questions: [{ prompt: "What do you think this study was about?" }],
  };

  var q9 = {
    type: SurveyMultiChoicePlugin,
    questions: [{ prompt: "Do you think that it became easier or harder to find blue dots as the study progressed?", options: ["It became easier to find blue dots as the study progressed", "It became harder to find blue dots as the study progressed", "It was about the same throughout the study", "I am not sure"], required: true }]
  };

  var q10 = {
    type: SurveyMultiChoicePlugin,
    questions: [{ prompt: "Do you feel that the amount of blue dots in each series changed during the study?", options: ["No, there were the same number of blue dots throughout the study", "Yes, there were fewer blue dots as the study went on", "Yes, there were more blue dots as the study went on", "I am not sure"], required: true }]
  };


  var range_options = ["0-10% Blue", "10-20% Blue", "20-30% Blue", "30-40% Blue", "40-50% Blue", "50-60% Blue", "60-70% Blue", "70-80% Blue", "80-90% Blue", "90-100% Blue", "Not Sure"];


  var q11 = {
    type: SurveyMultiChoicePlugin,
    questions: [{ prompt: "In the first few series, I saw", options: range_options, required: true, horizontal: true }, { prompt: "In the middle few series, I saw", options: range_options, required: true, horizontal: true }, { prompt: "In the last few series, I saw", options: range_options, required: true, horizontal: true }],
    preamble: "<p> We want to get a sense of how many blue dots you think you saw at different times in the study. Please indicate, using the options below, your impressions about what proportion of the dots you saw were blue. If you have no idea, please check the box labeled Not Sure instead </p>"
  };

  var q12 = {
    type: SurveyMultiChoicePlugin,
    questions: [{ prompt: "By the end of the study, do you think that your definition of what counted as a blue dot changed?", options: ["No, I think that my defintiion of what counted as a blue dot did not change during the study.", "  Yes, I think my definition of what counts as a blue dot expanded -- I counted a wider range of colors as blue at the end of the study compared to the beginning of the study.", "  Yes, I think my definition of what counts as a blue dot narrowed -- I counted a smaller range of colors as blue at the end of the study compared to the beginning of the study.", " I am not sure if my definition changed", " I don't understand this question"], required: true }]
  };

  var q13 = {
    type: SurveyTextPlugin,
    questions: [{ prompt: "If you have any other comments about the study, please let us know here" }],
  };



  /******************************************/
  /*           Experiment                   */
  /******************************************/



  if (stable == true) {
    for (var i = 0; i < n_stable; i++) {
      var even_test_procedure = {
        timeline: [test, fixation],
        timeline_variables: evenSample(),
        randomize_order: true,
        repetitions: 1
      };
      timeline.push(even_test_procedure);
      timeline.push(next_block);
    }
  }

  else {
    for (var i = 0; i < n_startup; i++) {
      var even_test_procedure = {
        timeline: [test, fixation],
        timeline_variables: evenSample(),
        randomize_order: true,
        repetitions: 1
      };
      timeline.push(even_test_procedure);
      timeline.push(next_block);
    }
    timeline.push(test_procedure5);
    timeline.push(next_block);
    timeline.push(test_procedure6);
    timeline.push(next_block);
    timeline.push(test_procedure7);
    timeline.push(next_block);

    for (var i = 0; i < n_variable; i++) {
      var last_test_procedure = {
        timeline: [test, fixation],
        timeline_variables: lastSample(),
        randomize_order: true,
        repetitions: 1
      };
      timeline.push(last_test_procedure);
      timeline.push(next_block);
    }
  }



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
