// ItemFormInputs.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ItemFormInputs from "../src/components/ItemFormsInputs";

describe("ItemFormInputs", () => {
  it("Muestra input fields", () => {
    render(
      <ItemFormInputs
        name=""
        setName={() => {}}
        description=""
        setDescription={() => {}}
        setFile={() => {}}
        fileUrl={null}
      />
    );

    expect(screen.getByRole("textbox", { name: /name/i })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /description/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /upload file/i })
    ).toBeInTheDocument();
  });
});
