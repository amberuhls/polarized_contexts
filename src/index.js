// index.js
console.log("Vite is running!");

import "./styles/main.css";
import "jspsych/css/jspsych.css";
import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";
import SurveyTextPlugin from "@jspsych/plugin-survey-text"
import SurveyMultiChoicePlugin from "@jspsych/plugin-survey-multi-choice"
import ImageKeyboardResponsePlugin from "@jspsych/plugin-image-keyboard-response";
import SurveyPlugin from "@jspsych/plugin-survey";
import PreloadPlugin from "@jspsych/plugin-preload";
import { initJsPsych } from "jspsych";

function saveData(id, data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', './php/write_data.php'); // 'write_data.php' is the path to the php file described above.
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ id: id, filedata: data }));
    console.log("Data saved to data/" + id);
}
const jsPsych = initJsPsych({
    on_finish: function () {
        if (test_mode) {
            jsPsych.data.displayData('csv');
        }
        else {
            saveData(id + "-" + session_id, jsPsych.data.get().csv());
            window.location = "https://app.prolific.com/submissions/complete?cc=C1HROM6I";
        }
    }
});

// Define the base URL for your shared assets on the server
// This should match the path where your server serves the 'shared-assets' directory.
const SHARED_ASSETS_BASE_URL = import.meta.env.DEV
    ? '/' // Path for development server (e.g., localhost:5173/shared-assets/)
    : '/webmt/polarized_contexts/shared/';       // Path for production server (e.g., yourdomain.com/shared/)

// Instead of importing, we'll construct the URLs for the images
// based on their location within the shared assets directory.
// Assuming your 'dots' images are in /shared/images/dots/
// and your 'question.png' is in /shared/images/
const dots = {};
for (let i = 0; i <= 99; i++) { // Assuming Graph0.png to Graph99.png
    dots[`Graph${i}.png`] = `${SHARED_ASSETS_BASE_URL}images/dots/Graph${i}.png`;
}

const question = {
    "question.png": `${SHARED_ASSETS_BASE_URL}images/question.png`
};

// This function will iterate through the context and create an object
// where keys are the original filenames (without './') and values are the image URLs.
function importAll(r) {
    let images = {};
    r.keys().map((item) => {
        images[item.replace('./', '')] = r(item);
    });
    return images;
}

function sampleArray(arr, sampleSize) {
    // Handle edge cases: empty array or non-positive sample size
    if (!arr || arr.length === 0) {
        console.warn("Input array is empty or null.");
        return [];
    }
    if (sampleSize <= 0) {
        console.warn("Sample size must be a positive number.");
        return [];
    }

    // Create a shallow copy of the array to avoid modifying the original
    const mutableArr = [...arr];
    const result = [];

    // Case 1: Sample size is less than or equal to the array length (without replacement)
    if (sampleSize <= mutableArr.length) {
        for (let i = 0; i < sampleSize; i++) {
            // Generate a random index
            const randomIndex = Math.floor(Math.random() * mutableArr.length);
            // Add the element to the result
            result.push(mutableArr[randomIndex]);
            // Remove the sampled element to ensure no replacement
            mutableArr.splice(randomIndex, 1);
        }
    }
    // Case 2: Sample size is greater than the array length (initially without, then with replacement)
    else {
        // First, sample all elements without replacement
        while (mutableArr.length > 0) {
            const randomIndex = Math.floor(Math.random() * mutableArr.length);
            result.push(mutableArr[randomIndex]);
            mutableArr.splice(randomIndex, 1);
        }

        // Then, continue sampling with replacement from the original array
        const remainingSamples = sampleSize - arr.length;
        for (let i = 0; i < remainingSamples; i++) {
            const randomIndex = Math.floor(Math.random() * arr.length);
            result.push(arr[randomIndex]);
        }
    }

    return result;
}

const timeline = [];
/******************************************/
/*           Setup                     */
/******************************************/


let quick_mode = false;
let test_mode = false;

let id;
const session_id = Date.now().toString(36) + Math.random().toString(36).substring(2);

