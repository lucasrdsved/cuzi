# Personal & Aluno - PWA

A complete and modern Progressive Web App (PWA) connecting Personal Trainers and Students, built with a brutalist design aesthetic.

## 🚀 Features

### For Personal Trainers 👨‍🏫
- **Dashboard Overview**: Get a quick snapshot of active students, workout plans, and daily activities.
- **Student Management**: Register and manage students, including their fitness goals and physical restrictions.
- **Workout Builder**: Create detailed workout routines with exercises, sets, reps, and rest times.
- **Progress Tracking**: Monitor student performance and workout execution history.
- **Communication**: Chat directly with students to provide feedback and support.

### For Students 🧍‍♂️
- **Daily Workouts**: Access the assigned workout for the day with clear instructions.
- **Interactive Execution Mode**: Follow along with workouts step-by-step, including rest timers and set tracking.
- **Progress Visualization**: View streak stats and workout completion history.
- **Direct Chat**: Communicate with your personal trainer for questions and updates.
- **Offline Support**: Access core features even without an internet connection.

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS (custom brutalist theme)
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **Icons**: Lucide React
- **PWA**: vite-plugin-pwa

## 🏁 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/personal-aluno-pwa.git
    cd personal-aluno-pwa
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Open in browser**
    Navigate to `http://localhost:5173` to see the application.

### Build for Production

To build the application for production deployment:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 🎨 Design System

The application features a "Brutalist" design system characterized by:
- **Thick Borders**: 4-8px solid black borders.
- **High Contrast**: Bold typography and solid, vibrant colors (Neon Green, Red, White, Black).
- **Shadows**: Hard, non-blurred shadows for depth.
- **Typography**: Extra-bold fonts for headings.

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   └── common/       # Generic components (Buttons, Cards, Inputs, etc.)
├── mockdata/         # Static data for testing and development
├── pages/            # Page components for different routes
│   ├── Aluno/        # Student-specific pages
│   └── Personal/     # Personal Trainer-specific pages
├── services/         # Logic for data fetching and manipulation (mock service)
├── store/            # Global state management (Zustand)
└── types/            # TypeScript type definitions
```

## 🤝 Contributing

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
