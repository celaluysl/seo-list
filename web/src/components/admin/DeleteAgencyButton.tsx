'use client'

import { Trash2 } from 'lucide-react'
import { deleteAgency } from '@/app/admin/agencies/actions'
import { useTransition } from 'react'

export default function DeleteAgencyButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition()

    const handleDelete = async () => {
        if (confirm('Bu ajansı silmek istediğinize emin misiniz?')) {
            startTransition(async () => {
                await deleteAgency(id)
            })
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            title="Ajansı Sil"
        >
            <Trash2 className="size-4" />
        </button>
    )
}
