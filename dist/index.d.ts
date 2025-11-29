import * as React from 'react';
import React__default from 'react';

declare const LIGHT_MODE = "light";
declare const DARK_MODE = "dark";
type PaletteMode = typeof LIGHT_MODE | typeof DARK_MODE;
declare const useThemeMode: () => PaletteMode;

/**
 * Get the union type of the values of an object type
 * @example
 * const COLORS = { Miku: '#33ccba', Ichika: '#33aaee' } as const
 * type Color = ValueOf<typeof COLORS> // '#33ccba' | '#33aaee'
 */
type ValueOf<T> = T[keyof T];
/**
 * Get the element type of an array type
 * @example
 * type Languages = ['ja', 'en'] as const
 * type Validlanguage = ArrayElement<typeof Languages> // 'ja' | 'en'
 */
type ArrayElement<T extends readonly unknown[]> = T[number];
/**
 * Make all properties in T optional, and if a property is an object, make its properties optional recursively
 * @example
 * interface User { id: string; profile: { name: string; age: number } }
 * type PartialUser = DeepPartial<User>
 * // Result: { id?: string; profile?: { name?: string; age?: number } }
 */
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
/**
 * Make all properties in T required, and if a property is an object, make its properties required recursively
 * @example
 * interface User { id?: string; profile?: { name?: string; age?: number } }
 * type RequiredUser = DeepRequired<User>
 * // Result: { id: string; profile: { name: string; age: number } }
 */
type DeepRequired<T> = {
    [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};
/**
 * Make properties K in T optional
 * @example
 * interface User { id: string; name: string; age: number }
 * type PartialAgeUser = PartialBy<User, 'age'>
 * // Result: { id: string; name: string; age?: number }
 */
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
/**
 * Make properties K in T required
 * @example
 * interface User { id?: string; name?: string; age?: number }
 * type RequiredIdNameUser = RequiredBy<User, 'id' | 'name>
 * // Result: { id: string; name: string; age?: number }
 */
type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Sekai colors keys
 * @example 'Miku'
 */
declare const COLORS_SEKAI_KEYS: {
    readonly Miku: "Miku";
    readonly Rin: "Rin";
    readonly Len: "Len";
    readonly Luka: "Luka";
    readonly Meiko: "Meiko";
    readonly Kaito: "Kaito";
    readonly Ichika: "Ichika";
    readonly Saki: "Saki";
    readonly Honami: "Honami";
    readonly Shiho: "Shiho";
    readonly Minori: "Minori";
    readonly Haruka: "Haruka";
    readonly Airi: "Airi";
    readonly Shizuku: "Shizuku";
    readonly Kohane: "Kohane";
    readonly An: "An";
    readonly Akito: "Akito";
    readonly Toya: "Toya";
    readonly Tsukasa: "Tsukasa";
    readonly Emu: "Emu";
    readonly Nene: "Nene";
    readonly Rui: "Rui";
    readonly Kanade: "Kanade";
    readonly Mafuyu: "Mafuyu";
    readonly Ena: "Ena";
    readonly Mizuki: "Mizuki";
    readonly Virtualsinger: "Virtualsinger";
    readonly Leoneed: "Leoneed";
    readonly Moremorejump: "Moremorejump";
    readonly Vividbadsquad: "Vividbadsquad";
    readonly Wonderlandsshowtime: "Wonderlandsshowtime";
    readonly Nightcode: "Nightcode";
};
/**
 * Type of sekai colors keys
 * @example 'Miku'
 */
type ColorsSekaiKey = keyof typeof COLORS_SEKAI_KEYS;
/**
 * List of sekai colors keys
 * @example ['Miku', 'Rin', 'Len', ...]
 */
declare const colorSekaiKeyList: ColorsSekaiKey[];
/**
 * Sekai colors
 * @example { Miku: '#33ccba', Rin: '#ffcc10', ... }
 */
declare const colorsSekai: {
    /** Character */
    readonly Miku: "#33ccba";
    readonly Rin: "#ffcc10";
    readonly Len: "#feee10";
    readonly Luka: "#ffbbcc";
    readonly Meiko: "#dd4544";
    readonly Kaito: "#3367cc";
    readonly Ichika: "#33aaee";
    readonly Saki: "#ffc800";
    readonly Honami: "#ee6666";
    readonly Shiho: "#bbdd22";
    readonly Minori: "#ffc096";
    readonly Haruka: "#99ccff";
    readonly Airi: "#ffaacc";
    readonly Shizuku: "#6be6cd";
    readonly Kohane: "#ff6699";
    readonly An: "#00bbdd";
    readonly Akito: "#ff7722";
    readonly Toya: "#0077dd";
    readonly Tsukasa: "#ffbb00";
    readonly Emu: "#ff66bb";
    readonly Nene: "#33dd99";
    readonly Rui: "#bb88ee";
    readonly Kanade: "#bb6688";
    readonly Mafuyu: "#8888cc";
    readonly Ena: "#ccaa88";
    readonly Mizuki: "#ddaacc";
    /** Unit */
    readonly Virtualsinger: "#f5f5f7";
    readonly Leoneed: "#4455dd";
    readonly Moremorejump: "#88dd44";
    readonly Vividbadsquad: "#ee1166";
    readonly Wonderlandsshowtime: "#ff9900";
    readonly Nightcode: "#884499";
};
/**
 * Type of sekai colors
 * @example { Miku: '#33ccba', Rin: '#ffcc10', ... }
 */
type ColorsSekai = typeof colorsSekai;
/**
 * Type of sekai colors values
 * @example '#33ccba'
 */
type ColorsSekaiCode = ValueOf<typeof colorsSekai>;

interface AccordionProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    themeMode?: PaletteMode;
    summary: string;
    summaryStyles?: string;
    defaultOpen?: boolean;
    details: string | string[] | React__default.ReactNode;
}
declare const Accordion: ({ sekai, themeMode, summary, summaryStyles, defaultOpen, details, ...rest }: AccordionProps) => React__default.JSX.Element;

