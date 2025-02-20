"use client";

import Button from "@/app/_components/ui/Buttons/Button";

const PrintButton = () => {
  return (
    <div className="print:hidden">
      <Button
        onClick={() => window.print()}
        variation="info"
        size="small"
        style={{ padding: "7px 14px", marginTop: "1px" }}
      >
        Štampaj
      </Button>
    </div>
  );
};

export default PrintButton;
