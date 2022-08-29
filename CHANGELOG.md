# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2022-08-29
### Changed
- Updated the GitHub org the repo and home page are under

## [0.1.0] - 2021-12-24
### Changed
- Allow passing just a style object for a style instead of an array.
- Within the style array, allows either conditional or unconditional styles at any element of the array.
- Rewrote useStyleQueries() with TDD to ensure thorough test coverage of edge cases

## [0.0.1] - 2021-09-23
### Added
- useStyleQueries() hook to conditionally include styles
- screenWidthMin() query function to set a condition based on screen width
