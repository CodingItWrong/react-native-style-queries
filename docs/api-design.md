# API Design

The following describes how we landed on the API design for `react-native-media-queries`.

## Background

On the web, styling is handled via [Cascading Style Sheets (CSS)](https://developer.mozilla.org/en-US/docs/Web/CSS). Because React Native does not (usually) run on the web, it doesn’t use CSS for styling. Instead, it uses a JavaScript object-literal syntax inspired by CSS. For example, in CSS you might have a selector that looks like this:

```css
.text {
  font-size: 14pt;
  color: green;
}
```

In React Native it would look like this:

```js
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  fontSize: 14,
  color: 'green',
});
```

[Responsive design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design) refers to designing your app to work on a variety of different window/screen sizes. On the web, a common responsive design technique is to use media queries to change styles once a page is wider than a certain width:

```css
.text {
  font-size: 14pt;
}

@media (min-width: 600px) {
  .text {
    font-size: 16pt;
  }
}
```

Sass, a style language that compiles to CSS, allows you to put all the rules for a given selector in one place by allowing nesting media queries inside a selector:

```scss
.text {
  font-size: 14pt;

  @media (min-width: 600px) {
    font-size: 16pt;
  }
}
```

React Native doesn't provide an API to easily do responsive styling like this. It allows you to detect the screen width with the `useWindowDimensions()` hook function, and then conditionally construct a style object based on that.

## Choosing an API

What criteria do we have for an API we'd like to use?

- As similar to React Native's `StyleSheet` API as possible. Use style objects with the same properties and values as much as we can. Allow defining styles at the root level of a file.
- Like with Sass, keep all the styles for a component close together, including conditional styles.
- Allow intermixing conditional and unconditional styles.
- Prioritize conciseness, so that common cases can be easily written and read.
- Provide flexibility for uncommon cases, allowing writing arbitrary logic to determine whether a style should be applied.

## The Solution

The solution we settled upon is described in [Conditional Styles](./conditional-styles.md).
