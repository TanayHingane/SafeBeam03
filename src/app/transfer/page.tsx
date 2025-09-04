import React from "react";
import SendPanel from "../../components/SendPanel";
import ReceivePanel from "../../components/ReceivePanel";
import { TransferProvider } from "../../../contexts/TransferContext";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

const page = () => {
  return (
    <div className="bg-white dark:bg-black">
      <TransferProvider>
        <Toaster position="bottom-right" />
        <div className="max-w-lg mx-auto bg-white dark:bg-black pt-20">
          <SendPanel />
          <ReceivePanel />
        </div>
        <div className="mt-10">
          <Footer />
        </div>
      </TransferProvider>
    </div>
  );
};

export default page;
