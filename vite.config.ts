import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// Reference: https://jotai.org/docs/guides/vite
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label';
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh';

// Plug-in to publish GitHub Pages on 'yarn build'
// If you do not want to publish this application to the gh-page branch,
// Just remove this import and 'ghPages' object in 'plugins' array
import { ghPages } from 'vite-plugin-gh-pages';

// https://vitejs.dev/config/
export default defineConfig({
  // Base name for this GitHub repository
  // If you plan to fork this repo in your own repository,
  // Please change this base name w.r.t your repository name
  // E.g., repo name: 'streetview_exploration' -> base: '/streetview_exploration/'
  // Reference: https://github.com/metonym/vite-plugin-gh-pages
  base: '/streetview_exploration_demo/',
  plugins: [
    react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }),
    tsconfigPaths(),
    ghPages(),
  ],
});
