# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## Added

- Module has had `NgxEditorJSPluginService` added back to plugin module, this service now provides a more reliable
way of handling plugins

## Changed

- Plugins no longer provide an injectable class, all plugins are modules that provide
injectable `EDITOR_JS_TOOL_INJECTOR` and `PLUGIN_CONFIG`.  These provides are injected in the
plugin service and made available in the editor.

## [1.1.1] - 2019-05-15

## Changed

- Documentation updates

## [1.1.0] - 2019-05-13

## Removed

- Removed the NgxEditorJSPluginService from this module back to core

## [1.0.0] - 2019-05-11

### Added

- Initial release of module with default plugins - see [README.md]('./README.md) for details.
- Moved the internal PluginService to public `NgxEditorJSPluginService` provided by this module
