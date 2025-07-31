class AttendanceTracker {
    constructor() {
        this.currentDate = new Date();
        this.attendanceData = this.loadAttendanceData();
        this.userName = this.loadUserName();
        this.currentTheme = this.loadTheme();
        
        // Attendance states in cycle order
        this.attendanceStates = ['none', 'absent', 'forenoon-present', 'afternoon-present', 'full-present'];
        
        // Class counts for each attendance state
        this.classCounts = {
            'full-present': 7,
            'forenoon-present': 4,
            'afternoon-present': 3,
            'absent': 0
        };
        
        this.initializeEventListeners();
        this.applyTheme();
        this.renderSixMonths();
        this.updateStats();
        this.updateUserName();
    }

    initializeEventListeners() {
        // Single month navigation
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.renderSixMonths();
        });

        document.getElementById('nextMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderSixMonths();
        });

        // Profile chip click
        document.getElementById('profileChip').addEventListener('click', () => this.editUserName());

        // Data controls
        document.getElementById('exportBtn').addEventListener('click', () => this.exportData());
        document.getElementById('importFile').addEventListener('change', (e) => this.importData(e));
        document.getElementById('settingsBtn').addEventListener('click', () => this.openSettings());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearAllData());

        // Settings modal
        document.getElementById('closeSettings').addEventListener('click', () => this.closeSettings());
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.changeTheme(e.target.closest('.theme-btn').dataset.theme));
        });

        // Close modal when clicking outside
        document.getElementById('settingsModal').addEventListener('click', (e) => {
            if (e.target.id === 'settingsModal') {
                this.closeSettings();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.currentDate.setMonth(this.currentDate.getMonth() - 1);
                this.renderSixMonths();
            } else if (e.key === 'ArrowRight') {
                this.currentDate.setMonth(this.currentDate.getMonth() + 1);
                this.renderSixMonths();
            } else if (e.key === 'Escape') {
                this.closeSettings();
            }
        });
    }

    getAttendanceState(date) {
        const dateKey = this.formatDateKey(date);
        return this.attendanceData[dateKey] || 'none';
    }

    setAttendanceState(date, state) {
        const dateKey = this.formatDateKey(date);
        this.attendanceData[dateKey] = state;
        this.saveAttendanceData();
    }

    cycleAttendanceState(date) {
        const currentState = this.getAttendanceState(date);
        const currentIndex = this.attendanceStates.indexOf(currentState);
        const nextIndex = (currentIndex + 1) % this.attendanceStates.length;
        const nextState = this.attendanceStates[nextIndex];
        
        this.setAttendanceState(date, nextState);
    }

    formatDateKey(date) {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }

    loadUserName() {
        return localStorage.getItem('userName') || 'Student Name';
    }

    saveUserName() {
        localStorage.setItem('userName', this.userName);
    }

    updateUserName() {
        document.getElementById('userName').textContent = this.userName;
    }

    editUserName() {
        const newName = prompt('Enter your name:', this.userName);
        if (newName && newName.trim()) {
            this.userName = newName.trim();
            this.saveUserName();
            this.updateUserName();
            this.showNotification('Name updated successfully!', 'success');
        }
    }

    loadTheme() {
        return localStorage.getItem('theme') || 'dark';
    }

    saveTheme() {
        localStorage.setItem('theme', this.currentTheme);
    }

    applyTheme() {
        document.body.setAttribute('data-theme', this.currentTheme);
        this.updateThemeButtons();
    }

    updateThemeButtons() {
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.theme === this.currentTheme) {
                btn.classList.add('active');
            }
        });
    }

    changeTheme(theme) {
        this.currentTheme = theme;
        this.saveTheme();
        this.applyTheme();
        this.showNotification(`Theme changed to ${theme}!`, 'success');
    }

    openSettings() {
        document.getElementById('settingsModal').style.display = 'block';
    }

    closeSettings() {
        document.getElementById('settingsModal').style.display = 'none';
    }

    renderSixMonths() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // Update month range display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        
        const startMonth = month;
        const endMonth = (month + 5) % 12;
        const endYear = month + 5 >= 12 ? year + 1 : year;
        
        const startMonthName = monthNames[startMonth];
        const endMonthName = monthNames[endMonth];
        
        document.getElementById('currentMonth').textContent = `${startMonthName} - ${endMonthName} ${endYear}`;

        // Clear and render 6 months
        const sixMonthsGrid = document.getElementById('sixMonthsGrid');
        sixMonthsGrid.innerHTML = '';

        for (let i = 0; i < 6; i++) {
            const currentMonth = (month + i) % 12;
            const currentYear = month + i >= 12 ? year + 1 : year;
            this.renderMonth(currentMonth, currentYear);
        }
    }

    renderMonth(month, year) {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        
        const sixMonthsGrid = document.getElementById('sixMonthsGrid');
        
        // Create month container
        const monthContainer = document.createElement('div');
        monthContainer.className = 'month-calendar';
        
        // Add month title
        const monthTitle = document.createElement('div');
        monthTitle.className = 'month-title';
        monthTitle.textContent = `${monthNames[month]} ${year}`;
        monthContainer.appendChild(monthTitle);
        
        // Add calendar header
        const calendarHeader = document.createElement('div');
        calendarHeader.className = 'calendar-header';
        calendarHeader.innerHTML = '<div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>';
        monthContainer.appendChild(calendarHeader);
        
        // Add calendar grid
        const calendarGrid = document.createElement('div');
        calendarGrid.className = 'calendar-grid';
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        // Get last day of previous month for padding
        const lastDayPrevMonth = new Date(year, month, 0);
        const daysInPrevMonth = lastDayPrevMonth.getDate();

        // Add days from previous month
        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
            const day = daysInPrevMonth - i;
            const date = new Date(year, month - 1, day);
            this.createCalendarDay(date, day, true, calendarGrid);
        }

        // Add days from current month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            this.createCalendarDay(date, day, false, calendarGrid);
        }

        // Add days from next month to complete the grid
        const remainingDays = 42 - (startingDayOfWeek + daysInMonth); // 6 rows * 7 days
        for (let day = 1; day <= remainingDays; day++) {
            const date = new Date(year, month + 1, day);
            this.createCalendarDay(date, day, true, calendarGrid);
        }
        
        monthContainer.appendChild(calendarGrid);
        sixMonthsGrid.appendChild(monthContainer);
    }

    createCalendarDay(date, day, isOtherMonth, calendarGrid) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;

        if (isOtherMonth) {
            dayElement.classList.add('other-month');
        } else {
            // Set attendance state styling
            const attendanceState = this.getAttendanceState(date);
            if (attendanceState !== 'none') {
                dayElement.classList.add(attendanceState);
                dayElement.setAttribute('data-classes', this.classCounts[attendanceState]);
            }

            // Highlight today
            const today = new Date();
            if (date.toDateString() === today.toDateString()) {
                dayElement.classList.add('today');
            }

            // Add click event for attendance cycling
            dayElement.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Day clicked:', date.toDateString());
                this.cycleAttendanceState(date);
                this.renderSixMonths();
                this.updateStats();
            });
        }

        calendarGrid.appendChild(dayElement);
    }

    updateStats() {
        let totalPossibleClasses = 0;
        let totalClassesAttended = 0;

        Object.values(this.attendanceData).forEach(state => {
            if (state !== 'none') {
                // For each day with attendance recorded, assume 7 classes were possible
                totalPossibleClasses += 7;
                const classCount = this.classCounts[state];
                totalClassesAttended += classCount;
            }
        });

        const attendancePercentage = totalPossibleClasses > 0 ? Math.round((totalClassesAttended / totalPossibleClasses) * 100) : 0;

        document.getElementById('totalClasses').textContent = totalPossibleClasses;
        document.getElementById('presentClasses').textContent = totalClassesAttended;
        document.getElementById('attendancePercentage').textContent = `${attendancePercentage}%`;
    }

    saveAttendanceData() {
        localStorage.setItem('attendanceData', JSON.stringify(this.attendanceData));
    }

    loadAttendanceData() {
        const saved = localStorage.getItem('attendanceData');
        return saved ? JSON.parse(saved) : {};
    }

    exportData() {
        const data = {
            attendanceData: this.attendanceData,
            userName: this.userName,
            theme: this.currentTheme,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };

        const now = new Date();
        const timeString = now.toTimeString().split(' ')[0].replace(/:/g, '-');
        const dateString = now.toISOString().split('T')[0];
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `attendance-data-${dateString}-${timeString}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showNotification('Data exported successfully!', 'success');
    }

    importData(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                if (data.attendanceData) {
                    this.attendanceData = data.attendanceData;
                    if (data.userName) {
                        this.userName = data.userName;
                        this.saveUserName();
                        this.updateUserName();
                    }
                    if (data.theme) {
                        this.currentTheme = data.theme;
                        this.saveTheme();
                        this.applyTheme();
                    }
                    this.saveAttendanceData();
                    this.renderSixMonths();
                    this.updateStats();
                    this.showNotification('Data imported successfully!', 'success');
                } else {
                    throw new Error('Invalid data format');
                }
            } catch (error) {
                this.showNotification('Error importing data. Please check the file format.', 'error');
                console.error('Import error:', error);
            }
        };
        reader.readAsText(file);
        
        // Reset file input
        event.target.value = '';
    }

    clearAllData() {
        if (confirm('Are you sure you want to clear all attendance data? This action cannot be undone.')) {
            this.attendanceData = {};
            this.saveAttendanceData();
            this.renderSixMonths();
            this.updateStats();
            this.showNotification('All data cleared successfully!', 'success');
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            max-width: 300px;
        `;

        // Set background color based on type
        switch (type) {
            case 'success':
                notification.style.backgroundColor = '#48bb78';
                break;
            case 'error':
                notification.style.backgroundColor = '#f56565';
                break;
            default:
                notification.style.backgroundColor = '#4299e1';
        }

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AttendanceTracker();
}); 