
# Analog Joystick Class

This is a simple project where I practiced JavaScript by creating a class to implement an analog joystick.

## Project Structure

- The minified files for production use are located in the `build` folder.
- The source code and example files can be found in the `src` folder.

## Usage

To use the Analog Joystick class, follow these steps:

1. Include the minified JavaScript file in your HTML:

```html
<script src="path/to/analog-joystick.min.js"></script>
```
2.  Create an instance of the `JoystickAnalog` class, providing the necessary configuration options:

```javascript
const joystick = new JoystickAnalog({
  parentElement: '#joystick-container',
  pressKeyFunction: handleKeyPress,
  releaseKeysFunction: handleKeyRelease,
  enableDebug: true
});
```
3.  Customize the behavior of key presses and releases by implementing the provided functions (`handleKeyPress` and `handleKeyRelease` in the example above) according to your requirements.
    
4.  Add the necessary HTML elements to display the joystick and its status:
```html
<div id="joystick-container"></div>
<div id="joystick-status"></div>
```

5.  Style the joystick elements (`joystick-container` and `joystick-status`) as desired using CSS.
    
6.  Test the joystick by interacting with the handle element. The `pressKeyFunction` will be called when a direction is pressed, and the `releaseKeysFunction` will be called when the handle is released.

## Example

Here's an example usage of the Analog Joystick class:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Analog Joystick Example</title>
  <style>
    #joystick-container {
      width: 300px;
      height: 300px;
      border: 1px solid #ccc;
      position: relative;
    }

    #joystick {
        width: 200px;
        height: 200px;
        background-color: #ccc;
        border-radius: 50%;
        position: relative;
        overflow: hidden;
    }

    #handle {
        width: 100px;
        height: 100px;
        background-color: #999;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: unset;
    }
  </style>
</head>
<body>
  <div id="joystick-container"></div>
  <div id="joystick-status"></div>

  <script src="path/to/analog-joystick.min.js"></script>
  <script>
    const joystick = new JoystickAnalog({
      parentElement: '#joystick-container',
      pressKeyFunction: handleKeyPress,
      releaseKeysFunction: handleKeyRelease,
      enableDebug: true
    });

    function handleKeyPress(key) {
      console.log('Key Pressed:', key);
    }

    function handleKeyRelease() {
      console.log('Keys Released');
    }
  </script>
</body>
</html>
```

You can customize the CSS styles to match your project's design. Feel free to modify and experiment with the code to fit your specific needs.

That's it! You now have a basic understanding of how to use the Analog Joystick class. Happy coding!