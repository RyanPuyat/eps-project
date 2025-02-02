import path from 'path';

export default {
  root: path.resolve(__dirname, 'src'),
  mode: 'production',
  build: {
    outDir: path.resolve(__dirname, '../public'),
    emptyOutDir: true,

    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html'),
        otherPage: path.resolve(__dirname, 'src/exam.html'),
        otherPage2: path.resolve(__dirname, 'src/reading.html'),
        otherPage3: path.resolve(__dirname, 'src/listening.html'),
        otherPage4: path.resolve(__dirname, 'src/readingLearn.html'),
      },
      output: {
        assetFileNames: 'assets/[name][extname]',
        chunkFileNames: '[name]-[hash:6].js',
        entryFileNames: 'script.js',
      },
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
};
