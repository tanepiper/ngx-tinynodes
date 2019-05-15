# EditorJS Paragraph Module Plugin

This plugin provides a default `<p>` block tool for EditorJS.

See [`@editorjs/paragraph`](https://github.com/editor-js/paragraph) for API details

## Usage

You first need to run `npm install @editorjs/paragraph` to add as a dependency of your Angular project. You can then include the plugin in your application or feature module.

```ts
import { NgModule } from '@angular/core';
import { NgxEditorJSModule, UserPlugins } from '@tinynodes/ngx-editorjs';
import {
  PluginParagraphModule,
  PluginParagraph,
} from '@tinynodes/ngx-editorjs-plugins';

export function createPlugins() {
  return { paragraph: new PluginParagraph() }
}

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
