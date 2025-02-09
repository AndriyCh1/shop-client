import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';

import { SignInForm } from './sign-in-form';
import { SignUpForm } from './sign-up-form';

export type AuthModalProps = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader className="sr-only">
        <DialogTitle>Sign In or Sign Up</DialogTitle>
      </DialogHeader>
      <DialogContent className="p-8">
        <Tabs defaultValue="sign-in">
          <TabsList className="w-full">
            <TabsTrigger value="sign-in" className="flex-1">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="sign-up" className="flex-1">
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in">
            <div className="mx-auto w-fit">
              <SignInForm
                header={<h2 className="sr-only">Sign In</h2>}
                footer={<></>}
              />
            </div>
          </TabsContent>
          <TabsContent value="sign-up">
            <div className="mx-auto w-fit">
              <SignUpForm
                header={<h2 className="sr-only">Sign Up</h2>}
                footer={<></>}
              />
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