const coin = [0, 1, 2, 3];
const coin_flip = jsPsych.randomization.sampleWithoutReplacement(coin, 1);
let condition;
if (coin_flip == 0) { condition = "Stable"; } else if (coin_flip == 1) { condition = "Rank"; } else if (coin_flip == 2) { condition = "Range" } else { condition = "Rank & Range" }
console.log(condition);
if (test_mode) { console.log("Test mode is on! Make sure to turn this off if this is the online version") }





const n_stable = 16;
const n_startup = 4;
const n_variable = 9;



const quickmode_speed = 1;
const after_trial_gap = null;
const image_duration = 500;
const fixation_duration = 5000;

const trials_per_block = 50;
const first_variable_signal = Math.floor(0.4 * trials_per_block);
const second_variable_signal = Math.floor(0.28 * trials_per_block);
const third_variable_signal = Math.floor(0.16 * trials_per_block);
const fourth_variable_signal = Math.floor(0.06 * trials_per_block);

let start_time;





const subject_id = 'pcc' + jsPsych.randomization.randomID(10);
let blockcounter = 0;
let sectioncounter = 0;



jsPsych.data.addProperties({ subject_id: subject_id });
jsPsych.data.addProperties({ condition: condition });
jsPsych.data.addProperties({ blockcounter: blockcounter });

// Preload assets
timeline.push({
    type: PreloadPlugin,
    images: [...Object.values(dots), ...Object.values(question)],
});

