# CHANGELOG
## [Unreleased]
- `detect()` function which returns detected casing

## [2.0.0](../../compare/1.0.0..2.0.0) - XXXX-XX-XX
### Added
- `preserverAbbreviations` flag for `convert()` function
- `detect(string)` function

### Changed
- `Casing` now contains entries like `Camel`, `Snake` and so
- `convert()` now accepts `Casing` enum instead of string

### Removed
- All `convert()` function overloads except for only `convert(string, Casing, boolean): string` preserved
- `Casing` enum

## [1.0.0](../../tree/1.0.0) - 2021-11-07
Release
