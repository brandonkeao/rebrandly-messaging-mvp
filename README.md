# Rebrandly Messaging MVP - Web Application

This is the restructured version of the Rebrandly Messaging MVP prototype, converted from a single HTML file into a proper web application structure following modern development best practices.

## 🏗️ Project Structure

```
app/
├── index.html              # Main HTML entry point
├── css/
│   ├── styles.css          # Base styles and layout
│   ├── components.css      # Reusable UI components
│   └── views.css          # View-specific styles
├── js/
│   ├── app.js             # Main application logic
│   ├── navigation.js      # View management and routing
│   ├── views.js           # HTML templates for views
│   └── components.js      # Reusable UI components
└── assets/                # Static assets (images, icons, etc.)
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (recommended for development)

### Running the Application

#### Option 1: Simple File Server
```bash
# Navigate to the app directory
cd app/

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have http-server installed)
npx http-server -p 8000
```

#### Option 2: Direct File Access
Open `index.html` directly in your browser (some features may be limited due to CORS restrictions).

### Accessing the Application
Open your browser and navigate to `http://localhost:8000`

## 📋 Features

### Current Implementation
- ✅ **Campaigns View**: Dashboard with campaign statistics and list
- ✅ **Contacts View**: Contact management interface
- ✅ **Import Contacts**: CSV file upload with validation
- ✅ **Compose Message**: Message editor with variables and preview
- ✅ **Progress Steps**: Visual campaign builder progress
- ✅ **Responsive Design**: Mobile-friendly layout
- ✅ **Auto-save**: Draft functionality with localStorage
- ✅ **File Upload**: Drag & drop CSV import
- ✅ **Form Validation**: Input validation and error handling

### Planned Features (Future Development)
- 🔄 **Add Links**: Link management and shortening
- 🔄 **Review & Send**: Campaign review and sending
- 🔄 **Authentication**: User login and registration
- 🔄 **Database Integration**: Backend data persistence
- 🔄 **Real-time Analytics**: Live campaign tracking
- 🔄 **API Integration**: Rebrandly API connection

## 🎨 Design System

### Color Palette
- **Primary**: `#667eea` to `#764ba2` (Purple gradient)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Amber)
- **Error**: `#ef4444` (Red)
- **Background**: `#f5f7fa` (Light gray)
- **Text Primary**: `#2c3e50` (Dark gray)
- **Text Secondary**: `#64748b` (Medium gray)

### Typography
- **Font Family**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- **Base Size**: `14px`
- **Headers**: `16px`, `18px`, `20px`

### Spacing System
- **Base Unit**: `8px`
- **Scale**: `8px`, `16px`, `24px`, `32px`

## 🔧 Development

### File Organization

#### CSS Architecture
- **styles.css**: Base styles, layout, variables, utilities
- **components.css**: Reusable UI components (cards, buttons, forms)
- **views.css**: View-specific layouts and responsive design

#### JavaScript Architecture
- **app.js**: Application initialization, state management, core functionality
- **navigation.js**: View switching, routing, progress management
- **views.js**: HTML templates for all views
- **components.js**: Reusable UI components and utilities

### Key Classes and Components

#### CSS Classes
```css
.sidebar              /* Left navigation panel */
.nav-item            /* Navigation items */
.nav-item.active     /* Active navigation state */
.view                /* Content view containers */
.card                /* White content cards */
.btn-primary         /* Primary action buttons */
.progress-container  /* Campaign builder progress */
.upload-area         /* File upload zone */
.message-bubble      /* SMS preview bubble */
```

#### JavaScript Classes
```javascript
RebrandlyApp         // Main application class
Navigation           // View management
Views                // Template management
Components           // UI components
```

### Adding New Views

1. **Create HTML template** in `views.js`:
```javascript
static getNewView() {
    return `<div class="card"><!-- content --></div>`;
}
```

2. **Add navigation item** in `index.html`:
```html
<a class="nav-item" data-view="newview">
    <span class="nav-icon">📋</span>
    <span>New View</span>
</a>
```

3. **Add view loader** in `navigation.js`:
```javascript
case 'newview':
    this.loadNewView();
    break;
```