interface BackdropProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    themeMode?: PaletteMode;
    open: boolean;
    children: React__default.ReactNode;
    containerComponent?: HTMLElement;
    centered?: boolean;
}
declare const Backdrop: ({ sekai, themeMode, open, children, containerComponent, centered, ...rest }: BackdropProps) => React__default.ReactPortal | null;

type SeparatorVariant = 'slash' | 'arrow' | 'chevron' | 'dot' | 'pipe';
interface BreadcrumbProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    themeMode?: PaletteMode;
    children: React__default.ReactNode;
    separator?: SeparatorVariant;
}
declare const Breadcrumb: ({ sekai, themeMode, children, separator, ...rest }: BreadcrumbProps) => React__default.JSX.Element;

type BasicButtonProps = {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    withText?: boolean;
    themeMode?: PaletteMode;
    children?: React__default.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
} & React__default.ButtonHTMLAttributes<HTMLButtonElement>;
declare const BasicButton: ({ sekai, withText, themeMode, children, disabled, ...rest }: BasicButtonProps) => React__default.JSX.Element;

interface HamburgerButtonProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    themeMode?: PaletteMode;
    open: boolean;
    onClick?: () => void;
}
declare const HamburgerButton: ({ sekai, themeMode, open, ...rest }: HamburgerButtonProps) => React__default.JSX.Element;

type ScrollTopPos = 'bottom-right' | 'bottom-left';
interface ScrollTopButtonProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    themeMode?: PaletteMode;
    pos?: ScrollTopPos;
}
declare const ScrollTopButton: ({ sekai, themeMode, pos, ...rest }: ScrollTopButtonProps) => React__default.ReactPortal | null;

type StrongButtonProps = {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    themeMode?: PaletteMode;
    children?: React__default.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
} & React__default.ButtonHTMLAttributes<HTMLButtonElement>;
declare const StrongButton: ({ sekai, themeMode, children, disabled, ...rest }: StrongButtonProps) => React__default.JSX.Element;

interface StylishButtonProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    themeMode?: PaletteMode;
    children?: React__default.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    arrowIcon?: boolean;
}
declare const StylishButton: ({ sekai, themeMode, children, disabled, arrowIcon, ...rest }: StylishButtonProps) => React__default.JSX.Element;

