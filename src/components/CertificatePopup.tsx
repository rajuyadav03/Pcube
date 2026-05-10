import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CertificatePopupProps {
  children: ReactNode;
  type: "12A" | "80G" | "NGO";
}

const CERT_LINKS = {
  "12A": "https://res.cloudinary.com/dac9ujdxt/image/upload/v1776156866/12A_cbkcqd.pdf",
  "80G": "https://res.cloudinary.com/dac9ujdxt/image/upload/v1776156867/80G_usnf1z.pdf",
  "NGO": "https://res.cloudinary.com/dac9ujdxt/image/upload/v1776358005/WhatsApp_Image_2026-04-16_at_10.12.52_PM_javpjf.jpg",
};

export function CertificatePopup({ children, type }: CertificatePopupProps) {
  const isImage = type === "NGO";

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{type === "NGO" ? "Registered NGO" : `${type} Certificate`}</DialogTitle>
          <DialogDescription>
            {type === "12A" && "Organizational Tax Exemption Certificate"}
            {type === "80G" && "Donor Tax Deduction Certificate"}
            {type === "NGO" && "Official NGO Registration Document"}
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 w-full bg-muted rounded-md overflow-hidden mt-4 flex items-center justify-center">
          {isImage ? (
            <img 
              src={CERT_LINKS[type]} 
              alt={`${type} Certificate`}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <iframe 
              src={CERT_LINKS[type]} 
              className="w-full h-full border-0" 
              title={`${type} Certificate`}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