4. **Add styles** in `views.css` if needed.

### State Management

The application uses a simple state management system:

```javascript
// Get current campaign data
const data = window.RebrandlyApp.getCampaignData();

// Update campaign data
window.RebrandlyApp.updateCampaignData({ message: 'Hello!' });

// Navigate to view
window.RebrandlyApp.navigateToView('compose');
```

### Event Handling

Events are handled through delegation and class methods:

```javascript
// Navigation events (automatic)
document.addEventListener('click', (e) => {
    if (e.target.closest('.nav-item:not(.disabled)')) {
        // Handle navigation
    }
});

// Custom events in view-specific bind methods
Navigation.bindComposeEvents() {
    const textarea = document.getElementById('messageContent');
    textarea.addEventListener('input', this.updatePreview);
}
```

## 🔄 Migration from Single File

### What Changed
1. **Separated Concerns**: CSS, JavaScript, and HTML are now in separate files
2. **Modular Architecture**: Code is organized into logical modules
3. **Class-based Structure**: JavaScript uses ES6 classes for better organization
4. **Event Delegation**: Improved event handling with proper delegation
5. **State Management**: Centralized application state
6. **Template System**: HTML templates are managed programmatically

### What Stayed the Same
1. **Visual Design**: All styling and layout remain identical
2. **User Experience**: Navigation and interactions work the same way
3. **Functionality**: All existing features are preserved
4. **Data Structures**: Contact and campaign data formats unchanged

## 🚀 Future Development Path

### Phase 1: Backend Integration
- Set up Node.js/Express server
- Implement REST API endpoints
- Add database (PostgreSQL/MongoDB)
- User authentication system

### Phase 2: Enhanced Features
- Real SMS sending integration
- Rebrandly API integration for link shortening
- Advanced analytics dashboard
- Campaign scheduling

### Phase 3: Production Ready
- Error handling and logging
- Performance optimization
- Security hardening
- Deployment configuration

## 📝 API Design (Future)

### Planned Endpoints
```
GET    /api/campaigns          # List campaigns
POST   /api/campaigns          # Create campaign
GET    /api/campaigns/:id      # Get campaign
PUT    /api/campaigns/:id      # Update campaign
DELETE /api/campaigns/:id      # Delete campaign

GET    /api/contacts           # List contacts
POST   /api/contacts/import    # Import contacts
GET    /api/contacts/:id       # Get contact
PUT    /api/contacts/:id       # Update contact

POST   /api/messages/send      # Send campaign
POST   /api/messages/test      # Send test message
GET    /api/analytics/:id      # Get campaign analytics
```

### Data Models
```javascript
// Campaign
{
  id: string,
  name: string,
  message: string,
  contacts: Contact[],
  links: Link[],
  status: 'draft' | 'sent' | 'scheduled',
  createdAt: Date,
  sentAt: Date?
}

// Contact
{
  id: string,
  name: string,
  company: string,
  email: string,
  phone: string,
  tags: string[]
}

// Link
{
  id: string,
  originalUrl: string,
  shortUrl: string,
  clicks: number,
  createdAt: Date
}
```

## 🐛 Known Issues

1. **File Upload**: Currently simulated - needs real CSV parsing
2. **Message Sending**: Mock implementation - needs SMS provider integration
3. **Link Shortening**: Placeholder - needs Rebrandly API integration
4. **Persistence**: Uses localStorage - needs database backend
5. **Authentication**: No user system - needs implementation

## 🤝 Contributing

### Code Style
- Use ES6+ features
- Follow existing naming conventions
- Add comments for complex logic
- Maintain responsive design principles

### Testing
- Test all navigation flows
- Verify form validation
- Check responsive behavior
- Test file upload simulation

### Pull Request Process
1. Create feature branch
2. Implement changes
3. Test thoroughly
4. Update documentation
5. Submit pull request

## 📞 Support

For questions about this restructured application:
1. Check this README
2. Review the original context document
3. Examine the code comments
4. Test in browser developer tools

---

**Version**: 2.0 (Restructured)  
**Original**: Single HTML prototype v20  
**Last Updated**: August 2024
