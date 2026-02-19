M1 – Specification & Wireframes

Project: ALU Life Planner

1️. Project Overview

ALU Life Planner is a browser-based task management app that helps students organize academic and campus activities.

Users can:

Add validated tasks

Search using regex

Sort tasks

View statistics

Set duration targets

Store data using localStorage

No frameworks are used. The app follows a modular JavaScript structure.

2️. Functional Specification
Add Task

User inputs:

Title

Due date

Duration

Tag

System:

Validates input using regex

Prevents duplicate words

Saves task to localStorage

Displays task in table

Manage Tasks

Delete task (with confirmation)

Sort by date, title, or duration

Live regex search with highlighting

Dashboard & Extras

Total tasks

Total duration

Most frequent tag

Tasks within last 7 days

Duration cap system (alerts if exceeded)

Unit conversion (minutes ↔ hours)

3. Data Model

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

4. Accessibility (a11y Plan)

Semantic HTML (header, main, section, table, form)

Proper <label> elements for all inputs

aria-live regions for notifications and cap alerts

Keyboard accessible (Tab + Enter)

Clear color contrast for messages

5. Technical Structure

Project structure:
index.html
tests.html
seed.json
styles/
scripts/
  storage.js
  state.js
  ui.js
  validators.js
  search.js
assets/
  wireframe.md

7. SUMMARY

1. The ALU Life Planner:

2. Uses modular JavaScript

3. Implements regex validation

4. Stores data persistently

5. Provides search, sorting, statistics, and alerts

6. Follows accessibility best practices
