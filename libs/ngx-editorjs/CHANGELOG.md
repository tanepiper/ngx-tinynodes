# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2019-05-13

### Added

- Added all configuration options for `EditorJS` to the module configuration

### Removed

- Removed all plugins from the `ngx-editorjs` project. All plugins are now provided by the `@tinynodes/ngx-editorjs-plugins` module and a default set of tools must be provided in an application.

## [1.1.2] - 2019-05-11

### Added

- Improved internal documentation for generated docs.

### Removed

- Generated docs no longer included in this module - all docs are now available via [the generated docs site](https://tanepiper.github.io/ngx-tinynodes/)

## [1.1.1] - 2019-05-10

### Added

- Generated docs via [CompoDoc](https://github.com/compodoc/compodoc) in npm package
- Include CHANGELOG.md in npm package

## [1.1.0] - 2019-05-10

### Added

- EditorJS default paragraph plugin is now included in the default tools, fixes issue where the regenerated component failed to use the default plugin.

### Changed

- `NgxEditorJSService` is now provided in the root and now stores multiple editor instances. Getters removed and replaced with methods that take the `holder` parameter which is the ID of the DOM element the editor should be attached to.
- Plugins are now instances of an `Injectable` class for AOT and have an instance method of `plugin`. Also supports `shortcut` as an optional method that returns the string to set up as the shortcut.
- `EditorJSPlugin` now renamed `BasePlugin` and changed from class to interface.
- Improved documentation

## [1.0.0] - 2019-05-10

### Added

- Initial release
- Readme, Changelog
- `NgxEditorJSModule`: That can be imported into the root of a project
- `NgxEditorJSDirective`: A directive that can attach an EditorJS instance to an element
- `NgxEditorJSComponent`: A component that is pre-configured to use the directive in any Angular project
- `NgxEditorJSService`: An Angular service for controlling an EditorJS instance
- Default plugins for Header and List plugins, documentation on how to add plugins with AOT support
