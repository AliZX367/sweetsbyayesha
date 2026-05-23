"use client";

import { useCallback, useEffect, useState } from "react";

export type OrderRecord = {
  id: string;
  submittedAt: string;
  name: string;
  email: string;
  phone: string;
  lineItems: { selectedItem: string; quantity: number }[];
  dateNeeded: string;
  paymentMethod: string;
  specialRequests: string;
};

const STORAGE_KEY = "sba_order_history";

function loadRecords(): OrderRecord[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as OrderRecord[];
  } catch {
    return [];
  }
}

export function useOrderHistory() {
  const [records, setRecords] = useState<OrderRecord[]>([]);

  useEffect(() => {
    setRecords(loadRecords());
  }, []);

  const addRecord = useCallback(
    (record: Omit<OrderRecord, "id" | "submittedAt">) => {
      const newRecord: OrderRecord = {
        ...record,
        id: crypto.randomUUID(),
        submittedAt: new Date().toISOString(),
      };
      const updated = [newRecord, ...loadRecords()].slice(0, 50);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setRecords(updated);
      return newRecord.id;
    },
    []
  );

  const clearHistory = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setRecords([]);
  }, []);

  return { records, addRecord, clearHistory };
}
