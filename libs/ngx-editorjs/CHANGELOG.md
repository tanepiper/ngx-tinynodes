# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2019-05-23

## Added

- `NgxEditorJSService.apiCall` method added to service to provide a way to call any method in `EditorJS`

## Removed

- Private services for `EditorJS` instance and plugins removed, `NgxEditorJSService` is now a single service that handles all the Editor and plugin life-cycles
- `EditorJSBaseComponent` removed and using `NgxEditorJSComponent` as base component

### [Unreleased]

## Added

- New `EditorJSInstance` class added as a way to hold the `EditorJS` instance. This class provides access to the instance via an public `apiCall` method, and also provides Observable states of the current ready and content status.
- `ngx-editorjs-toolbar` Provides a toolbar for Angular apps to control the instance. Functionality includes:
  - Calling the `save`, and `clear methods` of the instance
  - Provide a configurable `reset` button for setting the content instance
  - Enable and disable the `autosave` feature and set the autosave time
  - Toggle `show-blocks` in the editor, a feature to show the outline of all blocks on the page in editing mode
  - Add Block button which supports adding a block to the editor at the end, beginning, or a specific position within the editor
  - In a future release this will also support the ability to control inline content controls

### Changed

- `NgxEditorJSService` delegates to the new class for `EditorJS`. The service provides public APIs to the instance, also provides a saved state of the instance, which is a state of the `EditorJS` save being called so the state can be applied to autosave.

## Changed

- Various internal improvements to state management and saving

## [2.0.0] - 2019-05-22

This release is the first big changes to the module and also includes new Material component.

## Added

- `NgxEditorJSComponent` can be used in Angular Forms via it's `ControlValueAccessor`
- `EditorJSBaseComponent` exported and can be used to create custom components
- `NgxEditorJSMatFieldComponent` provided as a [Material](https://material.angular.io/) field component.
- `autosave` support now added to both components
- `apiCall` method for calling any `EditorJS` API method

## Changed

- `placeholder` property of `EditorJS` config is now `blockPlaceholder` so it does not clash with the Material property
- `EditorJS` instance service refactored, available as a private import
- All public methods now take a `InjectorMethodOption` object as it's parameter

## [1.3.2] - 2019-05-15

### Changed

- Fixed bug with passing data to `EditorJS` instance service.
- Removed rogue console.log

## [1.3.0] - 2019-05-15

## Added

- `@Input` properties on the component and directive for providing `EditorJS` instance configuration
- `createEditorJSConfig` function available to generate `EditorJS` configurations
- Lots more [doc improvements](https://tanepiper.github.io/ngx-tinynodes/) and [updated demo](https://tinynodes-ngx.firebaseapp.com/ngx-editorjs-demo)

## Changed

- Internal service now uses an `EditorJS` injector module and service, provides more robust control and creation of `EditorJS` instances and controlling them.

## [1.2.0] - 2019-05-13

### Added

- Added all configuration options for `EditorJS` to the module configuration

### Changed

- Removed all plugins from the `ngx-editorjs` project. All plugins are now provided by the `@tinynodes/ngx-editorjs-plugins` module and a default set of tools must be provided in an application.
- Added `NgxEditorJSPluginService` back to core, all plugins must now be provided with a `UserPlugin` provider.

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
