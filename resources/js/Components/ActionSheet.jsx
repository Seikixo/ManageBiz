import React from 'react';
import {
    Sheet as ShadcnSheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";

/**
 * A reusable action sheet component that can be used for forms, dialogs, or any slide-out content.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.trigger - The element that triggers the sheet to open
 * @param {string} [props.title] - The title of the sheet
 * @param {string} [props.description] - The description text for the sheet
 * @param {boolean} [props.open] - Controlled open state
 * @param {function} [props.onOpenChange] - Callback when the open state changes
 * @param {string} [props.side="right"] - Which side the sheet should appear from (top, right, bottom, left)
 * @param {string} [props.className=""] - Additional CSS classes for the sheet content
 * @param {React.ReactNode} props.children - The content to display inside the sheet
 * @returns {JSX.Element} The rendered ActionSheet component
 */
export default function ActionSheet({
    trigger,
    title,
    description,
    children,
    open,
    onOpenChange,
    side = "right",
    className = "",
}) {
    return (
        <ShadcnSheet open={open} onOpenChange={onOpenChange}>
            {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
            <SheetContent side={side} className={className}>
                <SheetHeader className="mb-6">
                    {title && <SheetTitle className="text-left">{title}</SheetTitle>}
                    {description && (
                        <SheetDescription className="text-left">
                            {description}
                        </SheetDescription>
                    )}
                </SheetHeader>
                <div className="h-[calc(100%-8rem)] overflow-y-auto pr-2">
                    {children}
                </div>
            </SheetContent>
        </ShadcnSheet>
    );
}

// Create a styled version of the ActionSheet with common defaults
export const CreateActionSheet = (props) => (
    <ActionSheet
        side="right"
        className="w-[90vw] sm:w-[80vw] md:w-[700px] lg:w-[900px]"
        {...props}
    />
);

// Create a styled version for edit actions
export const EditActionSheet = (props) => (
    <ActionSheet
        side="right"
        className="w-full max-w-md sm:max-w-lg md:max-w-2xl"
        {...props}
    />
);
