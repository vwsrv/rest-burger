# React Burger Constructor

Веб-приложение для сборки бургеров с использованием drag-and-drop интерфейса.

## Технологии

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?logo=vite&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.9-764ABC?logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7.9-CA4245?logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.13-5A29E4?logo=axios&logoColor=white)

## Установка

```bash
npm install
```

## Запуск

### Разработка

```bash
npm run dev
```

Приложение откроется в браузере автоматически.

### Сборка

```bash
npm run build
```

### Превью продакшн сборки

```bash
npm run preview
```

## Доступные скрипты

- `dev` - запуск dev-сервера
- `build` - сборка проекта
- `preview` - превью продакшн сборки
- `test` - запуск unit-тестов (Vitest)
- `test:ui` - запуск тестов с UI
- `cypress:open` - открыть Cypress для E2E тестов
- `cypress` - запуск Cypress тестов
- `lint` - проверка кода (ESLint, Stylelint, Prettier)
- `eslint` - проверка и автоисправление ESLint
- `stylelint` - проверка и автоисправление Stylelint
- `prettier` - форматирование кода
- `check` - проверка стилей и ESLint
- `commit` - интерактивный коммит через Commitizen
- `deploy` - деплой на GitHub Pages

## Архитектура

Проект использует методологию Feature-Sliced Design:

- `app` - точка входа приложения
- `pages` - страницы приложения
- `widgets` - крупные составные компоненты (header, left-side, right-side)
- `features` - бизнес-функциональность (burger-constructor, burger-ingredients, pay-order)
- `entities` - бизнес-сущности (ingridients)
- `shared` - переиспользуемые компоненты, утилиты, API

## Структура проекта

```
src/
├── app/              # Инициализация приложения
├── pages/            # Страницы
├── widgets/          # Виджеты
├── features/         # Фичи
├── entities/         # Сущности
└── shared/           # Общие компоненты и утилиты
```

## Окружение

Переменные окружения находятся в папке `environment/`:
- `.env` - общие переменные
- `.env.development` - переменные для разработки

Префиксы переменных: `VITE_`, `APP`, `SERVICE`
