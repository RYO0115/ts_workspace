import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SimpleButton } from "./SimpleButton";

test("If you press button, it will change from On and Off", async () =>{
    //const user = userEvent.setup();

    render(<SimpleButton/>);
    const simpleButton = screen.getByRole("button");
    expect(simpleButton).toHaveTextContent("OFF");
    //await user.click(simpleButton);
    userEvent.click(screen.getByRole("button"));
});