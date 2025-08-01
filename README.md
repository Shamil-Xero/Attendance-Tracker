# Attendance Tracker

A dynamic, web-based attendance tracking application with calendar-based input and data portability features. Perfect for students and educators who need an intuitive way to track and calculate attendance percentages.

## Features

### 🗓️ Interactive Calendar Interface

- **Visual Calendar View**: Clean, modern calendar interface showing all days of the month
- **Single-Click Interaction**: Click any date to cycle through attendance states
- **Month Navigation**: Easy navigation between months with arrow buttons or keyboard arrows
- **Today Highlighting**: Current date is automatically highlighted for easy reference

### 📊 Four Attendance States

- **Full Present** (7 classes) - <span style="color:green; font-weight:bold;">Green</span>: Attended all classes for the day
- **Forenoon Present** (4 classes) - <span style="color:orange; font-weight:bold;">Orange</span>: Attended only the forenoon session
- **Afternoon Present** (3 classes) - <span style="color:blue; font-weight:bold;">Blue</span>: Attended only the afternoon session
- **Absent** (0 classes) - <span style="color:red; font-weight:bold;">Red</span>: Absent for the entire day
- **No Attendance** (default) - No color: No attendance recorded for the day

### 📈 Real-Time Statistics

- **Total Days**: Number of days with attendance recorded
- **Attendance Percentage**: Calculated based on classes attended vs total classes
- **Total Classes**: Sum of all classes across recorded days

### 💾 Data Management

- **Automatic Local Storage**: Data is automatically saved to browser's local storage
- **Export Functionality**: Download attendance data as JSON file
- **Import Functionality**: Upload previously exported data files
- **Clear All Data**: Option to reset all attendance records

### 🎨 Modern Design

- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Beautiful UI**: Modern gradient backgrounds with glass-morphism effects
- **Visual Feedback**: Hover effects and smooth animations
- **Color-Coded States**: Easy-to-understand color scheme for different attendance states

## How to Use

### Getting Started

1. **Option 1**: Visit the live application at [https://shamil-xero.github.io/Attendance-Tracker/](https://shamil-xero.github.io/Attendance-Tracker/)
2. **Option 2**: Open `index.html` in any modern web browser
3. The application will load with the current month displayed
4. Your data is automatically saved locally in your browser

### Recording Attendance

1. **Click on any date** in the calendar to cycle through attendance states in the following order:

   1. No attendance (default, unmarked)
   2. Full Present (7 classes) - Green
   3. Forenoon Present (4 classes) - Orange
   4. Afternoon Present (3 classes) - Blue
   5. Absent (0 classes) - Red
   6. Back to No attendance (cycle repeats)

2. **Navigate between months** using:
   - Left/Right arrow buttons
   - Keyboard arrow keys (←/→)

### Managing Your Data

#### Exporting Data

1. Click the "Export Data" button
2. A JSON file will be downloaded with your attendance data
3. The filename includes the current date for easy identification

#### Importing Data

1. Click the "Import Data" button
2. Select a previously exported JSON file
3. Your attendance data will be restored

#### Clearing All Data

1. Click the "Clear All" button
2. Confirm the action when prompted
3. All attendance records will be permanently deleted

## Technical Details

### Browser Compatibility

- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Uses HTML5 Local Storage for data persistence

### Data Format

Exported data is stored in JSON format with the following structure:

```json
{
  "attendanceData": {
    "2024-01-15": "full-present",
    "2024-01-16": "forenoon-present",
    "2024-01-17": "absent"
  },
  "exportDate": "2024-01-17T10:30:00.000Z",
  "version": "1.0"
}
```

### File Structure

```
Attendance Calculator/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This documentation
```

## Privacy & Security

- **Client-Side Only**: All data is stored locally in your browser
- **No External Servers**: No data is sent to external servers
- **No Accounts Required**: Works completely offline
- **Data Ownership**: You have full control over your attendance data

## Customization

The application can be easily customized by modifying:

- **Class counts**: Edit the `classCounts` object in `script.js`
- **Colors**: Modify the CSS variables in `styles.css`
- **Attendance states**: Add or remove states in the `attendanceStates` array

## Support

This is a standalone web application that requires no installation or setup. Simply open the `index.html` file in your web browser to start using it.

For the best experience, use a modern web browser with JavaScript enabled.
