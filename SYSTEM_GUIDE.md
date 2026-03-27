# Medicine Shop Management System

A complete React-based POS (Point of Sale) and inventory management system for medicine shops, built with **Vite**, **React 19**, **Tailwind CSS**, and **React Router**.

## 🎯 Features

### 1. **Dashboard** (Home)
- **Overview Statistics**: Total medicines, revenue, sales count, and low stock alerts
- **Stock Summary**: Real-time inventory status
- **Quick Stats**: Average sale value, total transactions, categories count
- **Recent Sales**: Quick view of latest 5 transactions
- **System Health**: Visual metrics for system status

### 2. **Medicine Inventory**
- **Complete Inventory Management**: Add, edit, and delete medicines
- **Search & Filter**: Find medicines by name and category
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

## 🛡️ Validation & Business Rules

- ✅ Medicines require all fields
- ✅ Stock cannot be negative
- ✅ Price must be positive
- ✅ Sale cannot process without items
- ✅ Automatic stock update on sale
- ✅ Expiry date validation
- ⚠️ Low stock warnings (<20 units)
- ⚠️ Expired medicine alerts

## 🎓 Learning Concepts Used

1. **React Hooks**: useState, useContext
2. **React Router**: Multi-page navigation
3. **Context API**: Global state management
4. **Tailwind CSS**: Utility-first styling
5. **Component Composition**: Reusable UI components
6. **Form Handling**: Modal forms and validation
7. **Array Operations**: Filter, map, reduce
8. **Date Handling**: ISO date formats
9. **Print Functionality**: Browser print API
10. **Lucide React**: Professional icons

## 📝 Future Enhancements

- [ ] User authentication & roles
- [ ] Database integration (Firebase, MongoDB)
- [ ] Export reports to PDF/Excel
- [ ] Barcode scanning
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Advanced filtering options
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