/* PURPLE AND BLUE MIDDLE */
const all_dots = [
    { stimulus: dots["Graph0.png"], data: { test_part: 'test', actual_intensity: '0' } },
    { stimulus: dots["Graph1.png"], data: { test_part: 'test', actual_intensity: '1' } },
    { stimulus: dots["Graph2.png"], data: { test_part: 'test', actual_intensity: '2' } },
    { stimulus: dots["Graph3.png"], data: { test_part: 'test', actual_intensity: '3' } },
    { stimulus: dots["Graph4.png"], data: { test_part: 'test', actual_intensity: '4' } },
    { stimulus: dots["Graph5.png"], data: { test_part: 'test', actual_intensity: '5' } },
    { stimulus: dots["Graph6.png"], data: { test_part: 'test', actual_intensity: '6' } },
    { stimulus: dots["Graph7.png"], data: { test_part: 'test', actual_intensity: '7' } },
    { stimulus: dots["Graph8.png"], data: { test_part: 'test', actual_intensity: '8' } },
    { stimulus: dots["Graph9.png"], data: { test_part: 'test', actual_intensity: '9' } },
    { stimulus: dots["Graph10.png"], data: { test_part: 'test', actual_intensity: '10' } },
    { stimulus: dots["Graph11.png"], data: { test_part: 'test', actual_intensity: '11' } },
    { stimulus: dots["Graph12.png"], data: { test_part: 'test', actual_intensity: '12' } },
    { stimulus: dots["Graph13.png"], data: { test_part: 'test', actual_intensity: '13' } },
    { stimulus: dots["Graph14.png"], data: { test_part: 'test', actual_intensity: '14' } },
    { stimulus: dots["Graph15.png"], data: { test_part: 'test', actual_intensity: '15' } },
    { stimulus: dots["Graph16.png"], data: { test_part: 'test', actual_intensity: '16' } },
    { stimulus: dots["Graph17.png"], data: { test_part: 'test', actual_intensity: '17' } },
    { stimulus: dots["Graph18.png"], data: { test_part: 'test', actual_intensity: '18' } },
    { stimulus: dots["Graph19.png"], data: { test_part: 'test', actual_intensity: '19' } },
    { stimulus: dots["Graph20.png"], data: { test_part: 'test', actual_intensity: '20' } },
    { stimulus: dots["Graph21.png"], data: { test_part: 'test', actual_intensity: '21' } },
    { stimulus: dots["Graph22.png"], data: { test_part: 'test', actual_intensity: '22' } },
    { stimulus: dots["Graph23.png"], data: { test_part: 'test', actual_intensity: '23' } },
    { stimulus: dots["Graph24.png"], data: { test_part: 'test', actual_intensity: '24' } },
    { stimulus: dots["Graph25.png"], data: { test_part: 'test', actual_intensity: '25' } },
    { stimulus: dots["Graph26.png"], data: { test_part: 'test', actual_intensity: '26' } },
    { stimulus: dots["Graph27.png"], data: { test_part: 'test', actual_intensity: '27' } },
    { stimulus: dots["Graph28.png"], data: { test_part: 'test', actual_intensity: '28' } },
    { stimulus: dots["Graph29.png"], data: { test_part: 'test', actual_intensity: '29' } },
    { stimulus: dots["Graph30.png"], data: { test_part: 'test', actual_intensity: '30' } },
    { stimulus: dots["Graph31.png"], data: { test_part: 'test', actual_intensity: '31' } },
    { stimulus: dots["Graph32.png"], data: { test_part: 'test', actual_intensity: '32' } },
    { stimulus: dots["Graph33.png"], data: { test_part: 'test', actual_intensity: '33' } },
    { stimulus: dots["Graph34.png"], data: { test_part: 'test', actual_intensity: '34' } },
    { stimulus: dots["Graph35.png"], data: { test_part: 'test', actual_intensity: '35' } },
    { stimulus: dots["Graph36.png"], data: { test_part: 'test', actual_intensity: '36' } },
    { stimulus: dots["Graph37.png"], data: { test_part: 'test', actual_intensity: '37' } },
    { stimulus: dots["Graph38.png"], data: { test_part: 'test', actual_intensity: '38' } },
    { stimulus: dots["Graph39.png"], data: { test_part: 'test', actual_intensity: '39' } },
    { stimulus: dots["Graph40.png"], data: { test_part: 'test', actual_intensity: '40' } },
    { stimulus: dots["Graph41.png"], data: { test_part: 'test', actual_intensity: '41' } },
    { stimulus: dots["Graph42.png"], data: { test_part: 'test', actual_intensity: '42' } },
    { stimulus: dots["Graph43.png"], data: { test_part: 'test', actual_intensity: '43' } },
    { stimulus: dots["Graph44.png"], data: { test_part: 'test', actual_intensity: '44' } },
    { stimulus: dots["Graph45.png"], data: { test_part: 'test', actual_intensity: '45' } },
    { stimulus: dots["Graph46.png"], data: { test_part: 'test', actual_intensity: '46' } },
    { stimulus: dots["Graph47.png"], data: { test_part: 'test', actual_intensity: '47' } },
    { stimulus: dots["Graph48.png"], data: { test_part: 'test', actual_intensity: '48' } },
    { stimulus: dots["Graph49.png"], data: { test_part: 'test', actual_intensity: '49' } },
    { stimulus: dots["Graph50.png"], data: { test_part: 'test', actual_intensity: '50' } },
    { stimulus: dots["Graph51.png"], data: { test_part: 'test', actual_intensity: '51' } },
    { stimulus: dots["Graph52.png"], data: { test_part: 'test', actual_intensity: '52' } },
    { stimulus: dots["Graph53.png"], data: { test_part: 'test', actual_intensity: '53' } },
    { stimulus: dots["Graph54.png"], data: { test_part: 'test', actual_intensity: '54' } },
    { stimulus: dots["Graph55.png"], data: { test_part: 'test', actual_intensity: '55' } },
    { stimulus: dots["Graph56.png"], data: { test_part: 'test', actual_intensity: '56' } },
    { stimulus: dots["Graph57.png"], data: { test_part: 'test', actual_intensity: '57' } },
    { stimulus: dots["Graph58.png"], data: { test_part: 'test', actual_intensity: '58' } },
    { stimulus: dots["Graph59.png"], data: { test_part: 'test', actual_intensity: '59' } },
    { stimulus: dots["Graph60.png"], data: { test_part: 'test', actual_intensity: '60' } },
    { stimulus: dots["Graph61.png"], data: { test_part: 'test', actual_intensity: '61' } },
    { stimulus: dots["Graph62.png"], data: { test_part: 'test', actual_intensity: '62' } },
    { stimulus: dots["Graph63.png"], data: { test_part: 'test', actual_intensity: '63' } },
    { stimulus: dots["Graph64.png"], data: { test_part: 'test', actual_intensity: '64' } },
    { stimulus: dots["Graph65.png"], data: { test_part: 'test', actual_intensity: '65' } },
    { stimulus: dots["Graph66.png"], data: { test_part: 'test', actual_intensity: '66' } },
    { stimulus: dots["Graph67.png"], data: { test_part: 'test', actual_intensity: '67' } },
    { stimulus: dots["Graph68.png"], data: { test_part: 'test', actual_intensity: '68' } },
    { stimulus: dots["Graph69.png"], data: { test_part: 'test', actual_intensity: '69' } },
    { stimulus: dots["Graph70.png"], data: { test_part: 'test', actual_intensity: '70' } },
    { stimulus: dots["Graph71.png"], data: { test_part: 'test', actual_intensity: '71' } },
    { stimulus: dots["Graph72.png"], data: { test_part: 'test', actual_intensity: '72' } },
    { stimulus: dots["Graph73.png"], data: { test_part: 'test', actual_intensity: '73' } },
    { stimulus: dots["Graph74.png"], data: { test_part: 'test', actual_intensity: '74' } },
    { stimulus: dots["Graph75.png"], data: { test_part: 'test', actual_intensity: '75' } },
    { stimulus: dots["Graph76.png"], data: { test_part: 'test', actual_intensity: '76' } },
    { stimulus: dots["Graph77.png"], data: { test_part: 'test', actual_intensity: '77' } },
    { stimulus: dots["Graph78.png"], data: { test_part: 'test', actual_intensity: '78' } },
    { stimulus: dots["Graph79.png"], data: { test_part: 'test', actual_intensity: '79' } },
    { stimulus: dots["Graph80.png"], data: { test_part: 'test', actual_intensity: '80' } },
    { stimulus: dots["Graph81.png"], data: { test_part: 'test', actual_intensity: '81' } },
    { stimulus: dots["Graph82.png"], data: { test_part: 'test', actual_intensity: '82' } },
    { stimulus: dots["Graph83.png"], data: { test_part: 'test', actual_intensity: '83' } },
    { stimulus: dots["Graph84.png"], data: { test_part: 'test', actual_intensity: '84' } },
    { stimulus: dots["Graph85.png"], data: { test_part: 'test', actual_intensity: '85' } },
    { stimulus: dots["Graph86.png"], data: { test_part: 'test', actual_intensity: '86' } },
    { stimulus: dots["Graph87.png"], data: { test_part: 'test', actual_intensity: '87' } },
    { stimulus: dots["Graph88.png"], data: { test_part: 'test', actual_intensity: '88' } },
    { stimulus: dots["Graph89.png"], data: { test_part: 'test', actual_intensity: '89' } },
    { stimulus: dots["Graph90.png"], data: { test_part: 'test', actual_intensity: '90' } },
    { stimulus: dots["Graph91.png"], data: { test_part: 'test', actual_intensity: '91' } },
    { stimulus: dots["Graph92.png"], data: { test_part: 'test', actual_intensity: '92' } },
    { stimulus: dots["Graph93.png"], data: { test_part: 'test', actual_intensity: '93' } },
    { stimulus: dots["Graph94.png"], data: { test_part: 'test', actual_intensity: '94' } },
    { stimulus: dots["Graph95.png"], data: { test_part: 'test', actual_intensity: '95' } },
    { stimulus: dots["Graph96.png"], data: { test_part: 'test', actual_intensity: '96' } },
    { stimulus: dots["Graph97.png"], data: { test_part: 'test', actual_intensity: '97' } },
    { stimulus: dots["Graph98.png"], data: { test_part: 'test', actual_intensity: '98' } },
    { stimulus: dots["Graph99.png"], data: { test_part: 'test', actual_intensity: '99' } }
];

