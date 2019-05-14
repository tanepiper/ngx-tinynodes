# Adding tools to ngx-editorjs

To include tools in an Angular AOT-friendly way, inside your project, create a folder for your plugin and add an `Injectable` class with a `plugin()` method, and optional `shortcut` method for features that support it.

```typescript
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

```typescript
import { NgModule } from '@angular/core';
import { PluginMarker } from './marker.plugin';

@NgModule({
  providers: [PluginMarker]
})
export class PluginMarkerModule {}
```

Once you have created all your required modules, inside your Application or Feature module you need to provide an instance of `UserPlugins` using a factory function. Inside your module you can now add the following:

```typescript
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
