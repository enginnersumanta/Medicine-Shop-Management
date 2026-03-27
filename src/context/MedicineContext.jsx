import { createContext, useState, useCallback } from 'react';

export const MedicineContext = createContext();

export const MedicineProvider = ({ children }) => {
  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: 'Aspirin 500mg',
      category: 'Pain Relief',
      manufacturer: 'HealthPlus',
      stock: 150,
      price: 5.50,
      expiryDate: '2026-12-31',
      batchNo: 'BTH001'
    },
    {
      id: 2,
      name: 'Paracetamol 650mg',
      category: 'Fever',
      manufacturer: 'MediCare',
      stock: 200,
      price: 4.00,
      expiryDate: '2026-11-30',
      batchNo: 'BTH002'
    },
    {
      id: 3,
      name: 'Amoxicillin 250mg',
      category: 'Antibiotics',
      manufacturer: 'PharmaCare',
      stock: 80,
      price: 8.00,
      expiryDate: '2026-09-15',
      batchNo: 'BTH003'
    },
  ]);

  const [sales, setSales] = useState([]);
  const [invoiceNo, setInvoiceNo] = useState(1001);

  const addMedicine = useCallback((medicine) => {
    const newMedicine = {
      ...medicine,
      id: Date.now(),
    };
    setMedicines([...medicines, newMedicine]);
    return newMedicine;
  }, [medicines]);

  const updateMedicine = useCallback((id, updates) => {
    setMedicines(medicines.map(med => 
      med.id === id ? { ...med, ...updates } : med
    ));
  }, [medicines]);

  const deleteMedicine = useCallback((id) => {
    setMedicines(medicines.filter(med => med.id !== id));
  }, [medicines]);

  const addSale = useCallback((saleData) => {
    const newSale = {
      ...saleData,
      invoiceNo: invoiceNo,
      date: new Date().toISOString(),
    };
    setSales([...sales, newSale]);
    setInvoiceNo(invoiceNo + 1);

    // Update stock for all items
    setMedicines(prevMedicines => 
      prevMedicines.map(medicine => {
        const saleItem = saleData.items.find(item => item.medicineId === medicine.id);
        if (saleItem) {
          return { ...medicine, stock: medicine.stock - saleItem.quantity };
        }
        return medicine;
      })
    );

    return newSale;
  }, [sales, invoiceNo]);

  const value = {
    medicines,
    addMedicine,
    updateMedicine,
    deleteMedicine,
    sales,
    addSale,
    invoiceNo,
  };

  return (
    <MedicineContext.Provider value={value}>
      {children}
    </MedicineContext.Provider>
  );
};
