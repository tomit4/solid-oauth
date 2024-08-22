import { defineConfig, loadEnv, ConfigEnv } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default ({ mode }: ConfigEnv) => {
    // Load environment variables based on the current mode
    const env = loadEnv(mode, process.cwd());

    return defineConfig({
        plugins: [
            // Uncomment the following line to enable solid-devtools.
            // devtools(),
            solidPlugin(),
        ],

        server: {
            port: parseInt(env.VITE_PORT as string, 10) || 3000,
        },
    });
};
