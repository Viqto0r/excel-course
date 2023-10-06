const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filename = (ext) => (isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`) // принимает расширение и в зависимости от режима(prod или dev) волзвращает имя с hash или без + расширение
const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  ]
  if (isDev) {
    // Если в режиме разработки то добавляем лоадер eslint для js
    loaders.push('eslint-loader')
  }
  return loaders
}

console.log('IS PROD', isProd)
console.log('IS DEV', isDev)

module.exports = {
  context: path.resolve(__dirname, 'src'), // указываем папку с исходниками. __dirname - абсолютный путь к проекту
  mode: 'development', // устанавливаем режим компиляции development или production
  entry: ['@babel/polyfill', './index.js'], // точка входа. Если много файлов, то нужно создавать объект. @babel/polyfill - полифил для нового кода
  output: {
    // точка вывода
    filename: filename('js'), // имя готового файла. [hash] - hash для объода кэшированного файла у пользователя, чтобы всегда грузился свежий js файл. Смотри функцию filename
    path: path.resolve(__dirname, 'dist'), // путь к готовому файлу. __dirname - абсолютный путь к проекту
  },
  resolve: {
    // параметры конфигурации
    extensions: ['.js'], // позволяет пользователям не указывать расширение при импорте
    alias: {
      // сокращения для путей, чтобы не писать полный путь
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
    },
  },
  devtool: isDev ? 'source-map' : false, // добавление source-map в зависимости от режима разработки (development или production)
  devServer: {
    // Сервер для автоматического обновения файлов в папке dist
    port: 3000,
    hot: isDev, // автоматическая перезагрузка если режим development
  },
  plugins: [
    // массив плагинов
    new CleanWebpackPlugin(), // очищает папку dist
    new HTMLWebpackPlugin({
      // автоматически добавляет в html файл путь к js bundle вместе с hash
      template: 'index.html', // Название главного HTML файла
      minify: {
        removeComments: isProd, // удаление коментариев (Если режим production)
        collapseWhitespace: isProd, // удаление пробелов (Если режим production)
      },
    }),
    new CopyPlugin({
      // Копирует файлы из исходнйо папки в папку дист.
      // Перемещаем favicon
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'), //откуда
          to: path.resolve(__dirname, 'dist'), //куда
        },
      ],
    }),

    new MiniCssExtractPlugin({
      // Этот плагин извлекает CSS в отдельные файлы. Он создает файл CSS для каждого файла JS, который содержит CSS.
      filename: filename('css'), // имя выходного файла. Смотри функцию filename
    }),
  ],
  module: {
    rules: [
      // loaders идут справа на лево
      {
        // Loaders для стилей
        test: /\.s[ac]ss$/i, // ищем файлы по расширению
        use: [
          // Creates `style` nodes from JS strings

          MiniCssExtractPlugin.loader, // Минификация css
          'css-loader', //Установить плагин css-loader
          // Compiles Sass to CSS
          'sass-loader', // Установить плагин sass-loader
        ],
      },
      {
        // Loaders для транспиляции файлов через babel
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders(), // Функция возвращающая лоадеры
      },
    ],
  },
}
