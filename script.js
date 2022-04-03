const progressRing = document.querySelector('.progress-ring');
const progressCircle = document.querySelector('#progress-ring-circle');
const radius = progressCircle.getAttribute('r');
const circumference = 2 * Math.PI * radius;
const progressValueInput = document.querySelector('input[name="progress_value"]');
const progressAnimateInput = document.querySelector('input[name="progress_animate"]');
const progressHideInput = document.querySelector('input[name="progress_hide"]');

// Value
const setProgressValue = (value) => {
    const offset = circumference * (1 - value / 100);
    progressCircle.style.strokeDashoffset = offset;
};
// Nullify the circle
setProgressValue(progressValueInput.value);
progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
// progressCircle.style.strokeDashoffset = circumference;
// Instantenous changing
progressValueInput.oninput = () => {
    setProgressValue(progressValueInput.value);
};
// Changig after exit the input field
// progressValueInput.addEventListener('change', () => {
//     setProgressValue(progressValueInput.value);
// });

// Animate
let periodicAnimationTimer;
let counterToValue = 0;
let periodicTimeInterval = 1500;
progressAnimateInput.addEventListener('click', () => {
    let interval = (progressValueInput.value / 100) * (circumference / (periodicTimeInterval / 2));
    if (progressAnimateInput.checked) {
        periodicAnimationTimer = setInterval(() => {
            counterToValue = 0;
            const progressTimer = setInterval(() => {
                if (counterToValue >= progressValueInput.value) {
                    clearInterval(progressTimer);
                    return;
                }
                counterToValue += interval;
                setProgressValue(counterToValue);
            }, parseInt(interval));
        }, periodicTimeInterval);
    } else {
        clearInterval(periodicAnimationTimer);
    }
});

// Hide
const hideProgressRing = () => {
    progressRing.style.visibility = 'hidden';
    // progressRing.style.display = 'none';
};
const showProgressRing = () => {
    progressRing.style.visibility = 'visible';
    // progressRing.style.display = 'block';
};
progressHideInput.addEventListener('click', () => {
    if (progressHideInput.checked)
        hideProgressRing();
    else
        showProgressRing();
});