// screener questions
const questions = {
    type: SurveyPlugin,
    data: { trial_name: 'consent' },
    survey_json: {
        showQuestionNumbers: false,
        elements: [
            {
                //Capture prolific ID manually
                type: "text",
                name: "prolific",
                title: "Please enter your Prolific ID accurately.",
            },
            {
                //Screener task english - need more screeners... check demoSurvey
                type: "radiogroup",
                title: "Are you fluent in English?",
                name: "Eng",
                allowClear: false,
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
            jsPsych.abortExperiment();
        } else if (data.response.attention_check != "Other") {
            jsPsych.abortExperiment();
        }
        if (data.response.prolific == "quick" || data.response.prolific == "quickskipend") {
            quick_mode = true;
            console.log("Quick mode activated!");
        }
        else if (data.response.prolific == "quicktest") {
            test_mode = true;
            quick_mode = true;
            console.log("Quick and test modes activated!");
        }
        id = data.response.prolific;
    }
};

timeline.push(questions);


const instructions1 = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: "Welcome to this study! We are interested in studying how people perceive and identify colors.",
    choices: [' '],
    prompt: "<p>Press Spacebar to Continue</p>",
    on_finish: function (data) {
        start_time = jsPsych.getStartTime(); //save start time as global variable
        jsPsych.data.addProperties({ start_time: start_time });
    } //record start time
};

