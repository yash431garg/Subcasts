'use client'
import { useRouter } from 'next/navigation'
import classname from './Header.module.css'
import Link from 'next/link'
import { toast } from 'react-hot-toast';
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react"

export default function Header() {
    // const { data: session, status } = useSession()

    return (
        <div className={classname.header}>
            <Link href="/" className='text-2xl'>Subcasts</Link>
            <div className={classname.headerRight}>
                <Link href="/casts">All Casts</Link>
                <button onClick={() => signOut()} className='text-red-600 border-1 p-2 rounded border-red-600'>
                    Logout
                </button>

            </div>
        </div>
    )
}