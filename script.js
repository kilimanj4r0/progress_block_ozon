const progressRing = document.querySelector('.progress-ring');

const progressCircle = document.querySelector('#progress-ring-circle');
const radius = progressCircle.getAttribute('r');
const circumference = 2 * Math.PI * radius;

const progressValueInput = document.querySelector('#progress-value');
const progressAnimateInput = document.querySelector('#progress-animate');
const progressHideInput = document.querySelector('#progress-hide');

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
    progressValueInput.value = parseFloat(progressValueInput.value);
    if (progressValueInput.value > 100) {
        progressValueInput.value = 100;
    } else if (progressValueInput.value < 0) {
        progressValueInput.value = 0;
    }
    setProgressValue(progressValueInput.value);
};
// Changing after exit the input field
// progressValueInput.addEventListener('change', () => {
//     progressValueInput.value = parseFloat(progressValueInput.value);
//     if (progressValueInput.value > 100) {
//         progressValueInput.value = 100;
//     } else if (progressValueInput.value < 0) {
//         progressValueInput.value = 0;
//     }
//     setProgressValue(progressValueInput.value);
// });

// Animate
let periodicAnimationTimer;
let periodicTimeInterval = 10;
let angleDeg = -90;
progressAnimateInput.addEventListener('click', () => {
    if (progressAnimateInput.checked) {
        periodicAnimationTimer = setInterval(() => {
            angleDeg = angleDeg > 360 ? 0 : angleDeg;
            progressCircle.style.transform = `rotate(${angleDeg}deg)`;
            angleDeg += 1;
        }, periodicTimeInterval);
    } else {
        clearInterval(periodicAnimationTimer);
        angleDeg = -90;
        progressCircle.style.transform = `rotate(${angleDeg}deg)`;
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