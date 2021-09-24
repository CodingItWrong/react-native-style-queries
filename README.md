# react-native-style-queries

This repo is an in-progress experiment to create a reusable library for responsive React Native styling. Please reach out to Ashley Parker or Josh Justice in p202 #i-reactnativedevs to discuss!

## Problem

It is difficult to apply responsive styling approaches from the web to React Native. Typically on the web you design for different "breakpoints" and then use CSS media queries to apply styles for different screen widths:

```css
.text {
  font-size: 14pt;
}

@media (min-width: 600px) {
  font-size: 16pt;
}
```

Sass allows nesting media queries inside elements to keep the styles even closer:

```scss
.text {
  font-size: 14pt;

  @media (min-width: 600px) {
    font-size: 16pt;
  }
}
```

React Native stylesheets don't have any such facility. Stylesheets created with `StyleSheet.create({})` are just a fixed set of styles. The `useWindowDimensions()` hook can provide the device width, but doesn't hook into styling at all. You can custom-code applying different styles for different screen widths, but there is likely a lot of duplicated logic, since if you are using breakpoints you are usually applying the same conditions all throughout the app. An abstraction can be created here.

## Existing Approaches

- React Native's built-in [`useWindowDimensions()`](https://reactnative.dev/docs/usewindowdimensions) is a low-level look that requires custom coding to hook up with styles.
- [`react-native-size-matters`](https://github.com/nirsky/react-native-size-matters) allows automatically scaling measurements for different screen sizes, which is a different approach from breakpoints.
- [`react-native-media-query`](https://github.com/kasinskas/react-native-media-query) is directly modeled after media queries. One limitation it has, though, is that it doesn't automatically rerender to handle device rotations. From the readme: "To trigger media queries on device orientation changes for native platforms, for now you will most likely need to update the state, because react-native-media-query has no listeners inside."

## Working Proposal

We are iterating on an API to use. The current proposal:

```js
import { useStyleQueries, screenWidthMin } from 'react-native-style-queries';

function MyComponent() {
  const styles = useStyleQueries(styleQueries);

  return (
    <>
      <Text style={styles.componentA}>Component A</Text>
      <Text style={styles.componentB}>Component A</Text>
    </>
  );
}

const styleQueries = {
  myComponentA: [
    { fontSize: 12 }, // defaults

    screenWidthMin(375, {
      fontSize: 16,
    }),

    screenWidthMin(600, {
      fontSize: 18,
    }),
  ],

  myComponentB: [
    //...
  ],
};
```

Notice a few different aspects:

- Like with Sass, all the styles for a given component like `myComponentA` are kept in one place. You can see a component's default styles and conditional styles.
- Each style object has the structure of a normal React Native style object. We just add additional structure outside of them to add conditional styles.
- We use helper functions like `screenWidthMin()` to keep the data structure as readable as possible. Under the hood the data could map to something like:


```js
const styleQueries = {
  myComponentA: [
    { fontSize: 12 }, // defaults

    [({screenWidth}) => screenWidth >= 375, {
      fontSize: 16,
    }],

    [({screenWidth}) => screenWidth >= 600, {
      fontSize: 18,
    }],
  ],

  myComponentA: [
    { fontSize: 12 }, // defaults
    // overrides
  ],
}
```

Note the following:
- The default styles are a normal React Native style-formatted object.
- Each conditional set of styles is an array with two elements:
  - The first element is an arrow function that receives attributes of the current device situation, and returns true if this set of styles should be applied. `screenWidth` is the most commonly used for responsive design, but height, dark mode, and other attributes can all be supplied as well. Additional attributes can be added in future versions without breaking the API. And because it's a JavaScript function, logic can be computed however you like.
  - The second element is a nromal React Native style-formatted object that will be applied if the first element returns true.

So conditional helper functions are just a lightweight wrapper around this data structure to add readability:

```js
function screenWidthMin(minWidth, styles) {
  return [
    ({screenWidth}) => screenWidth >= minWidth,
    styles,
  ];
}
```

When any device info changes (such as screen dimensions based on device rotation), `useWindowDimensions()` or another relevant hook will rerender, causing the styles to be recomputed.

## License

MIT
