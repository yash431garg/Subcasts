'use client'
import { useRouter } from 'next/navigation'
import classname from './Header.module.css'
import Link from 'next/link'
import { toast } from 'react-hot-toast';

export default function Header() {
    const router = useRouter()

    const logout = async () => {
        try {
            await fetch('/api/auth', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            toast.success("Logout Success");
            router.push("/login")
        } catch {
            toast.error("Logout Failed");
        }
    };

    return (
        <div className={classname.header}>
            <Link href="/" className='text-2xl'>Subcasts</Link>
            <div className={classname.headerRight}>
                <Link href="/casts">All Casts</Link>
                <button onClick={() => logout()} className='text-red-600 border-1 p-2 rounded border-red-600'>
                    Logout
                </button>
            </div>
        </div>
    )
}