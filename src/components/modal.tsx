import * as React from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

interface ModalProps {
  title: string
  description?: string
  children?: React.ReactNode
  closeLabel?: string
  action?: React.ReactNode
  confirmLabel?: string
  onConfirm?: () => void
  showFooter?: boolean
  open: boolean
  setOpen: (open: boolean) => void
  disableConfirm?: boolean
}

export function Modal({
  title,
  description,
  children,
  closeLabel = 'Cancelar',
  action,
  confirmLabel = 'Confirmar',
  onConfirm,
  showFooter = true,
  open,
  setOpen,
  disableConfirm = false
}: Readonly<ModalProps>) {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {action}
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <ModalHeader
              title={title}
              description={description}
              TitleComponent={DialogTitle}
              DescriptionComponent={DialogDescription}
            />
          </DialogHeader>
          {children}
          {showFooter && (
            <ModalFooter
              onConfirm={onConfirm}
              confirmLabel={confirmLabel}
              closeLabel={closeLabel}
              setOpen={setOpen}
              CloseComponent={DialogClose}
              disableConfirm={disableConfirm}
            />
          )}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {action}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <ModalHeader
            title={title}
            description={description}
            TitleComponent={DrawerTitle}
            DescriptionComponent={DrawerDescription}
          />
        </DrawerHeader>
        {children}
        {showFooter && (
          <DrawerFooter className="pt-5">
            <ModalFooter
              onConfirm={onConfirm}
              confirmLabel={confirmLabel}
              closeLabel={closeLabel}
              setOpen={setOpen}
              CloseComponent={DrawerClose}
            />
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  )
}

function ModalHeader({
  title,
  description,
  TitleComponent,
  DescriptionComponent
}: Readonly<{
  title: string
  description?: string
  TitleComponent: typeof DialogTitle | typeof DrawerTitle
  DescriptionComponent: typeof DialogDescription | typeof DrawerDescription
}>) {
  return (
    <>
      <TitleComponent>{title}</TitleComponent>
      {description && (
        <DescriptionComponent>{description}</DescriptionComponent>
      )}
    </>
  )
}

function ModalFooter({
  onConfirm,
  confirmLabel,
  closeLabel,
  setOpen,
  CloseComponent = DialogClose,
  disableConfirm = false
}: Readonly<{
  onConfirm?: () => void
  confirmLabel: string
  closeLabel: string
  setOpen: (open: boolean) => void
  CloseComponent?: typeof DialogClose | typeof DrawerClose,
  disableConfirm?: boolean
}>) {
  const handleConfirm = () => {
    onConfirm?.()
    setOpen(false)
  }

  return (
    <div className="w-full flex flex-col md:flex-row justify-between gap-4">
      <CloseComponent asChild>
        <Button onClick={handleConfirm} disabled={disableConfirm} className="flex-1">
          {confirmLabel}
        </Button>
      </CloseComponent>
      <CloseComponent asChild>
        <Button variant="outline" className="flex-1">
          {closeLabel}
        </Button>
      </CloseComponent>
    </div>
  )
}
