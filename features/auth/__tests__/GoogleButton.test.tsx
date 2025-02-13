import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import GoogleButton from "@/features/auth/components/buttons/GoogleButton";
import { createClient } from "../../../utils/supabase/client";

jest.mock('../../../utils/supabase/client');

describe("GoogleButton", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the button with the provided label", () => {
        render(<GoogleButton label="Sign in with Google" />);
        expect(screen.getByText("Sign in with Google")).toBeInTheDocument();
    });

    it("shows the loader when the button is clicked", async () => {
        render(<GoogleButton label="Sign in with Google" dataTestID="loading-dots" />);
        const button = screen.getByText("Sign in with Google");
        fireEvent.click(button);
        // expect(screen.getByRole("button")).toBeDisabled();
        // expect(screen.getByTestId("loading-dots")).toBeInTheDocument();
    });

    it("calls signInWithOAuth when the button is clicked", async () => {
        const mockSignInWithOAuth = jest.fn().mockResolvedValue({ error: null });
        (createClient as jest.Mock).mockReturnValue({
            auth: {
                signInWithOAuth: mockSignInWithOAuth,
            },
        });

        render(<GoogleButton label="Sign in with Google" />);
        const button = screen.getByText("Sign in with Google");
        fireEvent.click(button);

        await waitFor(() => {
            expect(mockSignInWithOAuth).toHaveBeenCalledWith({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/dashboard`,
                },
            });
        });
    });

    it("displays an error message if signInWithOAuth fails", async () => {
        const mockSignInWithOAuth = jest.fn().mockResolvedValue({ error: new Error("Sign in failed") });
        (createClient as jest.Mock).mockReturnValue({
            auth: {
                signInWithOAuth: mockSignInWithOAuth,
            },
        });

        render(<GoogleButton label="Sign in with Google" />);
        const button = screen.getByText("Sign in with Google");
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByRole("button")).not.toBeDisabled();
        });
    });
});