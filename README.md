# Task Manager Reflection

This project is a React + TypeScript task management app built with Vite. I used React components to structure the interface, TypeScript to define the task data and interaction types, and a combination of state, filtering, and local storage to create a working and responsive workflow.

## 1. How I implemented React and TypeScript features

I built the application using functional React components and TypeScript interfaces to make the data model clear and predictable. The task structure, status values, priorities, and sorting options are defined in a shared type file so that every component works with the same contract. This reduces errors and keeps the code easier to maintain.

I used React state to manage the main app behavior, including:

- the task list itself
- filter values for status, priority, and search text
- current edit state for updating an existing task
- form visibility for add/edit workflow
- dark mode toggling

For example, I used `useState` to track tasks and form state, and `useEffect` to persist the task list to local storage whenever the data changed. This ensures the app keeps its data between refreshes without extra complexity. I also used TypeScript props to strongly type component inputs such as task objects, filter callbacks, and dashboard values.

## 2. Challenges I encountered and how I overcame them

One of the biggest challenges was managing different pieces of state at the same time: filtering, sorting, editing, form display, and dark mode all needed to stay in sync. At first, the logic was harder to follow because the task data and UI control states were being managed in multiple places. I addressed this by centralizing the core task state in the main `App` component and passing only the necessary data and callback functions to child components.

Another challenge was making the app feel polished while keeping the code maintainable. The project required task filtering, conditional rendering, and animation, which could become messy if handled without a clear pattern. I solved this by separating responsibilities: the main app handled state and task updates, while components like `TaskList`, `TaskFilter`, `TaskForm`, and `Dashboard` focused on their own UI responsibilities.

I also encountered layout issues while building the final interface, especially with the footer not staying visible at the bottom of the page. The fix was to make the app container use a vertical layout and allow the main content area to expand before the footer, which created a cleaner page structure. This improved both usability and visual consistency.

## 3. My approach to component composition and state management

My approach was to keep the app modular and compositional. Each component has a single responsibility:

- `App` manages the overall state and orchestrates task updates
- `TaskForm` handles creation and editing of individual tasks
- `TaskList` renders the visible tasks and delegates actions like edit, delete, and status changes
- `TaskFilter` controls sorting and filtering
- `Dashboard` summarizes task data in a compact overview
- `Footer` provides the page’s final UI element

This composition makes the project easier to understand and update. Instead of having one large component do everything, the responsibilities are spread across smaller pieces that communicate through props and callbacks. For state management, I relied on React’s local state model with derived values for filtered and sorted tasks. This kept the flow simple and predictable while still supporting features like editing, persistence, and dark mode.

Overall, this project helped me improve my understanding of React component design, TypeScript typing, and managing state in a maintainable way. It also reinforced how important structure, clear responsibilities, and consistent data flow are when building larger front-end applications.
