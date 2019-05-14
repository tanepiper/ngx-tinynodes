# EditorJS Header Module Plugin

This plugin provides a default `<h1> - <h6>` block tool for EditorJS.

See [`@editorjs/header`](https://github.com/editor-js/header) for API details

## Usage

You first need to run `npm install @editorjs/header` to add as a dependency of your Angular project. You can then include the plugin in your application or feature module.

```ts
import { NgModule } from '@angular/core';
import { NgxEditorJSModule, UserPlugins } from '@tinynodes/ngx-editorjs';
import {
  PluginHeaderModule,
  PluginHeader,
} from '@tinynodes/ngx-editorjs-plugins';

export function createPlugins() {
  return { header: new PluginHeader() }
}

@NgModule({
  imports: [
    NgxEditorJSModule,
    PluginHeaderModule,
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
