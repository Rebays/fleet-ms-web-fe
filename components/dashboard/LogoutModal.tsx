// components/dashboard/LogoutModal.tsx
"use client";

import { useActionState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { signOutAction } from "@/app/actions/signout";

export function LogoutModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [state, formAction, isPending] = useActionState(signOutAction, null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-950 border border-gray-800 w-full max-w-sm rounded-xl p-6 shadow-2xl">
        <div className="flex items-center gap-3 text-red-500 mb-4">
          <AlertCircle size={24} />
          <h3 className="text-lg font-semibold text-white">Confirm Sign Out</h3>
        </div>
        <p className="text-gray-400 text-sm mb-6">Are you sure you want to sign out?</p>
        <div className="flex gap-3">
          <button onClick={onClose} disabled={isPending} className="flex-1 px-4 py-2 rounded-lg bg-gray-900 text-gray-300">
            Cancel
          </button>
          <form action={formAction} className="flex-1">
            <button type="submit" disabled={isPending} className="w-full px-4 py-2 rounded-lg bg-red-600 text-white flex items-center justify-center gap-2">
              {isPending ? <Loader2 size={16} className="animate-spin" /> : 'Sign Out'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}