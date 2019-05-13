# Ngx-EditorJS Plugins

This module provides a default set of [EditorJS](https://editorjs.io) plugins for [@tinynodes/ngx-editorjs](https://www.npmjs.com/package/@tinynodes/ngx-editorjs) via Angular modules.

## Peer Dependencies

All `EditorJS` plugins are listed as `peerDependencies` of the project - this is because Angular requires these modules to be in the root. You must manually install these are the root of your Angular application.

```bash
> npm install @editorjs/paragraph @editorjs/header ....
```

## Plugin List

| Plugin Name             | Description                                            | EditorJS Plugin Link                             |
| ----------------------- | ------------------------------------------------------ | ------------------------------------------------ |
| PluginCodeModule        | Provides a `<code>` block editor                       | [GitHub](https://github.com/editor-js/code)      |
| PluginHeaderModule      | Provides a `<h1> - <h6>` block editor                  | [GitHub](https://github.com/editor-js/header)    |
| PluginImageModule       | Provides an `<img>` block editor + file upload support | [GitHub](https://github.com/editor-js/image)     |
| PluginLinkModule        | Provides an `<a>` block editor                         | [GitHub](https://github.com/editor-js/link)      |
| PluginIListModule       | Provides an `<ol>/<li>` block editor                   | [GitHub](https://github.com/editor-js/list)      |
| PluginMarkerModule      | Provides inline text marking                           | [GitHub](https://github.com/editor-js/marker)    |
| PluginParagraphModule   | Provides an `<p>` block editor                         | [GitHub](https://github.com/editor-js/paragraph) |
| PluginSimpleImageModule | Provides an `<img>` block editor with paste support    | [GitHub](https://github.com/editor-js/paragraph) |
