# Medicine Shop Management System

A complete React-based POS (Point of Sale) and inventory management system for medicine shops, built with **Vite**, **React 19**, **Tailwind CSS**, and **React Router**.

## 🎯 Features

### 1. **Authentication & User Management**
- **Role-Based Access Control**: Admin, Manager, and Staff roles with different permissions
- **Secure Login System**: Username/password authentication with session persistence
- **User Registration**: New user account creation (admin approval required)
- **User Management**: Admin can view, edit, and manage all system users
- **Session Management**: Automatic logout and session handling

### 2. **Dashboard** (Home)
- **Overview Statistics**: Total medicines, revenue, sales count, and low stock alerts
- **Stock Summary**: Real-time inventory status
- **Quick Stats**: Average sale value, total transactions, categories count
- **Recent Sales**: Quick view of latest 5 transactions
- **System Health**: Visual metrics for system status

### 3. **Medicine Inventory**
- **Complete Inventory Management**: Add, edit, and delete medicines
- **Advanced Search & Filter**: 
  - Search by medicine name
  - Filter by category and manufacturer
  - Stock status filtering (Low <20, Medium 20-50, High >50)
  - Expiry status filtering (Expired, Expiring Soon <30 days, Valid)
  - Price range filtering (min/max price)
  - Sort by name, price, stock, or expiry date (ascending/descending)
- **Stock Tracking**: Monitor stock levels with color-coded badges
  - 🟢 Green: Adequate stock (>50 units)
  - 🟡 Orange: Medium stock (20-50 units)
  - 🔴 Red: Low stock (<20 units)
- **Expiry Management**: Track expiry dates with expired medicine indicators
- **Batch Tracking**: Monitor batch numbers for each medicine
- **Category Organization**: Filter medicines by category

### 3. **Sales & Billing**
- **Quick Billing**: Create invoices with multiple items
- **Invoice Management**: Generate and print professional invoices
- **Sales History**: View all past transactions
- **Customer Tracking**: Track sales by customer name
- **Revenue Summary**: Real-time revenue calculations
- **Print Functionality**: Print invoices with complete details

### 4. **Reports & Analytics**
- **Revenue Analytics**: Total revenue, transactions, and average sale value
- **Stock Valuation**: Calculate total inventory value
- **Alerts & Issues**: 
  - Expired medicines notification
  - Low stock warning
  - Critical inventory alerts
- **Category Analysis**: Breakdown by medicine category
- **Top Selling Items**: Track best-performing medicines

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Sidebar.jsx     # Navigation sidebar
│   ├── Navbar.jsx      # Top navigation bar
│   ├── StatCard.jsx    # Statistics card component
│   ├── MedicineTable.jsx   # Medicine list table
│   ├── MedicineModal.jsx   # Add/Edit medicine form
│   └── BillingModal.jsx    # Billing/Sales form
│
├── pages/              # Page components (routes)
│   ├── Dashboard.jsx   # Dashboard overview
│   ├── Inventory.jsx   # Medicine inventory management
│   ├── Sales.jsx       # Sales/Billing interface
│   └── Reports.jsx     # Reports & analytics
│
├── context/
│   └── MedicineContext.jsx  # Global state management
│
├── App.jsx            # Main app component with routing
├── main.jsx           # React entry point
├── App.css            # App-specific styles
└── index.css          # Global styles & Tailwind directives
```

## 🔄 Application Flow

### Data Flow Diagram

```
User Input (Pages/Components)
        ↓
Triggers Actions (Add/Edit/Delete/View)
        ↓
MedicineContext (State Management)
        ↓
Updates State (medicines, sales)
        ↓
Components Re-render
        ↓
Updated UI Display
```

### Key Data Structures

**Medicine Object:**
```javascript
{
  id: unique_number,
  name: "Medicine Name",
  category: "Category",
  manufacturer: "Manufacturer",
  stock: number,
  price: decimal,
  expiryDate: "YYYY-MM-DD",
  batchNo: "Batch Number"
}
```

**Sale Object:**
```javascript
{
  invoiceNo: number,
  customerName: "Name",
  date: "ISO Date",
  items: [
    { medicineId: id, quantity: number, price: decimal }
  ],
  total: decimal,
  notes: "Optional notes"
}
```

## 🎨 Design System using Tailwind CSS

### Color Scheme
- **Primary**: Blue (#2563eb) - Main actions, highlights
- **Secondary**: Teal (#1e7a8b) - Navigation
- **Success**: Green (#16a34a) - Positive actions
- **Warning**: Amber (#f59e0b) - Alerts
- **Danger**: Red (#dc2626) - Deletions, critical alerts

### Component Classes
- `.btn-primary` - Primary action button
- `.btn-secondary` - Secondary action button
- `.btn-danger` - Destructive action button
- `.btn-success` - Success/positive action button
- `.card` - Content card container
- `.input-field` - Form input field
- `.badge-*` - Status badges (success, danger, warning)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Start Development Server**
```bash
npm run dev
```

3. **Open in Browser**
Navigate to `http://localhost:5174/` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```

