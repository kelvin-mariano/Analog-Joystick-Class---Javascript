/**
 * Analog Joystick Class - Javascript
 * Copyright Kelvin Mariano
 * Version: 1.0.0
 * License: The MIT License (MIT)
 * https://github.com/kelvin-mariano/Analog-Joystick-Class---Javascript/blob/main/LICENSE
*/

/**
 * Class that represents an analog joystick.
 */
class JoystickAnalog {
    /**
     * Create a new analog joystick.
     * 
     * @param {Object} options - Joystick configuration options.
     * @param {string} options.parentElement - Selector of the parent element where the joystick will be added.
     * @param {function} [options.pressKeyFunction] - Custom function to handle key press. (optional)
     * @param {function} [options.releaseKeysFunction] - Custom function to handle key release. (optional)
     * @param {function} [options.beforePressKey] - Custom function to be executed before the pressKey code. (optional)
     * @param {function} [options.afterPressKey] - Custom function to be executed after the pressKey code. (optional)
     * @param {function} [options.beforeReleaseKeys] - Custom function to be executed before the releaseKeys code. (optional)
     * @param {function} [options.afterReleaseKeys] - Custom function to be executed after the releaseKeys code. (optional)
     * @param {boolean} [options.enableDebug=false] - Indicates if debug mode is enabled. (optional, default: false)
     */
    constructor(options) {
        /**
         * Parent element where the joystick will be added.
         * @type {HTMLElement}
         */
        this.parentElement = document.querySelector(options.parentElement);

        /**
         * Joystick element.
         * @type {HTMLElement}
         */
        this.joystick = document.createElement('div');
        this.joystick.id = 'joystick';

        /**
         * Joystick handle element.
         * @type {HTMLElement}
         */
        this.handle = document.createElement('div');
        this.handle.id = 'handle';

        this.joystick.appendChild(this.handle);
        this.parentElement.appendChild(this.joystick);

        /**
         * Joystick Radius.
         * @type {number}
         */
        this.joystickRadius = this.joystick.offsetWidth / 2;

        /**
         * Indicator if the joystick is being dragged.
         * @type {boolean}
         */
        this.dragging = false;

        /**
         * Function to manipulate keystrokes.
         * @type {function}
         */
        this.pressKeyFunction = options.pressKeyFunction || false;

        /**
         * Function to handle key release.
         * @type {function}
         */
        this.releaseKeysFunction = options.releaseKeysFunction || false;

        /**
         * Custom function to run before pressKey code.
         * @type {function}
         */
        this.beforePressKey = options.beforePressKey || null;

        /**
         * Custom function to run after pressKey code.
         * @type {function}
         */
        this.afterPressKey = options.afterPressKey || null;

        /**
         * Indicates whether debug mode is enabled.
         * @type {boolean}
         */
        this.enableDebug = options.enableDebug || false;

         /**
         * Custom function to run before releaseKeys code.
         * @type {function}
         */
         this.beforeReleaseKeys = options.beforeReleaseKeys || null;

         /**
          * Custom function to run after releaseKeys code.
          * @type {function}
          */
         this.afterReleaseKeys = options.afterReleaseKeys || null;

        /**
         * Initial position of the handle when it is clicked.
         * @type {{ x: number, y: number }}
         */
        this.initialHandlePosition = { x: 0, y: 0 };

        this.handle.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.handle.addEventListener('touchstart', this.handleTouchStart.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
        document.addEventListener('touchend', this.handleTouchEnd.bind(this));
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('touchmove', this.handleTouchMove.bind(this));
        this.joystick.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        this.joystick.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    }

    /**
     * Handles the event of pressing the mouse on the joystick stick.
     */
    handleMouseDown() {
        this.dragging = true;
    }

    /**
     * Handles the touch event on the joystick stick.
     * @param {TouchEvent} e - Touch event object.
     */
    handleTouchStart(e) {
        this.dragging = true;
        e.preventDefault();
    }

    /**
     * Handles the mouse release event.
     */
    handleMouseUp() {
        this.dragging = false;
        this.handle.style.left = '50%';
        this.handle.style.top = '50%';
        this.releaseKeys();
    }

    /**
     * Handle the touch ending event.
     */
    handleTouchEnd() {
        this.dragging = false;
        this.handle.style.left = '50%';
        this.handle.style.top = '50%';
        this.releaseKeys();
    }

    /**
     * Handles the mouse move event.
     * @param {MouseEvent} e - Mouse move event object.
     */
    handleMouseMove(e) {
        if (this.dragging) {
            var rect = this.joystick.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;

            this.handlePosition(x, y);
        }
    }

    /**
     * Handle touch move event.
     * @param {TouchEvent} e - Touch motion event object.
     */
    handleTouchMove(e) {
        if (this.dragging) {
            var rect = this.joystick.getBoundingClientRect();
            var x = e.touches[0].clientX - rect.left;
            var y = e.touches[0].clientY - rect.top;

            this.handlePosition(x, y);
            e.preventDefault();
        }
    }

    /**
     * Updates the position of the handle based on the specified coordinates.
     * @param {number} x - horizontal coordinate.
     * @param {number} y - vertical coordinate.
     */
    handlePosition(x, y) {
        var distance = Math.sqrt(Math.pow(x - this.joystickRadius, 2) + Math.pow(y - this.joystickRadius, 2));
        var angle = Math.atan2(y - this.joystickRadius, x - this.joystickRadius);

        if (distance <= this.joystickRadius) {
            this.handle.style.left = x + 'px';
            this.handle.style.top = y + 'px';
        } else {
            var newX = Math.cos(angle) * this.joystickRadius + this.joystickRadius;
            var newY = Math.sin(angle) * this.joystickRadius + this.joystickRadius;

            this.handle.style.left = newX + 'px';
            this.handle.style.top = newY + 'px';
        }

        var directionX = (x - this.joystickRadius) / this.joystickRadius;
        var directionY = (y - this.joystickRadius) / this.joystickRadius;

        this.simulateKeypress(directionX, directionY);
    }

    /**
     * Handle mouse input event on joystick.
     */
    handleMouseEnter() {
        this.joystick.style.cursor = 'move';
    }

    /**
     * Handle joystick mouse exit event.
     */
    handleMouseLeave() {
        if (!this.dragging) {
            this.handle.style.left = '50%';
            this.handle.style.top = '50%';
            this.releaseKeys();
        }
    }

    /**
     * Simulates keystrokes based on directions.
     * @param {number} directionX - The horizontal direction of the joystick.
     * @param {number} directionY - The vertical direction of the joystick.
     */
    simulateKeypress(directionX, directionY) {
        var keyUp = directionY < -0.2;
        var keyDown = directionY > 0.2;
        var keyLeft = directionX < -0.2;
        var keyRight = directionX > 0.2;

        if (keyUp) {
            this.pressKey('up');
        } else if (keyDown) {
            this.pressKey('down');
        } else if (keyLeft) {
            this.pressKey('left');
        } else if (keyRight) {
            this.pressKey('right');
        } else {
            this.releaseKeys();
        }
    }

    /**
     * Simulates pressing a key.
     * @param {string} key - The key to be pressed.
     */
    pressKey(key) {
        if (this.enableDebug) {
            console.log('Pressing the key: ' + key);
        }

        if (this.beforePressKey) {
            this.beforePressKey(key);
        }

        if (this.pressKeyFunction !== false) {
            this.pressKeyFunction(key);
        } else {
            
            var eventKeyPress = false;
            var eventKeyCode  = false;

            switch (key) {
                case 'up':
                    eventKeyPress   = 'ArrowUp';
                    eventKeyCode    = 38;
                    break;
                case 'down':
                    eventKeyPress   = 'ArrowDown';
                    eventKeyCode    = 40;
                    break;
                case 'left':
                    eventKeyPress   = 'ArrowLeft';
                    eventKeyCode    = 37;
                    break;
                case 'right':
                    eventKeyPress   = 'ArrowRight';
                    eventKeyCode    = 39;
                    break;
                default:
                    break;
            }

            if( eventKeyPress ){
                const event = new KeyboardEvent('keydown', { key: eventKeyPress, keyCode: eventKeyCode });
                document.dispatchEvent(event); 
            }
        }

        if (this.afterPressKey) {
            this.afterPressKey(key);
        }
    }

    /**
     * Releases all pressed keys.
     */
    releaseKeys() {
        if (this.enableDebug) {
            console.log('Releasing all keys');
        }

        if (this.beforeReleaseKeys) {
            this.beforeReleaseKeys();
        }

        if (this.releaseKeysFunction !== false) {
            this.releaseKeysFunction();
        }

        if (this.afterReleaseKeys) {
            this.afterReleaseKeys();
        }
    }
}
