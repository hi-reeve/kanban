
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Skeleton } from "../ui/skeleton"
const TaskCardSkeleton = () => {
  return (
	<Card >
	<CardHeader>
		<CardTitle className="flex items-center">
			
			<Skeleton/>
		
		</CardTitle>
		<CardContent className="px-0 mt-4">
			<Skeleton/>

		</CardContent>
		<CardFooter className="mt-4 px-0">
			<div className="flex items-center justify-between w-full">

				<Skeleton/>

			</div>
		</CardFooter>
	</CardHeader>
</Card>
  )
}

export default TaskCardSkeleton