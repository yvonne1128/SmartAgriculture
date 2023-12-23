'use client';

import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";

export default function CustomNavbar({ activeSection }: { activeSection: string }) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        "作物推薦",
        "土壤分析",
        "施肥建議",
        "溫度預測",
        "降雨量預測"
    ];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <p className="font-bold text-inherit">農地資料科學：優化農作物生產與規劃</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem isActive={activeSection === 'temperature'}>
                    <Link color="foreground" href="#temperature">
                        溫度預測
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={activeSection === 'rainfall'}>
                    <Link color="foreground" href="#rainfall">
                        降雨量預測
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={activeSection === 'croprecommendations'}>
                    <Link color="foreground" href="#croprecommendations" aria-current="page">
                        作物推薦
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={activeSection === 'soil'}>
                    <Link color="foreground" href="#soil" >
                        土壤分析
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={activeSection === 'fertilize'}>
                    <Link color="foreground" href="#fertilize">
                        施肥建議
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color="foreground"
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
