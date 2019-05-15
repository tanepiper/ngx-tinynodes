# EditorJS Code Module Plugin

This plugin provides a default `<code>` block tool for EditorJS.

See [`@editorjs/code`](https://github.com/editor-js/code) for API details

## Usage

You first need to run `npm install @editorjs/code` to add as a dependency of your Angular project. You can then include the plugin in your application or feature module.

```ts
import { NgModule } from '@angular/core';
import { NgxEditorJSModule, UserPlugins } from '@tinynodes/ngx-editorjs';
import {
  PluginCodeModule,
  PluginCode,
} from '@tinynodes/ngx-editorjs-plugins';

export function createPlugins() {
  return { code: new PluginCode() }
}

@NgModule({
  imports: [
    NgxEditorJSModule,
    PluginCodeModule,
    ...
  ],
  providers: [
    {
      provide: UserPlugins,
      useFactory: createPlugins
    },
    ...
  ],
})
export class MyModule {}
```