const instructions2 = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: "In this task, you will see dots presented on the screen one at a time, in a variety of colors. Your task in this study will be to identify blue dots.",
    choices: [' '],
    prompt: "<p>Press Spacebar to Continue</p>"
};

const instructions3 = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: "When you see a blue dot on the screen, press the 'blue' key. For all other dots, press the 'not blue' key.",
    choices: [' '],
    prompt: "<p>Press Spacebar to Continue</p>"
};

const instructions4 = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: "The dots will be presented in series with breaks in between. This means that you will see a series of dots, have a short break, and then another series of dots, until you have seen 16 series. ",
    choices: [' '],
    prompt: "<p>Press Spacebar to Continue</p>"
};

const instructions5 = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: "Some of the series you see may have a lot of blue dots, and other may have only a few. There is nothing for you to count or keep track of -- your only task is to identify blue dots. ",
    choices: [' '],
    prompt: "<p>Press Spacebar to Continue</p>"
};

const instructions6 = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: "You should do your best to answer quickly and accurately during the study. However, if you make a mistake and hit the wrong button at any point, just keep going. ",
    choices: [' '],
    prompt: "<p>Press Spacebar to Continue</p>"
};

const instructions7 = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: "Now you will complete a brief practice series so you can get used to the task. ",
    choices: [' '],
    prompt: "<p>Press Spacebar to Continue</p>"
};

