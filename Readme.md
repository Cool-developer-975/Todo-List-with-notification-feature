# Project Overview

**Purpose:**

* A simple to-do list application that allows users to:
    * Create tasks with specific times
    * Receive notifications when tasks are due

**Features:**

* Add tasks with task descriptions and due dates/times
* Mark tasks as completed or undone
* Delete tasks
* Receive browser notifications for due tasks

**Technologies:**

* HTML
* CSS (Tailwind CSS framework)
* JavaScript
* LocalStorage
* Browser Notifications

# Code Structure

## index.html

**Structure:**

* `main-container`
    * `to-do-list-container`
        * `bell-btn` (for enabling notifications)
        * `h2` (heading)
        * `task` (task input field)
        * `datetime` (date/time input field)
        * `add-task-btn`
        * `tasks-list`

**Key Elements:**

* `taskInput`
* `dateTimeInput`
* `taskBtn`
* `taskList`
* `bellBtn`

## style.css

**Styling:**

* Contains styles for visual elements using Tailwind CSS
* Provides base styles and resets default browser styles
* Defines custom classes for input fields, task containers, buttons, etc.
* Uses media queries for responsiveness

## script.js

**JavaScript Functionality:**

**Initialization:**

* Retrieves tasks from LocalStorage or initializes an empty array
* Sets a minimum time for the date/time input

**Event Listeners:**

* `add-task-btn`: Adds a new task and creates a notification
* `done-btn${i}`: Marks a task as completed or undone
* `delete-btn${i}`: Deletes a task
* `bell-btn`: Requests permission for browser notifications

**Utility Functions:**

* `createNotification`
* `returnTasksString`
* `addEventListenersToElements`
* `returnFragment`
* `renderTasks`
* `renderTask`

## package.json

**Project Dependencies:**

* `tailwindcss`
* `autoprefixer`
* `prettier`
* `prettier-plugin-tailwindcss`

**Scripts:**

* `compile-tailwind`
* `run-tailwind`
