# FeedbackHub - Student Feedback System

A modern, responsive web application that allows students to submit feedback about courses, professors, and general university services, with an admin panel to review and manage submissions.


## Features

- **User-friendly Feedback Submission**
  - Rate experiences with a 5-star rating system
  - Categorize feedback by course, professor, or general topics
  - Simple and intuitive interface

- **Admin Panel**
  - View all submitted feedback in one place
  - Filter by category
  - Search feedback by keywords
  - Delete individual feedback entries

- **Responsive Design**
  - Optimized for desktop and mobile devices
  - Clean and modern user interface

## Technologies Used

- **Frontend**
  - HTML5
  - CSS3 with custom properties
  - Vanilla JavaScript
  - Font Awesome icons
  - Google Fonts (Poppins, Inter, Montserrat)

- **Data Storage**
  - Local Storage API for persistent data

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/kichu/feedbackhub.git
   ```

2. Navigate to the project directory:
   ```
   cd feedbackhub
   ```

3. Open the `index.html` file in your web browser:
   - You can use a local development server like Live Server in VS Code
   - Or simply open the file directly in a browser

## Usage

### For Students

1. Navigate to the home page and click "Give Feedback"
2. Select the appropriate category (Course, Professor, General)
3. Provide specific details and your rating
4. Write your feedback in the text area
5. Submit the form

### For Administrators

1. Click on the "Admin" link in the navigation menu
2. Use the dropdown to filter by category
3. Use the search box to find specific feedback entries
4. Review feedback details including ratings and comments
5. Delete entries if needed

## Project Structure

```
student_feedback/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet
├── index.js            # JavaScript functionality
└── screenshots/        # Project screenshots (for documentation)
```

## Local Storage

This application uses the browser's Local Storage to persist feedback data. The data is stored as a JSON array under the key 'feedbacks'.

## Future Improvements

- User authentication system
- Backend integration with a database
- Analytics dashboard for feedback trends
- Email notifications for new feedback
- Export functionality for feedback data