type CardProps = {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    themeMode?: PaletteMode;
    children: React__default.ReactNode;
} & React__default.HTMLAttributes<HTMLDivElement>;
declare const Card: ({ id, className, style, sekai, themeMode, children, ...divProps }: CardProps) => React__default.JSX.Element;
interface CardContentProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    themeMode?: PaletteMode;
    children: React__default.ReactNode;
}
declare const CardContent: ({ id, className, style, themeMode, children, }: CardContentProps) => React__default.JSX.Element;
interface CardTitleProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    themeMode?: PaletteMode;
    title: string;
    underline?: true;
}
declare const CardTitle: ({ sekai, themeMode, title, underline, ...rest }: CardTitleProps) => React__default.JSX.Element;

type MusicBannerCardVariants = 'default' | 'view-all';
interface MusicBannerCardProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    themeMode?: PaletteMode;
    musicTitle: string;
    artist: string;
    selected?: boolean;
    onSelect?: (select: boolean) => void;
    onClick?: () => void;
    onBlur?: () => void;
    onMouseLeave?: () => void;
    variants?: MusicBannerCardVariants;
}
declare const MusicBannerCard: ({ sekai, themeMode, musicTitle, artist, selected, onSelect, onClick, onBlur, onMouseLeave, variants, ...rest }: MusicBannerCardProps) => React__default.JSX.Element;

interface PrskLinkCardProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    themeMode?: PaletteMode;
    height?: number;
    width?: number;
    onClick?: () => void;
    title: string;
    subText: string;
    icon: string | React__default.ReactNode;
}
declare const PrskLinkCard: ({ sekai, themeMode, height, width, onClick, title, subText, icon, ...rest }: PrskLinkCardProps) => React__default.JSX.Element;

type DialogSize = 'narrow' | 'medium' | 'wide';
type DialogButtonType = 'normal' | 'strong';
interface DialogButton {
    text: string;
    onClick: () => void;
    type?: DialogButtonType;
    disabled?: boolean;
    ariaLabel?: string;
    buttonStyle?: string;
}
interface DialogProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    open: boolean;
    themeMode?: PaletteMode;
    children: React__default.ReactNode;
    containerComponent?: HTMLElement;
    size?: DialogSize;
    onClose: () => void;
    title?: string;
    showCloseIcon?: boolean;
    buttons?: DialogButton[];
    dialogButtons?: React__default.ReactNode;
}
declare const Dialog: ({ sekai, open, themeMode, children, containerComponent, size, onClose, title, showCloseIcon, buttons, dialogButtons, ...rest }: DialogProps) => React__default.ReactPortal | null;
type DialogTitleHeaderProps = Pick<DialogProps, 'sekai' | 'themeMode' | 'size' | 'onClose' | 'title' | 'showCloseIcon'> & {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
};
declare const DialogTitleHeader: ({ sekai, themeMode, size, onClose, title, showCloseIcon, ...rest }: DialogTitleHeaderProps) => React__default.JSX.Element | null;
type DialogButtonsProps = Pick<DialogProps, 'sekai' | 'themeMode' | 'buttons'> & {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
};
declare const DialogButtons: ({ sekai, themeMode, buttons, ...rest }: DialogButtonsProps) => React__default.JSX.Element | null;

interface WindowDialogProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    themeMode?: PaletteMode;
    open: boolean;
    children: React__default.ReactNode;
    containerComponent?: HTMLElement;
    size?: DialogSize;
    onClose: () => void;
}
declare const WindowDialog: ({ sekai, themeMode, open, children, containerComponent, size, onClose, ...rest }: WindowDialogProps) => React__default.ReactPortal | null;

interface XoMikuDialogProps {
    open: boolean;
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    themeMode?: PaletteMode;
    children: React__default.ReactNode;
    size?: DialogSize;
    containerComponent?: HTMLElement;
    onClose: () => void;
    title?: string;
    buttons?: DialogButton[];
}
declare const XoMikuDialog: ({ open, themeMode, children, size, containerComponent, onClose, title, buttons, ...rest }: XoMikuDialogProps) => React__default.ReactPortal | null;

