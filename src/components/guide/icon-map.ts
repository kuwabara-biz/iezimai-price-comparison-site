import {
    BookOpen,
    Calculator,
    HandCoins,
    Home,
    HousePlus,
    MapPin,
    Users,
    type LucideIcon,
} from "lucide-react";
import type { GuideIconKey } from "@/lib/guide";

export const GUIDE_ICONS: Record<GuideIconKey, LucideIcon> = {
    book: BookOpen,
    calculator: Calculator,
    coins: HandCoins,
    home: Home,
    "house-plus": HousePlus,
    map: MapPin,
    users: Users,
};

export function getGuideIcon(key: GuideIconKey): LucideIcon {
    return GUIDE_ICONS[key] ?? BookOpen;
}
