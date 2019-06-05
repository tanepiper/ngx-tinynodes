# EditorJS Inline Code Module Plugin

This plugin provides a default code inline tool for EditorJS.

See [`@editorjs/marker`](https://github.com/editor-js/inline-code) for API details

## Usage

You first need to run `npm install @editorjs/inline-code` to add as a dependency of your Angular project. You can then include the plugin in your application or feature module.

```ts
import { NgModule } from '@angular/core';
import { NgxEditorJSModule, UserPlugins } from '@tinynodes/ngx-editorjs';
import {
  PluginMarkerModule,
  PluginMarker,
} from '@tinynodes/ngx-editorjs-plugins';

export function createPlugins() {
  return { marker: new PluginMarker() }
}

@NgModule({
  imports: [
    NgxEditorJSModule,
    PluginMarkerModule,
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
