import React from 'react';
import { useAppStore } from '../store';

export default function Toast() {
  const toast = useAppStore((s) => s.toast);
  if (!toast) return null;
  return <div className="toast">{toast}</div>;
}
