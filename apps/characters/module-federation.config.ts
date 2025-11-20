import { ModuleFederationConfig } from "@nx/module-federation";


const sharedLibraries = new Set([
  '@hookform/resolvers',
  '@hookform/resolvers/yup',
]);


const config:ModuleFederationConfig = {
  name: 'characters',
  exposes: {
    './Module': './src/remote-entry.ts',
    './Module2': './src/remote-entry2.ts',
    './ModuleInstruction1': './src/remote-entry3.ts',
  },
  shared: (library, defaultConfig) => {
    console.log(library);
    if (sharedLibraries.has(library)) {
      return false;
    }
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
