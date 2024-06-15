import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Store } from '../main/function/store';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';

interface Props {
  id: string;
}

export default function PublishFormBtn({ id }: Props) {
  const { store } = Store();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
          content: store
        })
      });

      const body = await response.json();

      if (response.ok) {
        toast.success(body.message);
        setOpen(true);
      } else {
        toast.error(body.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const url = `${process.env.url}/${id}`;
    navigator.clipboard.writeText(url)
      .then(() => {
        toast.success('Copied to clipboard!');
      })
      .catch((error) => {
        toast.error('Failed to copy');
        console.error('Failed to copy: ', error);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={onSubmit}>
          {loading ? (
            <div className='animate-spin text-center'><Loader /></div>
          ) : (
            <div>
              Publish
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your form has been successfully published</DialogTitle>
          <Separator className='w-full' />
          <DialogDescription>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="text" value={`${process.env.url}/${id}`} placeholder={`${process.env.url}/${id}`} disabled />
              <Button type="button" onClick={handleCopy}>Copy</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
