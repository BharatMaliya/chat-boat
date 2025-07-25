export interface ThemeColors {
    primary: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        1000: string;
    };
    black: {
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        1000: string;
        1100: string;
        1200: string;
        1300: string;
        1400: string;
        1500: string;
        1600: string;
    };
    warning: {
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
    };
    success: {
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
    };
    error: {
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
    };
    white: {
        100: string;
    };
    neutral: {
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        1000: string;
    };
    border: string;
    blackDefault: string;
}

export interface ThemeTypography {
    fontFamily: {
        primary: string;
        secondary: string;
        mono: string;
    };
    fontSize: {
        xs: string;
        sm: string;
        base: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
        '4xl': string;
    };
    fontWeight: {
        light: number;
        normal: number;
        medium: number;
        semibold: number;
        bold: number;
    };
    lineHeight: {
        tight: string;
        normal: string;
        relaxed: string;
    };
}

export interface ThemeSpacing {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
}

export interface ThemeBorders {
    radius: {
        none: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        full: string;
    };
    width: {
        none: string;
        thin: string;
        normal: string;
        thick: string;
    };
}

export interface ThemeShadows {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    inner: string;
    none: string;
}

export interface ThemeBreakpoints {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
}

export interface Theme {
    colors: ThemeColors;
    typography: ThemeTypography;
    spacing: ThemeSpacing;
    borders: ThemeBorders;
    shadows: ThemeShadows;
    breakpoints: ThemeBreakpoints;
}

export const defaultTheme: Theme = {
    colors: {
        primary: {
            50: '#f5fcfb',
            100: '#ecfaf8',
            200: '#d0f3ed',
            300: '#a0e7da',
            400: '#71dbc8',
            500: '#41cfb5',
            600: '#0da495',
            700: '#0e9c82',
            800: '#0b7562',
            900: '#074e41',
            1000: '#042721',
        },
        black: {
            100: '#ffffff',
            200: '#f8f8f8',
            300: '#ededed',
            400: '#d4d4d4',
            500: '#c1c1c1',
            600: '#a2a2a2',
            700: '#919191',
            800: '#777777',
            900: '#6f6f6f',
            1000: '#565656',
            1100: '#4e4e4e',
            1200: '#393939',
            1300: '#303030',
            1400: '#222222',
            1500: '#101010',
            1600: '#000000',
        },
        warning: {
            100: '#fef9eb',
            200: '#fdf2d3',
            300: '#fae6a7',
            400: '#f8d97b',
            500: '#f5cc4f',
            600: '#d9b033',
            700: '#a88426',
            800: '#6c5819',
            900: '#362c0d',
        },
        success: {
            100: '#eafaf0',
            200: '#cff3de',
            300: '#a0e7be',
            400: '#70db9d',
            500: '#41cf7c',
            600: '#24b260',
            700: '#1b8648',
            800: '#125930',
            900: '#092d18',
        },
        error: {
            100: '#fdebeb',
            200: '#fbd2d2',
            300: '#f7a5a5',
            400: '#f27878',
            500: '#ee4b4b',
            600: '#d22e2e',
            700: '#9d2323',
            800: '#691717',
            900: '#340c0c',
        },
        white: {
            100: '#ffffff',
        },
        neutral: {
            200: '#f8f8f8',
            300: '#ededed',
            400: '#d4d4d4',
            500: '#c1c1c1',
            600: '#a2a2a2',
            1000: '#5e5e5e',
        },
        border: '#a2a2a2',
        blackDefault: '#000000',
    },
    typography: {
        fontFamily: {
            primary: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            secondary: 'Georgia, serif',
            mono: 'JetBrains Mono, Consolas, Monaco, "Andale Mono", monospace',
        },
        fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
        },
        fontWeight: {
            light: 300,
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        },
        lineHeight: {
            tight: '1.25',
            normal: '1.5',
            relaxed: '1.75',
        },
    },
    spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
        '4xl': '6rem',
    },
    borders: {
        radius: {
            none: '0',
            sm: '0.125rem',
            md: '0.375rem',
            lg: '0.5rem',
            xl: '0.75rem',
            full: '9999px',
        },
        width: {
            none: '0',
            thin: '1px',
            normal: '2px',
            thick: '4px',
        },
    },
    shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        none: 'none',
    },
    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
    },
};

// Theme utility functions
export const getThemeValue = (path: string, theme: Theme = defaultTheme): string => {
    const keys = path.split('.');
    let value: any = theme;

    for (const key of keys) {
        value = value[key];
        if (value === undefined) {
            console.warn(`Theme value not found: ${path}`);
            return '';
        }
    }

    return value;
};

export const createCSSVariables = (theme: Theme = defaultTheme): string => {
    const variables: string[] = [];

    // Colors
    Object.entries(theme.colors).forEach(([category, colors]) => {
        if (typeof colors === 'object') {
            Object.entries(colors).forEach(([shade, color]) => {
                variables.push(`--${category}-${shade}: ${color};`);
            });
        } else {
            variables.push(`--${category}: ${colors};`);
        }
    });

    // Typography
    Object.entries(theme.typography.fontFamily).forEach(([name, font]) => {
        variables.push(`--font-family-${name}: ${font};`);
    });

    Object.entries(theme.typography.fontSize).forEach(([size, value]) => {
        variables.push(`--font-size-${size}: ${value};`);
    });

    Object.entries(theme.typography.fontWeight).forEach(([weight, value]) => {
        variables.push(`--font-weight-${weight}: ${value};`);
    });

    Object.entries(theme.typography.lineHeight).forEach(([height, value]) => {
        variables.push(`--line-height-${height}: ${value};`);
    });

    // Spacing
    Object.entries(theme.spacing).forEach(([size, value]) => {
        variables.push(`--spacing-${size}: ${value};`);
    });

    // Borders
    Object.entries(theme.borders.radius).forEach(([radius, value]) => {
        variables.push(`--border-radius-${radius}: ${value};`);
    });

    Object.entries(theme.borders.width).forEach(([width, value]) => {
        variables.push(`--border-width-${width}: ${value};`);
    });

    // Shadows
    Object.entries(theme.shadows).forEach(([shadow, value]) => {
        variables.push(`--shadow-${shadow}: ${value};`);
    });

    // Breakpoints
    Object.entries(theme.breakpoints).forEach(([breakpoint, value]) => {
        variables.push(`--breakpoint-${breakpoint}: ${value};`);
    });

    return `:root {\n  ${variables.join('\n  ')}\n}`;
}; 