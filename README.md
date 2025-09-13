SkyFitnessPro

Проект SkyFitnessPro — это веб-приложение для изучения спортивных курсов. Пользователи могут просматривать доступные курсы, добавлять их в свой профиль и отслеживать прогресс.

    Описание проекта

Веб-приложение построено на Next.js с поддержкой TypeScript.

Используется Redux Toolkit для управления состоянием (курсы и авторизация).

Возможности:

Регистрация и авторизация пользователя.

Просмотр всех доступных курсов.

Добавление курсов в профиль пользователя.

Отображение информации о длительности и сложности курса.

Система уведомлений (toasts) при действиях пользователя.

    Технологии

Next.js

React

TypeScript

Redux Toolkit

Tailwind CSS

Next/Image

    Установка

Клонируйте репозиторий:

git clone https://github.com/yourusername/SkyFitnessPro.git


Перейдите в папку проекта:

cd SkyFitnessPro


Установите зависимости:

npm install


    Запуск проекта
В режиме разработки
npm run dev



Откройте браузер и перейдите по адресу: http://localhost:3000

Сборка и запуск в продакшн
npm run build
npm start

    Структура проекта
/src
  /app
    /(main)
        /page.tsx           - Главная страница
    /course
        /[id]
            /page.tsx
    /courseWorkout
        /[courseId]
            /page.tsx
            /[worcoutId]
                /page.tsx
    /profile
        /page.tsx
    /favicon.ico
    /globals.css
    /layout.tsx
  /components
    /AddProgressModal
    /Autch
    /Button
    /Card
    /Course
    /CourseWorkout
    /Header
    /Main
    /Profile
    /ProgressBar
    /UserModal
    /Workouts
  /services
  /Store
    /features
        /Autch
        /Courses
        /Progress
        /Workout
  /Types
  /Utilite
    

    Авторизация

Авторизация через токен, который хранится в localStorage (authToken).

После выхода токен удаляется, состояние пользователя сбрасывается.

В midleware настроены приватные и публичные страницы которые работают через токет token_global который хранится в Cookies, который также сбрасывается при выходе.

    Особенности UI

Кнопки "Добавить курс" исчезают сразу после добавления курса.

Система уведомлений (toasts) информирует пользователя о результатах действий.

В тренировках, которые не имеют упражнений, не показывается модальное окно для заполнения прогресса. Вместо кнопки "Заполнить прогресс" появляется кнопка "Выполнить упражнение".


Курс содержит информацию о:

Длительности курса (durationInDays)

Времени занятий в день (dailyDurationInMinutes)

Уровне сложности (difficulty)