interface XxMikuDialogProps {
    open: boolean;
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    themeMode?: PaletteMode;
    children: React__default.ReactNode;
    size?: DialogSize;
    containerComponent?: HTMLElement;
    onClose: () => void;
    title?: string;
    buttons?: DialogButton[];
}
declare const XxMikuDialog: ({ open, themeMode, children, size, containerComponent, onClose, title, buttons, ...rest }: XxMikuDialogProps) => React__default.ReactPortal | null;

interface DividerProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    themeMode?: PaletteMode;
    children?: React__default.ReactNode;
    pairColor?: ColorsSekaiKey;
    lineHeight?: number | string;
    variant?: 'fullWidth' | 'inset' | 'middle';
    textAlign?: 'left' | 'center' | 'right';
    shadow?: boolean;
}
declare const Divider: ({ sekai, themeMode, children, pairColor, lineHeight, variant, textAlign, shadow, ...rest }: DividerProps) => React__default.JSX.Element;

type DrawerPosition = 'top' | 'right' | 'bottom' | 'left';
interface DrawerProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    themeMode?: PaletteMode;
    open: boolean;
    onClose: () => void;
    children: React__default.ReactNode;
    containerComponent?: HTMLElement;
    pos?: DrawerPosition;
}
declare const Drawer: ({ sekai, themeMode, open, onClose, children, containerComponent, pos, ...rest }: DrawerProps) => React__default.ReactPortal | null;

interface DropdownOption {
    label: string;
    value: string;
}
interface DropdownProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    themeMode?: PaletteMode;
    options: DropdownOption[];
    defaultValue?: string;
    onSelect: (value: string) => void;
    placeholder?: string;
}
declare const Dropdown: (props: DropdownProps) => React__default.JSX.Element;
declare const DropdownContent: ({ sekai, themeMode, options, onSelect, placeholder, ...rest }: DropdownProps) => React__default.JSX.Element;

interface DoReMeetEffectProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekaiKeys: ColorsSekaiKey[];
    themeMode?: PaletteMode;
    text: string;
    duration?: number;
}
declare const DoReMeetEffect: ({ sekaiKeys, themeMode, text, duration, ...rest }: DoReMeetEffectProps) => React__default.JSX.Element;

interface IntoTheSekaiProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    execEvent?: () => void;
    containerComponent?: HTMLElement;
}
declare const IntoTheSekai: ({ execEvent, containerComponent, ...rest }: IntoTheSekaiProps) => React__default.ReactPortal | null;

interface SekaiBackgroundProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    containerComponent?: HTMLElement;
    bgOpacity?: number;
}
declare const SekaiBackground: ({ containerComponent, bgOpacity, ...rest }: SekaiBackgroundProps) => React__default.ReactPortal | null;

interface TextLinkProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    themeMode?: PaletteMode;
    text: string;
    href: string;
    isExternal?: boolean;
    disabled?: boolean;
    ariaLabel?: string;
}
declare const TextLink: ({ sekai, themeMode, text, href, isExternal, disabled, ariaLabel, ...rest }: TextLinkProps) => React__default.JSX.Element;

declare const ListContext: React__default.Context<boolean>;
interface ListProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    themeMode?: PaletteMode;
    children: React__default.ReactNode;
    as?: 'ul' | 'ol';
    noBullet?: boolean;
}
declare const List: ({ sekai, themeMode, children, as, noBullet, ...rest }: ListProps) => React__default.JSX.Element;

interface ListItemButtonProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    themeMode?: PaletteMode;
    children: React__default.ReactNode;
    icon?: 'string' | React__default.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
}
declare const ListItemButton: ({ id, className, style, sekai, themeMode, children, icon, disabled, onClick, }: ListItemButtonProps) => React__default.JSX.Element;

interface ListItemTextProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    themeMode?: PaletteMode;
    children: React__default.ReactNode;
    as?: 'p' | 'span';
    icon?: 'string' | React__default.ReactNode;
}
declare const ListItemText: ({ sekai, themeMode, children, as, icon, ...rest }: ListItemTextProps) => React__default.JSX.Element;

interface StickyNoteProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    children: React__default.ReactNode;
    as?: 'button' | 'text';
    disabled?: boolean;
    onClick?: () => void;
}
declare const StickyNote: ({ sekai, children, as, ...rest }: StickyNoteProps) => React__default.JSX.Element;

