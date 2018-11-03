var allQuestions = Array.from(document.getElementsByClassName("question"));
var questionIndex = allQuestions.indexOf(allQuestions.filter(el => !el.className.includes("inactive"))[0]);

function getScoreFromRange() {
    return parseInt(document.getElementsByName('q1')[0].value);
}

function getScoreFromCheckboxes() {
    var checkboxes = Array.from(document.getElementsByTagName('input')).filter(el => el.type === "checkbox");
    var checkboxScore = 0;
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkboxes[i].value === "right" ? checkboxScore += 2 : checkboxScore -= 2;
        }
    }
    return checkboxScore;
}

function getScoreFromRadio() {
    var radios = Array.from(document.getElementsByTagName('input')).filter(el => el.type === 'radio');
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return parseInt(radios[i].value);
        }
    }
    return 0;
}

function getScoreFromSelect() {
    return parseInt(Array.from(document.getElementsByTagName('option')).filter(el => el.selected)[0].value);
}

function getScoreFromNumber() {
    var ROSS_DIVORCES = 3;
    var input = parseInt(document.getElementById('marriages').value);
    var score = Math.abs(input - ROSS_DIVORCES);
    return (score === 0 ? 10 : (score === 1 ? 7 : (score === 2 ? 3 : 0)));
}

function startQuiz() {
    document.getElementById('start').style.display = "none";
    document.getElementById('quiz-container').className = "";
}

function nextQuestion() {
    allQuestions[questionIndex].className = "question inactive";
    allQuestions[questionIndex + 1].className = "question";
    questionIndex++;
    if (questionIndex === allQuestions.length - 1) {
        document.getElementById('submit-button').textContent = "Submit";
    }
}

function validateSelect() {
    var options = Array.from(document.getElementsByTagName('option'));
    var valid = false;
    if (options.filter(el => el.selected)[0].textContent !== "Select an option:") {
        valid = true;
    }
    return valid;
}

function validateRadio() {
    var radios = Array.from(document.getElementsByTagName('input')).filter(el => el.type === 'radio');
    var valid = false;
    if (radios.filter(el => el.checked).length === 1) {
        valid = true;
    }
    return valid;
}

function continueQuiz() {
    if (questionIndex === allQuestions.length - 1) {
        submit();
    } else if (questionIndex === 2) {
        if (validateSelect()) {
            nextQuestion();
        } else {
            document.getElementById('q3-error').style.opacity = "1";
        }
    } else if (questionIndex === 3) {
        if (validateRadio()) {
            nextQuestion();
        } else {
            document.getElementById('q4-error').style.opacity = "1";
        }
    } else {
        nextQuestion();
    }
}

function displayOutcome(score, maxScore) {
    var outcome = document.getElementById('outcome');
    var outcomeImage = document.getElementById('outcome-image');
    var sizeDiv = document.getElementById('result-img-size');
    var lowResult = "./images/ross-low-result.jpg";
    var medlowResult = "./images/ross-medlow-result.jpg";
    var medhighResult = "./images/ross-medhigh-result.jpg";
    var highResult = "./images/ross-high-result.jpg";
    if (score < maxScore / 5) {
        // outcomeImage.src = lowResult;
        outcomeImage.style.backgroundImage = "url(" + lowResult + ")";
        sizeDiv.src = lowResult;
        outcome.textContent = "You aren't Ross at all! We bet you've never even once married a lesbian or owned a monkey. Pshhhh.";
    } else if (score < maxScore / 2) {
        outcomeImage.style.backgroundImage = "url(" + medlowResult + ")";
        sizeDiv.src = medlowResult;
        outcome.textContent = "Huh. You're a little Rossy. You're fine, but you may have to PIVOT a bit before you're truly a Ross doppelganger.";
    } else if (score < maxScore / (1.25)) {
        outcomeImage.style.backgroundImage = "url(" + medhighResult + ")";
        sizeDiv.src = medhighResult;
        outcome.textContent = "Yeah, you're pretty Rossy. You're Rossy enough to own hair gel and leather pants, but hopefully not Rossy enough to say the wrong name at your own wedding. Yikes.";
    } else {
        outcomeImage.style.backgroundImage = "url(" + highResult + ")";
        sizeDiv.src = highResult;
        outcome.textContent = "Holy crap. You are the Rossatron. You love museums and divorces almost as much as you love your friends. Just stop correcting their grammar already!";
    }
}

function getTotalScore() {
    var total = 0;
    total += getScoreFromRange();
    total += getScoreFromCheckboxes();
    total += getScoreFromRadio();
    total += getScoreFromSelect();
    total += getScoreFromNumber();
    return (total < 0 ? 0 : total);
}

function submit() {
    var MAX_SCORE = 50;
    var sections = Array.from(document.getElementsByTagName('section'));
    for (var i = 0; i < sections.length; i++) {
        if (!sections[i].className.includes("inactive")) {
            sections[i].className = "inactive";
        }
    }
    var resultsSection = sections.filter(el => el.id === 'results')[0];
    document.getElementById('score').textContent = getTotalScore() + "/" + MAX_SCORE;
    displayOutcome(getTotalScore(), MAX_SCORE);
    resultsSection.className = "";
}

function playAgain() {
    location.reload();
}