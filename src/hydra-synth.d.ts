declare module 'hydra-synth';

// Hydra injects these as globals on window at runtime
declare function osc(...args: any[]): any;
declare function noise(...args: any[]): any;
declare function voronoi(...args: any[]): any;
declare function shape(...args: any[]): any;
declare function gradient(...args: any[]): any;
declare function src(...args: any[]): any;
declare function solid(...args: any[]): any;

// as well as the output buffers named o0, o1, o2, o3
declare const o0: any;
declare const o1: any;
declare const o2: any;
declare const o3: any;

// and the main hydra object
