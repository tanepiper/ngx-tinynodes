# EditorJS Simple Image Module Plugin

This plugin provides a default `<img>` block tool for EditorJS.

See [`@editorjs/simple-image`](https://github.com/editor-js/simple-image) for API details

## Usage

You first need to run `npm install @editorjs/simple-image` to add as a dependency of your Angular project. You can then include the plugin in your application or feature module.

```ts
import { NgModule } from '@angular/core';
import { NgxEditorJSModule, UserPlugins } from '@tinynodes/ngx-editorjs';
import {
  PluginSimpleImageModule,
  PluginSimpleImage,
} from '@tinynodes/ngx-editorjs-plugins';

export function createPlugins() {
  return { simple-image: new PluginSimpleImage() }
}

@NgModule({
  imports: [
    NgxEditorJSModule,
    PluginSimpleImageModule,
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
