# Ngx-EditorJS

This library provides Angular support for [EditorJS](https://editorjs.io) via a directive, component and service.

You can see a [demo in action](https://tinynodes-ngx.firebaseapp.com/ngx-editorjs-demo) or download it
[on GitHub](https://github.com/tanepiper/ngx-tinynodes/tree/master/libs/ngx-editorjs) to see how it was implemented.

For changes see the [CHANGELOG](./CHANGELOG.md)

## Installing and usage

Install the library via `npm` along with the plugins module and `EditorJS` module. For each plugin you want to use you also need to install it's dependency - see the [Plugin Docs](https://github.com/tanepiper/ngx-tinynodes/tree/master/libs/ngx-editorjs-plugins) for more information.

```bash
> npm install @tinynodes/ngx-editorjs @tinynodes/ngx-editorjs-plugins @editorjs/editorjs @editorjs/paragraph....
```

Once installed, include the `NgxEditorJSModule` module in your project with the `forRoot` method. The `forRoot` takes an optional configuration.

You also need to pass a provider for `UserPlugins` with a factory function that returns an options map tools to provide to the `EditorJS` instance. An example of this is shows [in the demo application](https://github.com/tanepiper/ngx-tinynodes/blob/master/libs/ngx-editorjs-demo/src/lib/config/index.ts)

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxEditorJSModule } from '@tinynodes/ngx-editorjs';
import { AppComponent } from './app.component';
import EditorJS from '@editorjs/editorjs';
import {
  PluginParagraphModule,
  PluginParagraph,
  PluginHeaderModule,
  PluginHeader,
  PluginListModule,
  PluginList
} from '@tinynodes/ngx-editorjs-plugins';

export function createTools() {
  return {
    paragraph: new PluginParagraph(),
    header: new PluginHeader(),
    list: new PluginList()
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxEditorJSModule.forRoot({
      editorjs: {
        autofocus: false,
        holder: 'editor',
        initialBlock: 'paragraph',
        data: {
          time: Date.now(),
          version: EditorJS.version,
          blocks: []
        }
      }
    })
  ],
  providers: [
    {
      provide: UserPlugins,
      useFactory: createTools
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## Configuration

### EditorJS Config

The configuration is deigned to be extendable in the future, so each potential feature has a key. For configuring EditorJS pass the options below into a `editorjs` key in the config.

The module configuration allows EditorJS to be provided with a set of options for use. See the [EditorJS docs](https://editorjs.io/configuration) for more details.

| Configuration Key | Description                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------- |
| `autofocus`       | Sets the EditorJS instance to autofocus on load                                                   |
| `data`            | Initial data to load into the editor, this is an `OutputData` object from EditorJS                |
| `hideToolbar`     | Hides the toolbar by default                                                                      |
| `holder`          | The element ID of the holder, this will set all instances in this module to use this as a default |
| `initialBlock`    | The default block type to use in the editor                                                       |
| `minHeight`       | Height of Editor's bottom area that allows to set focus on the last Block                         |
| `placeholder`     | Placeholder of the first block                                                                    |
| `sanitizer`       | Content sanitizer configurations                                                                  |

### Adding custom tools

See [Adding Custom Tools](./docs/adding-custom-tools.md)

## What's in the library

### `NgxEditorJSDirective`

This is the main directive which can be used on any element with the `[ngxEditorJS]`. It has one input which is `blocks` and this takes an array of EditorJS blocks.

### `NgxEditorJSComponent`

This component can be used in any Angular component using the `<ngx-editorjs>` tag. Again this component can take a set of blocks, it also provides a `holder` input for overriding the ID.

### `NgxEditorJSService`

This service provides handling the life-cycle of the EditorJS instance, and exposes the underlying `EditorJS` instance.[API](https://editorjs.io/api) - in future releases more of the API will be exposed via service methods to make controlling the container easier.

## Links

- [Documentation](https://tanepiper.github.io/ngx-tinynodes/)
- [GitHub](https://github.com/tanepiper/ngx-tinynodes/tree/master/libs/ngx-editorjs)
- [NPM](https://www.npmjs.com/package/@tinynodes/ngx-editorjs)
- [Angular Demo](https://tinynodes-ngx.firebaseapp.com/ngx-editorjs-demo)
