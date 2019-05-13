# Ngx-EditorJS

This library provides Angular support for [EditorJS](https://editorjs.io) via a directive, component and service.

You can see a [demo in action](https://tinynodes-ngx.firebaseapp.com/ngx-editorjs-demo) or download it
[on GitHub](https://github.com/tanepiper/ngx-tinynodes/tree/master/libs/ngx-editorjs) to see how it was implemented.

For changes see the [CHANGELOG](./CHANGELOG.md)

## Installing and usage

Install the library via `npm`:

```bash
> npm install @tinynodes/ngx-editorjs @tinynodes/ngx-editorjs-plugins
```

Once installed, include the `NgxEditorJSModule` module in your project with the `forRoot` method. The `forRoot` takes an optional configuration.

You also need to pass a provider for `UserPlugins` with a factory function that returns an options map tools to provide to the `EditorJS` instance. An example of this is shows [in the demo application](https://github.com/tanepiper/ngx-tinynodes/blob/master/libs/ngx-editorjs-demo/src/lib/config/index.ts)

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxEditorJSModule } from '@tinynodes/ngx-editorjs';
import { AppComponent } from './app.component';
import EditorJS from '@editorjs/editorjs';

import { createTools } from './create-tools.config';

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

| Configuration Key | Description                                                                                       | Default     |
| ----------------- | ------------------------------------------------------------------------------------------------- | ----------- |
| `autofocus`       | Sets the EditorJS instance to autofocus on load                                                   | `false`     |
| `holder`          | The element ID of the holder, this will set all instances in this module to use this as a default | `editor-js` |
| `initialBlock`    | The default block type to use in the editor                                                       | `paragraph` |
| `data`            | Initial data to load into the editor, this is an `OutputData` object from EditorJS                | `undefined` |

### Adding custom tools

To include tools in an Angular AOT-friendly way, inside your project, create a folder for your plugin and add an `Injectable` class with a `plugin()` method, and optional `shortcut` method for features that support it.

```ts
import { Injectable } from '@angular/core';
import { ToolSettings } from '@editorjs/editorjs';
import Marker from '@editorjs/marker';
import { BasePlugin } from '@tinynodes/ngx-editorjs';

@Injectable()
export class PluginMarker implements BasePlugin {
  plugin(): ToolSettings {
    return Marker;
  }
  shortcut(): string {
    return 'SHIFT+CTRL+M';
  }
}
```

This allows Angular's AOT to include the editor component bundled within the application. Then export this via a module:

```ts
import { NgModule } from '@angular/core';
import { PluginMarker } from './marker.plugin';

@NgModule({
  providers: [PluginMarker]
})
export class PluginMarkerModule {}
```

Once you have created all your required modules, inside your Application or Feature module you need to provide an instance of `UserPlugins` using a factory function. Inside your module you can now add the following:

```ts
import { NgModule } from '@angular/core';
import { NgxEditorJSModule, UserPlugins, PluginConfig } from '@tinynodes/ngx-editorjs';
import { PluginMarkerModule } from './plugins/marker/marker.module';
import { PluginMarker } from '../plugins/marker/marker.plugin';

export function createTools(): PluginConfig {
  return {
    code: new PluginCode()
  };
}

@NgModule({
  imports: [NgxEditorJSModule, PluginMarker],
  providers: [
    {
      provide: UserPlugins,
      useFactory: createTools
    }
  ],
  exports: [PluginMarker]
})
export class CustomModule {}
```

## What's in the library

### `NgxEditorJSDirective`

This is the main directive which can be used on any element with the `[ngxEditorJS]`. It has one input which is `blocks` and this takes an array of EditorJS blocks.

### `NgxEditorJSComponent`

This component can be used in any Angular component using the `<ngx-editorjs>` tag. Again this component can take a set of blocks, it also provides a `holder` input for overriding the ID.

### `NgxEditorJSService`

This service provides handling the life-cycle of the EditorJS instance, and exposes the underlying `EditorJS` instance.[API](https://editorjs.io/api) - in future releases more of the API will be exposed via service methods to make controlling the container easier.

## Links

- [GitHub](https://github.com/tanepiper/ngx-tinynodes/tree/master/libs/ngx-editorjs)
- [NPM](https://www.npmjs.com/package/@tinynodes/ngx-editorjs)
- [Angular Demo](https://tinynodes-ngx.firebaseapp.com/ngx-editorjs-demo)

## Todo

- [ ] Add unit tests for all features (😔)
- [ ] Improve documentation
- [ ] Provide better plugin support
- [ ] Provide enhancements for `@ngrx/effects` and other state management tools via pre-developed effects and services.
- [ ] Set up CD pipeline
- [ ] Provide more @Input on Directive/Component to make instance generation more configurable.
