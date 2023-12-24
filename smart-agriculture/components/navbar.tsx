'use client';

import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";

export default function CustomNavbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        "溫度預測",
        "降雨量預測",
        "作物推薦",
        "土壤分析",
        "施肥建議"
    ];

    const menuItemsHref = [
        "temperature",
        "rainfall",
        "croprecommendations",
        "soil",
        "fertilize"
    ];
    
    const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();

        const anchor = event.currentTarget as HTMLAnchorElement;

        const targetId = anchor.getAttribute('href')?.slice(1);
        const targetElement = targetId ? document.getElementById(targetId) : null;

        if (targetElement) {
            const navbarHeight = 60; // 調整為您導航欄的實際高度
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

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
                <NavbarItem>
                    <Link color="foreground" href="#temperature" onClick={handleLinkClick}>
                        溫度預測
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#rainfall" onClick={handleLinkClick}>
                        降雨量預測
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#croprecommendations" aria-current="page" onClick={handleLinkClick}>
                        作物推薦
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#soil" onClick={handleLinkClick}>
                        土壤分析
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#fertilize" onClick={handleLinkClick}>
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
                            href={`#${menuItemsHref[index]}`}
                            size="lg"
                            onClick={handleLinkClick}
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
