# NotesTracker

## A Website to Create, Organize your notes on cloud based system

**NotesTracker** is a responsive online platform where users can manage their notes securely on the cloud. The application offers features like registration, login, note management.

---

### Features

- **User Registration**: Create a personal account to manage your notes.
- **Verify Your Email**: Verify your email during first login.
- **2FA Setup**: You can also setup Two Factor Authentication using authenticator app.
- **Note Management**: Add, edit, and delete notes. Each note includes:
  - Title
  - Content
  - A tag
- **Read Note**: You can also read a particular note with detail.
- **Dashboard**: User can easily manage account and his notes using dashboard.
- **404 Page Not Found**: Also shows 404 error incase of wrong page request.
- **Responsive Design**: The site is fully responsive across different screen sizes.
- **Authentication**: Login with 2FA and logout functionality for secure access.

---

### Getting Started

#### Steps to run NotesTracker on your local machine

0. **Fork This Repo**
   Give this repo a star and fork it.
1. **Clone the repository**  
   Open a terminal and run the following command:

   ```bash
   git clone https://github.com/mtayyabrawan/notestracker
   # if you have forked this repo then clone you repo as follow:
   git clone https://github.com/<yout github username>/notestracker
   ```

2. **Open the project**  
   Use your favorite code editor to open the cloned repository.

3. **Install dependencies**  
   Navigate to the project folder in your terminal and install the required Node.js dependencies fro frontend:

   ```bash
   npm install
   ```

4. **Setup Environment Variables**
   Create .env.local as follow:

   ```bash
   cp .env.sample .env.local
   ```

   Then run you backend server and update VITE_API_URL as:

   ```env
   VITE_API_URL=http://localhost:8080/api 
   ```

5. **Run the development server**  
   Start the frontend development server by running (your backend server should be running):

   ```bash
   npm run dev
   ```

   Make sure **npm** is installed on your system.

   After running the command, the frontend will be hosted locally, and a link to the app will appear in the terminal.

   **Access the frontend at:**

   ```https
   http://localhost:5173
   ```

### Backend Setup

To start the backend server, follow the instructions provided in the [Backend Guide](./backend/README.md).

---

### Technologies Used in **NotesTracker**

#### Frontend

- **React.js**:

  - React Router (for routing)
  - React Hook Form & Zod (for form validations)
  - React Hot Toast (for notifications)
  - Sonner (for alerts)
  - Tabler react Icons

- **Tailwind CSS**: For building the UI with responsive design.

#### Backend

- **Express.js**: For building the server-side logic.
- **Mongoose**: For managing MongoDB interactions.
- **Cloudinary & Multer**: For image uploading.
- **Speakeasy & Qrcode**: For Two factor Authentication.
