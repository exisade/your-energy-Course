# 💪 Your Energy -- Fitness Web Application

**Author: exisade**

------------------------------------------------------------------------

# 🇺🇦 Українська версія

## 📌 Опис проєкту

**Your Energy** --- це односторінковий веб-застосунок (SPA), створений
для перегляду, пошуку та фільтрації фізичних вправ із використанням
backend API.

Проєкт реалізований на **Vanilla JavaScript (ES6+)** без використання
frontend-фреймворків. Архітектура побудована за модульним принципом із
чітким розділенням відповідальності між файлами.

------------------------------------------------------------------------

## 🏗️ Архітектура

### 🔹 JavaScript модулі

-   `app.js` --- точка входу
-   `api.js` --- всі API запити
-   `exercises.js` --- рендер вправ
-   `filters.js` --- логіка фільтрації
-   `search.js` --- пошук
-   `pagination.js` --- пагінація
-   `modal.js` --- модальні вікна
-   `favorites.js` --- робота з localStorage
-   `quote.js` --- цитата дня
-   `subscription.js` --- підписка

Архітектура дозволяє масштабування та чисту підтримку коду.

------------------------------------------------------------------------

## ⚙️ Функціонал

### 🏋️ Каталог вправ

-   Динамічний рендер з API
-   Фільтрація за категоріями
-   Серверна пагінація

### 🔍 Пошук

-   Пошук за ключовими словами
-   Оптимізація через debounce

### ⭐ Обране

-   Збереження в localStorage
-   Окрема сторінка favorites

### 💬 Рейтинг

-   Надсилання оцінки вправи
-   Валідація email

### 📱 Адаптивність

-   Mobile-first
-   CSS Grid + Flexbox
-   Оптимізація під великі екрани

------------------------------------------------------------------------

## 🔌 API

Base URL: https://your-energy.b.goit.study/api

Endpoints: - GET /filters - GET /exercises - GET /exercises/:id - PATCH
/exercises/:id/rating - GET /quote - POST /subscription

------------------------------------------------------------------------

# 🇬🇧 English Version

## 📌 Project Overview

**Your Energy** is a Single Page Application (SPA) designed for browsing
and filtering fitness exercises using a backend API.

Built with **Vanilla JavaScript (ES6+)**, following a modular
architecture and clean separation of concerns.

------------------------------------------------------------------------

## 🏗️ Architecture

### 🔹 JavaScript Modules

-   `app.js` --- entry point
-   `api.js` --- API logic
-   `exercises.js` --- exercises rendering
-   `filters.js` --- filtering logic
-   `search.js` --- search
-   `pagination.js` --- pagination
-   `modal.js` --- modal windows
-   `favorites.js` --- localStorage logic
-   `quote.js` --- daily quote
-   `subscription.js` --- subscription logic

------------------------------------------------------------------------

## ⚙️ Features

### 🏋️ Exercise Catalog

-   Dynamic rendering
-   Category filtering
-   Server pagination

### 🔍 Search

-   Keyword search
-   Debounced requests

### ⭐ Favorites

-   Stored in localStorage
-   Separate favorites page

### 💬 Rating System

-   Exercise rating submission
-   Email validation

### 📱 Responsive Design

-   Mobile-first approach
-   CSS Grid & Flexbox
-   Optimized layouts

------------------------------------------------------------------------

## 👨‍💻 Author

exisade
