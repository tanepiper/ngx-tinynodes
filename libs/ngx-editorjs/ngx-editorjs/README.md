# Ngx-EditorJS

This library provides Angular support for [EditorJS](https://editorjs.io).

[![npm version](https://badge.fury.io/js/%40tinynodes%2Fngx-editorjs.svg)](https://badge.fury.io/js/%40tinynodes%2Fngx-editorjs)

Inside the module you will find:

- `NgxEditorJSDirective` - An Angular Directive used to attach an `EditorJS` instance to any block DOM element
- `NgxEditorJSComponent` - An [out-of-the-box Angular component](https://tinynodes-ngx.firebaseapp.com/ngx-editorjs-demo/angular-component) that is Reactive Forms compatible.
- `NgxEditorJSMaterialFieldComponent` An [Angular Material](https://material.angular.io/) Form Field component that provides all the required properties and life-cycle events required. See the [Form Demo](https://tinynodes-ngx.firebaseapp.com/ngx-editorjs-demo/angular-form) on an example usage
- `NgxEditorJSBaseComponent` - A base Angular component that is Reactive form compatible but with no template, can be used to create custom UI framework containers
- `NgxEditorJSService` - A Service that can be injected into an application to provide a interface to interact with `EditorJS` instances and manage plugins.

Within these components you will be able to access the underlying `EditorJS` instance, for use see the [EditorJS API Docs](https://editorjs.io/api)

You can see a [demo in action](https://tinynodes-ngx.firebaseapp.com/ngx-editorjs-demo) or download it
[on GitHub](https://github.com/tanepiper/ngx-tinynodes/tree/master/libs/ngx-editorjs-demo) to see how it was implemented.

For changes see the [CHANGELOG](https://github.com/tanepiper/ngx-tinynodes/tree/master/libs/ngx-editorjs/CHANGELOG.md)

## Installing and usage

Install the library via `npm` along with the plugins module and `EditorJS` module. For each plugin you want to use you also need to install it's dependency - see the [Plugin Docs](https://github.com/tanepiper/ngx-tinynodes/tree/master/libs/ngx-editorjs-plugins) for more information.

```bash
> npm install @tinynodes/ngx-editorjs @tinynodes/ngx-editorjs-plugins @editorjs/editorjs @editorjs/paragraph....
```

Once installed, include the `NgxEditorJSModule` module in your project with the `forRoot` method. The `forRoot` takes an optional configuration.

> If you don't want to use Angular material you can import `NgxEditorJSComponentModule` instead.

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxEditorJSModule } from '@tinynodes/ngx-editorjs';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxEditorJSModule.forRoot({
      // Optional Configuration, see all keys below
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
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## Configuration

### EditorJS Config

The configuration is deigned to be extendable in the future, so each potential feature has a key. For configuring EditorJS pass the options below into a `editorjs` key in the config.

The module configuration allows EditorJS to be provided with a set of options for use. See the [EditorJS docs](https://editorjs.io/configuration) for more details.

| Configuration Key  | Description                                                                                                                                                     |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `autofocus`        | Sets the EditorJS instance to autofocus on load                                                                                                                 |
| `autosave`         | Value of time for the the autosave of EditorJS content to the service when the component when focused, this is used for Reactive forms. Default is 0 to disable |
| `data`             | Initial data to load into the editor, this is an `OutputData` object from EditorJS                                                                              |
| `hideToolbar`      | Hides the toolbar by default                                                                                                                                    |
| `holder`           | The element ID of the holder, this will set all instances in this module to use this as a default                                                               |
| `initialBlock`     | The default block type to use in the editor                                                                                                                     |
| `minHeight`        | Height of Editor's bottom area that allows to set focus on the last Block                                                                                       |
| `blockPlaceholder` | Placeholder of the first block                                                                                                                                  |
| `sanitizer`        | Content sanitizer configurations                                                                                                                                |
| `excludeTools`     | Excludes tools from the application, if no value or empty list passed all plugins available are added                                                           |

### Adding custom tools

See [the plugin module](https://github.com/tanepiper/ngx-tinynodes/tree/master/libs/ngx-editorjs-plugins/README.md)
for docs on how to add custom plugins for `EditorJS`.

## Links

- [Documentation](https://tanepiper.github.io/ngx-tinynodes/)
- [GitHub](https://github.com/tanepiper/ngx-tinynodes/tree/master/libs/ngx-editorjs)
- [NPM](https://www.npmjs.com/package/@tinynodes/ngx-editorjs)
- [Angular Demo](https://tinynodes-ngx.firebaseapp.com/ngx-editorjs-demo)
