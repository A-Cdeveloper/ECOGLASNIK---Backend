/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import useMeasureListRenderSpeed from "@/app/hooks/useMeassureListRenderSpeed";
import React from "react";

const TestSpeed = ({ items }: any) => {
  const renderTime = useMeasureListRenderSpeed(items);
  return <h2>{renderTime}</h2>;
};

export default TestSpeed;
