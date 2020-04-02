'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">Tinynodes Angular Documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="contributing.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CONTRIBUTING
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                        <li class="link">
                            <a href="todo.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>TODO
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/NgxEditorJSComponentModule.html" data-type="entity-link">NgxEditorJSComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NgxEditorJSComponentModule-63e3336bc143adb90977ce50e19b1d88"' : 'data-target="#xs-components-links-module-NgxEditorJSComponentModule-63e3336bc143adb90977ce50e19b1d88"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NgxEditorJSComponentModule-63e3336bc143adb90977ce50e19b1d88"' :
                                            'id="xs-components-links-module-NgxEditorJSComponentModule-63e3336bc143adb90977ce50e19b1d88"' }>
                                            <li class="link">
                                                <a href="components/NgxEditorJSComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NgxEditorJSComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-NgxEditorJSComponentModule-63e3336bc143adb90977ce50e19b1d88"' : 'data-target="#xs-directives-links-module-NgxEditorJSComponentModule-63e3336bc143adb90977ce50e19b1d88"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-NgxEditorJSComponentModule-63e3336bc143adb90977ce50e19b1d88"' :
                                        'id="xs-directives-links-module-NgxEditorJSComponentModule-63e3336bc143adb90977ce50e19b1d88"' }>
                                        <li class="link">
                                            <a href="directives/NgxEditorJSDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">NgxEditorJSDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-NgxEditorJSComponentModule-63e3336bc143adb90977ce50e19b1d88"' : 'data-target="#xs-injectables-links-module-NgxEditorJSComponentModule-63e3336bc143adb90977ce50e19b1d88"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NgxEditorJSComponentModule-63e3336bc143adb90977ce50e19b1d88"' :
                                        'id="xs-injectables-links-module-NgxEditorJSComponentModule-63e3336bc143adb90977ce50e19b1d88"' }>
                                        <li class="link">
                                            <a href="injectables/NgxEditorJSService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>NgxEditorJSService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NgxEditorJSMatFieldModule.html" data-type="entity-link">NgxEditorJSMatFieldModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NgxEditorJSMatFieldModule-f95fb9c00eab2deec5e48b2a07f60cfd"' : 'data-target="#xs-components-links-module-NgxEditorJSMatFieldModule-f95fb9c00eab2deec5e48b2a07f60cfd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NgxEditorJSMatFieldModule-f95fb9c00eab2deec5e48b2a07f60cfd"' :
                                            'id="xs-components-links-module-NgxEditorJSMatFieldModule-f95fb9c00eab2deec5e48b2a07f60cfd"' }>
                                            <li class="link">
                                                <a href="components/NgxEditorJSMatFieldComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NgxEditorJSMatFieldComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NgxEditorJSModule.html" data-type="entity-link">NgxEditorJSModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NgxEditorJSPluginServiceModule.html" data-type="entity-link">NgxEditorJSPluginServiceModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-NgxEditorJSPluginServiceModule-c90e72d94fb28d2be98d33ce8eaac159"' : 'data-target="#xs-injectables-links-module-NgxEditorJSPluginServiceModule-c90e72d94fb28d2be98d33ce8eaac159"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NgxEditorJSPluginServiceModule-c90e72d94fb28d2be98d33ce8eaac159"' :
                                        'id="xs-injectables-links-module-NgxEditorJSPluginServiceModule-c90e72d94fb28d2be98d33ce8eaac159"' }>
                                        <li class="link">
                                            <a href="injectables/NgxEditorJSPluginService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>NgxEditorJSPluginService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NgxEditorjsPluginsModule.html" data-type="entity-link">NgxEditorjsPluginsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NgxTinynodesComponentsModule.html" data-type="entity-link">NgxTinynodesComponentsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NgxTinynodesMatJsonOutputModule.html" data-type="entity-link">NgxTinynodesMatJsonOutputModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NgxTinynodesMatJsonOutputModule-6e5ce56794b8aaf55d17a3593260ee1d"' : 'data-target="#xs-components-links-module-NgxTinynodesMatJsonOutputModule-6e5ce56794b8aaf55d17a3593260ee1d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NgxTinynodesMatJsonOutputModule-6e5ce56794b8aaf55d17a3593260ee1d"' :
                                            'id="xs-components-links-module-NgxTinynodesMatJsonOutputModule-6e5ce56794b8aaf55d17a3593260ee1d"' }>
                                            <li class="link">
                                                <a href="components/NgxTinynodesMatJsonOutputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NgxTinynodesMatJsonOutputComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NgxTinynodesMatTagInputModule.html" data-type="entity-link">NgxTinynodesMatTagInputModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NgxTinynodesMatTagInputModule-33ea20d506b5bac0eb82c41871befc2c"' : 'data-target="#xs-components-links-module-NgxTinynodesMatTagInputModule-33ea20d506b5bac0eb82c41871befc2c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NgxTinynodesMatTagInputModule-33ea20d506b5bac0eb82c41871befc2c"' :
                                            'id="xs-components-links-module-NgxTinynodesMatTagInputModule-33ea20d506b5bac0eb82c41871befc2c"' }>
                                            <li class="link">
                                                <a href="components/NgxTinynodesMatTagInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NgxTinynodesMatTagInputComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PluginCodeModule.html" data-type="entity-link">PluginCodeModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PluginEmbedModule.html" data-type="entity-link">PluginEmbedModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PluginEmbedModule.html" data-type="entity-link">PluginEmbedModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PluginHeaderModule.html" data-type="entity-link">PluginHeaderModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PluginImageModule.html" data-type="entity-link">PluginImageModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PluginInlineCodeModule.html" data-type="entity-link">PluginInlineCodeModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PluginLinkModule.html" data-type="entity-link">PluginLinkModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PluginListModule.html" data-type="entity-link">PluginListModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PluginMarkerModule.html" data-type="entity-link">PluginMarkerModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PluginParagraphModule.html" data-type="entity-link">PluginParagraphModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PluginQuoteModule.html" data-type="entity-link">PluginQuoteModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PluginSimpleImageModule.html" data-type="entity-link">PluginSimpleImageModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PluginWarningModule.html" data-type="entity-link">PluginWarningModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Block.html" data-type="entity-link">Block</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BlockData.html" data-type="entity-link">BlockData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChangeMap.html" data-type="entity-link">ChangeMap</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateEditorJSOptions.html" data-type="entity-link">CreateEditorJSOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditorJSChange.html" data-type="entity-link">EditorJSChange</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditorJSClass.html" data-type="entity-link">EditorJSClass</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditorJSInstanceConfig.html" data-type="entity-link">EditorJSInstanceConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditorJSMaterialForm.html" data-type="entity-link">EditorJSMaterialForm</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditorMap.html" data-type="entity-link">EditorMap</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Header.html" data-type="entity-link">Header</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HeaderBlock.html" data-type="entity-link">HeaderBlock</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Image.html" data-type="entity-link">Image</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ImageBlock.html" data-type="entity-link">ImageBlock</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InjectorApiCallOptions.html" data-type="entity-link">InjectorApiCallOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InjectorApiCallResponse.html" data-type="entity-link">InjectorApiCallResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InjectorMethodOption.html" data-type="entity-link">InjectorMethodOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/List.html" data-type="entity-link">List</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ListBlock.html" data-type="entity-link">ListBlock</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxEditorJSConfig.html" data-type="entity-link">NgxEditorJSConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxEditorJSModuleConfig.html" data-type="entity-link">NgxEditorJSModuleConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxTinynodesMatFieldComponent.html" data-type="entity-link">NgxTinynodesMatFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Paragraph.html" data-type="entity-link">Paragraph</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ParagraphBlock.html" data-type="entity-link">ParagraphBlock</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PluginConfig.html" data-type="entity-link">PluginConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PluginConfigMap.html" data-type="entity-link">PluginConfigMap</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReadyMap.html" data-type="entity-link">ReadyMap</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SavedMap.html" data-type="entity-link">SavedMap</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ToolSettingsMap.html" data-type="entity-link">ToolSettingsMap</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise-inverted.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});