interface LoadingProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
}
declare const Loading: ({ id, className, style, sekai }: LoadingProps) => React__default.JSX.Element;

type PaginationSize = 'small' | 'medium' | 'large';
interface PaginationProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    themeMode?: PaletteMode;
    count: number;
    page?: number;
    onChangePage?: (page: number) => void;
    siblingCount?: number;
    size?: PaginationSize;
}
declare const Pagination: ({ sekai, themeMode, count, page, onChangePage, siblingCount, size, ...rest }: PaginationProps) => React__default.JSX.Element;

interface SharedValueProviderProps<T> {
    children: React__default.ReactNode;
    sessionStorageKey: string;
    defaultValue: T;
}
interface SharedValueContextProps<T> {
    sharedValue: T;
    setSharedValue: React__default.Dispatch<React__default.SetStateAction<T>>;
    deleteSharedValue: () => void;
}
declare const createSharedValueProvider: <T>() => {
    useSharedValueContext: () => SharedValueContextProps<T>;
    SharedValueProvider: ({ children, sessionStorageKey, defaultValue, }: SharedValueProviderProps<T>) => React__default.JSX.Element;
};

type SekaiThemeProps = {
    palette: {
        sekai: ColorsSekaiKey;
        mode?: PaletteMode;
    };
    typography?: {
        fontFamily?: string;
    };
};
type SekaiTheme = {
    palette: {
        sekai: ColorsSekaiKey;
        mode: PaletteMode;
    };
    typography: {
        fontFamily: string;
    };
};
declare const createSekai: (option: SekaiThemeProps) => SekaiTheme;

declare const YOUR_SEKAI_COLOR = "your_sekai_color";
declare const YOUR_COLOR_THEME = "your_color_theme";
interface YourSekaiContextProps {
    sekaiTheme: SekaiTheme;
    switchSekaiColor: (sekai: ColorsSekaiKey) => void;
    switchColorTheme: (color: PaletteMode) => void;
}
declare const YourSekaiContext: React__default.Context<YourSekaiContextProps | null>;
interface YourSekaiOptions {
    disableStoreSekai?: boolean;
    disableStoreTheme?: boolean;
}
interface YourSekaiProviderProps {
    children: React__default.ReactNode;
    sekaiTheme: SekaiTheme;
    options?: YourSekaiOptions;
}
declare const YourSekaiProvider: ({ children, sekaiTheme, options, }: YourSekaiProviderProps) => React__default.JSX.Element;

type CheckboxProps = {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    themeMode?: PaletteMode;
    checked?: boolean;
    disabled?: boolean;
    onChange?: (value: boolean) => void;
    filling?: boolean;
} & Omit<React__default.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'checked' | 'disabled'>;
declare const Checkbox: ({ sekai, themeMode, checked, disabled, onChange, filling, ...rest }: CheckboxProps) => React__default.JSX.Element;

interface MarqueeTextProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    themeMode?: PaletteMode;
    children: React__default.ReactNode;
    duration?: number;
    parentBackgroundColor?: string;
}
declare const MarqueeText: ({ sekai, themeMode, children, duration, parentBackgroundColor, ...rest }: MarqueeTextProps) => React__default.JSX.Element;

interface NamePlateProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    themeMode?: PaletteMode;
    text: string;
    colorCount?: number;
}
declare const NamePlate: ({ sekai, themeMode, text, colorCount, ...rest }: NamePlateProps) => React__default.JSX.Element;

interface OutlineTextProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    themeMode?: PaletteMode;
    text: string;
}
declare const OutlineText: ({ sekai, themeMode, text, ...rest }: OutlineTextProps) => React__default.JSX.Element;

interface TypewriterTextOptions {
    speed?: number;
    loop?: boolean;
    cursor?: boolean;
}
interface TypewriterTextProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    themeMode?: PaletteMode;
    text: string;
    options?: TypewriterTextOptions;
}
declare const TypewriterText: ({ sekai, themeMode, text, options, ...rest }: TypewriterTextProps) => React__default.JSX.Element;

