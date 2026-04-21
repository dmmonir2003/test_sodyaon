import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { MenuItemConfig } from "./MenuItemConfig";

interface MobileMenuSectionProps {
  id: string;
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  items: MenuItemConfig[];
  onClose: () => void;
  showSubcategories?: boolean;
}



export default function MobileMenuSection({
  id,
  title,
  isExpanded,
  onToggle,
  items,
  onClose,
  showSubcategories = false,
}: MobileMenuSectionProps) {
  const [expandedSubItems, setExpandedSubItems] = useState<
    Record<string, boolean>
  >({});

  const toggleSubItem = (itemLabel: string) => {
    setExpandedSubItems((prev) => ({
      ...prev,
      [itemLabel]: !prev[itemLabel],
    }));
  };

  return (
    <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-2 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
      >
        <span>{title}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-full" : "max-h-0"}`}
      >
        <div className="space-y-1 mt-2">
          {items.map((item, index) => {
            const IconComponent = item.icon;
            const hasSubItems =
              showSubcategories && item.subItems && item.subItems.length > 0;
            const isSubExpanded = expandedSubItems[item.label];

            return (
              <div key={`${item.label}-${index}`}>
                {hasSubItems ? (
                  <button
                    onClick={() => toggleSubItem(item.label)}
                    className={`w-full flex items-center justify-between py-2 px-3 text-base font-bold rounded-xl transition-colors ${
                      item.isHighlighted
                        ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                        : `text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50`
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {IconComponent && <IconComponent className="w-4 h-4" />}
                      {item.label}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${isSubExpanded ? "rotate-180" : ""}`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center justify-between py-2 px-3 text-base font-bold rounded-xl transition-colors ${
                      item.isHighlighted
                        ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                        : `text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50`
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {IconComponent && <IconComponent className="w-4 h-4" />}
                      {item.label}
                    </span>
                    <ChevronRight
                      className={`h-4 w-4 ${item.isHighlighted ? "text-primary-400" : "text-slate-400"}`}
                    />
                  </Link>
                )}

                {/* Render sub-items if they exist */}
                {hasSubItems && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ml-4 ${isSubExpanded ? "max-h-full" : "max-h-0"}`}
                  >
                    <div className="space-y-1 mt-1">
                      {item.subItems!.map((subItem: any) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={onClose}
                          className={`flex items-center justify-between py-1.5 px-3 text-sm font-medium rounded-lg transition-colors ${
                            subItem.isHighlighted
                              ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                              : `text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50`
                          }`}
                        >
                          {subItem.label}
                          <ChevronRight
                            className={`h-3 w-3 ${subItem.isHighlighted ? "text-primary-400" : "text-slate-400"}`}
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
