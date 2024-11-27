import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

export default defineConfig(({ mode }) => {
  // Load env file based on the mode
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [TanStackRouterVite({}), react()],
    server: {
      watch: {
        usePolling: true,
      },
    },
    define: {
      // Add environment variables as global constants if needed
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  };
});

