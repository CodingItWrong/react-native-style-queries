# Conditional Styles

This document describes the data structure for conditional styles that `react-native-style-queries` uses.

First we'll show the underlying data structure, then we'll show the helper functions that make common cases simpler.

## The Underlying Data Structure

```js
const conditionalStyles = {
  myComponentA: [
    { fontSize: 12 },

    [({screenWidth}) => screenWidth >= 375, {
      fontSize: 16,
    }],

    [({screenWidth}) => screenWidth >= 600, {
      fontSize: 20,
    }],
  ],
};
```

Note the following:

- The value of `myComponentA` is an array, rather than a style object.
- That array can contain plain style objects.
- The array can also contain nested arrays. Each array contains two elements:
  - First, a predicate: a function that returns true or false. (Truthy or falsy are fine too.)
  - Second, a conditional styles object. The styles in this object will be applied only if the predicate returns a truthy value.

When the predicate is called, it receives an options argument that has the following values:

- `screenWidth` and `screenHeight`, as provided by the React Native [`useWindowDimensions`](https://reactnative.dev/docs/usewindowdimensions) hook
- `colorScheme`, as provided by the React Native [`useColorScheme`](https://reactnative.dev/docs/usecolorscheme)

Other options can be added in the future; feel free to open a GitHub issue or pull request with proposals.

Why did we go with an array to hold these two values rather than an object with named properties? Conciseness: an array is the fewest-characters way to provide a predicate function and conditional styles object. And most of the time you'll use a helper function instead of writing this directly.

## Helper Functions

To make conditional styles even more readable, we can use helper functions (called **style query functions**) to generate the array values:

```js
const conditionalStyles = {
  myComponentA: [
    screenWidthMin(375, {
      fontSize: 16,
    }),

    screenWidthMin(600, {
      fontSize: 20,
    }),
  ],
};
```

A style query function can be implemented in just a few lines of code:

```js
function screenWidthMin(widthInPixels, conditionalStyles) {
  const predicate = ({screenWidth}) => screenWidth >= widthInPixels;
  return [predicate, conditionalStyles];
}
```

For simple cases, `react-native-style-queries` provides premade style query functions:

- `screenWidthMin(widthInPixels, styles)`
- `screenWidthMax(widthInPixels, styles)`
- `screenHeightMin(heightInPixels, styles)`
- `screenHeightMax(heightInPixels, styles)`
- `colorScheme(scheme, styles)` - values of `scheme` are the values of [the React Native `useColorScheme` hook](https://reactnative.dev/docs/usecolorscheme): "light", "dark", or `null`

## Custom Logic

If you need more complex logic than the built-in style query functions provide, there are two options:

1. You can write the conditional style array directly, as described above. Just create an array where the first element is a predicate function with whatever logic you need, and the second element is the conditional styles.
2. You can write your own style query function to generate the conditional style array.
