"use client"
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from '../ui/button'
import { UserCheck, View } from 'lucide-react'
import { FaWpforms, FaEdit } from 'react-icons/fa'
import { BiRightArrowAlt } from 'react-icons/bi'
import Link from 'next/link'
import { formatDistance } from 'date-fns'

type Props = {
  id:string
  createdAt: Date,
  title: string,
  description?: string,
  visits: number,
  submissions: number,
  published: boolean
}

export default function FormCard({ id,createdAt, title, description, visits, submissions, published }: Props) {
  return (
    <Card className="shadow-lg transition-transform transform hover:scale-105 bg-card text-card-foreground border border-border rounded-md">
      <CardHeader className="flex justify-between items-center p-4 text-secondary-foreground rounded-t-md">
        <CardTitle className="flex items-center gap-2 justify-between w-full">
          <span className="truncate font-bold">{title}</span>
          {published ? (
            <Badge>Published</Badge>
          ) : (
            <Badge variant="destructive">Draft</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardDescription className="flex items-center justify-between text-sm p-4 bg-card text-card-foreground">
        {published && (
          <span className="flex items-center gap-2">
            <View className="text-muted-foreground w-4 h-4" />
            <span>{visits}</span>
            <FaWpforms className="text-muted-foreground w-4 h-4" />
            <span>{submissions}</span>
          </span>
        )}
      </CardDescription>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground p-4">
        {description || "No description"}
      </CardContent>
      <CardFooter className="p-4 mt-4 text-secondary-foreground rounded-b-md items-center" >
        {published ? (
          <Link href={`/forms/${id}`}>
            <Button variant={'secondary'} asChild className="w-full mt-2 text-md flex items-center justify-center gap-4">
              <div className="flex items-center justify-center gap-2">
                <div>View Published Form</div>
                <BiRightArrowAlt />
              </div>
            </Button>
          </Link>
        ) : (
          <Link href={`/build/${id}`}>
            <Button asChild variant="secondary" className="w-full mt-4 text-md flex items-center justify-center gap-4">
              <div className="flex flex-row gap-4 justify-between w-full">
                <div className="text-center flex-1">Edit form</div>
                <FaEdit />
              </div>
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}
