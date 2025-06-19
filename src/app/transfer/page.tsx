import React from "react";
import SendPanel from "../../components/SendPanel";
import ReceivePanel from "../../components/ReceivePanel";
import { TransferProvider } from "../../../contexts/TransferContext";
import { Toaster } from "react-hot-toast";

const page = () => {
  return (
    <div className="bg-white dark:bg-black">
      <TransferProvider>
        <Toaster position="bottom-right" />
        <div className="max-w-lg mx-auto">
          <div className="">
            <SendPanel />
            <ReceivePanel />
          </div>
        </div>
      </TransferProvider>
    </div>
  );
};

export default page;