interface BodyTextProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    themeMode?: PaletteMode;
    children?: React__default.ReactNode;
}
declare const BodyText: ({ themeMode, children, ...rest }: BodyTextProps) => React__default.JSX.Element;
interface SekaiBodyTextProps extends BodyTextProps {
    sekai?: ColorsSekaiKey;
}
declare const SekaiBodyText: ({ sekai, children, ...rest }: SekaiBodyTextProps) => React__default.JSX.Element;
interface DetailTextProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    themeMode?: PaletteMode;
    children?: React__default.ReactNode;
}
declare const DetailText: ({ themeMode, children, ...rest }: DetailTextProps) => React__default.JSX.Element;
interface SekaiDetailTextProps extends DetailTextProps {
    sekai?: ColorsSekaiKey;
}
declare const SekaiDetailText: ({ sekai, children, ...rest }: SekaiDetailTextProps) => React__default.JSX.Element;
interface AnnotationTextProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    themeMode?: PaletteMode;
    children?: React__default.ReactNode;
}
declare const AnnotationText: ({ themeMode, children, ...rest }: AnnotationTextProps) => React__default.JSX.Element;
interface SekaiAnnotationTextProps extends AnnotationTextProps {
    sekai?: ColorsSekaiKey;
}
declare const SekaiAnnotationText: ({ sekai, children, ...rest }: SekaiAnnotationTextProps) => React__default.JSX.Element;

type ResizeVariant = 'none' | 'both' | 'horizontal' | 'vertical';
interface TextAreaProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    themeMode?: PaletteMode;
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    maxLength?: number;
    resize?: ResizeVariant;
}
declare const TextArea: ({ sekai, themeMode, value, onChange, placeholder, disabled, maxLength, resize, ...rest }: TextAreaProps) => React__default.JSX.Element;

interface TextFieldProps extends React__default.InputHTMLAttributes<HTMLInputElement> {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    themeMode?: PaletteMode;
    placeholder?: string;
    clearButton?: boolean;
    onChangeInput?: (value: string) => void;
    isError?: boolean;
    errorMessage?: string;
    maxLength?: number;
}
declare const TextField: ({ id, className, style, sekai, themeMode, clearButton, onChangeInput, isError, errorMessage, ...inputProps }: TextFieldProps) => React__default.JSX.Element;

type ToastPosition = 'top' | 'bottom';
interface ToastProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    themeMode?: PaletteMode;
    open: boolean;
    onClose: () => void;
    pos?: ToastPosition;
    message: string | string[];
    isError?: boolean;
    duration?: number;
    containerComponent?: HTMLElement;
}
declare const Toast: ({ sekai, themeMode, open, onClose, pos, message, isError, duration, containerComponent, ...rest }: ToastProps) => React__default.ReactPortal | null;

type TooltipPosition = 'top' | 'bottom';
interface TooltipProps {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
    sekai?: ColorsSekaiKey;
    themeMode?: PaletteMode;
    children: React__default.ReactNode;
    text: string;
    pos?: TooltipPosition;
}
declare const Tooltip: ({ sekai, themeMode, children, text, pos, ...rest }: TooltipProps) => React__default.JSX.Element;

declare const useCreateSekai: () => YourSekaiContextProps;

declare const useCurrentTime: () => Date;

declare const useLocalStorage: <T>(localStorageKey: string, initialValue: T) => {
    storedValue: T;
    setStoredValue: React.Dispatch<React.SetStateAction<T>>;
    deleteLocalStorage: () => void;
};

declare const useSessionStorage: <T>(sessionStorageKey: string, initialValue: T) => {
    storedValue: T;
    setStoredValue: React.Dispatch<React.SetStateAction<T>>;
    deleteSessionStorage: () => void;
};

declare const ORIENTATION: {
    readonly PORTRAIT: "PORTRAIT";
    readonly LANDSCAPE: "LANDSCAPE";
};
type Orientation = (typeof ORIENTATION)[keyof typeof ORIENTATION];
declare const useInnerSize: () => number;
/**
 * @description This hook is used to get the current window size and orientation.
 * Return Portrait if the window size is 768px or less, otherwise return Landscape.
 */
declare const useOrientation: () => Orientation;
/**
 * @description This hook is used to get the current window size and check if it is in tablet size.
 * Return true if the window size is between 768px and 1280px, otherwise return false.
 */
declare const useTabletSize: () => boolean;

