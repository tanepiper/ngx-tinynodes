# Ngx-EditorJS Plugins

[![npm version](https://badge.fury.io/js/%40tinynodes%2Fngx-editorjs-plugins.svg)](https://badge.fury.io/js/%40tinynodes%2Fngx-editorjs-plugins)

This module provides the core Plugin service for [@tinynodes/ngx-editorjs](https://www.npmjs.com/package/@tinynodes/ngx-editorjs), and also provides a default set of [EditorJS](https://editorjs.io) plugins
for using Angular modules and Injection Tokens.

## Plugin Service

The `NgxEditorJSPluginService` takes all the Plugin provides and creates a single map of the configurations and instances. These are used within `NgxEditorJS` to set the plugins
available within the editor. The plugin service is provided separably to avoid circular dependencies
within the libraries and is required by `@tinynodes/ngx-editorjs`

## Creating a Plugin.

Creating a plugin is very simple, the module provides some Injection Tokens for use with the module.

The plugin you want to import should conform to the [Block](https://editorjs.io/creating-a-block-tool) or [Inline](https://editorjs.io/creating-an-inline-tool) format of `EditorJS`, alongside a configuration object that provides details about the plugin.

Both these providers must be set to `multi: true` - when the plugin service is initialised it will be provided a map of these.

Here is an example of the `PluginParagraph`:

```ts
import { NgModule } from '@angular/core';
import { EDITOR_JS_TOOL_INJECTOR, PLUGIN_CONFIG, PluginTypes from '@tinynodes/ngx-editorjs-plugins';
import Paragraph from '@editorjs/paragraph';

@NgModule({
  providers: [{
    provide: EDITOR_JS_TOOL_INJECTOR,
    useValue: Paragraph,
    multi: true // IMPORTANT!
  }, {
    provide: PLUGIN_CONFIG,
    useValue: {
      key: 'paragraph',
      type: PluginTypes.Block,
      pluginName: 'EditorJS Paragraph',
    },
    multi: true // IMPORTANT!
  }]
})
export class PluginParagraphModule {}
```

The full configuration object parameters are listed below, please note some are not yet implemented in the application
but will be used in future releases.

| Param Name    | Type     | Optional | Description                                                      |
| ------------- | -------- | -------- | ---------------------------------------------------------------- |
| `key`         | `string` | No       | The default key of the plugin (e.g. `paragraph`)                 |
| `type`        | `string` | No       | The type of plugin, currently `block` and `inline` are supported |
| `pluginName`  | `string` | No       | The descriptive name of the plugin                               |
| `config`      | `object` | Yes      | Optional configuration to pass to the plugin                     |
| `shortcut`    | `string` | Yes      | An optional keyboard shortcut for the plugin                     |
| `description` | `string` | Yes      | A description of the plugin                                      |
| `blockData`   | `string` | Yes      | Optional default block data to use for the plugin                |

Once imported into an application or module the plugin is available in the app with several methods to get plugins on the service.

- `getPlugins` - Get a map of all plugins
- `getPlugin(key: string)` - Get a specific plugin by map key
- `getPluginsWithExclude(excludeList: string[])` - Get a map of plugins but exclude ones in the passed list
- `getPluginsWithInclude(includeList: string[])` - Get a map of plugins but only the ones in the include list

## Peer Dependencies

All `EditorJS` plugins are listed as `peerDependencies` of the project - this is because Angular requires these modules to be in the root. You must manually install these are the root of your Angular application.

```bash
> npm install @editorjs/paragraph @editorjs/header ....
```

## Plugin List

| Plugin Name             | Description                                            | Links                                                                                               |
| ----------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| PluginCodeModule        | Provides a `<code>` block editor                       | [README](./src/lib/plugins/code/README.md) [GitHub](https://github.com/editor-js/code)              |
| PluginHeaderModule      | Provides a `<h1> - <h6>` block editor                  | [README](./src/lib/plugins/header/README.md) [GitHub](https://github.com/editor-js/header)          |
| PluginImageModule       | Provides an `<img>` block editor + file upload support | [README](./src/lib/plugins/image/README.md) [GitHub](https://github.com/editor-js/image)            |
| PluginLinkModule        | Provides an `<a>` block editor                         | [README](./src/lib/plugins/link/README.md) [GitHub](https://github.com/editor-js/link)              |
| PluginIListModule       | Provides an `<ol>/<li>` block editor                   | [README](./src/lib/plugins/list/README.md) [GitHub](https://github.com/editor-js/list)              |
| PluginMarkerModule      | Provides inline text marking                           | [README](./src/lib/plugins/marker/README.md) [GitHub](https://github.com/editor-js/marker)          |
| PluginParagraphModule   | Provides an `<p>` block editor                         | [README](./src/lib/plugins/paragraph/README.md) [GitHub](https://github.com/editor-js/paragraph)    |
| PluginSimpleImageModule | Provides an `<img>` block editor with paste support    | [README](./src/lib/plugins/simple-image/README.md) [GitHub](https://github.com/editor-js/paragraph) |
