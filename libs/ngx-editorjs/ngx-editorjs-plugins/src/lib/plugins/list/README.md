# EditorJS List Module Plugin

This plugin provides a default `<ol> / <ul>` block tool for EditorJS.

See [`@editorjs/link`](https://github.com/editor-js/link) for API details

## Usage

You first need to run `npm install @editorjs/link` to add as a dependency of your Angular project. You can then include the plugin in your application or feature module.

```ts
import { NgModule } from '@angular/core';
import { NgxEditorJSModule, UserPlugins } from '@tinynodes/ngx-editorjs';
import {
  PluginListModule,
  PluginList,
} from '@tinynodes/ngx-editorjs-plugins';

export function createPlugins() {
  return { link: new PluginList() }
}

@NgModule({
  imports: [
    NgxEditorJSModule,
    PluginListModule,
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
