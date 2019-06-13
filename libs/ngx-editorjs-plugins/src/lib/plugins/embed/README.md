# EditorJS Warning Module Plugin

This plugin provides warning block for EditorJS

See [`@editorjs/paragraph`](https://github.com/editor-js/warning) for API details

## Usage

You first need to run `npm install @editorjs/warning` to add as a dependency of your Angular project. You can then include the plugin in your application or feature module.

```ts
import { NgModule } from '@angular/core';
import { NgxEditorJSModule, UserPlugins } from '@tinynodes/ngx-editorjs';
import {
  PluginWarninghModule,
} from '@tinynodes/ngx-editorjs-plugins';

@NgModule({
  imports: [
    NgxEditorJSModule,
    PluginParagraphModule,
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