/**
 * @description Get localized character name by ColorsSekaiKey
 * @param {string} name - ColorsSekaiKey
 * @param {string} locale - Locale code (default: 'ja')
 * @returns {string} - Localized character name
 */
declare const getSekaiCharacterName: (name: ColorsSekaiKey, locale?: string) => string;

/**
 * @description Convert hex color to rgb color
 * @param {string} hex - Hex color string (e.g., #RRGGBB)
 * @returns {string} RGB color string (e.g., rgb(255, 0, 0))
 */
declare const convertHexToRgb: (hex: string) => string;
/**
 * @description Convert hex color to rgba color
 * @param {string} hex - Hex color string (e.g., #RRGGBB)
 * @param {number} alpha - Alpha value (0 to 1)
 * @returns {string | undefined} RGBA color string (e.g., rgba(255, 0, 0, 0.5))
 */
declare const convertHexToRgba: (hex: string, alpha?: number) => string;
/**
 * @description Convert hex color to rgba color mixed with black or white
 * @param {string} hex - Hex color string (e.g., #RRGGBB)
 * @param {number} mixRatio - Ratio to mix with black or white (0 to 1)
 * @param {boolean} mixWhite - true to mix with white, false to mix with black
 * @param {number | undefined} alpha - Alpha value (0 to 1), default is 1
 * @returns {string} RGBA color string (e.g., rgba(255, 0, 0, 0.5))
 */
declare const convertHexToRgbaMixWithBlackOrWhite: (hex: string, mixRatio: number, mixWhite: boolean, alpha?: number) => string;

/**
 * @description Returns a keyboard event handler that triggers the provided event handler only when the Enter key is pressed.
 * @param eventHandler - The function to be called when the Enter key is pressed.
 * @returns A new event handler that calls the provided handler on Enter key press and prevents the default action.
 */
declare const fireOnEnterKey: <T extends HTMLElement>(eventHandler: (e: React__default.KeyboardEvent<T>) => void) => (e: React__default.KeyboardEvent<T>) => void;
/**
 * @description Returns a keyboard event handler that triggers the provided event handler only when the Escape key is pressed.
 * @param eventHandler - The function to be called when the Escape key is pressed.
 * @returns A keyboard event handler function.
 */
declare const fireOnEscapeKey: (eventHandler: (e: KeyboardEvent) => void) => (e: KeyboardEvent) => void;
/**
 * @description Returns a keyboard event handler that triggers the provided event handler only when the Space key is pressed.
 * @param eventHandler - The function to be called when the Space key is pressed.
 * @returns A keyboard event handler function.
 */
declare const fireOnSpaceKey: <T extends HTMLElement>(eventHandler: (e: React__default.KeyboardEvent<T>) => void) => (e: React__default.KeyboardEvent<T>) => void;
/**
 * @description Returns a new array with the elements of the input array shuffled in random order.
 * Uses the Fisher-Yates (Knuth) shuffle algorithm to ensure an unbiased shuffle.
 *
 * @typeParam T - The type of elements in the array.
 * @param array - The array to shuffle.
 * @returns A new array containing the shuffled elements.
 */
declare const shuffleArray: <T>(array: T[]) => T[];

/**
 * @description Utility functions for serializing and deserializing data, including handling of Date objects.
 * @param {T} data - The data to serialize
 * @param {WeakSet<object>} visited - A WeakSet to track visited objects for circular reference detection
 * @returns {unknown} - The serialized data
 */
declare const serializeData: <T>(data: T, visited?: WeakSet<WeakKey>) => unknown;
/**
 * @description Deserialize data, converting ISO date strings back to Date objects
 * @param {unknown} data - data to deserialize
 * @param {WeakSet<object>} visited - A WeakSet to track visited objects for circular reference detection
 * @returns {unknown} - The deserialized data
 */
declare const deserializeData: (data: unknown, visited?: WeakSet<WeakKey>) => unknown;
declare const deserializeDataWithTemplate: <T>(obj: unknown, template: T, visited?: WeakSet<WeakKey>) => T;
/**
 * @description Validates if a string is a valid date string (ISO 8601 or other formats recognized by Date.parse)
 * @param dateStr - date string to validate
 * @returns boolean - whether the string is a valid date string
 */
