import { async, TestBed } from '@angular/core/testing';
import { UserPlugins } from '../types/plugins';
import { NgxEditorJSPluginService } from './plugins.service';
import { MockPlugin } from '../../testing/shared';

describe('NgxEditorJSPluginService', () => {
  let service: NgxEditorJSPluginService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserPlugins,
          useValue: {
            paragraph: new MockPlugin(),
            header: new MockPlugin()
          }
        },
        {
          provide: NgxEditorJSPluginService,
          useClass: NgxEditorJSPluginService
        }
      ]
    }).compileComponents();

    service = TestBed.get(NgxEditorJSPluginService);
  }));

  it('should create an instance of the plugin service', () => {
    expect(service).toBeDefined();
  });

  it('should have user plugins on creation', () => {
    const keys = Object.keys(service.plugins);

    expect(keys).toContain('paragraph');
    expect(keys).toContain('header');
  });

  it('should have support adding a plugin', () => {
    service.add('test-item', new MockPlugin());
    const keys = Object.keys(service.plugins);

    expect(keys).toContain('test-item');
  });

  it('should have support removing a plugin', () => {
    service.remove('paragraph');
    const keys = Object.keys(service.plugins);

    expect(keys['paragraph']).toBeFalsy();
  });

  it('should have support getting a plugin', () => {
    const instance = service.get('paragraph');
    expect(instance).toBeInstanceOf(MockPlugin);
  });

  it('should return a list of tools', () => {
    const tools = service.getTools();
    const keys = Object.keys(tools);
    expect(keys).toContain('paragraph');
  });

  it('should return a list of tools without excluded tools', () => {
    const tools = service.getTools(['paragraph']);
    const keys = Object.keys(tools);
    expect(keys['paragraph']).toBeFalsy();
  });
});