## 📋 Sample Data

The application comes with sample medicines:
- **Aspirin 500mg** - Pain Relief - 150 units in stock
- **Paracetamol 650mg** - Fever - 200 units in stock
- **Amoxicillin 250mg** - Antibiotics - 80 units in stock

*Note: These are demo samples. Real data would come from your database.*

## 🔧 Core Features Explained

### 1. **Medicine Management**
- Add new medicines with complete details
- Edit existing medicine information
- Delete medicines from inventory
- Automatic stock level validation

### 2. **Sales Processing**
- Add multiple items to a single bill
- Real-time price and quantity calculations
- Automatic stock deduction after sale
- Invoice generation with unique numbers

### 3. **State Management**
- Global context using React Context API
- No external state management library needed
- Efficient state updates and re-renders
- Persistent logic for inventory operations

### 4. **UI/UX**
- Responsive design (mobile, tablet, desktop)
- Intuitive navigation
- Color-coded status indicators
- Modal dialogs for forms
- Smooth transitions and animations

## 📊 Reports & Analytics Insights

### Available Metrics
1. **Total Revenue** - Cumulative sales amount
2. **Transaction Count** - Total number of sales
3. **Average Sale Value** - Revenue ÷ Transactions
4. **Stock Value** - Sum of (quantity × price) for all items
5. **Category Breakdown** - Sales by category
6. **Top Performers** - Best-selling medicines
7. **Stock Alerts** - Low and expired items

## � Authentication & Authorization

### User Roles & Permissions

**Administrator (Admin):**
- Full system access
- User management (create, edit, delete users)
- All operations: read, write, delete
- Access to all pages and features
- System configuration and settings

**Manager:**
- Inventory management and sales operations
- View reports and analytics
- Cannot manage users or access admin-only features
- Limited to operational tasks

**Staff:**
- Basic sales operations
- View inventory and medicine details
- Cannot access reports or user management
- Limited to day-to-day sales activities

### Demo Credentials

- **Admin**: username: `admin`, password: `admin123`
- **Manager**: username: `manager`, password: `manager123`
- **Staff**: username: `staff`, password: `staff123`

### Security Features

- **Session Persistence**: Users stay logged in across browser sessions
- **Role-Based UI**: Menu items and features shown based on user permissions
- **Protected Routes**: Automatic redirection for unauthorized access
- **Secure Logout**: Complete session cleanup on logout

## 🎓 Learning Concepts Used

1. **React Hooks**: useState, useContext, useEffect
2. **React Router**: Multi-page navigation with protected routes
3. **Context API**: Global state management for authentication and medicine data
4. **Authentication & Authorization**: Login/logout, role-based access control, protected routes
5. **Session Management**: localStorage for persistent authentication
6. **Tailwind CSS**: Utility-first styling
7. **Component Composition**: Reusable UI components
8. **Form Handling**: Modal forms, validation, and user input
9. **Array Operations**: Filter, map, reduce, sort
10. **Advanced Filtering**: Multi-criteria filtering with logical operators
11. **Dynamic Sorting**: Sort by multiple fields with ascending/descending order
12. **Date Handling**: ISO date formats and date calculations
13. **Print Functionality**: Browser print API
14. **Lucide React**: Professional icons

## 📝 Future Enhancements

- [ ] Database integration (Firebase, MongoDB)
- [ ] Export reports to PDF/Excel
- [ ] Barcode scanning
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Customer loyalty program
- [ ] Low stock auto-ordering
- [ ] Sales trends visualization

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5174 or use:
npm run dev -- --port 3000
```

### Missing Dependencies
```bash
npm install
```

### Tailwind CSS not working
```bash
# Rebuild CSS
npm run dev
```

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Support

For issues or questions, please refer to the component documentation or create an issue in your repository.

---

**Built with ❤️ using React & Tailwind CSS**
