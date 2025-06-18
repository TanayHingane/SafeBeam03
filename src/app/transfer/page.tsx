import React from "react";
import SendPanel from "../../components/SendPanel";
import ReceivePanel from "../../components/ReceivePanel";
import { TransferProvider } from "../../../contexts/TransferContext";
import { Toaster } from "react-hot-toast";

const page = () => {
  return (
    <TransferProvider>
      <Toaster />
      <div className="max-w-xl mx-auto">
        <div className="">
          <SendPanel />
          <ReceivePanel />
        </div>
      </div>
    </TransferProvider>
  );
};

export default page;
