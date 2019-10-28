// import "@babel/polyfill";
// import { default as Headroom } from 'headroom.js';
// import * as mdc from 'material-components-web';
// import { ComponentsInitialiser } from '../node_modules/@scvo/common/old/components-initialiser';
// import { Auth } from '../node_modules/@scvo/common/old/firebase-auth';
// import * as querystring from 'querystring';
// import 'leaflet';
// import 'mapbox.js';
//
// import * as cookieInfoScript from '../node_modules/@scvo/common/old/cookie-info-script' ;
//
// export class SCVO {
//   constructor(firebaseConfig) {
//     this.firebaseConfig = firebaseConfig;
//     this.auth = new Auth(this.firebaseConfig, '/upgrade-token?token={idToken}', 'cjs_cookie');
//
//     this.componentsInitialiser = new ComponentsInitialiser();
//     this.componentsInitialiser.initialise();
//
//     this.displayMode = null;
//     this.displayModes = [
//       { name: 'mobile', min: 0, max: 599 },
//       { name: 'tablet', min: 600, max: 959 },
//       { name: 'desktop', min: 960, max: 20000 }
//     ];
//
//     this.ie = navigator.appName.indexOf('Microsoft') > -1 || navigator.userAgent.indexOf('Trident') > -1;
//     this.occasionalDrawers = Array.from(document.querySelectorAll('.mdc-drawer--occasional')).map(el => {
//       return {
//         element: el,
//         mdc: null
//       };
//     });
//
//     this.setupLazyImages();
//
//     $(window).on('resize', () => {
//       this.windowResized();
//     });
//     this.windowResized();
//
//     // // Headroom
//     // var header = document.querySelector("header.mdc-toolbar");
//     // var headroom  = new Headroom(header, {
//     //   "offset": 138,
//     //   "tolerance": 5
//     // });
//     // headroom.init();
//
//     const ci = new cookieinfo();
//     ci.options.message = "We use cookies to track anonymous usage statistics and do not collect any personal information that can be used to identify you. By continuing to visit this site you agree to our use of cookies.";
//     ci.options.fontFamily = "'Open Sans',Helvetica,Arial,sans-serif";
//     ci.options.bg = "#fff";
//     ci.options.link = "#c2185b";
//     ci.options.divlink = "#fff";
//     ci.options.divlinkbg = "#c2185b";
//     ci.options.position = "bottom";
//     ci.options.acceptOnScroll = "true";
//     ci.options.moreinfo = "/cookies";
//     ci.options.cookie = "CookieInfoScript";
//     ci.options.textAlign = "left";
//     ci.run();
//   }
//
//   displayModeChanged() {
//     // console.log('Display Mode!xs:', this.displayMode);
//     this.occasionalDrawers.forEach(od => {
//       var menuButton = $(od.element).data('menu-button');
//       if (this.displayMode === 'desktop') {
//         if (od.mdc) {
//           od.mdc.destroy();
//         }
//         $(od.element).removeClass('mdc-drawer--modal');
//         $(menuButton).off('click');
//       } else {
//         $(od.element).addClass('mdc-drawer--modal');
//         od.mdc = mdc.drawer.MDCDrawer.attachTo(od.element);
//         $(menuButton).on('click', () => { od.mdc.open = !od.mdc.open; });
//       }
//     });
//   }
//
//   windowResized() {
//     var width = $(window).width();
//     var newDisplayMode = null;
//     this.displayModes.forEach(function(mode) {
//       if (width >= mode.min && width < mode.max) {
//         newDisplayMode = mode.name;
//       }
//     });
//     if (newDisplayMode !== this.displayMode) {
//       this.displayMode = newDisplayMode;
//       this.displayModeChanged();
//     }
//     this.fie();
//   }
//
//   fie() {
//     if (!this.ie) return;
//     $('.mdc-drawer--occasional .mdc-drawer__drawer').each(function(i, o) {
//       var $o = $(o);
//       var parentHeight = $o.parent().height();
//       $o.css('height', parentHeight);
//     });
//   }
//
//   setCookie(name, value, days) {
//     var expires = "";
//     if (days) {
//       var date = new Date();
//       date.setTime(date.getTime() + (days*24*60*60*1000));
//       expires = "; expires=" + date.toUTCString();
//     }
//     document.cookie = name + "=" + (value || "")  + expires + "; path=/; secure";
//   }
//
//   getCookie(name) {
//     var value = "; " + document.cookie;
//     var parts = value.split("; " + name + "=");
//     if (parts.length == 2) return parts.pop().split(";").shift();
//   }
//
//   setupLazyImages() {
//     try {
//       this.lazyImages = Array.from($('[data-lazy-image]')).map((el, i) => {
//         const config = $(el).data('lazy-image');
//         return {
//           element: $(el),
//           url: config.url,
//           type: config.type || 'src',
//           loaded: false
//         };
//       });
//
//       this.lazyImageFrame = window.requestAnimationFrame(() => { this.handleLazyImages(); });
//     } catch(err) {
//       console.error('Failed to setup Lazy Images', err);
//     }
//   }
//
//   handleLazyImages() {
//     try {
//       window.cancelAnimationFrame(this.lazyImageFrame);
//       const viewportBottom = $(document).scrollTop() + $(window).height();
//       for (const lazyImage of this.lazyImages) {
//         if (!lazyImage.loaded && lazyImage.element.offset().top < viewportBottom) {
//           if (lazyImage.type === 'css') {
//             lazyImage.element.css('background-image', 'url(' + lazyImage.url + ')');
//           } else {
//             lazyImage.element.attr('src', lazyImage.url);
//           }
//           lazyImage.loaded = true;
//         }
//       }
//       this.lazyImageFrame = window.requestAnimationFrame(() => { this.handleLazyImages(); });
//     } catch(err) {
//       console.error('Lazy Image Frame handler had an problem', err, 'It is likely that this frame handler will no longer be called');
//     }
//   }
// }