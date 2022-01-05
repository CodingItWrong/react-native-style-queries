# react-native-style-queries

Declarative responsive design for React Native. `react-native-style-queries` allows you to specify styles for different conditions such as screen sizes and dark mode in a simple declarative way, inspired by CSS media queries:

```jsx
import {useStyleQueries, screenWidthMin} from 'react-native-style-queries';

function MyComponent() {
  const styles = useStyleQueries(styleQueries);

  return (
    <Text style={styles.componentA}>Component A</Text>
  );
}

const styleQueries = {
  componentA: [
    { fontSize: 12 }, // defaults

    screenWidthMin(375, {
      fontSize: 16,
    }),
  ],
};
```

## Usage

Using `react-native-style-queries` involves two steps:

1. Configuring your conditional styles outside a component.
2. Passing the configuration to the `useStyleQueries()` hook within a component, which returns an object containing normal React Native styles that can be passed to the `style` prop of components.

Here's what configuring conditional styles looks like:

```js
import {screenWidthMin} from 'react-native-style-queries';

// at the root of the JavaScript file, outside of any component
const conditionalStyles = {
  myComponentA: [
    { fontSize: 12 },

    screenWidthMin(375, {
      fontSize: 16,
    }),

    screenWidthMin(600, {
      fontSize: 20,
    }),
  ],

  myComponentB: {
    fontSize: 12,
  },
};
```

Note the following:

- Like with React Native `StyleSheet.create()` calls, conditional styles are defined outside of a component, at the root of the file.
- A conditional styles object can contain multiple named styles, just like a `StyleSheet`. The value of a named style can be a simple style object, but it can also be an array.
- That array can contain simple style objects, in which case those styles are always applied.
- The array can also contain calls to **style query functions** such as `screenWidthMin()`. Style query functions check the condition you specify and apply the styles only when that condition is met. For example, `screenWidthMin(375, styles)` will only apply `styles` when the screen width is greater than or equal to 375 pixels.

To use these conditional styles within a component:

```jsx
import {useStyleQueries} from 'react-native-style-queries';

function MyComponent() {
  const styles = useStyleQueries(styleQueries);

  return (
    <>
      <Text style={styles.myComponentA}>Component A</Text>
      <Text style={styles.myComponentB}>Component B</Text>
    </>
  );
}
```

When any device info changes (such as screen dimensions based on device rotation), `useStyleQueries()` will cause the component to rerender, recomputing the styles.

## Style Query Functions

The following style query functions are exported by `react-native-style-queries`:

- `screenWidthMin(widthInPixels, styles)`
- `screenWidthMax(widthInPixels, styles)`
- `screenHeightMin(heightInPixels, styles)`
- `screenHeightMax(heightInPixels, styles)`
- `colorScheme(scheme, styles)` - values of `scheme` are the values of [the React Native `useColorScheme` hook](https://reactnative.dev/docs/usecolorscheme): "light", "dark", or `null`

To learn more about how style query functions work or how to define your own custom logic, see [Conditional Styles](./docs/conditioanl-styles.md).

## Alternatives

The following are other approaches to responsive design in React Native:

- You can manually create style objects based on the return values of hooks like [`useWindowDimensions`](https://reactnative.dev/docs/usewindowdimensions) and [`useColorScheme`](https://reactnative.dev/docs/usecolorscheme). This tends to be fairly verbose and can clutter up your logic.
- [`react-native-size-matters`](https://github.com/nirsky/react-native-size-matters) allows automatically scaling measurements for different screen sizes. This is a different approach from using breakpoints, an appraoch that is common on the web and that `react-native-style-queries` also takes.
- [`react-native-media-query`](https://github.com/kasinskas/react-native-media-query) is directly modeled after CSS media queries. One limitation it has, though, is that it doesn't automatically rerender to handle device rotations. It also implements queries within strings that closely match CSS media query syntax, whereas `react-native-style-queries` uses plain functions to avoid a layer of indirection and allow writing arbitrary JavaScript logic.

To learn more about how we landed on `react-native-style-queries`' API design, see [API Design](./docs/api-design.md).

## Example

An example React Native app using `react-native-style-queries` can be found in the [example/](./example/) directory.

## License

MIT
