# Smart Campus Management System (SCMS)

A Front-End Project using HTML, CSS, and JavaScript

## Overview

The Smart Campus Management System (SCMS) is a front-end web application designed to centralize campus-related information such as announcements, events, clubs, and student activities.  
This project is built using HTML, CSS, and Vanilla JavaScript with a clean, modular structure suitable for future backend expansion.

SCMS is intentionally designed as a scalable project that can later be connected to:

- A backend API (Node.js, Django, Laravel, etc.)
- A mobile version via API routes
- Authentication systems (JWT / OAuth)
- Realtime notifications

## Features

### Homepage

- Overview of announcements, events, and clubs  
- Quick navigation  
- Responsive hero layout  

### Dashboard

- Personalized greeting (saved in localStorage)  
- Saved announcements preview  
- Registered events  
- Joined clubs  
- Theme toggle (Dark/Light Mode)  
- Last visited page tracking  

### Announcements

- Search bar  
- Category filter  
- “New” badge indicator  
- Save announcement (localStorage)  
- Modal with full details  

### Events

- Search bar  
- Category filter  
- Event registration  
- Available seats  
- Modal popup with full event details  

### Clubs

- Join a club (localStorage)  
- Category filter  
- Modal with club information  

### UI/UX Features

- Modern responsive design  
- Component-based UI  
- Reusable modals, buttons, cards  
- Toast notifications  
- CSS variables for theme consistency  

## Project Structure

scms-frontend/
│
├── index.html
├── dashboard.html
├── announcements.html
├── events.html
├── clubs.html
│
├── assets/
│ ├── css/
│ │ ├── global.css
│ │ ├── dashboard.css
│ │ ├── announcements.css
│ │ ├── events.css
│ │ └── clubs.css
│ │
│ ├── js/
│ │ ├── storage.js
│ │ ├── components.js
│ │ ├── main.js
│ │ ├── dashboard.js
│ │ ├── announcements.js
│ │ ├── events.js
│ │ └── clubs.js
│ │
│ ├── img/
│ └── icons/
│
└── README.md

bash
Copy code

## Installation & Setup

1. Download or clone the project
git clone <url>
markdown
Copy code
2. Open the project in an editor
3. Run the project by opening `index.html` ;
(Live Server recommended)

## Technologies Used

- HTML5  
- CSS3 (Flexbox, Grid, CSS Variables)  
- JavaScript (ES6+)  
- localStorage  
- Responsive Design  

## Future Improvements (Backend-Ready)

Potential upgrades:

- User authentication  

- Admin panel  
- Database integration  
- API for mobile app  
- Real-time notifications  
- Improved event seat tracking  

## Team Members

- LINH RATH HENRY

- SYNA SOKUNKETENA