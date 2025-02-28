# Task Manager - Web UI

A React-based frontend for the Task Manager API (from Task 1). This UI allows users to:
- Create, view, search, and delete tasks
- Execute shell commands and view their output
- Interact with the backend API in a user-friendly way

---

## Screenshots and Demo

### Create Task

![Image](https://github.com/user-attachments/assets/6e7936eb-e472-4a1b-92ac-0593c4f6c7df)

![Image](https://github.com/user-attachments/assets/b4134a78-00d3-47f2-9593-69dc803690af)

### Execute Task

![Image](https://github.com/user-attachments/assets/f1c9249a-25e8-4adb-96fa-df3c3e116fd5)

### Full Demo

https://github.com/user-attachments/assets/ae8f2cd0-68d3-465d-a305-3f92a68d8501


## Features
- **Task Management**:
  - Create new tasks
  - View all tasks in a table
  - Search tasks by name
  - Delete tasks
- **Command Execution**:
  - Execute shell commands for a task
  - View command output in a modal
- **Responsive Design**: Works on desktop and mobile
- **Accessibility**: Keyboard navigation and ARIA support

---

## Prerequisites
- Node.js 16+
- React 19
- Backend API (Task 1) running at `http://localhost:8080`

---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/task-manager-ui.git
cd task-manager-ui
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Backend URL
Update the API base URL in `src/App.tsx`:
```typescript
const API_BASE_URL = 'http://localhost:8080/tasks';
```

### 4. Run the Application
```bash
npm start
```
The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Usage

### Task List
- Displays all tasks in a table.
- Use the search bar to filter tasks by name.

### Create Task
1. Click the **Create Task** button.
2. Fill in the form:
   - **Name**: Task name
   - **Owner**: Task owner
   - **Command**: Shell command to execute
3. Click **Create**.

### Execute Command
1. Click the **Run** button next to a task.
2. The command output will be displayed in a modal.

### Delete Task
1. Click the **Delete** button next to a task.
2. Confirm the deletion.

---

## Accessibility Features
### Keyboard Navigation:
- Use **Tab** to navigate between elements.
- Press **Enter** to interact with buttons and inputs.

### ARIA Attributes:
- All interactive elements have proper ARIA roles and labels.

### Screen Reader Support:
- All actions are announced by screen readers.

---

## Docker Deployment

### 1. Build Docker Image
```bash
docker build -t task-manager-ui:latest .
```

### 2. Run Container
```bash
docker run -p 3000:3000 task-manager-ui:latest
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Technologies Used
- **React 19**: Frontend framework
- **TypeScript**: Static typing
- **Ant Design**: UI components
- **Axios**: HTTP client for API calls

