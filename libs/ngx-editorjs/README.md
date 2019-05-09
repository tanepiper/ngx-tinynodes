# Ngx-EditorJS

This library provides Angular support for [EditorJS](https://editojs.io) via a directive, component and service.

A demo for this library is available [on GitHub](https://github.com/tanepiper/ngx-tinynodes/tree/master/libs/ngx-editorjs)

## Installing and usage

Install the library via `npm`:

```bash
> npm install @tinynodes/ngx-editorjs
```

Once installed, include the `NgxEditorJSModule` module in your project with the `forRoot` method:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxEditorJSModule } from '@tinynodes/ngx-editorjs';
import { AppComponent } from './app.component';
import EditorJS from '@editorjs/editorjs';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxEditorJSModule.forRoot({
      editorjs: {
        autofocus: false,
        holder: 'editor',
        initialBlock: 'paragraph',
        tools: [],
        data: {
          time: Date.now(),
          version: EditorJS.version,
          blocks: []
        }
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### Configuration

The configuration is degined to be extendable in the future, so each potential feature has a key. For configuring EditorJS pass the options below into a `editorjs` key in the config.

The module configuration allows EditorJS to be provided with a set of options for use. See the [EditorJS docs](https://editorjs.io/configuration) for more details.

| Configuration Key | Description                                                                                       | Default             |
| ----------------- | ------------------------------------------------------------------------------------------------- | ------------------- |
| `autofocus`       | Sets the EditorJS instance to autofocus on load                                                   | `false`             |
| `holder`          | The element ID of the holder, this will set all instances in this module to use this as a default | `editor-js`         |
| `initialBlock`    | The default block type to use in the editor                                                       | `paragraph`         |
| `tools`           | A map of tools to be added to the editor                                                          | `Header` and `List` |
| `data`            | Initial data to load into the editor, this is an `OutputData` object from EditorJS                | `None`              |

## What's in the library

### `NgxEditorJSDirective`

This is the main directive which can be used on any element with the `[ngxEditorJS]`. It has one input which is `blocks` and this takes an array of EditorJS blocks.

### `NgxEditorJSComponent`

This component can be used in any Angular component using the `<ngx-editorjs>` tag. Again this component can take a set of blocks, it also provides a `holder` input for overriding the ID.

### `NgxEditorJSService`

This service provides handling the lifecycle of the EditorJS instance, and exposes the underlying `EditorJS` instance.[API](https://editorjs.io/api) - in future releases more of the API will be exposed via service methods to make controlling the container easier.

## Links

- GitHub: [https://github.com/tanepiper/ngx-tinynodes](https://github.com/tanepiper/ngx-tinynodes/tree/master/libs/ngx-editorjs)
- NPM: [@tinynodes/ngx-editorjs](https://www.npmjs.com/package/@tinynodes/ngx-editorjs)
