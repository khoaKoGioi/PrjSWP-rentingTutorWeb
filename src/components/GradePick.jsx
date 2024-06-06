import React from "react";
import { Select, Option, ThemeProvider } from "@material-tailwind/react";
 
export function GradePick() {
  const [value, setValue] = React.useState("react");
  const theme ={
    select:{
        styles: {
            base: {
              container: {
                position: "relative",
                width: "w-full",
                minWidth: "min-w-[120px]",
              },
                }

            }}}
  return (
    <ThemeProvider value={theme}>

    
        <div className="">
        <Select
            label="Select grade"
            value={value}
            onChange={(val) => setValue(val)}
        >
            {Array.from({ length: 12 }, (_, i) => (
                        <Option key={i + 1} value={i + 1}>
                            Grade {i + 1}
                        </Option>
                        ))}
        </Select>
        </div>
    </ThemeProvider>
  );
}