class Component {
    constructor(selector) {
        this.$node = document.querySelector(selector);
    }
}
class ProgressRing extends Component {
    constructor(options) {
        super(options.ringSelector)
        this._setControls(options.controls);
        this.circle = new ProgressCircle(options.circleSelector);
        this.setProgressValue(this.progressValue);
    }

    get progressValue() {
        return this.$nodeValue.value;
    }

    set progressValue(value) {
        this.$nodeValue.value = value;
    }

    setProgressValue() {
        this._checkProgressValueBounds();
        const offset = this.circle.circumference * (1 - this.progressValue / 100);
        this.circle.$node.style.strokeDashoffset = offset;
    }

    animate() {
        this._periodicAnimationTimer = setInterval(() => {
            this._angleDegAnimationTransform = this._angleDegAnimationTransform > 360 ? 0 : this._angleDegAnimationTransform;
            this.circle.$node.style.transform = `rotate(${this._angleDegAnimationTransform}deg)`;
            this._angleDegAnimationTransform += 1;
        }, this._periodicTimeInterval);
    }

    stopAnimation() {
        clearInterval(this._periodicAnimationTimer);
        this._angleDegAnimationTransform = -90;
        this.circle.$node.style.transform = `rotate(${this._angleDegAnimationTransform}deg)`;

    }

    hide() {
        this.$node.style.visibility = 'hidden';
    }

    show() {
        this.$node.style.visibility = 'visible';
    }

    _checkProgressValueBounds() {
        this.progressValue = parseFloat(this.progressValue);
        if (this.progressValue > 100) {
            this.progressValue = 100;
        } else if (this.progressValue < 0) {
            this.progressValue = 0;
        }
    }

    _setControls(controls) {
        this.$nodeValue = document.querySelector(controls.valueSelector);
        this.$nodeAnimate = document.querySelector(controls.animateSelector);
        this._periodicAnimationTimer;
        this._periodicAnimationTimeInterval = 10;
        this._angleDegAnimationTransform = -90;
        this.$nodeHide = document.querySelector(controls.hideSelector);
    }
}
class ProgressCircle extends Component {
    constructor(options) {
        super(options)
        this._radius = this.$node.getAttribute('r');
        this._circumference = 2 * Math.PI * this._radius;
        this.$node.style.strokeDasharray = `${this._circumference} ${this._circumference}`;
    }

    get circumference() {
        return this._circumference;
    }
}


const pRing = new ProgressRing({
    ringSelector: '.progress-ring',
    circleSelector: '#progress-ring-circle',
    controls: {
        valueSelector: '#progress-value',
        animateSelector: '#progress-animate',
        hideSelector: '#progress-hide'
    }
});
// Value
pRing.$nodeValue.oninput = () => {
    pRing.setProgressValue();
};
// Animate
pRing.$nodeAnimate.addEventListener('click', () => {
    if (pRing.$nodeAnimate.checked) {
        pRing.animate();
    } else {
        pRing.stopAnimation();
    }
});
// Hide
pRing.$nodeHide.addEventListener('click', () => {
    if (pRing.$nodeHide.checked)
        pRing.hide();
    else
        pRing.show();
});