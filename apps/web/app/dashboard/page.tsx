"use client"
import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'

export default function Dashboard() {
	const {data } = useSession()
  return (
	  <div>
		  <pre>
			  {JSON.stringify(data,null,2)}
		  </pre>

		  <Button onClick={() => signOut()} >
			  Logout
		  </Button>
		  
	</div>
  )
}
