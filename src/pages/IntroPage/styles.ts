import { styled } from "@mui/material";
import { NavLink } from "react-router";

export const Container = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 3rem;
    padding: 1rem;
`;

export const TitleContainer = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 1rem;
    padding: 1rem;
`;


export const CustomNavLink = styled(NavLink)`
    text-decoration: none;
    color: white;
    text-transform: capitalize;
`;
