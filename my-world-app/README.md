# My World App

A Node.js web application for creating, exploring, and sharing imaginative worlds. Built with Express, MongoDB, Mongoose, and EJS templates.

## Features

- **World Creation**: Create detailed worlds with rich information including geography, culture, technology, and timeline
- **Multiple World Types**: Support for Fantasy, Sci-Fi, Modern, Historical, Post-Apocalyptic, and Other world types
- **Search & Discovery**: Find worlds by name, description, tags, or type
- **Public/Private Worlds**: Choose whether to share your worlds publicly or keep them private
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **RESTful API**: JSON API endpoints for world data and statistics

## Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Frontend
- **EJS** - Embedded JavaScript templates
- **Bootstrap 5** - CSS framework
- **Font Awesome** - Icons
- **Vanilla JavaScript** - Client-side interactivity

### Additional Libraries
- **body-parser** - Request body parsing
- **method-override** - HTTP verb support
- **express-session** - Session management
- **connect-mongo** - MongoDB session store
- **bcryptjs** - Password hashing (for future user auth)
- **multer** - File upload handling (for future features)
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Installation & Setup

1. **Clone or download the project**
   ```powershell
   cd "C:\Users\Admin\Desktop\my-world-app"
   ```

2. **Install dependencies**
   ```powershell
   npm install
   ```

3. **Set up MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Update the `MONGODB_URI` in `.env` file if needed
   - Default: `mongodb://localhost:27017/my-world-app`

4. **Configure environment variables**
   - Copy `.env` and update values as needed
   - Key variables:
     - `MONGODB_URI` - MongoDB connection string
     - `SESSION_SECRET` - Session encryption key
     - `PORT` - Server port (default: 3000)

5. **Start the application**
   ```powershell
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Access the application**
   - Open your browser and go to `http://localhost:3000`

## Project Structure

```
my-world-app/
├── app.js                 # Main application file
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── .gitignore            # Git ignore file
├── models/               # Mongoose data models
│   ├── World.js          # World model
│   └── User.js           # User model (for future auth)
├── routes/               # Express route handlers
│   ├── index.js          # Home and general routes
│   ├── world.js          # World CRUD operations
│   └── api.js            # JSON API endpoints
├── views/                # EJS templates
│   ├── index.ejs         # Homepage
│   ├── about.ejs         # About page
│   ├── contact.ejs       # Contact page
│   ├── error.ejs         # Error page
│   ├── 404.ejs           # 404 page
│   ├── partials/         # Reusable template parts
│   │   └── navbar.ejs    # Navigation bar
│   └── world/            # World-related templates
│       ├── index.ejs     # World listing
│       ├── show.ejs      # World details
│       ├── new.ejs       # Create world form
│       └── edit.ejs      # Edit world form
└── public/               # Static assets
    ├── css/
    │   └── style.css     # Custom styles
    └── js/
        └── main.js       # Client-side JavaScript
```

## API Endpoints

### REST API for Worlds
- `GET /api/worlds` - Get all public worlds (with pagination and filters)
- `GET /api/worlds/:id` - Get a specific world
- `POST /api/worlds` - Create a new world
- `PUT /api/worlds/:id` - Update a world
- `DELETE /api/worlds/:id` - Delete a world
- `GET /api/stats` - Get application statistics

### Web Routes
- `GET /` - Homepage
- `GET /world` - Browse all worlds
- `GET /world/new` - Create world form
- `POST /world` - Create world (form submission)
- `GET /world/:id` - View world details
- `GET /world/:id/edit` - Edit world form
- `PUT /world/:id` - Update world (form submission)
- `DELETE /world/:id` - Delete world
- `GET /about` - About page
- `GET /contact` - Contact page

## Data Models

### World Schema
- **Basic Info**: name, description, type, creator
- **Geography**: climate, terrain, continents
- **Culture**: languages, religions, customs
- **Technology**: level, special features
- **Magic**: existence, type, rules
- **Timeline**: historical events
- **Metadata**: creation date, visibility, tags

### User Schema (Ready for future auth)
- **Profile**: username, email, password, bio
- **Relationships**: owned worlds, favorite worlds
- **Permissions**: role-based access

## Features for Future Development

This prototype is designed to be easily extensible. Planned features include:

- **User Authentication & Profiles**
- **Image Uploads & Galleries**
- **Collaborative World Building**
- **Advanced Search & Filtering**
- **World Export/Import**
- **Social Features** (comments, ratings, following)
- **Mobile App Version**
- **Frontend Framework Migration** (React, Vue, etc.)

## Development Notes

### Prototype Status
This is a prototype version designed to demonstrate the core functionality and provide a foundation for future development. The EJS templates and server-side rendering approach makes it easy to understand and modify.

### Frontend Flexibility
The current EJS/Bootstrap frontend can be easily replaced with:
- React.js + API
- Vue.js + API
- Angular + API
- Mobile app (React Native, Flutter)

The RESTful API is already in place to support any frontend framework.

### Database Design
The MongoDB/Mongoose setup is flexible and can easily accommodate new fields and relationships as features are added.

## Scripts

```powershell
# Install dependencies
npm install

# Start development server (with nodemon)
npm run dev

# Start production server
npm start

# Run tests (when implemented)
npm test
```

## Contributing

This is a prototype project. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC License - feel free to use this code as a starting point for your own projects.

## Support

For questions or issues:
- Check the FAQ on the Contact page
- Review this README
- Submit an issue on GitHub
- Contact: hello@myworldapp.com (demo contact)

---

**Happy world building!** 🌍✨
