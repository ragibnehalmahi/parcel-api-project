Parcel Delivery API
🌟 Project Overview
# Parcel Delivery API - Project Overview

 🎯 Project Description
A secure, modular, and role-based backend API for a comprehensive parcel delivery system built with Express.js and MongoDB/Mongoose. This system enables users to register as senders or receivers and perform complete parcel delivery operations including creation, tracking, status management, and delivery confirmation.

 🏗️ System Architecture
- Backend Framework: Express.js with TypeScript
- Database: MongoDB with Mongoose ODM
- Authentication: JWT with refresh tokens
- Authorization: Role-based access control (Admin, Sender, Receiver)
- Security: Password hashing with bcrypt, secure token management

 👥 User Roles & Capabilities

 🔐 Authentication System
- JWT-based login with access and refresh tokens
- Secure password hashing using bcrypt
- Role-based route protection
- Token refresh mechanism

 👨‍💼 Admin Role
- View and manage all users and parcels
- Update parcel delivery statuses
- Block/unblock users
- Access to comprehensive system analytics

 📦 Sender Role
- Create parcel delivery requests
- Cancel parcels (if not dispatched)
- View all personal parcels with status logs
- Track parcel delivery progress
 📭 Receiver Role
- View incoming parcels
- Confirm parcel delivery
- Access delivery history
- Track parcel status

 📊 Parcel Management System

 🏷️ Parcel Schema Design
- Unique tracking ID generation (TRK-YYYYMMDD-XXXXXX)
- Embedded status history logs
- Comprehensive parcel information:
  - Sender and receiver details
  - Parcel type, weight, and dimensions
  - Delivery addresses and fees
  - Estimated delivery dates
  - Status tracking with timestamps

 🔄 Status Flow Management
 Parcel Status Lifecycle:**
```
Requested → Approved → Dispatched → In Transit → Delivered
```
- Additional statuses: Held, Returned, Cancelled
- Each status change recorded with timestamp and updater information
- Business rules enforced for valid status transitions

 🚀 Key Features Implemented

 ✅ Core Functionality
- User registration and authentication with three roles
- Parcel creation with automatic tracking ID generation
- Real-time status updates and tracking
- Comprehensive filtering and search capabilities
- Secure API endpoints with proper authorization

 ✅ Advanced Features
- Automated fee calculation based on weight and parcel type
- Embedded status history within parcel documents
- Receiver delivery confirmation system
- Admin dashboard support via API
- Comprehensive error handling and validation

 🛠️ Technical Stack

 Backend
- Runtime: Node.js with Express.js
- Language: TypeScript
- Database: MongoDB with Mongoose
- Authentication: JWT with bcrypt
- Validation: Zod schema validation

 Development Tools
- Package Manager: npm
- Build Tool: TypeScript compiler
- API Testing: Postman
- Environment Management: dotenv

 📁 Project Structure
```
src/
├── modules/
│   ├── auth/          # Authentication module
│   ├── user/          # User management module
│   ├── parcel/        # Parcel management module
├── middlewares/       # Custom middlewares
├── config/           # Configuration files
├── utils/            # Utility functions
├── app.ts           # Main application file
```

🔧 API Endpoints Overview

### Authentication Routes
- `POST /auth/login` - User login
- `POST /auth/refresh-token` - Refresh access token
- `POST /auth/change-password` - Password change
- `POST /auth/logout` - User logout

### User Management Routes
- `POST /users/register` - User registration
- `GET /users` - Get all users (Admin only)
- `PATCH /users/:id` - Update user details

### Parcel Management Routes
- `POST /parcel` - Create parcel (Sender only)
- `GET /parcel` - Get all parcels (Admin only)
- `GET /parcel/my-parcels` - Get sender's parcels
- `GET /parcel/incoming-parcels` - Get receiver's parcels
- `GET /parcel/:id` - Get specific parcel
- `PATCH /parcel/:id/cancel` - Cancel parcel (Sender only)
- `PATCH /parcel/:id/status` - Update status (Admin only)
- `PATCH /parcel/:id/confirm-delivery` - Confirm delivery (Receiver only)
- `DELETE /parcel/:id` - Delete parcel (Admin only)

🎯 Business Rules & Validations

Parcel Operations
- Senders can only cancel parcels in "Requested" status
- Receivers can only confirm delivery for parcels in transit
- Admin can update status following valid workflow
- Comprehensive input validation using Zod schemas

User Management
- Role-based access control enforced at middleware level
- Admin privileges required for user status changes
- Email uniqueness enforcement
- Password strength requirements

📈 Scalability & Maintenance
- Modular architecture for easy feature expansion
- Comprehensive error handling and logging
- Environment-based configuration
- Database indexing for performance optimization
- API versioning support

🔒 Security Features
- Password hashing with salt rounds
- JWT token expiration and refresh
- Role-based authorization middleware
- Input validation and sanitization
- CORS configuration
- Secure cookie handling

This project demonstrates a production-ready parcel delivery system with complete functionality, robust security, and excellent code organization suitable for real-world deployment.
