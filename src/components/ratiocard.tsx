import React, { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { title } from 'process'



type Props={
    className:string,
    children:ReactNode,
value:string,
helperText:string
}

export default function Ratiocard({className,children,value,helperText}:Props) {
  return (
    <Card className={className}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-lg font-medium text-muted-foreground">{title}</CardTitle>
      {children}
    </CardHeader>
    <CardContent>
        <div>
      {value}
      </div>
      <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
    </CardContent>
  </Card>
  )
}
