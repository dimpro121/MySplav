const path = require('path');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: {
            app: './src/index.jsx',
            vendor: ['react', 'react-dom']  // Отдельный бандл для библиотек
        },
        output: {
            path: path.resolve(__dirname, '../wwwroot/dist'),
            filename: '[name].js',
            clean: true
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                ['@babel/preset-react', { 'runtime': 'automatic' }]
                            ]
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        // Оптимизации только для production
        optimization: isProduction ? {
            minimize: true,
            splitChunks: {
                chunks: 'all'
            }
        } : {}
    };
};