declare const isValidDateString: (dateStr: string) => boolean;

/**
 * Returns the current time as a Date object.
 * @returns {Date} The current Date object.
 */
declare const getCurrentTime: () => Date;
/**
 * Returns the current time as a string in the specified format.
 * @param {Date} now - The current Date object.
 * @param {string} format - Format type ('datetime', 'date', 'time', 'timestamp', 'iso')
 * @param {string} locale - Locale (default: 'ja-JP')
 * @returns {string} Formatted time string
 */
declare const getFormattedTime: (now: Date, format?: string, locale?: string) => string;
/**
 * Returns the current time in a custom format.
 * @param {Date} now - The current Date object.
 * @param {string} pattern - Format pattern (e.g., 'YYYY-MM-DD HH:mm:ss')
 * @returns {string} Formatted time string
 */
declare const getCustomCurrentTime: (now: Date, pattern?: string) => string;

export { Accordion, AnnotationText, Backdrop, BasicButton, BodyText, Breadcrumb, COLORS_SEKAI_KEYS, Card, CardContent, CardTitle, Checkbox, DARK_MODE, DetailText, Dialog, DialogButtons, DialogTitleHeader, Divider, DoReMeetEffect, Drawer, Dropdown, DropdownContent, HamburgerButton, IntoTheSekai, LIGHT_MODE, List, ListContext, ListItemButton, ListItemText, Loading, MarqueeText, MusicBannerCard, NamePlate, ORIENTATION, OutlineText, Pagination, PrskLinkCard, ScrollTopButton, SekaiAnnotationText, SekaiBackground, SekaiBodyText, SekaiDetailText, StickyNote, StrongButton, StylishButton, TextArea, TextField, TextLink, Toast, Tooltip, TypewriterText, WindowDialog, XoMikuDialog, XxMikuDialog, YOUR_COLOR_THEME, YOUR_SEKAI_COLOR, YourSekaiContext, YourSekaiProvider, colorSekaiKeyList, colorsSekai, convertHexToRgb, convertHexToRgba, convertHexToRgbaMixWithBlackOrWhite, createSekai, createSharedValueProvider, deserializeData, deserializeDataWithTemplate, fireOnEnterKey, fireOnEscapeKey, fireOnSpaceKey, getCurrentTime, getCustomCurrentTime, getFormattedTime, getSekaiCharacterName, isValidDateString, serializeData, shuffleArray, useCreateSekai, useCurrentTime, useInnerSize, useLocalStorage, useOrientation, useSessionStorage, useTabletSize, useThemeMode };
export type { AccordionProps, AnnotationTextProps, ArrayElement, BackdropProps, BasicButtonProps, BodyTextProps, BreadcrumbProps, CardContentProps, CardProps, CardTitleProps, CheckboxProps, ColorsSekai, ColorsSekaiCode, ColorsSekaiKey, DeepPartial, DeepRequired, DetailTextProps, DialogButton, DialogButtonType, DialogButtonsProps, DialogProps, DialogSize, DialogTitleHeaderProps, DividerProps, DoReMeetEffectProps, DrawerPosition, DrawerProps, DropdownOption, DropdownProps, HamburgerButtonProps, IntoTheSekaiProps, ListItemButtonProps, ListItemTextProps, ListProps, LoadingProps, MarqueeTextProps, MusicBannerCardProps, NamePlateProps, Orientation, OutlineTextProps, PaginationProps, PaginationSize, PaletteMode, PartialBy, PrskLinkCardProps, RequiredBy, ScrollTopButtonProps, ScrollTopPos, SekaiAnnotationTextProps, SekaiBackgroundProps, SekaiBodyTextProps, SekaiDetailTextProps, SekaiTheme, SekaiThemeProps, SharedValueContextProps, SharedValueProviderProps, StickyNoteProps, StrongButtonProps, StylishButtonProps, TextAreaProps, TextFieldProps, TextLinkProps, ToastPosition, ToastProps, TooltipPosition, TooltipProps, TypewriterTextOptions, TypewriterTextProps, ValueOf, WindowDialogProps, XoMikuDialogProps, XxMikuDialogProps, YourSekaiContextProps, YourSekaiProviderProps };