const instructions8 = {
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
const middle56 = all_dots.slice(22, 78);


const first_variable_noise = trials_per_block - first_variable_signal;
const second_variable_noise = trials_per_block - second_variable_signal;
const third_variable_noise = trials_per_block - third_variable_signal;
const fourth_variable_noise = trials_per_block - fourth_variable_signal;
let block5, block6, block7;

if (condition == "Rank") {
    let signal = all_dots.slice(36, 64);
    let noise_blue = all_dots.slice(22, 36);
    let noise_purple = all_dots.slice(64, 78);

    const signal40 = sampleArray(signal, first_variable_signal);
    const noise60blue = sampleArray(noise_blue, first_variable_noise / 2);
    const noise60purple = sampleArray(noise_purple, first_variable_noise / 2);
    const b5 = signal40.concat(noise60blue, noise60purple);
    block5 = jsPsych.randomization.repeat(b5, 1);

    const signal28 = sampleArray(signal, second_variable_signal);
    const noise72blue = sampleArray(noise_blue, second_variable_noise / 2);
    const noise72purple = sampleArray(noise_purple, second_variable_noise / 2);
    const b6 = signal28.concat(noise72blue, noise72purple);
    block6 = jsPsych.randomization.repeat(b6, 1);

    const signal16 = sampleArray(signal, third_variable_signal);
    const noise84blue = sampleArray(noise_blue, third_variable_noise / 2);
    const noise84purple = sampleArray(noise_purple, third_variable_noise / 2);
    const b7 = signal16.concat(noise84blue, noise84purple);
    block7 = jsPsych.randomization.repeat(b7, 1);

}

else if (condition == "Range") {
    block5 = sampleArray(all_dots.slice(33, 67), (0.5 * trials_per_block)).concat(sampleArray(all_dots.slice(17, 33), (0.25 * trials_per_block)), sampleArray(all_dots.slice(67, 83), (0.25 * trials_per_block)));

    block6 = sampleArray(all_dots.slice(30, 70), (0.5 * trials_per_block)).concat(sampleArray(all_dots.slice(11, 30), (0.25 * trials_per_block)), sampleArray(all_dots.slice(70, 89), (0.25 * trials_per_block)));

    block7 = sampleArray(all_dots.slice(27, 72), (0.5 * trials_per_block)).concat(sampleArray(all_dots.slice(5, 27), (0.25 * trials_per_block)), sampleArray(all_dots.slice(72, 95), (0.25 * trials_per_block)));

}

else if (condition == "Rank & Range") {


    const signal40 = sampleArray(all_dots.slice(33, 67), first_variable_signal);
    const noise60blue = sampleArray(all_dots.slice(17, 33), first_variable_noise / 2);
    const noise60purple = sampleArray(all_dots.slice(67, 83), first_variable_noise / 2);
    const b5 = signal40.concat(noise60blue, noise60purple);
    block5 = jsPsych.randomization.repeat(b5, 1);

    const signal28 = sampleArray(all_dots.slice(30, 70), second_variable_signal);
    const noise72blue = sampleArray(all_dots.slice(11, 30), second_variable_noise / 2);
    const noise72purple = sampleArray(all_dots.slice(70, 89), second_variable_noise / 2);
    const b6 = signal28.concat(noise72blue, noise72purple);
    block6 = jsPsych.randomization.repeat(b6, 1);

    const signal16 = sampleArray(all_dots.slice(27, 72), third_variable_signal);
    const noise84blue = sampleArray(all_dots.slice(5, 27), third_variable_noise / 2);
    const noise84purple = sampleArray(all_dots.slice(72, 95), third_variable_noise / 2);
    const b7 = signal16.concat(noise84blue, noise84purple);
    block7 = jsPsych.randomization.repeat(b7, 1);
}

const test = {
    type: ImageKeyboardResponsePlugin,
    stimulus: jsPsych.timelineVariable('stimulus'),
    stimulus_height: 500,
    stimulus_width: 500,
    choices: ["NO_KEYS"],
    data: jsPsych.timelineVariable('data'),
    on_finish: function () {
        blockcounter = blockcounter + 1;
        jsPsych.data.addDataToLastTrial({ blockcounter: blockcounter });
        jsPsych.data.addDataToLastTrial({ sectioncounter: sectioncounter });
    },
    trial_duration: function () {
        if (quick_mode == false) {
            return (image_duration)
        } else { return (quickmode_speed) }
    }
}


const fixation = {
    type: ImageKeyboardResponsePlugin,
    stimulus: question["question.png"],
    choices: ['f', 'j'],
    post_trial_gap: function () {
        if (quick_mode == false) { return (500) } else { return (quickmode_speed) }
    },
    trial_duration: function () {
        if (quick_mode == false) {
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
const random_even_test_procedure = {
    timeline: [test, fixation],
    timeline_variables: jsPsych.randomization.sampleWithReplacement(middle56, 10),
    randomize_order: true,
    repetitions: 1
}

/* random sampling */
/* const random_last_test_procedure = {
    timeline: [test, fixation],
    timeline_variables: all_dots,
    sample: {
        type: 'without-replacement',
        size: trials_per_block,
        weights: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47],
    }
}
 */

timeline.push(random_even_test_procedure);
timeline.push(instructions8);

/* deterministic sampling */
function evenSample(cond = "Stable") {
    let a1;
    if (cond == "Range") {
        a1 = sampleArray(all_dots.slice(25, 75), (0.5 * trials_per_block)).concat(sampleArray(all_dots.slice(0, 25), (0.25 * trials_per_block)), sampleArray(all_dots.slice(75), (0.25 * trials_per_block)));

    }
    else {
        a1 = sampleArray(all_dots.slice(36, 64), (0.5 * trials_per_block)).concat(sampleArray(all_dots.slice(22, 36), (0.25 * trials_per_block)), sampleArray(all_dots.slice(64, 78), (0.25 * trials_per_block)));
    }
    return a1;
}

/* deterministic sampling */
function lastSample(cond) {
    let b1;
    if (cond == "Rank") {
        b1 = sampleArray(all_dots.slice(36, 64), fourth_variable_signal).concat(sampleArray(all_dots.slice(22, 36), fourth_variable_noise / 2), sampleArray(all_dots.slice(64, 78), fourth_variable_noise / 2));
    }
    else {
        b1 = sampleArray(all_dots.slice(25, 75), fourth_variable_signal).concat(sampleArray(all_dots.slice(0, 25), fourth_variable_noise / 2), sampleArray(all_dots.slice(75), fourth_variable_noise / 2));
    }

    return b1;
}





/* deterministic sampling */
const test_procedure5 = {
    timeline: [test, fixation],
    timeline_variables: block5,
    randomize_order: true,
    repetitions: 1
}

/* deterministic sampling */
const test_procedure6 = {
    timeline: [test, fixation],
    timeline_variables: block6,
    randomize_order: true,
    repetitions: 1
}

/* deterministic sampling */
const test_procedure7 = {
    timeline: [test, fixation],
    timeline_variables: block7,
    randomize_order: true,
    repetitions: 1
}

/*  static */
const next_block = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: "Please take a short break. You can start the next series in a moment.",
    trial_duration: null,
    choices: [' '],
    prompt: "<p>Press Spacebar to Continue When Ready</p>",
    on_finish: function (data) {
        sectioncounter++;
        saveData(id + "-" + session_id, jsPsych.data.get().csv());
    }
};
/*  static */
const finished1 = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: "Press any key to proceed.",
    on_finish: function () {
        if (test_mode) {
            jsPsych.pauseExperiment()
            jsPsych.data.displayData('csv');
        }
        saveData(id + "-" + session_id, jsPsych.data.get().csv());
    }
};



const q3 = {
    type: SurveyMultiChoicePlugin,
    questions: [{ prompt: "Did you find the task easy or difficult?", options: ["Very Easy", "Easy", "Somewhat Easy", "Neutral", "Somewhat Difficult", "Difficult", "Very Difficult"], required: true, horizontal: true }]
};

const q4 = {
    type: SurveyMultiChoicePlugin,
    questions: [{ prompt: " Are you right handed or left handed?", options: ["Right handed", "Left handed"], required: true }]
};

const q5 = {
    type: SurveyMultiChoicePlugin,
    questions: [{ prompt: "Do you wear corrective lenses? If so, are you wearing them right now? ", options: ["Yes, but I am not wearing them right now", "Yes, and I am wearing them right now", "No"], required: true }]
};

const q6 = {
    type: SurveyMultiChoicePlugin,
    questions: [{ prompt: "Do you have normal color vision", options: ["Yes", "No"], required: true }]
};

const q8 = {
    type: SurveyTextPlugin,
    questions: [{ prompt: "What do you think this study was about?" }],
};

const q9 = {
    type: SurveyMultiChoicePlugin,
    questions: [{ prompt: "Do you think that it became easier or harder to find blue dots as the study progressed?", options: ["It became easier to find blue dots as the study progressed", "It became harder to find blue dots as the study progressed", "It was about the same throughout the study", "I am not sure"], required: true }]
};

const q10 = {
    type: SurveyMultiChoicePlugin,
    questions: [{ prompt: "Do you feel that the amount of blue dots in each series changed during the study?", options: ["No, there were the same number of blue dots throughout the study", "Yes, there were fewer blue dots as the study went on", "Yes, there were more blue dots as the study went on", "I am not sure"], required: true }]
};


const range_options = ["0-10% Blue", "10-20% Blue", "20-30% Blue", "30-40% Blue", "40-50% Blue", "50-60% Blue", "60-70% Blue", "70-80% Blue", "80-90% Blue", "90-100% Blue", "Not Sure"];


const q11 = {
    type: SurveyMultiChoicePlugin,
    questions: [{ prompt: "In the first few series, I saw", options: range_options, required: true, horizontal: true }, { prompt: "In the middle few series, I saw", options: range_options, required: true, horizontal: true }, { prompt: "In the last few series, I saw", options: range_options, required: true, horizontal: true }],
    preamble: "<p> We want to get a sense of how many blue dots you think you saw at different times in the study. Please indicate, using the options below, your impressions about what proportion of the dots you saw were blue. If you have no idea, please check the box labeled Not Sure instead </p>"
};

const q12 = {
    type: SurveyMultiChoicePlugin,
    questions: [{ prompt: "By the end of the study, do you think that your definition of what counted as a blue dot changed?", options: ["No, I think that my defintiion of what counted as a blue dot did not change during the study.", "  Yes, I think my definition of what counts as a blue dot expanded -- I counted a wider range of colors as blue at the end of the study compared to the beginning of the study.", "  Yes, I think my definition of what counts as a blue dot narrowed -- I counted a smaller range of colors as blue at the end of the study compared to the beginning of the study.", " I am not sure if my definition changed", " I don't understand this question"], required: true }]
};

const q13 = {
    type: SurveyTextPlugin,
    questions: [{ prompt: "If you have any other comments about the study, please let us know here" }],
};

/******************************************/
/*           Experiment                   */
/******************************************/



if (condition == "Stable") {
    let even_test_procedure = {
        timeline: [test, fixation],
        timeline_variables: evenSample(),
        randomize_order: true,
        repetitions: 1
    };
    for (let i = 0; i < n_stable - 1; i++) {
        timeline.push(even_test_procedure);
        timeline.push(next_block);
        even_test_procedure = {
            timeline: [test, fixation],
            timeline_variables: evenSample(),
            randomize_order: true,
            repetitions: 1
        };
    }
    timeline.push(even_test_procedure);
}

else if (condition == "Rank") {
    for (let i = 0; i < n_startup; i++) {
        const even_test_procedure = {
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

    for (let i = 0; i < n_variable; i++) {
        const last_test_procedure = {
            timeline: [test, fixation],
            timeline_variables: lastSample(condition),
            randomize_order: true,
            repetitions: 1
        };
        timeline.push(next_block);
        timeline.push(last_test_procedure);
    }
}
else if (condition == "Range") {
    for (let i = 0; i < n_startup; i++) {
        const even_test_procedure = {
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

    for (let i = 0; i < n_variable; i++) {
        const even_test_procedure = {
            timeline: [test, fixation],
            timeline_variables: evenSample(condition),
            randomize_order: true,
            repetitions: 1
        };
        timeline.push(next_block);
        timeline.push(even_test_procedure);
    }
}
else {
    for (let i = 0; i < n_startup; i++) {
        const even_test_procedure = {
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

    for (let i = 0; i < n_variable; i++) {
        const last_test_procedure = {
            timeline: [test, fixation],
            timeline_variables: lastSample(condition),
            randomize_order: true,
            repetitions: 1
        };
        timeline.push(next_block);
        timeline.push(last_test_procedure);
    }
}



//Adds demographics survey to timeline


//mult choice: religion, gender, hispanic, race, sexOrientation, education
const taskAge = {
    type: SurveyTextPlugin,
    questions: [{ prompt: "What is your age?", name: "age" }],
};

//demo questions
const taskDemo = {
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

timeline.push(finished1, q3, q4, q5, q6, q8, q9, q10, q11, q12, taskAge, taskDemo, q13);

jsPsych.run(timeline);
// Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
// if you handle results yourself, be it here or in `on_finish()`)
