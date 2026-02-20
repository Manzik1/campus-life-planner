Kevin Manzi- Web Application(ALU LIFE PLANNER)
📌 Project Overview

ALU Life Planner is a browser-based task management app that helps students organize academic and campus activities.

It was developed progressively using milestone commits (M1–M7) to demonstrate structured development, logical Git history, accessibility awareness, regex validation, persistence, and clean repository organization.

The application allows users to:

Add and manage tasks

Validate input using multiple regex rules

Search using safe regular expressions

Sort tasks dynamically

View dashboard statistics

Apply duration caps

Persist data using localStorage

Import and export JSON files

Data Model

Each task object:

{

    "id": "rec_1771436384914",
    "title": "frontend summative",
    "date": "2026-02-20",
    "duration": 300,
    "tag": "study",
    "createdAt": "2026-02-18T17:39:44.914Z",
    "updatedAt": "2026-02-18T17:39:44.914Z"  
}
 
| Field     | Type   | Purpose               |
| --------- | ------ | --------------------- |
| id        | String | Unique identifier     |
| title     | String | Task name             |
| date      | String | Due date (YYYY-MM-DD) |
| duration  | Number | Time in minutes       |
| tag       | String | Category              |
| createdAt | String | Timestamp             |
| updatedAt | String | Timestamp             |

Validation Rules (Regex)
| Field    | Rule                             |
| -------- | -------------------------------- |
| Title    | No leading/trailing spaces       |
| Title    | No duplicate words               |
| Date     | Must match YYYY-MM-DD            |
| Duration | Positive number (max 2 decimals) |
| Tag      | Letters, spaces, hyphens only    |


📂 Project Structure
project-folder/
│
├── assets/
│
├── wireframe.md
│
├── scripts/
│   ├── search.js
│   ├── state.js
│   ├── storage.js
│   ├── ui.js
│   └── validators.js
│
├── styles/
│   └── style.css
│
├── README.md
├── index.html
├── seed.json
├── tests.html
└── .gitignore

Structure Notes

scripts/ contains all modular JavaScript files

styles/ contains styling files

assets/ stores design or supporting materials

wireframe.md documents initial planning

tests.html contains validation testing

.gitignore ensures a clean repository

⚙️ Setup Guide (Run with VS Code)

Open VS Code

create a folder 

create these subfolders → assets → scripts → styles

Click File → Open Folder

Select the project folder

Install the Live Server extension

Right-click index.html

Select Open with Live Server

The project will launch in your browser.

🚀 Features
Core Functionality

Add task

Delete individual task

Clear all tasks

Persistent storage (localStorage)

Validation (Regex Based)

No leading/trailing spaces

Valid date format (YYYY-MM-DD)

Positive numeric duration

Alphabetical tags only

Duplicate word detection (advanced rule)

Search & Sorting

Live regex search

Safe regex compilation (try/catch)

Highlight matching text

Sort by title, date, and duration

Dashboard & Cap System

Total tasks

Total duration

Top tag

Recent tasks

Duration cap warning

ARIA live updates for accessibility

Data Management

Import tasks from JSON

Export tasks to JSON

JSON structure validation before import

⌨️ Keyboard Accessibility

Tab navigation across all controls

Enter submits forms

Delete buttons are keyboard accessible

Search works without mouse interaction

Cap warnings announced via ARIA live region

The application was tested to ensure keyboard-only usability.

♿ Accessibility Notes

Semantic HTML elements (header, main, section, form, table)

ARIA live region for cap warnings

Clear validation error messages

Responsive layout (mobile-first)

Logical tab order

🧪 Testing Instructions
Manual Testing

Add valid task → appears in table

Add invalid task → validation message appears

Enter duplicate word → blocked

Search with valid regex → results filter

Enter broken regex (e.g. () → app does not crash

Set duration cap below total → warning appears

Refresh page → tasks persist

Export JSON → file downloads

Import JSON → tasks restore

Regex Testing Page

Open tests.html using Live Server to test validation rules independently.

📦 Milestone Commit History

This project was developed using structured milestone commits:

M1 - Spec, wireframes, data model and accessibility plan

M2 - Semantic HTML structure and mobile-first base CSS

M2 - Semantic HTML structure and mobile-first base CSS

M3 - Form validation with regex rules and tests

M4 - Rendering, sorting and safe regex search implemented

M5 - Dashboard stats, cap logic and ARIA live updates

M6 - LocalStorage persistence, JSON import/export and settings

M7 - README, demo video and gitignore file

Each milestone reflects logical progression in functionality and structure.

🧹 Repository Cleanliness

The repository follows a clean modular structure:

Organized folders (scripts/, styles/, assets/)

Consistent file naming

Logical commit history

Proper .gitignore configuration

No editor or OS junk files tracked

🎥 Demo Video

Demo Video Link:

[  ]

The demo covers:

Navigation and layout

Keyboard flow

Regex edge cases

Safe search

Sorting

Dashboard and cap system

Persistence

Import/export

Responsiveness

📌 Final Notes

This project demonstrates:

Modular JavaScript architecture

Clean repository management

Structured milestone-based development

Accessibility considerations

Robust input validation

Defensive programming practices
