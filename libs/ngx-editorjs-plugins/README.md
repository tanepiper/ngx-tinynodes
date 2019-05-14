# Ngx-EditorJS Plugins

This module provides a default set of [EditorJS](https://editorjs.io) plugins for [@tinynodes/ngx-editorjs](https://www.npmjs.com/package/@tinynodes/ngx-editorjs) via Angular modules.

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
